## Objetivo

Acelerar a sincronização de pedidos (~60→~480 itens/h por cron) sem estourar o rate-limit do Bling (4 req/s) nem o timeout do Worker (30s), e endurecer o "Sync FULL" para sobreviver a runs longas.

## 1. `sync.server.ts` — paralelismo limitado no detail-fetch + parâmetros

### 1a. Tornar o `throttle()` seguro para concorrência (pré-requisito)

**Arquivo:** `src/lib/bling/client.server.ts` (linhas 19–28)

Hoje `throttle()` lê/escreve `lastCall` sem fila — chamadas paralelas calculam `wait=0` a partir do mesmo timestamp e disparam juntas, furando o limite de 4 req/s. Substituir por fila assíncrona por tenant:

```ts
const tenantQueues = new Map<string, Promise<void>>();
async function throttle(tenantId: string) {
  const prev = tenantQueues.get(tenantId) ?? Promise.resolve();
  let release!: () => void;
  const next = new Promise<void>((r) => { release = r; });
  tenantQueues.set(tenantId, prev.then(() => next));
  await prev;
  const now = Date.now();
  const last = lastCall.get(tenantId) ?? 0;
  const wait = Math.max(0, last + MIN_INTERVAL_MS - now);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastCall.set(tenantId, Date.now());
  release();
}
```

Resultado: mesmo com `Promise.all` de 3+ chamadas, a saída para o Bling continua espaçada por ≥260ms. Sem isso, o paralelismo proposto causa 429.

### 1b. `fetchAndUpsertOrderItems` — lotes de 3 em paralelo

**Arquivo:** `src/lib/bling/sync.server.ts` (~linhas 222–262)

Trocar o `for (const oid of orderIds)` por chunks de 3 com `Promise.all`:

```ts
const CONCURRENCY = 3;
for (let i = 0; i < orderIds.length; i += CONCURRENCY) {
  const slice = orderIds.slice(i, i + CONCURRENCY);
  const results = await Promise.all(slice.map(async (oid) => {
    try {
      const detail = await blingFetch<{ data?: Record<string, unknown> }>(
        tenantId, `/pedidos/vendas/${oid}`,
      );
      return { oid, itens: (detail?.data?.itens as Array<Record<string, unknown>>) ?? [] };
    } catch (e) {
      console.warn(`[bling-sync] tenant=${tenantId} resource=orders item-detail-fail order=${oid} err=${errMessage(e)}`);
      return { oid, itens: [] };
    }
  }));
  for (const { oid, itens } of results) {
    for (const it of itens) {
      // mesma montagem de allRows que existe hoje
    }
  }
}
```

Mantém o catch por pedido (um detail fail não derruba o batch). O insert único no fim continua igual.

### 1c. Parâmetros

**Arquivo:** `src/lib/bling/sync.server.ts` (linhas 9–13)

```ts
const ORDERS_PAGES_PER_BATCH = 1;   // mantém
const ORDERS_PAGE_LIMIT = 40;       // era 20
```

Custo por tick (40 pedidos):
- 1 list call: ~260ms
- 40 details em chunks de 3 paralelos: ceil(40/3)=14 rodadas × 260ms ≈ 3,7s
- Upsert + delete + insert dos itens: ~0,5–1s
- **Total ≈ 5–6s**, bem abaixo dos 30s do Worker.

### 1d. Heartbeat com precisão de 30s

**Arquivo:** `src/lib/bling/sync.server.ts`, função `runPaginatedBatch` (~388–470)

Hoje o heartbeat só é gravado depois de cada upsert. Em pedidos com detail-fetch lento, o gap entre upserts pode passar de 5min e o reaper mata a run. Adicionar um ticker independente:

```ts
const hbTimer = setInterval(() => {
  supabaseAdmin.from("bling_sync_runs").update({
    heartbeat_at: new Date().toISOString(),
    items_processed: count,
  }).eq("id", runId).then(() => {});
}, 30_000);
try {
  // loop atual
} finally {
  clearInterval(hbTimer);
}
```

## 2. Cron — de 20min para 5min

**Não é migration** (contém URL e anon key específicos do projeto). Usar `supabase.insert` via tool de SQL para reagendar:

```sql
SELECT cron.unschedule('bling-sync-tick');
SELECT cron.schedule(
  'bling-sync-tick',
  '*/5 * * * *',
  $$
  SELECT net.http_post(
    url := 'https://project--9225351c-a819-46d4-8167-24170081c08a.lovable.app/api/public/hooks/bling-sync-tick',
    headers := '{"Content-Type":"application/json","apikey":"<ANON_KEY_ATUAL>"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);
```

Resultado combinado (1+2): **40 pedidos a cada 5 min ≈ 480 itens/h**, ~8× o ritmo atual. Para 50k pedidos numa carga inicial, ainda usar o botão "Sync FULL" (que não usa o cron).

## 3. UI — aviso "Sync FULL em andamento" no admin

**Arquivo:** `src/routes/_authenticated/_admin/admin.clients.tsx` (~linhas 481–485, próximo ao botão "Sync FULL (tudo)")

- Detectar via `data.lastRuns`: se houver alguma run com `status === "running"` cujo `meta.mode === "full"` (ou `next_page != null`), mostrar um banner amarelo logo abaixo do botão:
  ```
  ⚠ Sync FULL em andamento — não feche esta aba até concluir. 
  Última atualização: <heartbeat há Xs>.
  ```
- Mostrar tempo desde o último `heartbeat_at` em segundos (atualizado via `setInterval` local de 5s) — se passar de 60s, pintar de vermelho.
- Quando o usuário clicar em "Sync FULL", abrir um `confirm` com o mesmo aviso antes de disparar.

> O backend não depende da aba aberta (o `runUntil` roda no Worker). O aviso é só para o usuário não ficar achando que está congelado e não cancelar a chamada `useMutation` em andamento, o que abortaria o request e mataria o run no meio.

## Fora de escopo

- Não mexer em RLS, schema, edge functions, nem em `client.ts`/`auth-middleware.ts`.
- Não mudar a estratégia de "1 recurso por tenant por tick" — só os parâmetros e o paralelismo interno.
- Não tocar em `syncContacts`/`syncProducts`/`syncStock`/`syncDeposits` além do throttle compartilhado.

## Detalhes técnicos (resumo de risco)

| Risco | Mitigação |
|-------|-----------|
| `Promise.all` fura 4 req/s do Bling → 429 cascata | Fila assíncrona em `throttle()` (1a) — sem isso, NÃO ative o paralelismo |
| Tick acima de 30s | 40 pedidos × paralelismo 3 = ~5–6s; folga grande |
| Reaper mata run longa | Heartbeat por `setInterval(30s)` |
| pg_cron com URL ou key errada | SQL via insert tool, não migration; conferir com `SELECT * FROM cron.job` depois |

## Arquivos a editar

- `src/lib/bling/client.server.ts` — fila no throttle
- `src/lib/bling/sync.server.ts` — Promise.all no detail-fetch, constantes, heartbeat ticker
- `src/routes/_authenticated/_admin/admin.clients.tsx` — banner + confirm do Sync FULL
- pg_cron — reagendar para `*/5 * * * *` (via SQL insert)
