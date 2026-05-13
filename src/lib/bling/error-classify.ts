// Classifica error_message de bling_sync_runs em categorias para a UI.
export type ErrorKind = "stale" | "api" | "internal";

export function classifyError(msg: string | null | undefined): { kind: ErrorKind; label: string; hint: string } {
  const m = (msg ?? "").trim();
  if (!m) return { kind: "internal", label: "INTERNO", hint: "Sem mensagem" };
  if (/^stale\b/i.test(m) || /sem heartbeat/i.test(m)) {
    return { kind: "stale", label: "STALE", hint: "Reaper matou — run ficou sem heartbeat" };
  }
  if (/blingerror|http\s*4\d\d|http\s*5\d\d|status\s*[45]\d\d|429|401|403|500|502|503|504/i.test(m)) {
    return { kind: "api", label: "API BLING", hint: "Erro vindo da API do Bling" };
  }
  return { kind: "internal", label: "INTERNO", hint: "Erro interno do sincronizador" };
}

export const KIND_BADGE: Record<ErrorKind, string> = {
  stale: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  api: "border-destructive/40 bg-destructive/10 text-destructive",
  internal: "border-muted-foreground/30 bg-muted/30 text-muted-foreground",
};
