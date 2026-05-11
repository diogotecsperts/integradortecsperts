import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/use-auth";
import * as React from "react";
import { Sparkles, BarChart3, Bot, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  const { user, role, loading } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (loading) return;
    if (user) navigate({ to: role === "superadmin" ? "/admin" : "/dashboard" });
  }, [user, role, loading, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <header className="container mx-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">Integrador <span className="gradient-text">Tecsperts</span></span>
        </div>
        <Link to="/auth" className="rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary/50">
          Entrar
        </Link>
      </header>

      <main className="container mx-auto px-6 pt-20 pb-32 text-center">
        <div className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
          Plataforma SaaS B2B • Multi-tenant
        </div>
        <h1 className="mx-auto max-w-3xl text-5xl font-bold tracking-tight md:text-7xl">
          Business Intelligence com <span className="gradient-text">Agentes de IA</span> autônomos.
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          Conecte seu ERP, visualize KPIs em tempo real e converse com um agente que entende seu negócio.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Link to="/auth" className="rounded-lg px-6 py-3 text-sm font-medium text-primary-foreground glow" style={{ background: "var(--gradient-primary)" }}>
            Acessar Plataforma
          </Link>
        </div>

        <div className="mx-auto mt-24 grid max-w-5xl gap-4 md:grid-cols-3">
          {[
            { icon: BarChart3, title: "BI em tempo real", desc: "KPIs, evolução mensal e drilldowns." },
            { icon: Bot, title: "Agente IA dedicado", desc: "Consulta seu ERP em linguagem natural." },
            { icon: ShieldCheck, title: "Multi-tenant seguro", desc: "Isolamento por RLS no banco." },
          ].map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 text-left">
              <f.icon className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
