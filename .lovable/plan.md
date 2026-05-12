## Objetivo

Tornar a sincronização Bling resiliente e automática: pedidos em blocos com checkpoint, cron a cada 20min para todos os tenants conectados, indicador de frescor na UI, e auto-recuperação de runs travadas em "running".

---

## 1. Banco de dados (uma migration)

**Adicionar colunas em `bling_sync_runs`** para suportar checkpoint e heartbeat:
- `cursor_page int` — última página processada com sucesso no batch atual.
- `next_page int` — próxima página a processar (null = concluído).
- `heartbeat_at timestamptz` — atualizado a cada página processada.
- Índice `(tenant_id, resource, status, started_at desc)`.

**Reaper SQL function** `public.reap_stale_bling_runs()`:
- Marca como `error` (msg "Stale: sem heartbeat há >5min") qualquer run com `status='running'` e `heartbeat_at < now() - interval '5 minutes'` (ou `started_at` se heartbeat null).
- Chamada pelo cron antes de cada tick e via pg_cron de 5 em 5min como rede de segurança.

---

## 2. Refatorar `syncOrders` (batching com checkpoint)

Em `src/lib/bling/sync.server.ts`:

- Constante `ORDERS_PAGES_PER_BATCH = 5` (5 páginas × 100 = 500 pedidos por execução).
- Nova assinatura: `syncOrders(tenantId, mode, opts?: { resumeRunId?: string })`.
- Fluxo:
  1. Se `resumeRunId`, retoma daquela run lendo `next_page` e `meta.dataAlteracaoInicial`. Senão, cria run nova (com `cursor_page=0`, `next_page=1`, e calcula `dataAlteracaoInicial` para incremental).
  2. Loop de no máximo `ORDERS_PAGES_PER_BATCH` páginas:
     - Faz `blingFetch` da página, upsert dos pedidos.
     - Atualiza `cursor_page`, `heartbeat_at=now()`, incrementa `items_processed` no run **a cada página**.
     - Se a página retornou < 100 itens → terminou tudo: `status=ok`, `next_page=null`, `finished_at=now()`. Retorna `{ done: true }`.
  3. Se atingiu o limite do batch: deixa `status='running'`, salva `next_page = pagina+1`, retorna `{ done: false, nextPage }` — o cron retomará no próximo tick.
- O botão manual "Full Sync" no admin chama o mesmo método em loop até `done: true` (com proteção: máx N batches por clique para não travar a request HTTP), exibindo progresso ao recarregar status.
- Aplicar o mesmo padrão de batching em `syncProducts` (mesma estrutura paginada). `syncDeposits` e `syncStock` continuam single-shot (volume baixo).

**Rate limit (máx 4 req/s):** ajustar `MIN_INTERVAL_MS` em `bling/client.server.ts` de 350 → 260ms (≈3.8 req/s, com folga). Manter retry em 429.

---

## 3. Cron automático

**Server route:** `src/routes/api/public/hooks/bling-sync-tick.ts` (POST).
- Auth via header `apikey` = anon key (padrão `/api/public/*`).
- Lógica:
  1. Chama `reap_stale_bling_runs()` (RPC).
  2. Para cada `bling_credentials` ativa (não expirada há muito):
     - Procura run em `running` com `next_page not null` para `(tenant, resource)` → retoma com `syncOrders/Products(..., { resumeRunId })`.
     - Senão, dispara incremental: `syncDeposits` (1×/dia heurística), `syncProducts(incremental)`, `syncStock`, `syncOrders(incremental)`.
  3. Catch por tenant para não derrubar o tick inteiro.
- Tempo total controlado: processa no máximo `ORDERS_PAGES_PER_BATCH` por tenant por tick.

**Agendamento via `pg_cron` + `pg_net`** (criado via `supabase--insert`, não migration):
- Job `bling-sync-tick` a cada 20min chamando a route com `apikey`.
- Job `bling-reaper` a cada 5min chamando `reap_stale_bling_runs()` direto (defensivo).

---

## 4. UI — indicador de frescor

**Helper** em `bling.functions.ts`: `getBlingStatus` já retorna `lastRuns`. Adicionar campo derivado `freshness: { resource, lastOkAt, ageSeconds, status }[]` calculado no servidor por recurso (orders/products/stock).

**Componentes:**
- `src/routes/_authenticated/integracao-bling.tsx` (cliente): nova seção "Frescor dos dados" com cards por recurso mostrando "Atualizado há 12 min" (formatado relativo) + badge da última run (`ok`/`error`/`running` com `next_page` indicando "em andamento, página X").
- `src/routes/_authenticated/dashboard.tsx`: banner compacto no topo "Dados Bling atualizados há X min" (pegando o mais antigo entre orders/products/stock). Usa `useQuery` com `refetchInterval: 30s`.
- Util `formatRelative(date)` em `src/lib/utils.ts` (sem dependência nova; "agora", "X min", "X h", "X d").

---

## 5. Resiliência

- **Heartbeat:** cada página processada faz `update bling_sync_runs set heartbeat_at = now(), cursor_page = X, items_processed = Y where id = ?`.
- **Reaper:** descrito acima — RPC + cron de 5min + chamada no início de cada tick.
- **Idempotência:** upserts existentes em `(tenant_id, bling_id)` garantem que reprocessar uma página é seguro.
- **Retry no tick:** se `syncOrders` lançar exceção parcial, `endRun` marca `error` e o próximo tick simplesmente inicia uma nova run incremental (não retoma a com erro).

---

## Detalhes técnicos

**Arquivos a criar:**
- `supabase/migrations/<ts>_bling_sync_batching.sql` — colunas + função `reap_stale_bling_runs`.
- `src/routes/api/public/hooks/bling-sync-tick.ts` — endpoint do cron.

**Arquivos a editar:**
- `src/lib/bling/sync.server.ts` — refator de `syncOrders`/`syncProducts` para batching com checkpoint + heartbeat por página.
- `src/lib/bling/client.server.ts` — `MIN_INTERVAL_MS` 350→260.
- `src/lib/bling.functions.ts` — `getBlingStatus` retorna `freshness[]`; `runBlingSync` aceita parâmetro `untilDone` para o botão Full Sync.
- `src/routes/_authenticated/integracao-bling.tsx` — seção de frescor e badges com `next_page`.
- `src/routes/_authenticated/dashboard.tsx` — banner de frescor.
- `src/lib/utils.ts` — `formatRelative`.
- `src/integrations/supabase/types.ts` — regenerado pela migration.

**SQL inserts (não-migration, executados após approval):** agendamento `pg_cron` apontando para `https://project--9225351c-a819-46d4-8167-24170081c08a.lovable.app/api/public/hooks/bling-sync-tick` com `apikey: <ANON_KEY>`.

**Fora de escopo:** mudar persona/IA, alterar UI do admin de clientes, adicionar novos recursos Bling.
