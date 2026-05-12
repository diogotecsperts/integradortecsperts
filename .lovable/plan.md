## Objetivo

Eliminar timeouts nas tools de BI do agente movendo a agregação para o Postgres via RPCs `SECURITY DEFINER`, evitando trazer milhares de linhas para o runtime do servidor.

## Mudanças

### 1. Migration — novas RPCs agregadas

Criar funções no schema `public`, todas com `SECURITY DEFINER`, `SET search_path = public`, recebendo `_tenant_id uuid` como primeiro argumento (chamadas via `supabaseAdmin`, então o filtro por tenant é explícito):

- **`agent_summarize_sales(_tenant_id, _from date, _to date, _group_by text)`**
  - Retorna `TABLE(group_key text, total numeric, count bigint, customers bigint)`.
  - `_group_by` aceita `'none' | 'day' | 'month' | 'situacao'`.
  - Usa `SUM(valor_total)`, `COUNT(*)`, `COUNT(DISTINCT cliente_id)` agrupado conforme parâmetro (ou sem `GROUP BY` quando `none`, devolvendo 1 linha com `group_key = NULL`).
  - Filtra `tenant_id = _tenant_id AND data BETWEEN _from AND _to`.

- **`agent_sales_availability(_tenant_id)`**
  - Retorna `TABLE(earliest date, latest date, total_orders bigint)`.
  - Usado apenas quando o resultado principal vier vazio (preserva o `data_availability` atual).

- **`agent_low_stock(_tenant_id, _threshold numeric, _limit int)`**
  - Retorna `TABLE(produto_id bigint, saldo_total numeric, codigo text, nome text)`.
  - `SELECT produto_id, SUM(saldo_fisico) ... FROM bling_stock_balances WHERE tenant_id = _tenant_id GROUP BY produto_id HAVING SUM(saldo_fisico) <= _threshold ORDER BY saldo_total ASC LIMIT _limit`, com `LEFT JOIN bling_products` para enriquecer `codigo`/`nome` em uma única query.

Índices a verificar/criar se ausentes (apenas se não existirem):
- `bling_orders (tenant_id, data)`
- `bling_stock_balances (tenant_id, produto_id)`

### 2. `src/lib/agent.functions.ts` — refator das tools

- **`summarize_sales`**: substituir o `select("data, valor_total, ...").limit(10000)` por `supabaseAdmin.rpc("agent_summarize_sales", { _tenant_id, _from, _to, _group_by })`. Construir o resultado final (`total`, `count`, `customers`, `ticket_medio`, `groups`) a partir das linhas agregadas. Se vier vazio, chamar `agent_sales_availability` para o bloco `data_availability` + `hint` (mantém comportamento atual).
- **`low_stock_alerts`**: substituir o download de saldos + map em JS por uma única chamada `supabaseAdmin.rpc("agent_low_stock", { _tenant_id, _threshold, _limit })`. Remover o segundo `select` em `bling_products` (join feito no SQL).
- **`search_products`**: manter (já tem `limit ≤ 20`), apenas garantir `.select` enxuto (sem `*`).
- **`get_stock_for_product`**: manter (filtra por `produto_id`, volume limitado por produto). Trocar `select("*")` implícitos? Já usa colunas específicas — sem mudanças.

### 3. Diretrizes preservadas

- Nenhuma mudança em prompts, fluxo de tool-calling, persona ou UI.
- Todas as queries continuam escopadas por `tenant_id`.
- Nenhuma tool pode mais fazer `select` sem agregação em `bling_orders` ou `bling_stock_balances`.

## Arquivos

- **Migration nova**: `agent_summarize_sales`, `agent_sales_availability`, `agent_low_stock` (+ índices condicionais).
- **Editado**: `src/lib/agent.functions.ts` (apenas os dois handlers).

## Fora de escopo

Sync do Bling, UI do admin, persona/IA, novos recursos.
