// Lógica de sincronização Bling -> tabelas espelho.
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { blingFetch, BlingError } from "./client.server";

type Resource = "deposits" | "products" | "stock";

async function startRun(tenantId: string, resource: Resource, mode: string) {
  const { data, error } = await supabaseAdmin
    .from("bling_sync_runs")
    .insert({ tenant_id: tenantId, resource, mode, status: "running" })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id as string;
}
async function endRun(id: string, ok: boolean, items: number, errMsg?: string, meta?: object) {
  await supabaseAdmin
    .from("bling_sync_runs")
    .update({
      status: ok ? "ok" : "error",
      finished_at: new Date().toISOString(),
      items_processed: items,
      error_message: errMsg ?? null,
      meta: (meta ?? null) as never,
    })
    .eq("id", id);
}

// ===================== DEPÓSITOS =====================
export async function syncDeposits(tenantId: string) {
  const runId = await startRun(tenantId, "deposits", "full");
  let count = 0;
  try {
    let pagina = 1;
    for (;;) {
      const resp = await blingFetch<{ data: Array<Record<string, unknown>> }>(
        tenantId, "/depositos", { searchParams: { pagina, limite: 100 } },
      );
      const list = resp?.data ?? [];
      if (list.length === 0) break;
      const rows = list.map((d) => ({
        tenant_id: tenantId,
        bling_id: Number(d.id),
        nome: (d.descricao as string) ?? (d.nome as string) ?? null,
        descricao: (d.descricao as string) ?? null,
        situacao: (d.situacao as string) ?? null,
        padrao: Boolean(d.padrao),
        desconsiderar_saldo: Boolean(d.desconsiderarSaldo),
        raw: d,
        synced_at: new Date().toISOString(),
      }));
      const { error } = await supabaseAdmin
        .from("bling_deposits")
        .upsert(rows as never, { onConflict: "tenant_id,bling_id" });
      if (error) throw new Error(error.message);
      count += rows.length;
      if (list.length < 100) break;
      pagina++;
    }
    await endRun(runId, true, count);
    return { ok: true, count };
  } catch (e) {
    await endRun(runId, false, count, errMessage(e));
    throw e;
  }
}

// ===================== PRODUTOS =====================
export async function syncProducts(tenantId: string, mode: "full" | "incremental" = "full") {
  const runId = await startRun(tenantId, "products", mode);
  let count = 0;
  let dataAlteracaoInicial: string | undefined;
  if (mode === "incremental") {
    const { data } = await supabaseAdmin
      .from("bling_sync_runs")
      .select("finished_at")
      .eq("tenant_id", tenantId).eq("resource", "products").eq("status", "ok")
      .order("finished_at", { ascending: false }).limit(1).maybeSingle();
    if (data?.finished_at) {
      const d = new Date(data.finished_at);
      const pad = (n: number) => String(n).padStart(2, "0");
      dataAlteracaoInicial = `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
    }
  }
  try {
    let pagina = 1;
    for (;;) {
      const resp = await blingFetch<{ data: Array<Record<string, unknown>> }>(
        tenantId, "/produtos",
        { searchParams: { pagina, limite: 100, dataAlteracaoInicial } },
      );
      const list = resp?.data ?? [];
      if (list.length === 0) break;
      const rows = list.map(mapProduct(tenantId));
      const { error } = await supabaseAdmin
        .from("bling_products")
        .upsert(rows as never, { onConflict: "tenant_id,bling_id" });
      if (error) throw new Error(error.message);
      count += rows.length;
      if (list.length < 100) break;
      pagina++;
    }
    await endRun(runId, true, count, undefined, { mode, dataAlteracaoInicial });
    return { ok: true, count };
  } catch (e) {
    await endRun(runId, false, count, errMessage(e), { mode, dataAlteracaoInicial });
    throw e;
  }
}

function mapProduct(tenantId: string) {
  return (p: Record<string, unknown>) => {
    const dim = (p.dimensoes as Record<string, unknown>) ?? null;
    const cat = (p.categoria as Record<string, unknown>) ?? null;
    return {
      tenant_id: tenantId,
      bling_id: Number(p.id),
      codigo: (p.codigo as string) ?? null,
      nome: (p.nome as string) ?? null,
      preco: typeof p.preco === "number" ? p.preco : Number(p.preco) || null,
      situacao: (p.situacao as string) ?? null,
      tipo: (p.tipo as string) ?? null,
      formato: (p.formato as string) ?? null,
      unidade: (p.unidade as string) ?? null,
      gtin: (p.gtin as string) ?? null,
      peso_liquido: dim && typeof dim.pesoLiquido === "number" ? (dim.pesoLiquido as number) : null,
      imagem_url: (p.imagemURL as string) ?? null,
      categoria_id: cat && cat.id ? Number(cat.id) : null,
      parent_id: p.idProdutoPai ? Number(p.idProdutoPai) : null,
      raw: p,
      bling_updated_at: (p.dataAlteracao as string) ?? null,
      synced_at: new Date().toISOString(),
    };
  };
}

// ===================== ESTOQUE =====================
export async function syncStock(tenantId: string) {
  const runId = await startRun(tenantId, "stock", "full");
  let count = 0;
  try {
    const { data: deposits } = await supabaseAdmin
      .from("bling_deposits").select("bling_id").eq("tenant_id", tenantId);
    const depIds = (deposits ?? []).map((d) => d.bling_id);
    if (depIds.length === 0) {
      await endRun(runId, true, 0, undefined, { note: "Sem depósitos espelhados — rode sync de depósitos primeiro." });
      return { ok: true, count: 0 };
    }
    for (const depId of depIds) {
      let pagina = 1;
      for (;;) {
        const resp = await blingFetch<{ data: Array<Record<string, unknown>> }>(
          tenantId, `/estoques/saldos/${depId}`,
          { searchParams: { pagina, limite: 100 } },
        );
        const list = resp?.data ?? [];
        if (list.length === 0) break;
        const rows = list.map((s) => ({
          tenant_id: tenantId,
          produto_id: Number((s.produto as Record<string, unknown>)?.id ?? s.idProduto),
          deposito_id: Number(depId),
          saldo_fisico: Number(s.saldoFisico) || 0,
          saldo_virtual: Number(s.saldoVirtual) || 0,
          raw: s,
          synced_at: new Date().toISOString(),
        })).filter((r) => r.produto_id);
        if (rows.length) {
          const { error } = await supabaseAdmin
            .from("bling_stock_balances")
            .upsert(rows as never, { onConflict: "tenant_id,produto_id,deposito_id" });
          if (error) throw new Error(error.message);
          count += rows.length;
        }
        if (list.length < 100) break;
        pagina++;
      }
    }
    await endRun(runId, true, count);
    return { ok: true, count };
  } catch (e) {
    await endRun(runId, false, count, errMessage(e));
    throw e;
  }
}

function errMessage(e: unknown) {
  if (e instanceof BlingError) return `${e.message} :: ${JSON.stringify(e.body).slice(0, 500)}`;
  return e instanceof Error ? e.message : String(e);
}
