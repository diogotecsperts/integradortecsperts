import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import * as React from "react";
import { getDashboardMetrics } from "@/lib/dashboard.functions";
import { listTenantsForSelector } from "@/lib/admin.functions";
import { TrendingUp, ShoppingCart, DollarSign, Users, ArrowUpRight, AlertCircle } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

const STORAGE_KEY = "tecsperts.activeTenantId";

function Dashboard() {
  const fetchMetrics = useServerFn(getDashboardMetrics);
  const fetchTenants = useServerFn(listTenantsForSelector);

  const tenantsQ = useQuery({
    queryKey: ["tenants-selector"],
    queryFn: () => fetchTenants(),
  });

  const [tenantId, setTenantId] = React.useState<string | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    return localStorage.getItem(STORAGE_KEY) ?? undefined;
  });

  // Default automático: se superadmin sem seleção, escolhe o 1º tenant.
  React.useEffect(() => {
    if (!tenantsQ.data) return;
    const list = tenantsQ.data.tenants;
    if (!list.length) return;
    if (!tenantId || !list.find((t) => t.id === tenantId)) {
      const next = list[0].id;
      setTenantId(next);
      try { localStorage.setItem(STORAGE_KEY, next); } catch { /* noop */ }
    }
  }, [tenantsQ.data, tenantId]);

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-metrics", tenantId],
    queryFn: () => fetchMetrics({ data: { tenantId } }),
    enabled: !!tenantId,
  });

  const totals = data?.totals ?? { sales: 0, orders: 0, avgTicket: 0, customers: 0 };
  const monthly = data?.monthly ?? [];
  const bySituation = data?.bySituation ?? [];
  const isSuperadmin = tenantsQ.data?.isSuperadmin ?? false;
  const tenants = tenantsQ.data?.tenants ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Visão Geral</h1>
          <p className="mt-1 text-sm text-muted-foreground">Performance dos últimos 6 meses (dados reais do Bling).</p>
        </div>
        {isSuperadmin && tenants.length > 0 && (
          <label className="glass flex items-center gap-2 rounded-xl px-3 py-2 text-sm">
            <span className="text-muted-foreground">Cliente:</span>
            <select
              className="bg-transparent text-foreground outline-none"
              value={tenantId ?? ""}
              onChange={(e) => {
                setTenantId(e.target.value);
                try { localStorage.setItem(STORAGE_KEY, e.target.value); } catch { /* noop */ }
              }}
            >
              {tenants.map((t) => (
                <option key={t.id} value={t.id} className="bg-background">{t.name}</option>
              ))}
            </select>
          </label>
        )}
      </div>

      {!isLoading && data && !data.hasData && (
        <div className="glass flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-sm text-amber-200">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span>Nenhum pedido sincronizado ainda. Rode o <strong>Sync Pedidos</strong> no painel administrativo.</span>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiCard title="Vendas" value={brl(totals.sales)} icon={DollarSign} />
        <KpiCard title="Pedidos" value={totals.orders.toLocaleString("pt-BR")} icon={ShoppingCart} />
        <KpiCard title="Ticket médio" value={brl(totals.avgTicket)} icon={TrendingUp} />
        <KpiCard title="Clientes únicos" value={totals.customers.toLocaleString("pt-BR")} icon={Users} />
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
          <h3 className="font-semibold">Por situação</h3>
          <p className="text-xs text-muted-foreground">Vendas no período</p>
          <div className="mt-4 h-72 w-full">
            {!isLoading && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bySituation} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                  <XAxis type="number" stroke="oklch(0.68 0.025 270)" fontSize={11} tickFormatter={(v) => `${(v/1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="situacao" stroke="oklch(0.68 0.025 270)" fontSize={11} width={90} />
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

function KpiCard({ title, value, icon: Icon }: { title: string; value: string; icon: React.ElementType }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{title}</span>
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
      <div className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
        <ArrowUpRight className="h-3 w-3" /> últimos 180 dias
      </div>
    </div>
  );
}

function brl(n: number) {
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}
