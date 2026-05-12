import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import * as React from "react";
import { Bot, Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import {
  getGlobalSettings,
  upsertGlobalSettings,
  ORIGINAL_GLOBAL_PERSONA,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/_admin/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const getFn = useServerFn(getGlobalSettings);
  const saveFn = useServerFn(upsertGlobalSettings);
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "global-settings"],
    queryFn: () => getFn(),
  });

  const [persona, setPersona] = React.useState("");
  React.useEffect(() => {
    if (data?.default_agent_persona) setPersona(data.default_agent_persona);
  }, [data?.default_agent_persona]);

  const mutation = useMutation({
    mutationFn: (value: string) => saveFn({ data: { default_agent_persona: value } }),
    onSuccess: () => {
      toast.success("Configurações globais atualizadas.");
      qc.invalidateQueries({ queryKey: ["admin", "global-settings"] });
    },
    onError: (e: unknown) => toast.error(e instanceof Error ? e.message : "Erro ao salvar."),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações do Sistema</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Diretrizes globais que valem para toda a plataforma.
        </p>
      </div>

      <section className="glass rounded-2xl p-6 space-y-4">
        <header className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-semibold">IA Global — Persona Padrão</h2>
            <p className="text-xs text-muted-foreground">
              Hierarquia: <strong>Cliente</strong> → <strong>Global</strong> → <strong>Padrão fixo</strong>.
              Quando um cliente não tem prompt customizado, este texto é usado.
            </p>
          </div>
        </header>

        <textarea
          value={persona}
          onChange={(e) => setPersona(e.target.value)}
          rows={14}
          disabled={isLoading}
          className="w-full rounded-lg border border-border bg-background/50 p-3 font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary/40"
          placeholder="Defina a persona, tom e regras de negócio padrão da IA..."
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setPersona(ORIGINAL_GLOBAL_PERSONA)}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted/50"
          >
            <RotateCcw className="h-4 w-4" />
            Restaurar Padrão Original
          </button>

          <button
            type="button"
            disabled={mutation.isPending || persona.trim().length < 10}
            onClick={() => mutation.mutate(persona.trim())}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {mutation.isPending ? "Salvando..." : "Salvar"}
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          O contexto temporal (data atual, períodos de referência) e as regras de formatação
          (tabelas markdown, anti-vazamento de tags) são adicionadas automaticamente — você
          só precisa definir a persona e as regras de negócio.
        </p>
      </section>
    </div>
  );
}
