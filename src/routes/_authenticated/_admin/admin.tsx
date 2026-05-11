import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listTenantsAdmin } from "@/lib/admin.functions";
import { Building2, Users, Activity, Bot, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/_authenticated/_admin/admin")({
  component: AdminHome,
});

function AdminHome() {
  const fn = useServerFn(listTenantsAdmin);
  const { data } = useQuery({ queryKey: ["admin", "overview"], queryFn: () => fn() });
  const tenants = data?.tenants ?? [];
  const profiles = data?.profiles ?? [];
  const active = tenants.filter((t) => t.status === "active").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Painel Superadmin</h1>
        <p className="mt-1 text-sm text-muted-foreground">Saúde global da plataforma.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={Building2} label="Tenants ativos" value={active} />
        <Stat icon={Users} label="Usuários" value={profiles.length} />
        <Stat icon={Bot} label="Mensagens IA hoje" value={"—"} />
        <Stat icon={Activity} label="Integrações OK" value={"—"} />
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-semibold">Status dos Tenants</h2>
        <div className="mt-4 divide-y divide-border">
          {tenants.length === 0 && (
            <div className="py-10 text-center text-sm text-muted-foreground">
              Nenhum tenant criado ainda. Vá em <strong>Clientes</strong> para começar.
            </div>
          )}
          {tenants.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-3">
              <div>
                <div className="font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">/{t.slug}</div>
              </div>
              <StatusBadge status={t.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: number | string }) {
  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 text-2xl font-bold">{value}</div>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    active: "bg-success/15 text-success border-success/30",
    suspended: "bg-warning/15 text-warning border-warning/30",
    blocked: "bg-destructive/15 text-destructive border-destructive/30",
  };
  const label: Record<string, string> = { active: "Ativo", suspended: "Suspenso", blocked: "Bloqueado" };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${map[status] ?? ""}`}>
      <ShieldCheck className="h-3 w-3" /> {label[status] ?? status}
    </span>
  );
}
