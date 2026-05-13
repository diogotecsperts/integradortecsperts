import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  createTenant, createTenantUser, listTenantsAdmin, setTenantStatus, setUserBlocked,
  getTenantSettings, upsertTenantSettings, getGlobalSettings,
} from "@/lib/admin.functions";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import * as React from "react";
import { Plus, Lock, Unlock, UserPlus, Loader2, Settings as SettingsIcon, Eye, EyeOff, RefreshCw, Plug, Unplug, Copy, ExternalLink, X } from "lucide-react";
import { toast } from "sonner";
import { StatusBadge } from "./admin.index";
import { runBlingSync, getBlingStatus, createBlingAuthLink, disconnectBling, setupBlingCron } from "@/lib/bling.functions";
import { classifyError, KIND_BADGE } from "@/lib/bling/error-classify";

export const Route = createFileRoute("/_authenticated/_admin/admin/clients")({
  component: ClientsPage,
});

function ClientsPage() {
  const list = useServerFn(listTenantsAdmin);
  const create = useServerFn(createTenant);
  const createUser = useServerFn(createTenantUser);
  const setStatus = useServerFn(setTenantStatus);
  const setBlocked = useServerFn(setUserBlocked);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ["admin", "tenants"], queryFn: () => list() });
  const tenants = data?.tenants ?? [];
  const profiles = data?.profiles ?? [];

  const [openTenant, setOpenTenant] = React.useState(false);
  const [openUser, setOpenUser] = React.useState<string | null>(null);
  const [openSettings, setOpenSettings] = React.useState<{ id: string; name: string } | null>(null);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin", "tenants"] });
    qc.invalidateQueries({ queryKey: ["admin", "overview"] });
  };

  const errMsg = async (e: unknown) => {
    if (e instanceof Response) {
      try { return (await e.text()) || `Erro ${e.status}`; } catch { return `Erro ${e.status}`; }
    }
    return (e as Error)?.message ?? "Erro desconhecido";
  };

  const mTenant = useMutation({
    mutationFn: (v: { name: string; slug: string }) => create({ data: v }),
    onSuccess: () => { toast.success("Tenant criado"); setOpenTenant(false); refresh(); },
    onError: async (e) => toast.error(await errMsg(e)),
  });

  const mUser = useMutation({
    mutationFn: (v: { email: string; password: string; tenantId: string; fullName?: string }) =>
      createUser({ data: v }),
    onSuccess: () => { toast.success("Usuário criado"); setOpenUser(null); refresh(); },
    onError: async (e) => toast.error(await errMsg(e)),
  });

  const mStatus = useMutation({
    mutationFn: (v: { tenantId: string; status: "active" | "suspended" | "blocked" }) =>
      setStatus({ data: v }),
    onSuccess: () => { toast.success("Status atualizado"); refresh(); },
    onError: async (e) => toast.error(await errMsg(e)),
  });

  const mBlock = useMutation({
    mutationFn: (v: { userId: string; blocked: boolean }) => setBlocked({ data: v }),
    onSuccess: () => { toast.success("Usuário atualizado"); refresh(); },
    onError: async (e) => toast.error(await errMsg(e)),
  });

  const cron = useServerFn(setupBlingCron);
  const mCron = useMutation({
    mutationFn: () => cron(),
    onSuccess: (r) => toast.success(`Agendamento OK: ${r.schedule} → ${r.url}`),
    onError: async (e) => toast.error(await errMsg(e)),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerencie tenants e seus usuários.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => mCron.mutate()}
            disabled={mCron.isPending}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:bg-secondary disabled:opacity-50"
            title="Agenda (ou re-agenda) o cron do Bling para rodar a cada 5 minutos."
          >
            {mCron.isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5" />}
            Configurar Agendamento Automático
          </button>
          <button
            onClick={() => setOpenTenant(true)}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Plus className="h-4 w-4" /> Novo Tenant
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="glass grid h-40 place-items-center rounded-2xl">
          <Loader2 className="h-5 w-5 animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {tenants.map((t) => {
            const users = profiles.filter((p) => p.tenant_id === t.id);
            return (
              <div key={t.id} className="glass rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold">{t.name}</h3>
                      <StatusBadge status={t.status} />
                    </div>
                    <div className="text-xs text-muted-foreground">/{t.slug} • {users.length} usuário(s)</div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setOpenSettings({ id: t.id, name: t.name })}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-secondary"
                    >
                      <SettingsIcon className="h-3.5 w-3.5" /> Configurações
                    </button>
                    <button
                      onClick={() => setOpenUser(t.id)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs hover:bg-secondary"
                    >
                      <UserPlus className="h-3.5 w-3.5" /> Adicionar usuário
                    </button>
                    <select
                      value={t.status}
                      onChange={(e) => mStatus.mutate({ tenantId: t.id, status: e.target.value as "active" | "suspended" | "blocked" })}
                      className="rounded-md border border-border bg-background/50 px-2 py-1.5 text-xs"
                    >
                      <option value="active">Ativo</option>
                      <option value="suspended">Suspender</option>
                      <option value="blocked">Bloquear</option>
                    </select>
                  </div>
                </div>

                {users.length > 0 && (
                  <div className="mt-4 divide-y divide-border rounded-lg border border-border">
                    {users.map((u) => (
                      <div key={u.id} className="flex items-center justify-between p-3 text-sm">
                        <div className="min-w-0">
                          <div className="truncate font-medium">{u.full_name ?? u.email}</div>
                          <div className="truncate text-xs text-muted-foreground">{u.email}</div>
                        </div>
                        <button
                          onClick={() => mBlock.mutate({ userId: u.id, blocked: !u.is_blocked })}
                          className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-1 text-xs ${
                            u.is_blocked ? "border-destructive/40 text-destructive" : "border-border hover:bg-secondary"
                          }`}
                        >
                          {u.is_blocked ? <Lock className="h-3 w-3" /> : <Unlock className="h-3 w-3" />}
                          {u.is_blocked ? "Desbloquear" : "Bloquear"}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {openTenant && (
        <Modal title="Novo Tenant" onClose={() => setOpenTenant(false)}>
          <TenantForm onSubmit={(v) => mTenant.mutate(v)} loading={mTenant.isPending} />
        </Modal>
      )}
      {openUser && (
        <Modal title="Novo usuário" onClose={() => setOpenUser(null)}>
          <UserForm
            onSubmit={(v) => mUser.mutate({ ...v, tenantId: openUser })}
            loading={mUser.isPending}
          />
        </Modal>
      )}
      {openSettings && (
        <Modal title={`Configurações — ${openSettings.name}`} onClose={() => setOpenSettings(null)}>
          <TenantSettingsForm tenantId={openSettings.id} onDone={() => setOpenSettings(null)} />
        </Modal>
      )}
    </div>
  );
}

function Modal({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center px-4 py-6">
      <div className="absolute inset-0 bg-background/70 backdrop-blur" onClick={onClose} />
      <div className="glass relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border/60 bg-background/60 px-6 py-4 backdrop-blur">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="grid h-8 w-8 place-items-center rounded-md border border-border text-muted-foreground transition hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

function TenantForm({ onSubmit, loading }: { onSubmit: (v: { name: string; slug: string }) => void; loading: boolean }) {
  const [name, setName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ name, slug }); }} className="space-y-3">
      <Input label="Nome da empresa" value={name} onChange={(v) => { setName(v); setSlug(v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")); }} />
      <Input label="Slug" value={slug} onChange={setSlug} />
      <button disabled={loading || !name || !slug} className="w-full rounded-lg py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50" style={{ background: "var(--gradient-primary)" }}>
        {loading ? "Criando..." : "Criar tenant"}
      </button>
    </form>
  );
}

function UserForm({ onSubmit, loading }: { onSubmit: (v: { email: string; password: string; fullName?: string }) => void; loading: boolean }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({ email, password, fullName }); }} className="space-y-3">
      <Input label="Nome" value={fullName} onChange={setFullName} />
      <Input label="E-mail" type="email" value={email} onChange={setEmail} />
      <Input label="Senha (8+)" type="password" value={password} onChange={setPassword} />
      <button disabled={loading || password.length < 8 || !email} className="w-full rounded-lg py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50" style={{ background: "var(--gradient-primary)" }}>
        {loading ? "Criando..." : "Criar usuário"}
      </button>
    </form>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm outline-none ring-ring/30 focus:ring-2"
      />
    </div>
  );
}

function TenantSettingsForm({ tenantId, onDone }: { tenantId: string; onDone: () => void }) {
  const get = useServerFn(getTenantSettings);
  const upsert = useServerFn(upsertTenantSettings);
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "tenant-settings", tenantId],
    queryFn: () => get({ data: { tenantId } }),
  });
  const [form, setForm] = React.useState({
    bling_client_id: "", bling_client_secret: "", resend_api_key: "", minimax_api_key: "",
    agent_system_prompt: "",
  });
  React.useEffect(() => {
    if (data) setForm({
      bling_client_id: data.bling_client_id ?? "",
      bling_client_secret: data.bling_client_secret ?? "",
      resend_api_key: data.resend_api_key ?? "",
      minimax_api_key: data.minimax_api_key ?? "",
      agent_system_prompt: data.agent_system_prompt ?? "",
    });
  }, [data]);
  const m = useMutation({
    mutationFn: (v: typeof form) => upsert({ data: { tenantId, ...v } }),
    onSuccess: () => { toast.success("Configurações salvas"); onDone(); },
    onError: async (e) => toast.error(e instanceof Response ? (await e.text()) : (e as Error).message),
  });

  if (isLoading) return <div className="grid h-32 place-items-center"><Loader2 className="h-5 w-5 animate-spin" /></div>;

  return (
    <form onSubmit={(e) => { e.preventDefault(); m.mutate(form); }} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-border/60 p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Bling ERP</div>
          <Input label="Client ID" value={form.bling_client_id} onChange={(v) => setForm({ ...form, bling_client_id: v })} />
          <SecretInput label="Client Secret" value={form.bling_client_secret} onChange={(v) => setForm({ ...form, bling_client_secret: v })} />
        </div>
        <div className="space-y-3 rounded-xl border border-border/60 p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Resend</div>
          <SecretInput label="API Key" value={form.resend_api_key} onChange={(v) => setForm({ ...form, resend_api_key: v })} />
        </div>
        <div className="space-y-3 rounded-xl border border-border/60 p-4 md:col-span-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Minimax (Agente IA)</div>
          <SecretInput label="API Key" value={form.minimax_api_key} onChange={(v) => setForm({ ...form, minimax_api_key: v })} />
        </div>
      </div>
      <AgentPromptField
        value={form.agent_system_prompt}
        onChange={(v) => setForm({ ...form, agent_system_prompt: v })}
      />
      <button disabled={m.isPending} className="w-full rounded-lg py-2.5 text-sm font-medium text-primary-foreground disabled:opacity-50" style={{ background: "var(--gradient-primary)" }}>
        {m.isPending ? "Salvando..." : "Salvar configurações"}
      </button>
      <BlingAdminPanel tenantId={tenantId} />
    </form>
  );
}

function AgentPromptField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const loadGlobal = useServerFn(getGlobalSettings);
  const [loading, setLoading] = React.useState(false);

  const handleLoadGlobal = async () => {
    try {
      setLoading(true);
      const res = await loadGlobal();
      onChange(res.default_agent_persona ?? "");
      toast.success("Persona Global carregada no campo. Edite e clique em Salvar.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Falha ao carregar Persona Global");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider delayDuration={150}>
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Configurações da IA — Persona / Instruções de Negócio</div>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={handleLoadGlobal}
                  disabled={loading}
                  className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[10px] hover:bg-secondary disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : null}
                  Carregar Global
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                Copia a Persona Global atual (definida em Configurações do Sistema) para este campo, permitindo editar a partir dela. Não salva automaticamente — clique em "Salvar configurações" depois.
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="rounded-md border border-border px-2 py-1 text-[10px] hover:bg-secondary"
                >
                  Limpar (usar Global)
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                Esvazia o campo. Com o campo vazio, este cliente passa a herdar automaticamente a Persona Global. Lembre-se de salvar.
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={10}
          placeholder="Vazio = usa a Persona Global definida nas Configurações do Sistema. Escreva aqui a persona, tom e regras de negócio específicas deste cliente."
          className="w-full resize-y rounded-lg border border-border bg-background/50 px-3 py-2.5 font-mono text-xs leading-relaxed outline-none ring-ring/30 focus:ring-2"
        />
        <p className="text-[10px] leading-relaxed text-muted-foreground">
          Hierarquia: <strong>Cliente</strong> → <strong>Global</strong> (Configurações do Sistema) → <strong>Padrão fixo</strong>. Use <em>Carregar Global</em> para começar a partir da persona global, ou <em>Limpar</em> para herdar dela automaticamente. O contexto temporal e as regras de formatação são adicionados automaticamente.
        </p>
      </div>
    </TooltipProvider>
  );
}

const RES_LABEL: Record<string, string> = {
  contacts: "Contatos",
  orders: "Pedidos",
  products: "Produtos",
  stock: "Estoque",
  deposits: "Depósitos",
};

function BlingAdminPanel({ tenantId }: { tenantId: string }) {
  const status = useServerFn(getBlingStatus);
  const sync = useServerFn(runBlingSync);
  const link = useServerFn(createBlingAuthLink);
  const disc = useServerFn(disconnectBling);
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["admin", "bling-status", tenantId],
    queryFn: () => status({ data: { tenantId } }),
    refetchInterval: 10000,
  });
  const m = useMutation({
    mutationFn: (v: { resource: "deposits" | "products" | "stock" | "orders" | "contacts" | "all"; mode?: "full" | "incremental" }) =>
      sync({ data: { tenantId, resource: v.resource, mode: v.mode ?? "full", untilDone: (v.mode ?? "full") === "full", maxBatches: 12 } }),
    onSuccess: (res) => {
      const orders = (res as { orders?: { completed?: boolean; nextPage?: number | null } }).orders;
      if (orders && orders.completed === false) {
        toast.success(`Batch concluído — continua na página ${orders.nextPage}. O cron retomará automaticamente.`);
      } else {
        toast.success("Sync concluído");
      }
      qc.invalidateQueries({ queryKey: ["admin", "bling-status", tenantId] });
    },
    onError: async (e) => toast.error(e instanceof Response ? (await e.text()) : (e as Error).message),
  });
  const mLink = useMutation({
    mutationFn: () => link({ data: { tenantId } }),
    onSuccess: (r) => {
      window.open(r.url, "_blank", "noopener,noreferrer,width=720,height=820");
      toast.success("Janela de autorização aberta");
    },
    onError: async (e) => toast.error(e instanceof Response ? await e.text() : (e as Error).message),
  });
  const mCopy = useMutation({
    mutationFn: () => link({ data: { tenantId } }),
    onSuccess: async (r) => {
      try {
        await navigator.clipboard.writeText(r.url);
        toast.success("Link copiado — envie ao cliente");
      } catch {
        toast.message("Copie manualmente:", { description: r.url });
      }
    },
    onError: async (e) => toast.error(e instanceof Response ? await e.text() : (e as Error).message),
  });
  const mDisc = useMutation({
    mutationFn: () => disc({ data: { tenantId } }),
    onSuccess: () => { toast.success("Bling desconectado"); qc.invalidateQueries({ queryKey: ["admin", "bling-status", tenantId] }); },
    onError: async (e) => toast.error(e instanceof Response ? await e.text() : (e as Error).message),
  });
  const linkBusy = mLink.isPending || mCopy.isPending;
  return (
    <div className="space-y-3 rounded-xl border border-border/60 p-3">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Bling — Sync</div>
        <div className="text-[10px] text-muted-foreground">
          {data?.connected ? "Conectado" : "Desconectado"} • P:{data?.counts?.products ?? 0} D:{data?.counts?.deposits ?? 0} S:{data?.counts?.stocks ?? 0} O:{data?.counts?.orders ?? 0}
        </div>
      </div>

      {!data?.hasAppCreds && (
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 px-2 py-1.5 text-[11px] text-amber-300">
          Cadastre Client ID/Secret acima antes de autorizar.
        </div>
      )}

      {data?.connected ? (
        <div className="flex items-center justify-between gap-2 rounded-md border border-emerald-500/30 bg-emerald-500/5 px-2 py-1.5 text-[11px]">
          <span className="text-emerald-300">
            Conectado{data.expiresAt ? ` — expira em ${new Date(data.expiresAt).toLocaleString("pt-BR")}` : ""}
          </span>
          <button type="button" disabled={mDisc.isPending} onClick={() => mDisc.mutate()}
            className="inline-flex items-center gap-1 rounded-md border border-destructive/40 px-2 py-1 text-[11px] text-destructive hover:bg-destructive/10 disabled:opacity-50">
            <Unplug className="h-3 w-3" /> Desconectar
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          <button type="button" disabled={linkBusy || !data?.hasAppCreds}
            onClick={() => mLink.mutate()}
            className="inline-flex items-center justify-center gap-1.5 rounded-md px-2 py-2 text-xs font-medium text-primary-foreground disabled:opacity-50"
            style={{ background: "var(--gradient-primary)" }}>
            <Plug className="h-3.5 w-3.5" /> Autorizar Bling <ExternalLink className="h-3 w-3 opacity-70" />
          </button>
          <button type="button" disabled={linkBusy || !data?.hasAppCreds}
            onClick={() => mCopy.mutate()}
            className="inline-flex items-center justify-center gap-1.5 rounded-md border border-border px-2 py-2 text-xs hover:bg-secondary disabled:opacity-50">
            <Copy className="h-3.5 w-3.5" /> Copiar Link
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <SyncBtn label="Contatos" onClick={() => m.mutate({ resource: "contacts" })} loading={m.isPending} disabled={!data?.connected} />
        <SyncBtn label="Depósitos" onClick={() => m.mutate({ resource: "deposits" })} loading={m.isPending} disabled={!data?.connected} />
        <SyncBtn label="Produtos (full)" onClick={() => m.mutate({ resource: "products", mode: "full" })} loading={m.isPending} disabled={!data?.connected} />
        <SyncBtn label="Produtos (incr.)" onClick={() => m.mutate({ resource: "products", mode: "incremental" })} loading={m.isPending} disabled={!data?.connected} />
        <SyncBtn label="Estoque" onClick={() => m.mutate({ resource: "stock" })} loading={m.isPending} disabled={!data?.connected} />
        <SyncBtn label="Pedidos (full)" onClick={() => m.mutate({ resource: "orders", mode: "full" })} loading={m.isPending} disabled={!data?.connected} />
        <SyncBtn label="Pedidos (incr.)" onClick={() => m.mutate({ resource: "orders", mode: "incremental" })} loading={m.isPending} disabled={!data?.connected} />
      </div>
      <FullSyncBanner lastRuns={data?.lastRuns ?? []} />
      <button type="button" disabled={m.isPending || !data?.connected}
        onClick={() => {
          const ok = window.confirm(
            "Sync FULL pode levar vários minutos (ou horas) dependendo do volume.\n\n" +
            "• NÃO feche esta aba enquanto o botão estiver carregando.\n" +
            "• Se você fechar, o request é abortado e a run morre no meio.\n\n" +
            "Deseja continuar?"
          );
          if (ok) m.mutate({ resource: "all" });
        }}
        className="w-full rounded-md border border-primary/40 bg-primary/10 py-2 text-xs font-medium text-primary disabled:opacity-50">
        <RefreshCw className="mr-1 inline h-3 w-3" /> Sync FULL (tudo)
      </button>
      {data?.lastRuns && data.lastRuns.length > 0 && (
        <TooltipProvider delayDuration={150}>
          <div className="max-h-56 space-y-1 overflow-auto text-[11px]">
            {data.lastRuns.slice(0, 8).map((r) => (
              <div key={r.id} className="border-t border-border/40 pt-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{RES_LABEL[r.resource] ?? r.resource}</span>
                  {r.status === "error" && r.error_message ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="cursor-help text-destructive underline decoration-dotted">{r.status}</span>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-md whitespace-pre-wrap break-words bg-popover text-popover-foreground">
                        {r.error_message}
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <span className={r.status === "ok" ? "text-emerald-400" : r.status === "error" ? "text-destructive" : "text-primary"}>{r.status}</span>
                  )}
                  <span className="text-muted-foreground">{r.items_processed} itens</span>
                  <span className="text-muted-foreground">{new Date(r.started_at).toLocaleTimeString("pt-BR")}</span>
                </div>
                {r.status === "error" && r.error_message && (
                  <div className="mt-0.5 truncate text-[10px] text-destructive/80" title={r.error_message}>
                    {r.error_message}
                  </div>
                )}
              </div>
            ))}
          </div>
        </TooltipProvider>
      )}
    </div>
  );
}

function SyncBtn({ label, onClick, loading, disabled }: { label: string; onClick: () => void; loading: boolean; disabled?: boolean }) {
  return (
    <button type="button" disabled={loading || disabled} onClick={onClick}
      className="rounded-md border border-border px-2 py-1.5 text-xs hover:bg-secondary disabled:opacity-50">
      {label}
    </button>
  );
}

type RunRow = {
  id: string;
  resource: string;
  status: string;
  next_page: number | null;
  heartbeat_at: string | null;
  started_at: string;
};

function FullSyncBanner({ lastRuns }: { lastRuns: ReadonlyArray<RunRow> }) {
  const running = lastRuns.find((r) => r.status === "running" && r.next_page != null);
  const [, force] = React.useReducer((x: number) => x + 1, 0);
  React.useEffect(() => {
    if (!running) return;
    const t = setInterval(() => force(), 5000);
    return () => clearInterval(t);
  }, [running]);
  if (!running) return null;
  const ref = running.heartbeat_at ?? running.started_at;
  const ageSec = Math.max(0, Math.floor((Date.now() - new Date(ref).getTime()) / 1000));
  const stale = ageSec > 60;
  return (
    <div className={`rounded-md border px-2 py-1.5 text-[11px] ${stale ? "border-destructive/40 bg-destructive/5 text-destructive" : "border-amber-500/30 bg-amber-500/5 text-amber-300"}`}>
      ⚠ Sync em andamento ({RES_LABEL[running.resource] ?? running.resource}, página {running.next_page}). Não feche esta aba.
      <div className="mt-0.5 opacity-80">Último heartbeat: {ageSec}s atrás{stale ? " — possivelmente travado" : ""}.</div>
    </div>
  );
}

function SecretInput({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const [show, setShow] = React.useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background/50 px-3 py-2.5 pr-10 text-sm outline-none ring-ring/30 focus:ring-2"
          autoComplete="off"
        />
        <button type="button" onClick={() => setShow((v) => !v)} className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground hover:text-foreground">
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
