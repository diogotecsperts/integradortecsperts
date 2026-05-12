import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { syncDeposits, syncProducts, syncStock, syncOrders, syncContacts } from "@/lib/bling/sync.server";

// Endpoint público chamado por pg_cron a cada ~20min.
// Auth: header `apikey` deve bater com a anon key.
//
// Estratégia: cada execução processa NO MÁXIMO UM recurso por tenant
// (de orders/products/contacts). Stock/deposits só rodam se nenhum dos
// três principais precisou rodar — assim cada tick fica curto e nunca
// estoura o limite de tempo do Worker.
export const Route = createFileRoute("/api/public/hooks/bling-sync-tick")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const provided = request.headers.get("apikey") ?? request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
        if (!expected || provided !== expected) {
          return new Response("Unauthorized", { status: 401 });
        }

        const results: Array<Record<string, unknown>> = [];

        // 1) Reaper: marca como erro qualquer run travada > 5min sem heartbeat.
        try {
          const { data: reaped } = await supabaseAdmin.rpc("reap_stale_bling_runs");
          results.push({ reaper: reaped ?? 0 });
        } catch (e) {
          results.push({ reaper_error: errMsg(e) });
        }

        // 2) Lista tenants conectados.
        const { data: creds, error: credErr } = await supabaseAdmin
          .from("bling_credentials")
          .select("tenant_id, expires_at");
        if (credErr) {
          return jsonResponse({ ok: false, error: credErr.message }, 500);
        }

        const fnByResource = { orders: syncOrders, products: syncProducts, contacts: syncContacts } as const;
        const PRIMARY = ["orders", "products", "contacts"] as const;
        type Primary = typeof PRIMARY[number];

        for (const c of creds ?? []) {
          const tenantId = c.tenant_id as string;
          const tenantOut: Record<string, unknown> = { tenantId };
          try {
            // 2a) Há run "running" pausada (resume) em qualquer recurso primário?
            const { data: pending } = await supabaseAdmin
              .from("bling_sync_runs")
              .select("id, resource")
              .eq("tenant_id", tenantId)
              .in("resource", PRIMARY as unknown as string[])
              .eq("status", "running")
              .not("next_page", "is", null)
              .order("started_at", { ascending: true })
              .limit(1)
              .maybeSingle();

            let pickedPrimary: Primary | null = null;

            if (pending?.id && (PRIMARY as readonly string[]).includes(pending.resource)) {
              const resource = pending.resource as Primary;
              try {
                const r = await fnByResource[resource](tenantId, "incremental", { resumeRunId: pending.id });
                tenantOut[`${resource}_resume`] = { done: r.done, count: r.count, nextPage: r.nextPage };
                console.log(`[bling-sync-tick] tenant=${tenantId} resource=${resource} resume done=${r.done} count=${r.count} nextPage=${r.nextPage}`);
              } catch (e) {
                tenantOut[`${resource}_error`] = errMsg(e);
                console.error(`[bling-sync-tick] tenant=${tenantId} resource=${resource} resume ERROR: ${errMsg(e)}`);
              }
              pickedPrimary = resource;
            } else {
              // 2b) Sem resume — escolhe o recurso mais defasado (menor last ok finished_at; nulls primeiro).
              const { data: lastOks } = await supabaseAdmin
                .from("bling_sync_runs")
                .select("resource, finished_at, status")
                .eq("tenant_id", tenantId)
                .in("resource", PRIMARY as unknown as string[])
                .eq("status", "ok")
                .order("finished_at", { ascending: false });

              const latestByRes = new Map<string, string | null>();
              for (const r of lastOks ?? []) {
                if (!latestByRes.has(r.resource)) latestByRes.set(r.resource, r.finished_at ?? null);
              }
              // Ordena: nunca rodou (null) primeiro, depois mais antigo.
              const ranked = [...PRIMARY].sort((a, b) => {
                const av = latestByRes.get(a);
                const bv = latestByRes.get(b);
                if (!av && !bv) return 0;
                if (!av) return -1;
                if (!bv) return 1;
                return new Date(av).getTime() - new Date(bv).getTime();
              });
              const resource = ranked[0];
              try {
                const r = await fnByResource[resource](tenantId, "incremental");
                tenantOut[resource] = { done: r.done, count: r.count, nextPage: r.nextPage };
                console.log(`[bling-sync-tick] tenant=${tenantId} resource=${resource} done=${r.done} count=${r.count} nextPage=${r.nextPage}`);
              } catch (e) {
                tenantOut[`${resource}_error`] = errMsg(e);
                console.error(`[bling-sync-tick] tenant=${tenantId} resource=${resource} ERROR: ${errMsg(e)}`);
              }
              pickedPrimary = resource;
            }

            // 2c) Stock/depósitos só rodam se NÃO usamos o slot principal (improvável).
            if (!pickedPrimary) {
              try { tenantOut.stock = await syncStock(tenantId); }
              catch (e) { tenantOut.stock_error = errMsg(e); }

              const { data: lastDep } = await supabaseAdmin
                .from("bling_sync_runs")
                .select("finished_at")
                .eq("tenant_id", tenantId).eq("resource", "deposits").eq("status", "ok")
                .order("finished_at", { ascending: false }).limit(1).maybeSingle();
              const stale = !lastDep?.finished_at || (Date.now() - new Date(lastDep.finished_at).getTime() > 24 * 3600 * 1000);
              if (stale) {
                try { tenantOut.deposits = await syncDeposits(tenantId); }
                catch (e) { tenantOut.deposits_error = errMsg(e); }
              }
            }
          } catch (e) {
            tenantOut.error = errMsg(e);
          }
          results.push(tenantOut);
        }

        return jsonResponse({ ok: true, processedTenants: (creds ?? []).length, results });
      },
    },
  },
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
function errMsg(e: unknown) {
  return e instanceof Error ? e.message : String(e);
}
