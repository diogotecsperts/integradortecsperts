import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Plug, RefreshCw, Unplug, Boxes, Warehouse, BarChart3, Loader2, ExternalLink, AlertTriangle, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { createBlingAuthLink, disconnectBling, getBlingStatus } from "@/lib/bling.functions";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/integracao-bling")({
  component: IntegracaoBlingPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="glass mx-auto mt-10 max-w-lg rounded-2xl p-6 text-sm">
        <div className="flex items-center gap-2 font-semibold text-destructive">
          <AlertTriangle className="h-4 w-4" /> Erro ao carregar Integração Bling
        </div>
        <p className="mt-2 text-muted-foreground">{error?.message ?? "Falha desconhecida"}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs hover:bg-secondary"
        >
          <RefreshCw className="h-3.5 w-3.5" /> Tentar novamente
        </button>
      </div>
    );
  },
});

function IntegracaoBlingPage() {
  const { role } = useAuth();

  if (role === "superadmin") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integração Bling</h1>
          <p className="mt-1 text-sm text-muted-foreground">Esta página é destinada ao cliente final conectar sua conta Bling.</p>
        </div>
        <div className="glass flex items-start gap-3 rounded-2xl p-6">
          <ShieldCheck className="mt-0.5 h-5 w-5 text-primary" />
          <div className="space-y-2">
            <div className="font-semibold">Você está logado como Superadmin</div>
            <p className="text-sm text-muted-foreground">
              Superadmins gerenciam as conexões Bling de cada tenant pelo painel administrativo, onde também é possível disparar sincronizações e visualizar logs.
            </p>
            <Link
              to="/admin/clients"
              className="mt-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              Ir para Clientes <ExternalLink className="h-3.5 w-3.5 opacity-80" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <ClientView />;
}

function ClientView() {
  const status = useServerFn(getBlingStatus);
  const link = useServerFn(createBlingAuthLink);
  const disc = useServerFn(disconnectBling);
  const qc = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["bling", "status", "self"],
    queryFn: () => status({}),
    refetchInterval: 15000,
  });

  const mLink = useMutation({
    mutationFn: () => link({}),
    onSuccess: (r) => { window.open(r.url, "_blank", "noopener,noreferrer,width=720,height=820"); toast.success("Janela de autorização aberta"); },
    onError: async (e) => toast.error(e instanceof Response ? await e.text() : (e as Error).message),
  });
  const mDisc = useMutation({
    mutationFn: () => disc({}),
    onSuccess: () => { toast.success("Bling desconectado"); qc.invalidateQueries({ queryKey: ["bling"] }); },
    onError: async (e) => toast.error(e instanceof Response ? await e.text() : (e as Error).message),
  });

  if (isLoading) return <div className="grid h-64 place-items-center"><Loader2 className="h-6 w-6 animate-spin" /></div>;

  if (error) {
    return (
      <div className="glass mx-auto mt-10 max-w-lg rounded-2xl p-6 text-sm">
        <div className="flex items-center gap-2 font-semibold text-destructive">
          <AlertTriangle className="h-4 w-4" /> Não foi possível carregar o status do Bling
        </div>
        <p className="mt-2 text-muted-foreground">{(error as Error).message}</p>
        <button onClick={() => refetch()} className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs hover:bg-secondary">
          <RefreshCw className="h-3.5 w-3.5" /> Tentar novamente
        </button>
      </div>
    );
  }

  if (!data) return null;

  if ("noTenant" in data && data.noTenant) {
    return (
      <div className="glass mx-auto mt-10 max-w-lg rounded-2xl p-6 text-sm">
        <div className="flex items-center gap-2 font-semibold text-amber-300">
          <AlertTriangle className="h-4 w-4" /> Sua conta ainda não está vinculada a uma empresa
        </div>
        <p className="mt-2 text-muted-foreground">Solicite ao administrador para associar seu usuário a um tenant antes de conectar o Bling.</p>
      </div>
    );
  }

  const products = data.counts?.products ?? 0;
  const deposits = data.counts?.deposits ?? 0;
  const stocks = data.counts?.stocks ?? 0;
  const lastRuns = data.lastRuns ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Integração Bling</h1>
        <p className="mt-1 text-sm text-muted-foreground">Conecte sua conta Bling para espelharmos o catálogo e os saldos de estoque.</p>
      </div>

      {!data.hasAppCreds && (
        <div className="glass flex items-start gap-3 rounded-2xl border border-amber-500/30 p-4 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-400" />
          <div>
            <div className="font-medium">Configuração pendente</div>
            <div className="text-muted-foreground">As credenciais do app Bling (Client ID/Secret) ainda não foram cadastradas para sua empresa. Solicite ao administrador.</div>
          </div>
        </div>
      )}

      <div className="glass rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Status</div>
            {data.connected ? (
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399]" />
                <span className="font-semibold">Conectado</span>
                <span className="text-xs text-muted-foreground">— expira em {data.expiresAt ? new Date(data.expiresAt).toLocaleString("pt-BR") : "—"}</span>
              </div>
            ) : (
              <div className="mt-1 flex items-center gap-2">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-zinc-500" />
                <span className="font-semibold">Desconectado</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => refetch()}
              className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs hover:bg-secondary"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Atualizar
            </button>
            {data.connected ? (
              <button
                disabled={mDisc.isPending}
                onClick={() => mDisc.mutate()}
                className="inline-flex items-center gap-1.5 rounded-md border border-destructive/40 px-3 py-2 text-xs text-destructive hover:bg-destructive/10 disabled:opacity-50"
              >
                <Unplug className="h-3.5 w-3.5" /> Desconectar
              </button>
            ) : (
              <button
                disabled={mLink.isPending || !data.hasAppCreds}
                onClick={() => mLink.mutate()}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Plug className="h-4 w-4" /> Conectar ao Bling <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Stat icon={Boxes} label="Produtos espelhados" value={products} />
        <Stat icon={Warehouse} label="Depósitos" value={deposits} />
        <Stat icon={BarChart3} label="Saldos de estoque" value={stocks} />
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="text-lg font-semibold">Últimas sincronizações</h2>
        <p className="mt-1 text-xs text-muted-foreground">As sincronizações são disparadas pelo administrador.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="py-2">Recurso</th><th>Status</th><th>Iniciado</th><th>Itens</th><th>Erro</th></tr>
            </thead>
            <tbody>
              {lastRuns.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-muted-foreground">Nenhuma sincronização ainda.</td></tr>
              )}
              {lastRuns.map((r) => (
                <tr key={r.id} className="border-t border-border/60">
                  <td className="py-2 font-medium">{r.resource}</td>
                  <td><RunStatus status={r.status} /></td>
                  <td className="text-xs text-muted-foreground">{new Date(r.started_at).toLocaleString("pt-BR")}</td>
                  <td>{r.items_processed}</td>
                  <td className="max-w-[24rem] truncate text-xs text-muted-foreground" title={r.error_message ?? ""}>{r.error_message ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: number }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
        <Icon className="h-3.5 w-3.5" /> {label}
      </div>
      <div className="mt-2 text-3xl font-bold tabular-nums">{value.toLocaleString("pt-BR")}</div>
    </div>
  );
}

function RunStatus({ status }: { status: string }) {
  const map: Record<string, string> = {
    ok: "border-emerald-500/30 text-emerald-300 bg-emerald-500/10",
    error: "border-destructive/40 text-destructive bg-destructive/10",
    running: "border-primary/40 text-primary bg-primary/10",
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase ${map[status] ?? ""}`}>
      {status}
    </span>
  );
}
