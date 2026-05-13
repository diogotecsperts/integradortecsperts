import { createFileRoute } from "@tanstack/react-router";

// Endpoint público para o painel admin pingar e detectar quando o deploy
// não tem o tick (404) ou está fora do ar. Sem auth: retorna apenas metadados.
export const Route = createFileRoute("/api/public/hooks/bling-sync-health")({
  server: {
    handlers: {
      GET: async () => {
        return new Response(
          JSON.stringify({ ok: true, service: "bling-sync-tick", at: new Date().toISOString() }),
          { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } },
        );
      },
    },
  },
});
