// Lógica de sincronização Bling -> tabelas espelho.
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { blingFetch, BlingError } from "./client.server";

type Resource = "deposits" | "products" | "stock" | "orders" | "contacts";

// Quantas páginas processamos por execução (batch). Mantém o tick curto e evita timeouts.
const PAGES_PER_BATCH = 5;
// Pedidos exigem detail-fetch por item — mais pesado, então menos páginas por tick.
const ORDERS_PAGES_PER_BATCH = 1;
// Tamanho da página de pedidos: 20 itens × ~260ms throttle ≈ 5–7s, bem dentro do limite de 30s.
const ORDERS_PAGE_LIMIT = 20;

async function startRun(
  tenantId: string,
  resource: Resource,
  mode: string,
  meta?: object,
) {
  const { data, error } = await supabaseAdmin
    .from("bling_sync_runs")
    .insert({
      tenant_id: tenantId,
      resource,
      mode,
      status: "running",
      cursor_page: 0,
      next_page: 1,
      heartbeat_at: new Date().toISOString(),
      meta: (meta ?? null) as never,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  return data.id as string;
}

async function heartbeat(runId: string, page: number, items: number) {
  await supabaseAdmin
    .from("bling_sync_runs")
    .update({
      cursor_page: page,
      heartbeat_at: new Date().toISOString(),
      items_processed: items,
    })
    .eq("id", runId);
}

async function pauseRun(runId: string, nextPage: number, items: number) {
  await supabaseAdmin
    .from("bling_sync_runs")
    .update({
      next_page: nextPage,
      items_processed: items,
      heartbeat_at: new Date().toISOString(),
    })
    .eq("id", runId);
}

async function endRun(id: string, ok: boolean, items: number, errMsg?: string, meta?: object) {
  const update: Record<string, unknown> = {
    status: ok ? "ok" : "error",
    finished_at: new Date().toISOString(),
    items_processed: items,
    error_message: errMsg ? errMsg.slice(0, 1000) : null,
    next_page: null,
    heartbeat_at: new Date().toISOString(),
  };
  if (meta !== undefined) update.meta = meta as never;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await supabaseAdmin.from("bling_sync_runs").update(update as any).eq("id", id);
}

type BatchResult = { ok: true; count: number; done: boolean; nextPage: number | null; runId: string };


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
export async function syncProducts(
  tenantId: string,
  mode: "full" | "incremental" = "full",
  opts?: { resumeRunId?: string },
): Promise<BatchResult> {
  return runPaginatedBatch({
    tenantId,
    resource: "products",
    mode,
    resumeRunId: opts?.resumeRunId,
    path: "/produtos",
    upsert: async (list) => {
      const rows = list.map(mapProduct(tenantId));
      const { error } = await supabaseAdmin
        .from("bling_products")
        .upsert(rows as never, { onConflict: "tenant_id,bling_id" });
      if (error) throw new Error(error.message);
      return rows.length;
    },
  });
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
// GET /estoques/saldos/{idDeposito} exige idsProdutos[] (array obrigatório).
// Não há paginação: chunk por 100 produtos.
const STOCK_CHUNK = 100;

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

    const { data: products } = await supabaseAdmin
      .from("bling_products").select("bling_id").eq("tenant_id", tenantId);
    const prodIds = (products ?? []).map((p) => p.bling_id).filter(Boolean);
    if (prodIds.length === 0) {
      await endRun(runId, true, 0, undefined, { note: "Sem produtos espelhados — rode sync de produtos primeiro." });
      return { ok: true, count: 0 };
    }

    for (const depId of depIds) {
      for (let i = 0; i < prodIds.length; i += STOCK_CHUNK) {
        const chunk = prodIds.slice(i, i + STOCK_CHUNK);
        const resp = await blingFetch<{ data: Array<Record<string, unknown>> }>(
          tenantId,
          `/estoques/saldos/${depId}`,
          { searchParams: { idsProdutos: chunk } },
        );
        const list = resp?.data ?? [];
        if (list.length === 0) continue;
        const rows = list.map((s) => {
          const prod = (s.produto as Record<string, unknown>) ?? {};
          return {
            tenant_id: tenantId,
            produto_id: Number(prod.id),
            deposito_id: Number(depId),
            saldo_fisico: Number(s.saldoFisicoTotal) || 0,
            saldo_virtual: Number(s.saldoVirtualTotal) || 0,
            raw: s,
            synced_at: new Date().toISOString(),
          };
        }).filter((r) => r.produto_id);
        if (rows.length) {
          const { error } = await supabaseAdmin
            .from("bling_stock_balances")
            .upsert(rows as never, { onConflict: "tenant_id,produto_id,deposito_id" });
          if (error) throw new Error(error.message);
          count += rows.length;
        }
      }
    }
    await endRun(runId, true, count);
    return { ok: true, count };
  } catch (e) {
    await endRun(runId, false, count, errMessage(e));
    throw e;
  }
}

// ===================== PEDIDOS DE VENDA =====================
// GET /pedidos/vendas — paginação por pagina/limite=100, filtro incremental por dataAlteracaoInicial
const SITUACAO_NOMES: Record<number, string> = {
  6: "Em aberto",
  9: "Atendido",
  12: "Cancelado",
  15: "Em andamento",
  18: "Venda agenciada",
  21: "Em digitação",
  24: "Verificado",
};

export async function syncOrders(
  tenantId: string,
  mode: "full" | "incremental" = "full",
  opts?: { resumeRunId?: string },
): Promise<BatchResult> {
  return runPaginatedBatch({
    tenantId,
    resource: "orders",
    mode,
    resumeRunId: opts?.resumeRunId,
    path: "/pedidos/vendas",
    pagesPerBatch: ORDERS_PAGES_PER_BATCH,
    pageLimit: ORDERS_PAGE_LIMIT,
    upsert: async (list) => {
      const rows = list.map(mapOrder(tenantId));
      const { error } = await supabaseAdmin
        .from("bling_orders")
        .upsert(rows as never, { onConflict: "tenant_id,bling_id" });
      if (error) throw new Error(error.message);
      console.log(`[bling-sync] tenant=${tenantId} resource=orders upserted=${rows.length}`);
      // Itens: lista do Bling não traz `itens`; precisamos buscar detalhe.
      await fetchAndUpsertOrderItems(tenantId, rows.map((r) => r.bling_id));
      return rows.length;
    },
  });
}

// =============== ORDER ITEMS ===============
async function fetchAndUpsertOrderItems(tenantId: string, orderIds: number[]) {
  if (orderIds.length === 0) return;
  // 1) Apaga itens antigos desses pedidos para idempotência.
  const { error: delErr } = await supabaseAdmin
    .from("bling_order_items")
    .delete()
    .eq("tenant_id", tenantId)
    .in("order_bling_id", orderIds);
  if (delErr) throw new Error(delErr.message);

  const allRows: Array<Record<string, unknown>> = [];
  for (const oid of orderIds) {
    let detail: { data?: Record<string, unknown> };
    try {
      detail = await blingFetch<{ data?: Record<string, unknown> }>(
        tenantId, `/pedidos/vendas/${oid}`,
      );
    } catch (e) {
      // Erro pontual num pedido não derruba o batch — segue.
      console.warn(`[bling-sync] tenant=${tenantId} resource=orders item-detail-fail order=${oid} err=${errMessage(e)}`);
      continue;
    }
    const itens = (detail?.data?.itens as Array<Record<string, unknown>>) ?? [];
    for (const it of itens) {
      const prod = (it.produto as Record<string, unknown>) ?? {};
      const quantidade = Number(it.quantidade) || 0;
      const preco = Number(it.valor) || 0;
      allRows.push({
        tenant_id: tenantId,
        order_bling_id: oid,
        bling_item_id: it.id ? Number(it.id) : null,
        produto_id: prod.id ? Number(prod.id) : null,
        codigo: (it.codigo as string) ?? (prod.codigo as string) ?? null,
        descricao: (it.descricao as string) ?? null,
        quantidade,
        preco,
        valor_total: quantidade * preco,
        raw: it,
        synced_at: new Date().toISOString(),
      });
    }
  }
  if (allRows.length > 0) {
    const { error: insErr } = await supabaseAdmin
      .from("bling_order_items")
      .insert(allRows as never);
    if (insErr) throw new Error(insErr.message);
  }
}

// ===================== CONTATOS =====================
export async function syncContacts(
  tenantId: string,
  mode: "full" | "incremental" = "full",
  opts?: { resumeRunId?: string },
): Promise<BatchResult> {
  return runPaginatedBatch({
    tenantId,
    resource: "contacts",
    mode,
    resumeRunId: opts?.resumeRunId,
    path: "/contatos",
    upsert: async (list) => {
      const rows = list.map(mapContact(tenantId));
      const { error } = await supabaseAdmin
        .from("bling_contacts")
        .upsert(rows as never, { onConflict: "tenant_id,bling_id" });
      if (error) throw new Error(error.message);
      return rows.length;
    },
  });
}

function mapContact(tenantId: string) {
  return (c: Record<string, unknown>) => {
    const end = (c.endereco as Record<string, unknown>) ?? null;
    const geral = (end?.geral as Record<string, unknown>) ?? end ?? {};
    return {
      tenant_id: tenantId,
      bling_id: Number(c.id),
      nome: (c.nome as string) ?? null,
      numero_documento: (c.numeroDocumento as string) ?? null,
      tipo: (c.tipo as string) ?? null,
      email: (c.email as string) ?? null,
      telefone: (c.telefone as string) ?? (c.celular as string) ?? null,
      cidade: (geral?.municipio as string) ?? null,
      uf: (geral?.uf as string) ?? null,
      cep: (geral?.cep as string) ?? null,
      situacao: (c.situacao as string) ?? null,
      raw: c,
      bling_updated_at: (c.dataAlteracao as string) ?? null,
      synced_at: new Date().toISOString(),
    };
  };
}

// ===================== Helper genérico de batching paginado =====================
async function getLastOkFinishedAt(tenantId: string, resource: Resource) {
  const { data } = await supabaseAdmin
    .from("bling_sync_runs")
    .select("finished_at")
    .eq("tenant_id", tenantId).eq("resource", resource).eq("status", "ok")
    .order("finished_at", { ascending: false }).limit(1).maybeSingle();
  return data?.finished_at ?? null;
}
function toBlingDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth()+1)}-${pad(d.getUTCDate())} ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}

async function runPaginatedBatch(args: {
  tenantId: string;
  resource: Resource;
  mode: "full" | "incremental";
  resumeRunId?: string;
  path: string;
  pagesPerBatch?: number;
  pageLimit?: number;
  upsert: (list: Array<Record<string, unknown>>) => Promise<number>;
}): Promise<BatchResult> {
  const { tenantId, resource, mode, path, upsert } = args;
  const pagesPerBatch = args.pagesPerBatch ?? PAGES_PER_BATCH;
  const pageLimit = args.pageLimit ?? 100;
  let runId: string;
  let pagina: number;
  let count = 0;
  let dataAlteracaoInicial: string | undefined;

  if (args.resumeRunId) {
    const { data } = await supabaseAdmin
      .from("bling_sync_runs")
      .select("id, next_page, items_processed, meta, mode")
      .eq("id", args.resumeRunId).maybeSingle();
    if (!data) throw new Error("Run para retomar não encontrada");
    runId = data.id;
    pagina = data.next_page ?? 1;
    count = data.items_processed ?? 0;
    const m = (data.meta as { dataAlteracaoInicial?: string } | null) ?? null;
    dataAlteracaoInicial = m?.dataAlteracaoInicial;
  } else {
    if (mode === "incremental") {
      const last = await getLastOkFinishedAt(tenantId, resource);
      if (last) dataAlteracaoInicial = toBlingDate(last);
    }
    runId = await startRun(tenantId, resource, mode, { mode, dataAlteracaoInicial });
    pagina = 1;
  }

  try {
    for (let i = 0; i < pagesPerBatch; i++) {
      const resp = await blingFetch<{ data: Array<Record<string, unknown>> }>(
        tenantId, path,
        { searchParams: { pagina, limite: pageLimit, dataAlteracaoInicial } },
      );
      const list = resp?.data ?? [];
      if (list.length === 0) {
        await endRun(runId, true, count, undefined, { mode, dataAlteracaoInicial });
        console.log(`[bling-sync] tenant=${tenantId} resource=${resource} page=${pagina} done=true total=${count}`);
        return { ok: true, count, done: true, nextPage: null, runId };
      }
      const n = await upsert(list);
      count += n;
      await heartbeat(runId, pagina, count);
      console.log(`[bling-sync] tenant=${tenantId} resource=${resource} page=${pagina} upserted=${n} total=${count}`);
      if (list.length < pageLimit) {
        await endRun(runId, true, count, undefined, { mode, dataAlteracaoInicial });
        return { ok: true, count, done: true, nextPage: null, runId };
      }
      pagina++;
    }
    // Atingiu o limite do batch — pausa para o próximo tick retomar.
    await pauseRun(runId, pagina, count);
    return { ok: true, count, done: false, nextPage: pagina, runId };
  } catch (e) {
    const msg = errMessage(e);
    console.error(`[bling-sync] tenant=${tenantId} resource=${resource} page=${pagina} ERROR: ${msg}`);
    await endRun(runId, false, count, msg, { mode, dataAlteracaoInicial });
    throw e;
  }
}


function mapOrder(tenantId: string) {
  return (o: Record<string, unknown>) => {
    const sit = (o.situacao as Record<string, unknown>) ?? null;
    const contato = (o.contato as Record<string, unknown>) ?? null;
    const loja = (o.loja as Record<string, unknown>) ?? null;
    const sitId = sit && sit.id ? Number(sit.id) : null;
    return {
      tenant_id: tenantId,
      bling_id: Number(o.id),
      numero: o.numero ? String(o.numero) : null,
      data: (o.data as string) ?? null,
      data_saida: (o.dataSaida as string) ?? null,
      valor_total: typeof o.total === "number" ? o.total : Number(o.total) || 0,
      situacao_id: sitId,
      situacao_valor: sit && sit.valor != null ? Number(sit.valor) : null,
      situacao_nome: sitId != null ? SITUACAO_NOMES[sitId] ?? null : null,
      cliente_id: contato && contato.id ? Number(contato.id) : null,
      cliente_nome: (contato?.nome as string) ?? null,
      cliente_documento: (contato?.numeroDocumento as string) ?? null,
      loja_id: loja && loja.id ? Number(loja.id) : null,
      numero_loja: (o.numeroLoja as string) ?? null,
      raw: o,
      bling_updated_at: (o.dataAlteracao as string) ?? null,
      synced_at: new Date().toISOString(),
    };
  };
}

function errMessage(e: unknown) {
  if (e instanceof BlingError) return `${e.message} :: ${JSON.stringify(e.body).slice(0, 500)}`;
  return e instanceof Error ? e.message : String(e);
}
