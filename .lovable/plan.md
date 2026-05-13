
# Diagnóstico + Plano

## Por que "Pedidos" é absurdamente mais lento que "Contatos"

A diferença não é volume — é o **número de chamadas HTTP por item**:

| Recurso  | Itens por requisição Bling | Chamadas para 480 itens |
|----------|----------------------------|-------------------------|
| Contatos | 100 por página (lista já traz tudo) | **5** chamadas |
| Pedidos  | Lista NÃO traz `itens` → 1 GET por pedido (`/pedidos/vendas/{id}`) | **480 + paginação ≈ 492** chamadas |

Com o throttle de **4 req/s** do Bling (260 ms entre chamadas), Promise.all não ajuda — a fila por tenant serializa tudo. Resultado teórico:
- Contatos 6000: 60 chamadas × 0,26 s ≈ **16 s**
- Pedidos 480: 492 chamadas × 0,26 s ≈ **128 s** (dados reais mostram 600-700s, indicando latência adicional do Bling + 429s)

É um clássico **N+1**: a lista é "grátis", o detalhe é caríssimo. Não é bug — é o desenho da API Bling. Só dá para mitigar evitando refetchar detalhes quando o pedido não mudou.

Outra evidência do banco (`bling_sync_runs`):
- A run "ok" mais antiga fez **49.544 pedidos em 330 s** — só foi possível porque na época o detail-fetch ainda não existia.
- As runs recentes morrem com `Stale: sem heartbeat há mais de 5 minutos` mesmo com o ticker de 30 s. Causa provável: o Worker (Cloudflare) é morto quando o tick estoura o limite de duração com 40 detalhes em sequência + retries 429, parando o heartbeat.

## Por que as páginas ficam lentas (Configurações ↔ Clientes)

1. **`BlingAdminPanel` faz 6 `COUNT(exact)` + lista 20 runs a cada 10 s, por tenant na tela** (`refetchInterval: 10000` em `getBlingStatus`). Em `bling_order_items` e `bling_orders` (dezenas de milhares de linhas), cada COUNT exato é um scan parcial. Com N tenants expandidos = 6×N counts a cada 10 s. É o maior ofensor.
2. `useQuery` sem `staleTime` em `listTenantsAdmin` e `getBlingStatus` → toda navegação refaz TODA a query, mesmo voltando de `/admin/settings`.
3. `listTenantsAdmin` carrega **todos** os profiles sem paginação nem filtro.
4. Falta índice em `bling_order_items(tenant_id)` (e provavelmente em `bling_orders(tenant_id)`), tornando COUNTs ainda mais caros.

## Plano de correções

### A) Sync de Pedidos — quebrar o N+1

1. **Skip de detalhe quando nada mudou.** Antes do `fetchAndUpsertOrderItems`, ler os pares `(bling_id, bling_updated_at)` já existentes em `bling_orders` para os IDs do batch. Se `dataAlteracao` da lista == `bling_updated_at` armazenado **e** já existe `bling_order_items` para o pedido, não buscar detalhe. Em sync incremental isso reduz ~95% dos detail-fetches.
2. **Aumentar `ORDERS_PAGES_PER_BATCH` para 2** e o ticker de heartbeat para a cada 10 s (em vez de 30 s) — reduz risco de stale e ainda cabe no Worker quando o item-skip vale.
3. **Backoff exponencial em 429** (hoje é fixo 1500 ms). Após 2 retries, abortar a página e pausar para o próximo tick.
4. Logar no `meta` da run quantos detalhes foram pulados vs. buscados, para visibilidade.

### B) Página Admin/Clientes — fim do refetch agressivo

5. **`getBlingStatus`**: aumentar `refetchInterval` para 60 s (status muda devagar) e `staleTime: 30_000`. Torna a heatmap de COUNTs 6× mais leve.
6. **Trocar `count: "exact"` por `count: "estimated"`** nos 6 COUNTs (`bling_products/orders/items/...`). Para o painel de status uma estimativa serve — exato custa scan.
7. **`listTenantsAdmin`**: adicionar `staleTime: 60_000` no `useQuery`, e selecionar só as colunas usadas em `profiles` (sem `created_at` se não exibido).
8. Memoizar `profiles.filter(p => p.tenant_id === t.id)` (hoje roda O(N×M) a cada render).

### C) Resiliência das runs longas

9. Migration: criar índices `bling_order_items(tenant_id, order_bling_id)` e `bling_orders(tenant_id, bling_updated_at)` se não existirem.
10. Reaper: aumentar tolerância para 8 min (algumas runs ficam 5-6 min sem chance de heartbeat quando o Worker está com fila).

## Detalhes técnicos

**Arquivos editados:**
- `src/lib/bling/sync.server.ts` — skip de detail-fetch, heartbeat 10s, backoff 429, 2 páginas/tick.
- `src/lib/bling/client.server.ts` — backoff exponencial em 429.
- `src/lib/bling.functions.ts` — `getBlingStatus` usando `count: "estimated"` (tipagem `head: true, count: "estimated"`).
- `src/routes/_authenticated/_admin/admin.clients.tsx` — `staleTime` + `refetchInterval` ajustados, `useMemo` no filtro de profiles.
- `src/routes/_authenticated/integracao-bling.tsx` — mesmos ajustes de cache.
- Nova migration: índices + ajuste do reaper para 8 min.

**Não vou mexer em:**
- Estrutura do throttle por tenant (já está correta).
- `pauseRun`/`markRunning` (já corrigido na rodada anterior).
- Lógica de cron / setup automático.

**Resultado esperado:**
- Sync incremental de pedidos cai de ~600 s para <30 s quando poucas alterações (caso comum).
- Mudança entre `/admin/settings` e `/admin/clients` deixa de disparar 6 COUNTs exatos por tenant — fica instantânea.
