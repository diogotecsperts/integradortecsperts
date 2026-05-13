import * as React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Activity, AlertTriangle, CheckCircle2, Clock, Loader2, RefreshCw, History, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { getBlingCronHealth, getBlingResumeAuditLog, setupBlingCron } from "@/lib/bling.functions";

type Severity = "ok" | "warn" | "error";

function classify(job: {
  last_run_at: string | null;
  last_status: string | null;
  last_http_code: number | null;
  failures_last_hour: number;
  runs_last_hour: number;
}, pingStatus: number | null): { severity: Severity; reason: string } {
  if (pingStatus !== null && pingStatus >= 400) {
    return { severity: "error", reason: `Endpoint respondendo HTTP ${pingStatus} — provável deploy desatualizado.` };
  }
  if (!job.last_run_at) return { severity: "warn", reason: "Job nunca executou." };
  const ageSec = Math.floor((Date.now() - new Date(job.last_run_at).getTime()) / 1000);
  if (job.last_status === "failed" || (job.last_http_code !== null && job.last_http_code >= 400)) {
    return { severity: "error", reason: `Última execução falhou (HTTP ${job.last_http_code ?? "?"}). ${job.failures_last_hour} falha(s) na última hora.` };
  }
  if (ageSec > 600) return { severity: "warn", reason: `Sem execução há ${Math.floor(ageSec / 60)} min — cron pode ter parado.` };
  if (job.runs_last_hour === 0) return { severity: "warn", reason: "Nenhuma execução na última hora." };
  return { severity: "ok", reason: `${job.runs_last_hour} execução(ões) na última hora, todas ok.` };
}

const SEV_STYLES: Record<Severity, { box: string; icon: string; label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  ok: { box: "border-emerald-500/30 bg-emerald-500/5", icon: "text-emerald-400", label: "OK", Icon: CheckCircle2 },
  warn: { box: "border-amber-500/30 bg-amber-500/5", icon: "text-amber-400", label: "Atenção", Icon: Clock },
  error: { box: "border-destructive/40 bg-destructive/10", icon: "text-destructive", label: "Erro", Icon: AlertTriangle },
};

function fmtTime(s: string | null) {
  if (!s) return "—";
  return new Date(s).toLocaleString("pt-BR");
}

export function BlingCronHealthCard() {
  const fetchHealth = useServerFn(getBlingCronHealth);
  const fetchAudit = useServerFn(getBlingResumeAuditLog);
  const cron = useServerFn(setupBlingCron);
  const [showDetails, setShowDetails] = React.useState(false);
  const [showAudit, setShowAudit] = React.useState(false);

  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["admin", "bling-cron-health"],
    queryFn: () => fetchHealth(),
    refetchInterval: 30_000,
    staleTime: 15_000,
  });

  const audit = useQuery({
    queryKey: ["admin", "bling-resume-audit"],
    queryFn: () => fetchAudit(),
    enabled: showAudit,
    staleTime: 30_000,
  });

  const mCron = useMutation({
    mutationFn: () => cron(),
    onSuccess: (r) => { toast.success(`Agendamento OK: ${r.schedule}`); refetch(); },
    onError: async (e) => toast.error(e instanceof Response ? await e.text() : (e as Error).message),
  });

  const jobs = data?.jobs ?? [];
  const ping = data?.ping;
  const job = jobs[0];
  const sev = job ? classify(job, ping?.status ?? null)
    : { severity: "error" as Severity, reason: "Nenhum job 'bling-sync-tick' agendado. Clique em Reconfigurar." };
  const style = SEV_STYLES[sev.severity];

  const hasFailureDetails = !!job?.last_failure_message;

  return (
    <div className={`glass rounded-2xl border p-5 ${style.box}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 ${style.icon}`}>
            <style.Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold">
              Sync automática do Bling
              <span className={`rounded-md border px-1.5 py-0.5 text-[10px] uppercase ${style.icon} border-current/40`}>{style.label}</span>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{sev.reason}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" onClick={() => refetch()} disabled={isFetching}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] hover:bg-secondary disabled:opacity-50">
            {isFetching ? <Loader2 className="h-3 w-3 animate-spin" /> : <Activity className="h-3 w-3" />}
            Verificar
          </button>
          <button type="button" onClick={() => setShowAudit(v => !v)}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] hover:bg-secondary">
            <History className="h-3 w-3" />
            Retomadas manuais
          </button>
          <button type="button" onClick={() => mCron.mutate()} disabled={mCron.isPending}
            className={sev.severity === "error"
              ? "inline-flex items-center gap-1.5 rounded-md border border-destructive/50 bg-destructive/10 px-2.5 py-1.5 text-[11px] font-medium text-destructive hover:bg-destructive/20 disabled:opacity-50"
              : "inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-[11px] hover:bg-secondary disabled:opacity-50"}>
            {mCron.isPending ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
            Reconfigurar agendamento
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="mt-4 grid h-16 place-items-center"><Loader2 className="h-4 w-4 animate-spin" /></div>
      ) : (
        <>
          <div className="mt-4 grid gap-3 text-[11px] sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Última execução" value={job?.last_run_at ? new Date(job.last_run_at).toLocaleTimeString("pt-BR") : "—"} />
            <Stat label="HTTP" value={job?.last_http_code != null ? String(job.last_http_code) : (job?.last_status ?? "—")} />
            <Stat label="Execuções (1h)" value={String(job?.runs_last_hour ?? 0)} />
            <Stat label="Falhas (1h)" value={String(job?.failures_last_hour ?? 0)} highlight={job ? job.failures_last_hour > 0 : false} />
            <Stat label="Schedule" value={job?.schedule ?? "—"} />
            <Stat label="Ping endpoint" value={ping?.status != null ? `${ping.status} (${ping.ms}ms)` : (ping?.error ?? "—")} highlight={ping?.status != null && ping.status >= 400} />
          </div>

          {(hasFailureDetails || (job?.recent_runs?.length ?? 0) > 0) && (
            <div className="mt-3">
              <button type="button" onClick={() => setShowDetails(v => !v)}
                className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground">
                <ChevronDown className={`h-3 w-3 transition-transform ${showDetails ? "rotate-180" : ""}`} />
                {showDetails ? "Ocultar" : "Ver"} detalhes do erro e histórico
              </button>
              {showDetails && (
                <div className="mt-2 space-y-3">
                  {hasFailureDetails && (
                    <div className="rounded-lg border border-destructive/30 bg-background/60 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-destructive">Última falha — {fmtTime(job?.last_failure_at ?? null)}</div>
                      <pre className="mt-1 max-h-48 overflow-auto whitespace-pre-wrap break-all font-mono text-[11px] text-foreground/80">{job?.last_failure_message}</pre>
                      {job?.last_failure_command && (
                        <details className="mt-2">
                          <summary className="cursor-pointer text-[10px] text-muted-foreground">Comando SQL executado</summary>
                          <pre className="mt-1 max-h-32 overflow-auto whitespace-pre-wrap break-all font-mono text-[10px] text-muted-foreground">{job.last_failure_command}</pre>
                        </details>
                      )}
                    </div>
                  )}
                  {(job?.recent_runs?.length ?? 0) > 0 && (
                    <div className="rounded-lg border border-border/60 bg-background/40 p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Últimas 5 execuções</div>
                      <ul className="mt-2 space-y-1.5">
                        {job!.recent_runs.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-[11px]">
                            <span className={`mt-0.5 inline-block h-2 w-2 rounded-full ${r.status === "succeeded" ? "bg-emerald-500" : r.status === "failed" ? "bg-destructive" : "bg-amber-500"}`} />
                            <span className="font-mono text-muted-foreground">{new Date(r.start_time).toLocaleTimeString("pt-BR")}</span>
                            <span className="font-mono">{r.http_code ?? r.status}</span>
                            <span className="truncate text-muted-foreground" title={r.message}>{r.message.slice(0, 120)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {showAudit && (
            <div className="mt-3 rounded-lg border border-border/60 bg-background/40 p-3">
              <div className="mb-2 text-[10px] uppercase tracking-wider text-muted-foreground">Histórico de retomadas manuais</div>
              {audit.isLoading ? (
                <div className="grid h-10 place-items-center"><Loader2 className="h-3 w-3 animate-spin" /></div>
              ) : (audit.data?.length ?? 0) === 0 ? (
                <p className="text-[11px] text-muted-foreground">Nenhuma retomada manual registrada ainda.</p>
              ) : (
                <ul className="space-y-1.5">
                  {audit.data!.map(r => {
                    const m = r.metadata as Record<string, string | number | boolean | null>;
                    const err = m.error;
                    return (
                      <li key={r.id} className="rounded border border-border/40 bg-background/60 p-2 text-[11px]">
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                          <span className="font-mono text-muted-foreground">{fmtTime(r.createdAt)}</span>
                          <span className="font-medium">{r.userLabel ?? "—"}</span>
                          <span className="text-muted-foreground">→</span>
                          <span>{r.tenantName ?? r.tenantId}</span>
                          <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] uppercase">{String(m.resource ?? "")}</span>
                          {err ? (
                            <span className="text-destructive">erro: {String(err).slice(0, 80)}</span>
                          ) : (
                            <span className="text-muted-foreground">página {String(m.previousNextPage ?? "?")} → {String(m.nextPage ?? "fim")} · +{String(m.count ?? 0)} itens{m.done ? " · concluído" : ""}</span>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg border border-border/50 bg-background/40 p-2">
      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className={`mt-0.5 truncate font-mono text-xs ${highlight ? "text-destructive" : ""}`} title={value}>{value}</div>
    </div>
  );
}
