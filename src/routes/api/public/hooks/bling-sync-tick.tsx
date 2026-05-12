import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { syncDeposits, syncProducts, syncStock, syncOrders, syncContacts } from "@/lib/bling/sync.server";

// Endpoint público chamado por pg_cron a cada ~20min.
// Auth: header `apikey` deve bater com a anon key.
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

        for (const c of creds ?? []) {
          const tenantId = c.tenant_id as string;
          const tenantOut: Record<string, unknown> = { tenantId };
          try {
            // 2a) Retoma runs em andamento (orders/products/contacts) se houver — isolado por recurso.
            const fnByResource = { orders: syncOrders, products: syncProducts, contacts: syncContacts } as const;
            for (const resource of ["orders", "products", "contacts"] as const) {
              try {
                const { data: pending } = await supabaseAdmin
                  .from("bling_sync_runs")
                  .select("id")
                  .eq("tenant_id", tenantId).eq("resource", resource)
                  .eq("status", "running")
                  .not("next_page", "is", null)
                  .order("started_at", { ascending: false }).limit(1).maybeSingle();
                const fn = fnByResource[resource];
                const r = pending?.id
                  ? await fn(tenantId, "incremental", { resumeRunId: pending.id })
                  : await fn(tenantId, "incremental");
                tenantOut[pending?.id ? `${resource}_resume` : resource] = { done: r.done, count: r.count, nextPage: r.nextPage };
                console.log(`[bling-sync-tick] tenant=${tenantId} resource=${resource} done=${r.done} count=${r.count} nextPage=${r.nextPage}`);
              } catch (e) {
                const msg = errMsg(e);
                tenantOut[`${resource}_error`] = msg;
                console.error(`[bling-sync-tick] tenant=${tenantId} resource=${resource} ERROR: ${msg}`);
              }
            }
            // 2c) Stock incremental (single-shot, baixo volume).
            try {
              const r = await syncStock(tenantId);
              tenantOut.stock = r;
            } catch (e) { tenantOut.stock_error = errMsg(e); }

            // 2d) Depósitos: 1x/dia (heurística leve — checa se tem run "ok" nas últimas 24h).
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
