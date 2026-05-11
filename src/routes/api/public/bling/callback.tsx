import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { exchangeCodeForToken } from "@/lib/bling/client.server";

function html(title: string, body: string, status = 200) {
  return new Response(
    `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><title>${title}</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
:root{color-scheme:dark}
body{margin:0;min-height:100vh;display:grid;place-items:center;font-family:system-ui,-apple-system,sans-serif;background:#0a0a0f;color:#e9e9ef}
.card{max-width:480px;padding:32px;border-radius:20px;background:rgba(255,255,255,.04);backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.08);box-shadow:0 20px 60px rgba(0,0,0,.5)}
h1{margin:0 0 8px;font-size:20px}
p{color:#a0a0b0;line-height:1.5;margin:0 0 16px}
.ok{color:#4ade80}.err{color:#f87171}
button{margin-top:8px;padding:10px 16px;border-radius:10px;border:1px solid rgba(255,255,255,.12);background:transparent;color:inherit;cursor:pointer}
</style></head><body><div class="card">${body}<button onclick="window.close()">Fechar janela</button></div></body></html>`,
    { status, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

export const Route = createFileRoute("/api/public/bling/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const code = url.searchParams.get("code");
        const state = url.searchParams.get("state");
        const errorParam = url.searchParams.get("error");

        if (errorParam) {
          return html("Bling — erro", `<h1 class="err">Autorização negada</h1><p>${errorParam}</p>`, 400);
        }
        if (!code || !state) {
          return html("Bling — erro", `<h1 class="err">Parâmetros ausentes</h1><p>code/state não recebidos.</p>`, 400);
        }

        const { data: stateRow } = await supabaseAdmin
          .from("bling_oauth_states").select("*").eq("state", state).maybeSingle();
        if (!stateRow) return html("Bling — erro", `<h1 class="err">State inválido</h1><p>Sessão de autorização não encontrada.</p>`, 400);
        if (stateRow.used_at) return html("Bling — erro", `<h1 class="err">State já usado</h1><p>Gere um novo link.</p>`, 400);
        if (new Date(stateRow.expires_at).getTime() < Date.now()) {
          return html("Bling — erro", `<h1 class="err">State expirado</h1><p>Gere um novo link.</p>`, 400);
        }

        await supabaseAdmin.from("bling_oauth_states").update({ used_at: new Date().toISOString() }).eq("state", state);

        try {
          await exchangeCodeForToken({
            tenantId: stateRow.tenant_id,
            code,
            redirectUri: stateRow.redirect_uri,
          });
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          return html("Bling — erro", `<h1 class="err">Falha ao trocar code por token</h1><p>${msg}</p>`, 500);
        }

        return html("Bling — conectado", `<h1 class="ok">Conta Bling conectada com sucesso ✅</h1><p>Você já pode fechar esta janela e voltar ao Integrador Tecsperts.</p>`);
      },
    },
  },
});
