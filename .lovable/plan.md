# Plano: Sync Bling Resiliente (anti-timeout)

## Diagnóstico

O timeout vem do `syncOrders`: cada página retorna 100 pedidos e cada pedido faz um GET de detalhe (`/pedidos/vendas/{id}`) com throttle de 260ms. 100 × 0,26s ≈ 26s, perigosamente perto do limite de 30s do Worker. Hoje `ORDERS_PAGES_PER_BATCH=1`, mas o problema real é o **tamanho da página**, não o número de páginas.

Além disso, hoje no `bling-sync-tick.tsx`, se um recurso (ex.: orders) lança exceção dentro do bloco `try` do tenant, o `catch` externo aborta os recursos seguintes (products/contacts) — sem isolamento por recurso.

## 1) `src/lib/bling/sync.server.ts`

- Adicionar parâmetro opcional `pageLimit` em `runPaginatedBatch` (default 100).
- Em `syncOrders`, passar `pageLimit: 20` e manter `pagesPerBatch: 1`. Resultado: ≤20 detalhes por execução (~5–7s), bem dentro do limite.
- Continuar respeitando o throttle global de ~3,8 req/s já implementado em `client.server.ts` (não alterar).
- Adicionar `console.log` curto após cada upsert bem-sucedido em cada `upsert(...)` (orders/products/contacts), incluindo `tenant_id`, `resource`, `page`, `count` e `items_processed_total`. Isso aparece no painel de logs do servidor.
- Em `fetchAndUpsertOrderItems`, logar warning quando um detalhe individual falha (já existe `console.error` — manter, mas padronizar prefixo `[bling-sync]`).
- Garantir que `endRun(..., false, count, errMessage(e), ...)` recebe a string completa (`BlingError` já serializa `body` truncado em 500 chars). Verificar que nenhuma camada acima engole o erro antes do `endRun`.

## 2) `src/routes/api/public/hooks/bling-sync-tick.tsx`

- Refatorar o loop interno por recurso para que cada `await fn(...)` esteja em **seu próprio** `try/catch`, gravando `tenantOut[`${resource}_error`]` e seguindo para o próximo recurso. Hoje só `stock` e `deposits` têm catch isolado; `orders/products/contacts` compartilham o `try` externo.
- Após cada chamada bem-sucedida, `console.log("[bling-sync-tick] tenant=… resource=… done=… count=… nextPage=…")`.
- Manter o reaper e a checagem de `pending` resume.

## 3) Verificação de Integridade (`bling_sync_runs`)

- Auditoria rápida do fluxo de erro:
  - `runPaginatedBatch` já chama `endRun(runId, false, count, errMessage(e), …)` no catch — confirmar que `errMessage` inclui status + body do `BlingError`.
  - `syncDeposits` e `syncStock` idem.
  - O painel `integracao-bling.tsx` já lê `error_message` da última run — sem mudança necessária, mas validar visualmente após a refatoração.
- Adicionar pequeno hardening: truncar `error_message` em 1000 chars antes de gravar (evita payloads enormes em casos de HTML 502).

## Detalhes técnicos

```text
runPaginatedBatch(args)
  args.pageLimit ?? 100
  searchParams: { pagina, limite: pageLimit, dataAlteracaoInicial }
  break-condition: list.length < pageLimit  (não mais < 100 hardcoded)

syncOrders → runPaginatedBatch({ ..., pagesPerBatch: 1, pageLimit: 20 })
```

Logs propostos (prefixo `[bling-sync]`):
- `tenant=<uuid> resource=orders page=<n> upserted=<k> total=<count>`
- `tenant=<uuid> resource=orders item-detail-fail order=<id> err=<msg>`

## Fora de escopo

- Mudar throttle ou ativar paralelismo de detalhes (manteria risco de 429).
- Backfill em background workers / queue.
- UI nova; só reaproveita o painel atual.

## Arquivos editados

- `src/lib/bling/sync.server.ts`
- `src/routes/api/public/hooks/bling-sync-tick.tsx`
