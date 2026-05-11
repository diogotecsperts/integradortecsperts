import { createFileRoute, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/hooks/use-auth";
import { Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { bootstrapSuperadmin } from "@/lib/admin.functions";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const { signIn, user, role, loading } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [showSetup, setShowSetup] = React.useState(false);
  const bootstrap = useServerFn(bootstrapSuperadmin);

  React.useEffect(() => {
    if (!loading && user) {
      navigate({ to: role === "superadmin" ? "/admin" : "/dashboard" });
    }
  }, [user, role, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await signIn(email, password);
    setSubmitting(false);
    if (error) toast.error("Falha no login", { description: error });
  };

  const onBootstrap = async () => {
    if (!email || password.length < 8) {
      toast.error("Preencha o e-mail seed e uma senha (8+).");
      return;
    }
    setSubmitting(true);
    try {
      await bootstrap({ data: { email, password } });
      toast.success("Superadmin criado. Faça login.");
      setShowSetup(false);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Lumen<span className="gradient-text">BI</span></span>
        </div>

        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-semibold">Acesso à plataforma</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Restrito a usuários convidados. Sem registro público.
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">E-mail</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm outline-none ring-ring/30 transition focus:ring-2"
                placeholder="voce@empresa.com"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground">Senha</label>
              <input
                type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border bg-background/50 px-3 py-2.5 text-sm outline-none ring-ring/30 transition focus:ring-2"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit" disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-95 disabled:opacity-60"
              style={{ background: "var(--gradient-primary)" }}
            >
              {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
              Entrar
            </button>
          </form>

          <div className="mt-6 border-t border-border pt-4 text-center">
            <button
              type="button"
              onClick={() => setShowSetup((v) => !v)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Primeira instalação? Configurar superadmin
            </button>
            {showSetup && (
              <div className="mt-3 rounded-lg border border-dashed border-border bg-secondary/30 p-3 text-left">
                <p className="text-xs text-muted-foreground">
                  Use o e-mail seed (<code className="text-foreground">diogomixcds@gmail.com</code>) com uma senha 8+
                  e clique abaixo. Só funciona enquanto não houver superadmin.
                </p>
                <button
                  onClick={onBootstrap}
                  disabled={submitting}
                  className="mt-3 w-full rounded-md border border-border bg-background px-3 py-2 text-xs font-medium hover:bg-secondary"
                >
                  Criar superadmin
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
