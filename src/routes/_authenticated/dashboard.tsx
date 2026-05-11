import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { TrendingUp, ShoppingCart, DollarSign, Users, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { tenantId } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["bi", tenantId],
    enabled: !!tenantId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bi_metrics_mock")
        .select("*")
        .order("date", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const rows = data ?? [];
  const totals = rows.reduce(
    (a, r) => ({
      sales: a.sales + Number(r.sales),
      orders: a.orders + r.orders,
      customers: a.customers + r.customers,
    }),
    { sales: 0, orders: 0, customers: 0 },
  );
  const avgTicket = totals.orders ? totals.sales / totals.orders : 0;

  // Aggregate per month
  const byMonth = new Map<string, { month: string; sales: number; orders: number }>();
  for (const r of rows) {
    const m = r.date.slice(0, 7);
    const prev = byMonth.get(m) ?? { month: m, sales: 0, orders: 0 };
    prev.sales += Number(r.sales); prev.orders += r.orders;
    byMonth.set(m, prev);
  }
  const monthly = [...byMonth.values()];

  const byCat = new Map<string, number>();
  for (const r of rows) {
    if (!r.category) continue;
    byCat.set(r.category, (byCat.get(r.category) ?? 0) + Number(r.sales));
  }
  const cats = [...byCat.entries()].map(([category, sales]) => ({ category, sales }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Visão Geral</h1>
        <p className="mt-1 text-sm text-muted-foreground">Performance dos últimos 6 meses (dados de demonstração).</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Vendas" value={brl(totals.sales)} icon={DollarSign} trend="+12,4%" />
        <KpiCard title="Pedidos" value={totals.orders.toLocaleString("pt-BR")} icon={ShoppingCart} trend="+8,1%" />
        <KpiCard title="Ticket médio" value={brl(avgTicket)} icon={TrendingUp} trend="+3,9%" />
        <KpiCard title="Clientes" value={totals.customers.toLocaleString("pt-BR")} icon={Users} trend="+5,2%" />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass col-span-2 rounded-2xl p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Evolução mensal</h3>
              <p className="text-xs text-muted-foreground">Vendas agregadas por mês</p>
            </div>
          </div>
          <div className="h-72 w-full">
            {!isLoading && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthly}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.72 0.21 295)" stopOpacity={0.5} />
                      <stop offset="95%" stopColor="oklch(0.72 0.21 295)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                  <XAxis dataKey="month" stroke="oklch(0.68 0.025 270)" fontSize={12} />
                  <YAxis stroke="oklch(0.68 0.025 270)" fontSize={12} tickFormatter={(v) => `R$${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                  <Area type="monotone" dataKey="sales" stroke="oklch(0.72 0.21 295)" fill="url(#g1)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="font-semibold">Por categoria</h3>
          <p className="text-xs text-muted-foreground">Vendas no período</p>
          <div className="mt-4 h-72 w-full">
            {!isLoading && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cats} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                  <XAxis type="number" stroke="oklch(0.68 0.025 270)" fontSize={11} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="category" stroke="oklch(0.68 0.025 270)" fontSize={11} width={70} />
                  <Tooltip contentStyle={{ background: "oklch(0.18 0.025 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 8 }} />
                  <Bar dataKey="sales" fill="oklch(0.78 0.18 200)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, icon: Icon, trend }: { title: string; value: string; icon: React.ElementType; trend: string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{title}</span>
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      <div className="mt-1 inline-flex items-center gap-1 text-xs text-success">
        <ArrowUpRight className="h-3 w-3" /> {trend}
      </div>
    </div>
  );
}

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}
