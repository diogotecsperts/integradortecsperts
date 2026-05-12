## Objetivo
Dar à IA visão detalhada de **PRODUTOS** (itens de pedido) e **CLIENTES** (contatos com geo), habilitando análises de top-sellers, faturamento por UF e cruzamento produto×venda. Reaproveita o padrão de batching paginado já em uso para `orders`/`products`.

## 1. Banco de dados (migration)

### Tabela `bling_order_items`
- `id uuid pk default gen_random_uuid()`
- `tenant_id uuid not null`
- `order_bling_id bigint not null` (referencia `bling_orders.bling_id` lógico, sem FK cross-tenant rígida — usar (tenant_id, order_bling_id))
- `bling_item_id bigint` (id do item retornado pelo Bling, quando houver)
- `produto_id bigint` (bling_id do produto)
- `codigo text`, `descricao text`
- `quantidade numeric not null default 0`
- `preco numeric not null default 0` (preço unitário)
- `valor_total numeric` (qtd × preço)
- `raw jsonb not null default '{}'`
- `synced_at timestamptz not null default now()`
- Unique: `(tenant_id, order_bling_id, bling_item_id)` quando `bling_item_id` presente; índice secundário `(tenant_id, produto_id)`, `(tenant_id, order_bling_id)`.
- RLS: `select` para `is_superadmin() OR tenant_id = get_user_tenant(auth.uid())`. Sem insert/update/delete pelo cliente (gravação só via service role).

### Tabela `bling_contacts`
- `id uuid pk default gen_random_uuid()`
- `tenant_id uuid not null`
- `bling_id bigint not null`
- `nome text`, `numero_documento text`, `tipo text` (`F`/`J`), `email text`, `telefone text`
- `cidade text`, `uf text`, `cep text`
- `situacao text`
- `raw jsonb not null default '{}'`
- `bling_updated_at timestamptz`, `synced_at timestamptz default now()`
- Unique: `(tenant_id, bling_id)`. Índice em `(tenant_id, uf)`.
- RLS idêntica a `bling_contacts_select` (mesmo padrão das outras tabelas Bling).

> Não usamos FK cruzando tenants — seguimos o mesmo padrão de "espelho" das tabelas Bling existentes (chaves lógicas via `tenant_id + bling_id`).

### RPCs novas (SECURITY DEFINER, search_path = public, filtro `_tenant_id`)

- **`agent_top_products(_tenant_id uuid, _from date, _to date, _limit int default 10)`** → join `bling_order_items` × `bling_orders` por `(tenant_id, order_bling_id = o.bling_id)` filtrando `o.data BETWEEN _from AND _to`, agrupando por `produto_id` → retorna `produto_id, codigo, nome, qtd_total, faturamento, pedidos_count` ordenado por `qtd_total DESC`.
- **`agent_sales_by_region(_tenant_id uuid, _from date, _to date)`** → join `bling_orders` × `bling_contacts` por `(tenant_id, cliente_id = c.bling_id)`, agrega por `c.uf` → `uf, total, cnt, customers` ordenado por `total DESC`.
- **`agent_summarize_sales`**: adicionar branch `_group_by = 'product'` que delega a `agent_top_products` (mesma assinatura de saída adaptada: `group_key = nome|codigo, total = faturamento, cnt = qtd_total, customers = pedidos_count`).

## 2. Ingestão (`src/lib/bling/sync.server.ts`)

### `syncOrders` — gravar itens
Após o `upsert` em `bling_orders`, no mesmo callback `upsert`:
- Coletar `o.itens` (array do raw Bling) por pedido.
- Para cada item: mapear `{ tenant_id, order_bling_id: o.id, bling_item_id: it.id ?? null, produto_id: it.produto?.id ?? null, codigo: it.codigo, descricao: it.descricao, quantidade, valor (preço unit.), valor_total: qtd*valor, raw: it, synced_at }`.
- Estratégia de upsert idempotente: para cada pedido do batch, **deletar `bling_order_items` onde `(tenant_id, order_bling_id)` está no batch** e em seguida `insert` em massa. Isso evita conflito quando itens são removidos no Bling. Operação faz parte do mesmo tick — sem alterar `PAGES_PER_BATCH` (5).

> Verificar antes da implementação se `/pedidos/vendas` (lista) já retorna `itens` no payload da página. Se vier vazio na lista (Bling costuma só popular itens em `/pedidos/vendas/{id}`), **fazer fallback**: para cada pedido sem itens, chamar `GET /pedidos/vendas/{id}` (respeitando o throttle 3 req/s). Para manter o tick curto, esse fallback fica condicionado a `PAGES_PER_BATCH=5` × `100 pedidos/página` = até 500 chamadas extras/tick — se isso ficar pesado, baixamos o batch para `2` páginas só na rota orders. Decisão final fica no código após inspecionar o payload em runtime; o plano cobre os dois caminhos.

### `syncContacts` (novo)
- Reutiliza `runPaginatedBatch` com `path = "/contatos"`, `resource: "contacts"` (adicionar `"contacts"` ao tipo `Resource`).
- Suporta `full` e `incremental` via `dataAlteracaoInicial` (mesmo padrão de products/orders).
- Mapear: `bling_id, nome, numeroDocumento, tipo, email, telefone, endereco.geral.{municipio, uf, cep}, situacao, dataAlteracao, raw`. Upsert em `bling_contacts` por `(tenant_id, bling_id)`.

### Cron tick (`src/routes/api/public/hooks/bling-sync-tick.tsx`)
Adicionar `"contacts"` ao loop de retomada/disparo incremental, ao lado de `orders` e `products`. Stock e deposits permanecem como estão.

## 3. Ferramentas da IA (`src/lib/agent.functions.ts`)

### Novas tools
- **`get_top_products({ from?, to?, limit? })`** → `agent_top_products`. Defaults: últimos 30 dias, `limit=10`. Retorna `{ from, to, results: [{produto_id, codigo, nome, qtd_total, faturamento, pedidos_count}] }`.
- **`get_sales_by_region({ from?, to? })`** → `agent_sales_by_region`. Retorna `{ from, to, regions: [{uf, total, cnt, customers}] }`.

### Atualizar `summarize_sales`
- Adicionar `"product"` ao enum `group_by`. Quando `group_by="product"`, chama `agent_summarize_sales` com `_group_by='product'` (que internamente usa `agent_top_products`). Mantém formato `{ from, to, total, count, customers, ticket_medio, groups }` para a UI/markdown não quebrar.
- Atualizar descrição da tool: "Use `group_by='product'` quando o usuário perguntar sobre produtos mais vendidos / ranking / top produtos".

### Diretrizes do system prompt
Acrescentar uma linha em `buildFormattingRules`: "Para perguntas sobre **produtos vendidos** prefira `get_top_products`; para **regiões/estados** use `get_sales_by_region`."

## Arquivos

- **Migration nova**: `bling_order_items`, `bling_contacts` (+ RLS + índices), RPCs `agent_top_products`, `agent_sales_by_region`, atualização de `agent_summarize_sales`.
- **Editado**: `src/lib/bling/sync.server.ts` — gravação de itens em `syncOrders`, novo `syncContacts`, `Resource` inclui `"contacts"`.
- **Editado**: `src/routes/api/public/hooks/bling-sync-tick.tsx` — incluir `contacts` no loop de retomada/incremental.
- **Editado**: `src/lib/bling.functions.ts` — expor `syncContacts` para disparo manual na tela de Integração Bling (mesmo botão padrão).
- **Editado**: `src/routes/_authenticated/integracao-bling.tsx` — adicionar card/botão "Sincronizar Contatos" e mostrar status do recurso `contacts`.
- **Editado**: `src/lib/agent.functions.ts` — 2 tools novas, branch `product` em `summarize_sales`, hint no system prompt.

## Fora de escopo
- UI de listagem de itens/contatos (apenas backend + IA).
- Sincronização de variações de produto, depósito por item, NF-e.
- Métricas de margem/custo (Bling não expõe custo em `/pedidos/vendas`).
- Cache cross-tenant das RPCs.
