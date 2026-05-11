# Etapa 1 — Pedidos de Venda (BI real) + Etapa 2 — Agente IA Minimax

Diretriz mantida: **somente GET na API do Bling (READ-ONLY)**. Nenhuma rota de escrita.

---

## Etapa 1 — Sincronização de Pedidos de Venda

### 1.1 Migration: tabela `bling_orders`

Colunas:
- `tenant_id uuid not null`
- `bling_id bigint not null` (id do pedido no Bling)
- `numero text` (número visível do pedido)
- `data date` (data do pedido)
- `data_saida date` (quando houver)
- `valor_total numeric(14,2) not null default 0`
- `situacao_id int`, `situacao_nome text`, `situacao_valor int` (status oficial Bling)
- `cliente_id bigint`, `cliente_nome text`, `cliente_documento text`
- `loja_id bigint`, `numero_loja text` (origem marketplace)
- `raw jsonb not null default '{}'`
- `bling_updated_at timestamptz`
- `synced_at timestamptz not null default now()`
- PK composta `(tenant_id, bling_id)`
- Índices: `(tenant_id, data)`, `(tenant_id, situacao_id)`

RLS:
- `enable row level security`
- Policy `bling_orders_select`: `is_superadmin() OR tenant_id = get_user_tenant(auth.uid())`
- Sem INSERT/UPDATE/DELETE para `authenticated` (escrita só via `supabaseAdmin`).

### 1.2 `syncBlingOrders` em `src/lib/bling/sync.server.ts`

- Resource type: estender `Resource` com `"orders"`.
- `mode: "full" | "incremental"`. No incremental, lê `finished_at` da última run `ok` de `orders` e converte para o formato `YYYY-MM-DD HH:mm:ss` (mesmo padrão do `syncProducts`), passando como `dataAlteracaoInicial` em `GET /pedidos/vendas`.
- Loop paginado igual ao de produtos (`pagina/limite=100`).
- Mapper: extrai `id`, `numero`, `data`, `dataSaida`, `total`, `situacao.{id,valor}`, `contato.{id,nome,numeroDocumento}`, `loja.id`, `numeroLoja`, `dataAlteracao`. Persiste `raw` cru para BI futuro.
- Upsert `onConflict: "tenant_id,bling_id"`.
- `startRun/endRun` no padrão atual (`bling_sync_runs`).

> Observação: `GET /pedidos/vendas` retorna a "situação" como `{id, valor}`. Para o nome textual ("Em aberto", "Atendido", etc.) basta uma tabela estática de mapeamento no mapper — sem chamar `/situacoes`. Documento isso em `bling-api-v3.notes.md`.

### 1.3 Exposição via server function

Em `src/lib/bling.functions.ts`:
- Estender o enum de `runBlingSync.resource` para incluir `"orders"`.
- Quando `resource === "all"`, rodar também `syncOrders` após `products`.
- Atualizar `getBlingStatus` para retornar `counts.orders`.

### 1.4 UI Admin — botão "Sync Pedidos"

Em `BlingAdminPanel` dentro de `admin.clients.tsx`:
- Adicionar `SyncBtn` para `orders` (FULL e Incremental), idêntico ao de produtos.
- Card de contagens: incluir "Pedidos: N".

### 1.5 Dashboard real (`src/routes/_authenticated/dashboard.tsx`)

- Nova server function `getDashboardMetrics` (`requireSupabaseAuth`, lê `tenant_id` do profile do usuário).
- Janela: últimos 180 dias.
- Consultas em `bling_orders` filtradas por `tenant_id`:
  - Totais: `sum(valor_total)`, `count(*)`, distinct `cliente_id` (clientes únicos), `avg(valor_total)`.
  - Série mensal: agrupada por `to_char(data, 'YYYY-MM')`.
  - Mix por situação (substitui o gráfico de "Por categoria", já que a Etapa 1 não traz categoria de produto agregada por venda — fica a porta aberta para futura junção com `bling_products`).
- Front: substituir uso de `bi_metrics_mock` por `useQuery` que chama a nova server fn. Manter visual atual; trocar apenas o data source e o gráfico de categorias por "vendas por situação" (com fallback para "sem dados — rode Sync Pedidos").
- Não removo a tabela `bi_metrics_mock` agora (segurança); apenas paro de consumir.

---

## Etapa 2 — Agente IA Minimax (plano técnico — **aplico só após sua aprovação**)

### 2.1 Persistência de conversa

Já existem `ai_conversations` e `ai_messages` (schema ok). O front em `agent.tsx` hoje é um stub — passa a:
- Criar/abrir uma `ai_conversations` por sessão (auto-título com a 1ª pergunta).
- Persistir cada mensagem do usuário e do assistente em `ai_messages` via server fn.

### 2.2 Server function `chatWithAgent` (não Edge Function)

Arquivo `src/lib/agent.functions.ts` (TanStack server fn — alinhado ao padrão do projeto):
- `requireSupabaseAuth` → resolve `tenantId` do profile.
- Busca `tenant_settings.minimax_api_key`. Se ausente, retorna erro amigável ("Configure a chave Minimax nas configurações do tenant").
- Carrega histórico (`ai_messages` por `conversation_id`, ordem cronológica).
- Monta payload e chama **`POST https://api.minimax.io/v1/text/chatcompletion_v2`** com:
  ```json
  { "model": "minimax m2.7", "messages": [...], "tools": [...], "tool_choice": "auto" }
  ```
  Header: `Authorization: Bearer <minimax_api_key>`.
- Loop de tool calling até no máx. 4 iterações ou até resposta final sem `tool_calls`.
- Persiste a resposta final em `ai_messages` (role `assistant`).

### 2.3 Tools (function calling) — somente leitura no banco local

Definidas no payload e executadas server-side com `supabaseAdmin` filtrando sempre por `tenantId` (nunca confiando no que o LLM mandar):

| Tool | Descrição | Parâmetros |
|---|---|---|
| `search_products` | Busca produtos por nome/código/gtin | `q: string`, `limit?: int<=20` |
| `get_stock_for_product` | Saldo físico/virtual por depósito de um produto | `produto_id: bigint` |
| `summarize_sales` | Agregados de vendas em janela de tempo | `from?: date`, `to?: date`, `group_by?: 'day'|'month'|'situacao'` |
| `top_products_by_sales` | Top N produtos por valor (cruza `bling_orders.raw → itens` com `bling_products`) | `from?: date`, `to?: date`, `limit?: int<=20` |
| `low_stock_alerts` | Produtos com `saldo_fisico <= threshold` | `threshold?: number` (default 5) |

Cada tool é uma função TS pura que recebe `{ tenantId, args }` e roda Postgres via `supabaseAdmin`. Para agregados pesados, usar `.rpc` opcionalmente em fase futura — nesta etapa, `select` direto basta.

### 2.4 System Prompt

> "Você é um Especialista em BI e ERP integrado ao Bling. Responde em PT-BR, de forma objetiva e numérica, sempre usando as ferramentas disponíveis para consultar dados reais do tenant antes de responder. Nunca invente números. Se faltar dado (ex.: nenhum pedido sincronizado), oriente o usuário a rodar o Sync no painel."

### 2.5 Como os dados são "injetados" no chat (resumo pedido)

Fluxo em uma rodada:

```text
[Usuário] "Resuma minhas vendas do mês"
   │
   ▼
chatWithAgent (server fn)
   │  1. carrega histórico da conversa
   │  2. monta messages = [system, ...histórico, user]
   │  3. POST Minimax (model=minimax m2.7, tools=[...])
   ▼
Minimax responde com tool_calls=[summarize_sales{from:..,to:..,group_by:'month'}]
   │
   ▼
Server executa a tool no Postgres (filtro tenant_id) e devolve JSON enxuto
   │
   ▼
POST Minimax de novo com messages += [assistant(tool_calls), tool(result)]
   │
   ▼
Minimax responde texto final ("Em novembro: R$ 128.450 em 312 pedidos…")
   │
   ▼
Persiste em ai_messages e retorna ao front
```

Ou seja: **o LLM nunca recebe o banco inteiro no prompt**. Ele pede via tool, o servidor consulta de forma escopada por tenant, e devolve só o agregado necessário. Isso mantém token-cost baixo, garante isolamento multi-tenant e evita vazamento de PII de outros tenants.

### 2.6 Front (`agent.tsx`)

- Substitui o `setTimeout` mock por `useMutation` chamando `chatWithAgent`.
- Mantém renderização Markdown atual.
- Mostra estado "pensando…" enquanto há tool-loop em andamento (resposta única no fim — sem streaming nesta primeira versão para simplificar; streaming pode entrar numa iteração futura).
- Lista de conversas no sidebar fica para iteração futura; nesta etapa cria uma conversa por sessão.

### 2.7 Tratamento de erros

- 401/403 da Minimax → "Chave Minimax inválida — atualize em Configurações".
- 429 → toast "Limite de requisições atingido, tente novamente".
- Tool error → loga em `audit_logs` e devolve mensagem genérica ao usuário.

---

## Ordem de execução proposta

1. Migration `bling_orders` (aguarda sua aprovação no diff de migration).
2. `syncBlingOrders` + expor em `runBlingSync` + botão no admin.
3. Refatorar `/dashboard` para consumir `bling_orders`.
4. **Pausa para você rodar Sync Pedidos** e validar números.
5. Etapa 2 (agente IA) — só depois da sua confirmação do plano 2.5 acima.
