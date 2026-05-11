import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { resolveActiveTenantId } from "@/lib/tenant-resolve.server";

type OrderRow = {
  data: string | null;
  valor_total: number;
  cliente_id: number | null;
  situacao_nome: string | null;
  situacao_id: number | null;
};

export const getDashboardMetrics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ tenantId: z.string().uuid().optional() }).parse(d ?? {}))
  .handler(async ({ data, context }) => {
    const tenantId = await resolveActiveTenantId(context.userId, data?.tenantId);
    if (!tenantId) return null;

    const since = new Date();
    since.setDate(since.getDate() - 180);
    const sinceIso = since.toISOString().slice(0, 10);

    const { data: orders, error } = await supabaseAdmin
      .from("bling_orders")
      .select("data, valor_total, cliente_id, situacao_nome, situacao_id")
      .eq("tenant_id", tenantId)
      .gte("data", sinceIso)
      .order("data", { ascending: true })
      .limit(10000);
    if (error) throw new Error(error.message);

    const rows = (orders ?? []) as OrderRow[];
    const totalSales = rows.reduce((s, r) => s + Number(r.valor_total || 0), 0);
    const totalOrders = rows.length;
    const avgTicket = totalOrders ? totalSales / totalOrders : 0;
    const customers = new Set(rows.map((r) => r.cliente_id).filter(Boolean)).size;

    const monthMap = new Map<string, { month: string; sales: number; orders: number }>();
    for (const r of rows) {
      if (!r.data) continue;
      const m = r.data.slice(0, 7);
      const prev = monthMap.get(m) ?? { month: m, sales: 0, orders: 0 };
      prev.sales += Number(r.valor_total || 0);
      prev.orders += 1;
      monthMap.set(m, prev);
    }
    const monthly = [...monthMap.values()].sort((a, b) => a.month.localeCompare(b.month));

    const sitMap = new Map<string, number>();
    for (const r of rows) {
      const key = r.situacao_nome ?? (r.situacao_id != null ? `Situação ${r.situacao_id}` : "—");
      sitMap.set(key, (sitMap.get(key) ?? 0) + Number(r.valor_total || 0));
    }
    const bySituation = [...sitMap.entries()].map(([situacao, sales]) => ({ situacao, sales }))
      .sort((a, b) => b.sales - a.sales);

    return {
      totals: { sales: totalSales, orders: totalOrders, avgTicket, customers },
      monthly,
      bySituation,
      hasData: totalOrders > 0,
    };
  });
