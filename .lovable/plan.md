## Objetivo

Tornar a sincronização Bling resiliente a runs longas (sem o reaper matar tarefas só porque elas estão entre ticks) e remover a necessidade de rodar SQL manualmente para configurar o `pg_cron`.

---

## 1. Novo status `paused` (separar "aguardando próximo tick" de "em execução agora")

**Migration (DB):**
- `ALTER TYPE bling_sync_status ADD VALUE 'paused';`
- Atualizar `reap_stale_bling_runs()` para considerar **stale** apenas runs em `status = 'running'` sem heartbeat há > 5 min. Runs em `paused` são ignoradas pelo reaper (não têm heartbeat porque estão dormindo entre ticks).

**`src/lib/bling/sync.server.ts`:**
- `pauseRun()`: além de salvar `next_page` e `items_processed`, atualizar `status = 'paused'` e limpar `heartbeat_at` (ou deixar como está — o reaper só olha `running`).
- `runPaginatedBatch()`: ao retomar (`resumeRunId`), o primeiro update deve setar `status = 'running'` e `heartbeat_at = now()` antes do primeiro fetch.
- `endRun()` continua setando `ok` ou `error` normalmente (sobrescreve `paused`/`running`).

**`src/routes/api/public/hooks/bling-sync-tick.tsx`:**
- A query que busca runs para retomar deve usar `.in("status", ["running", "paused"])` no lugar de `.eq("status", "running")`.
- Continuar exigindo `next_page IS NOT NULL` (sinal de que há trabalho pendente).

---

## 2. Auto-configuração do cron por botão

**`src/lib/bling.functions.ts`** — nova server function `setupBlingCron`:
- Restrita a superadmin (`assertSuperadmin`).
- Usa `supabaseAdmin.rpc("exec_sql", ...)` **ou** mais simples: faz `supabaseAdmin.from("...").rpc()` chamando uma função SQL `setup_bling_cron(url text, apikey text)` que criamos via migration. (Postgres não permite executar SQL arbitrário via PostgREST diretamente, então o caminho limpo é uma função SQL `SECURITY DEFINER`.)
- Parâmetros derivados no servidor:
  - `url` = `https://project--9225351c-a819-46d4-8167-24170081c08a.lovable.app/api/public/hooks/bling-sync-tick`
  - `apikey` = `process.env.SUPABASE_PUBLISHABLE_KEY`
- A função SQL faz: `SELECT cron.unschedule('bling-sync-tick')` (ignorando erro se não existir) e depois `cron.schedule('bling-sync-tick', '*/5 * * * *', $$ SELECT net.http_post(url:=..., headers:=..., body:='{}'::jsonb) $$)`.
- Retorna `{ ok: true, schedule: '*/5 * * * *', url }`.

**Migration (DB):**
- Garantir extensões `pg_cron` e `pg_net` (já devem estar).
- Criar `public.setup_bling_cron(p_url text, p_apikey text)` `SECURITY DEFINER` que executa o (un)schedule descrito acima. Restringir `EXECUTE` a `service_role`.

**`src/routes/_authenticated/_admin/admin.clients.tsx`:**
- Botão **"Configurar agendamento automático"** no header da página (área de superadmin).
- `useMutation` que chama `setupBlingCron`, mostra toast com URL/cron configurados.

---

## 3. Tooltip de erro: distinguir Stale vs API

**`src/routes/_authenticated/_admin/admin.clients.tsx` e `src/routes/_authenticated/integracao-bling.tsx`:**
- O Tooltip de erro já mostra `error_message`. Adicionar um **prefixo/badge** acima da mensagem:
  - Se `error_message` começa com `"Stale:"` → badge `STALE` (cinza/amarelo) + texto "Reaper matou — run ficou sem heartbeat".
  - Se contém `"BlingError"` ou status HTTP → badge `API BLING` (vermelho).
  - Caso contrário → badge `INTERNO`.
- Pequena função utilitária `classifyError(msg)` no mesmo arquivo.

---

## Detalhes técnicos

**Reaper atualizado (resumo SQL):**
```sql
UPDATE bling_sync_runs
SET status='error', finished_at=now(),
    error_message=COALESCE(error_message,'Stale: sem heartbeat há mais de 5 minutos')
WHERE status='running'  -- não toca em 'paused'
  AND COALESCE(heartbeat_at, started_at) < now() - interval '5 minutes';
```

**Resume flow:**
```
tick → busca run com status IN ('running','paused') AND next_page IS NOT NULL
     → marca status='running', heartbeat_at=now()
     → roda runPaginatedBatch
     → no fim do batch: pauseRun → status='paused', next_page=N
```

**Função SQL `setup_bling_cron`:**
```sql
CREATE OR REPLACE FUNCTION public.setup_bling_cron(p_url text, p_apikey text)
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path=public, cron, net AS $$
BEGIN
  PERFORM cron.unschedule('bling-sync-tick')
    WHERE EXISTS (SELECT 1 FROM cron.job WHERE jobname='bling-sync-tick');
  PERFORM cron.schedule('bling-sync-tick', '*/5 * * * *',
    format($c$ SELECT net.http_post(
      url:=%L,
      headers:=jsonb_build_object('Content-Type','application/json','apikey',%L),
      body:='{}'::jsonb) $c$, p_url, p_apikey));
  RETURN 'scheduled */5 * * * * → '||p_url;
END $$;
REVOKE ALL ON FUNCTION public.setup_bling_cron(text,text) FROM PUBLIC;
```

---

## Arquivos tocados

1. **Migration nova** — adiciona enum `paused`, atualiza `reap_stale_bling_runs`, cria `setup_bling_cron`.
2. `src/lib/bling/sync.server.ts` — `pauseRun` (status=paused), retomada (status=running + heartbeat).
3. `src/routes/api/public/hooks/bling-sync-tick.tsx` — query aceita `running` e `paused`.
4. `src/lib/bling.functions.ts` — server fn `setupBlingCron`.
5. `src/routes/_authenticated/_admin/admin.clients.tsx` — botão "Configurar agendamento automático" + classificação visual de erro no Tooltip.
6. `src/routes/_authenticated/integracao-bling.tsx` — mesma classificação visual no Tooltip.

---

## Resultado esperado

- Runs longas **não morrem mais** entre ticks (status `paused` sai do radar do reaper).
- Um clique em "Configurar agendamento automático" agenda o cron a cada 5 min — sem SQL manual.
- O Tooltip de erro mostra de cara se o problema foi reaper (`STALE`), API do Bling, ou erro interno — facilitando diagnóstico.