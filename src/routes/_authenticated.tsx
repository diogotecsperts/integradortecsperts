import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { AppShell } from "@/components/AppShell";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { user, loading, role, tenantId } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (loading) return;
    if (!user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  if (loading || !user) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (role === "cliente" && !tenantId) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <div className="glass max-w-md rounded-2xl p-8 text-center">
          <h1 className="text-xl font-semibold">Conta aguardando ativação</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sua conta foi criada mas ainda não foi vinculada a uma empresa. Entre em contato com o administrador.
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
