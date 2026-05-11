import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  createTenant, createTenantUser, listTenantsAdmin, setTenantStatus, setUserBlocked,
  getTenantSettings, upsertTenantSettings,
} from "@/lib/admin.functions";
import * as React from "react";
import { Plus, Lock, Unlock, UserPlus, Loader2, Settings as SettingsIcon, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { StatusBadge } from "./admin.index";

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clientes</h1>
          <p className="mt-1 text-sm text-muted-foreground">Gerencie tenants e seus usuários.</p>
        </div>
        <button
          onClick={() => setOpenTenant(true)}
          className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
        >
          <Plus className="h-4 w-4" /> Novo Tenant
        </button>
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
    <div className="fixed inset-0 z-50 grid place-items-center px-4">
      <div className="absolute inset-0 bg-background/70 backdrop-blur" onClick={onClose} />
      <div className="glass relative w-full max-w-md rounded-2xl p-6">
        <h2 className="text-lg font-semibold">{title}</h2>
        <div className="mt-4">{children}</div>
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
