## Objetivo

Diagnosticar por que a sincronização do Bling para em ~6.000 contatos e ~240 pedidos, expondo o erro real na UI, deixando cada tick mais leve, e medindo o tempo por página no log.

## Mudanças

### 1. UI — exibir `error_message` real

**Arquivo:** `src/routes/_authenticated/_admin/admin.clients.tsx` (lista de `lastRuns`, ~linha 486–497)

- Trocar a linha do histórico por um layout em duas linhas:
  - Linha 1: recurso (já em PT) · status · itens · hora.
  - Linha 2 (apenas quando `r.status === "error"` e `r.error_message`): texto pequeno `text-[10px] text-destructive/80` com `truncate` mostrando `r.error_message`, e `title={r.error_message}` para hover nativo.
- Envolver o status `error` em `<Tooltip>` (`TooltipProvider` já está importado) com `<TooltipContent>` exibindo a mensagem completa (até 1000 chars).

**Arquivo:** `src/routes/_authenticated/integracao-bling.tsx` (tabela `lastRuns`, ~linha 215–228)

- Na coluna “Erro”, hoje só mostra `truncate` com `title`. Trocar por `<Tooltip>` (importar `Tooltip*` de `@/components/ui/tooltip`) que abre `TooltipContent` com a mensagem completa em `whitespace-pre-wrap break-words max-w-md`. Mantém o truncate inline para não quebrar layout.
- Envolver a tabela em `TooltipProvider`.

> Apenas leitura/exibição — `error_message` já vem do `getBlingStatus` (linha 75 de `bling.functions.ts`).

### 2. `bling-sync-tick.tsx` — um recurso por tick **por tenant**

**Arquivo:** `src/routes/api/public/hooks/bling-sync-tick.tsx`

Substituir o loop atual (que tenta orders + products + contacts + stock + deposits no mesmo tick) por seleção de **um único recurso pendente por tenant**, com prioridade:

```text
1. Resume run "running" mais antiga (qualquer recurso entre orders/products/contacts) — termina antes de abrir nova frente.
2. Senão, escolhe o recurso com freshness mais antigo entre [orders, products, contacts] (last ok finished_at; nulls = mais antigo).
3. stock e deposits NÃO concorrem com o slot principal — entram só se nenhum dos três acima precisou rodar (são single-shot baratos). Mantém a regra "deposits 1x/24h".
```

Implementação:

- Para cada tenant: query única em `bling_sync_runs` filtrando `status='running'` + `next_page is not null` em `('orders','products','contacts')`, order by `started_at asc` limit 1 → se achou, roda `fn(resumeRunId)` e termina o tenant.
- Senão, query `select resource, max(finished_at) ...` agrupando os 3 recursos para escolher o mais defasado e roda **apenas** ele (incremental).
- Só se `picked === null` (ex.: sem credenciais / sem dados), tenta `stock` e em seguida `deposits` (com a regra 24h).
- Mantém o `reaper` no início e a auth via `apikey`.

Ganho: cada execução por tenant faz no máximo 1 chamada `runPaginatedBatch` (≤ ORDERS_PAGES_PER_BATCH = 1 página de 20 pedidos, ou 5 páginas de produtos/contatos), bem abaixo do limite de tempo do Worker.

### 3. `sync.server.ts` — log de tempo por página

**Arquivo:** `src/lib/bling/sync.server.ts`, função `runPaginatedBatch` (loop ~419–438)

Em volta de cada iteração:

```ts
const tFetch0 = Date.now();
const resp = await blingFetch(...);
const tFetch1 = Date.now();
// ...
const n = await upsert(list);
const tUp1 = Date.now();
console.log(`[bling-sync] tenant=${tenantId} resource=${resource} page=${pagina} fetchMs=${tFetch1 - tFetch0} upsertMs=${tUp1 - tFetch1} items=${n} total=${count}`);
```

Substitui o `console.log` atual (linha 433). Para `orders`, `upsertMs` engloba o detail-fetch dos itens — fica óbvio no log se o gargalo é Bling (fetch) ou Supabase (upsert).

### 4. `endRun` — preservar status e body do `BlingError`

**Arquivo:** `src/lib/bling/sync.server.ts`, função `errMessage` (linhas 480–483)

Hoje já existe `errMessage` que serializa `BlingError` como `"<msg> :: <body slice 500>"`. Mas o `runPaginatedBatch` chama `endRun(..., msg, ...)` que trunca em 1000 chars — OK. Reforçar:

- Em `errMessage`, incluir `status` explícito: `` `[${e.status}] ${e.message} :: ${JSON.stringify(e.body).slice(0, 700)}` ``.
- Em `runPaginatedBatch` (catch ~443), além de `console.error`, registrar também `pagina` e `count` no `meta` do `endRun`:
  ```ts
  await endRun(runId, false, count, msg, { mode, dataAlteracaoInicial, failedPage: pagina, failedAfterCount: count });
  ```
- Aplicar o mesmo padrão nos catches de `syncDeposits` e `syncStock` (já chamam `errMessage`, então herdam o status/body — só confirmar).

> Não mexe em `bling_sync_runs.error_message` (já é `text` sem limite de tamanho duro; o cap de 1000 chars é client-side em `endRun`).

## Fora de escopo

- Sem migrations, sem mudança no cron schedule, sem mudança em RLS.
- Sem alteração em `client.server.ts` (throttle / refresh já está OK).
- Sem alteração no comportamento do botão "Sync FULL (tudo)" do admin — ele continua disparando `runUntil` sequencial direto.
