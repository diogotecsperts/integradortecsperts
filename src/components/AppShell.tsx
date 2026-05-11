import * as React from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import {
  Sparkles, LayoutDashboard, Bot, Settings, LogOut, Users, Building2,
  ShieldCheck, Menu, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: React.ElementType };

const clientNav: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/agent", label: "Agente IA", icon: Bot },
  { to: "/settings", label: "Configurações", icon: Settings },
];

const adminNav: NavItem[] = [
  { to: "/admin", label: "Visão geral", icon: LayoutDashboard },
  { to: "/admin/clients", label: "Clientes", icon: Building2 },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { role, user, signOut } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isAdmin = role === "superadmin";
  const items = isAdmin && path.startsWith("/admin") ? adminNav : clientNav;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar desktop */}
      <aside className="glass sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border md:flex">
        <SidebarContent items={items} path={path} isAdmin={isAdmin} />
        <UserCard email={user?.email ?? ""} role={role} onSignOut={async () => { await signOut(); navigate({ to: "/auth" }); }} />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-background/70 backdrop-blur" onClick={() => setMobileOpen(false)} />
          <aside className="glass absolute inset-y-0 left-0 flex w-72 flex-col border-r border-border">
            <SidebarContent items={items} path={path} isAdmin={isAdmin} onNav={() => setMobileOpen(false)} />
            <UserCard email={user?.email ?? ""} role={role} onSignOut={async () => { await signOut(); navigate({ to: "/auth" }); }} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="glass sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-border px-4 md:px-6">
          <button className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu">
            <Menu className="h-5 w-5" />
          </button>
          {isAdmin && (
            <div className="ml-auto flex items-center gap-3">
              {path.startsWith("/admin") ? (
                <Link to="/dashboard" className="text-xs text-muted-foreground hover:text-foreground">
                  Ver área cliente →
                </Link>
              ) : (
                <Link to="/admin" className="text-xs text-muted-foreground hover:text-foreground">
                  Ir ao painel admin →
                </Link>
              )}
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary">
                <ShieldCheck className="h-3 w-3" /> Superadmin
              </span>
            </div>
          )}
        </header>
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  items, path, isAdmin, onNav,
}: { items: NavItem[]; path: string; isAdmin: boolean; onNav?: () => void }) {
  return (
    <>
      <div className="flex items-center gap-2 border-b border-border p-5">
        <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <div className="font-semibold leading-none">Integrador <span className="gradient-text">Tecsperts</span></div>
          <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
            {isAdmin && path.startsWith("/admin") ? "Console Admin" : "Workspace"}
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-3">
        {items.map((it) => {
          const active = path === it.to || (it.to !== "/admin" && path.startsWith(it.to));
          return (
            <Link
              key={it.to}
              to={it.to}
              onClick={onNav}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition",
                active
                  ? "bg-primary/15 text-foreground border border-primary/20"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

function UserCard({ email, role, onSignOut }: { email: string; role: string | null; onSignOut: () => void }) {
  return (
    <div className="border-t border-border p-3">
      <div className="flex items-center gap-3 rounded-lg bg-secondary/40 p-2.5">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/20 text-xs font-bold text-primary">
          {email.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs font-medium">{email}</div>
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{role}</div>
        </div>
        <button onClick={onSignOut} className="rounded-md p-1.5 text-muted-foreground hover:bg-background hover:text-foreground" aria-label="Sair">
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
