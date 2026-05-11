import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import * as React from "react";
import { Eye, EyeOff, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/settings")({
  component: SettingsPage,
});

type Form = {
  bling_client_id: string;
  bling_client_secret: string;
  resend_api_key: string;
  minimax_api_key: string;
};

function SettingsPage() {
  const { tenantId } = useAuth();
  const qc = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["settings", tenantId],
    enabled: !!tenantId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tenant_settings").select("*").eq("tenant_id", tenantId!).maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = React.useState<Form>({
    bling_client_id: "", bling_client_secret: "", resend_api_key: "", minimax_api_key: "",
  });
  React.useEffect(() => {
    if (data) setForm({
      bling_client_id: data.bling_client_id ?? "",
      bling_client_secret: data.bling_client_secret ?? "",
      resend_api_key: data.resend_api_key ?? "",
      minimax_api_key: data.minimax_api_key ?? "",
    });
  }, [data]);

  const save = useMutation({
    mutationFn: async () => {
      const payload = { tenant_id: tenantId!, ...form };
      const { error } = await supabase.from("tenant_settings").upsert(payload, { onConflict: "tenant_id" });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Configurações salvas");
      qc.invalidateQueries({ queryKey: ["settings", tenantId] });
    },
    onError: (e) => toast.error("Erro ao salvar", { description: (e as Error).message }),
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="mt-1 text-sm text-muted-foreground">Chaves de API utilizadas pelo seu workspace.</p>
      </div>

      {isLoading ? (
        <div className="glass grid h-40 place-items-center rounded-2xl">
          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); save.mutate(); }} className="space-y-6">
          <Section title="Bling ERP" desc="Credenciais OAuth para integração com seu Bling.">
            <Field label="Client ID" value={form.bling_client_id} onChange={(v) => setForm({ ...form, bling_client_id: v })} />
            <Field label="Client Secret" secret value={form.bling_client_secret} onChange={(v) => setForm({ ...form, bling_client_secret: v })} />
          </Section>

          <Section title="Resend" desc="Envio transacional de e-mails.">
            <Field label="API Key" secret value={form.resend_api_key} onChange={(v) => setForm({ ...form, resend_api_key: v })} />
          </Section>

          <Section title="Minimax (Agente IA)" desc="Chave usada pelo agente de IA do seu workspace.">
            <Field label="API Key" secret value={form.minimax_api_key} onChange={(v) => setForm({ ...form, minimax_api_key: v })} />
          </Section>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={save.isPending}
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-primary-foreground"
              style={{ background: "var(--gradient-primary)" }}
            >
              {save.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Salvar alterações
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Field({
  label, value, onChange, secret,
}: { label: string; value: string; onChange: (v: string) => void; secret?: boolean }) {
  const [show, setShow] = React.useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground">{label}</label>
      <div className="relative">
        <input
          type={secret && !show ? "password" : "text"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background/50 px-3 py-2.5 pr-10 text-sm outline-none ring-ring/30 transition focus:ring-2"
          autoComplete="off"
        />
        {secret && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute inset-y-0 right-0 grid w-10 place-items-center text-muted-foreground hover:text-foreground"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}
