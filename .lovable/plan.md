## Diagnóstico

Investiguei o banco e a documentação oficial da Minimax. Encontrei **2 causas independentes** que explicam exatamente o que você está vendo.

### Causa 1 — Superadmin sem `tenant_id`

```
profiles:
 diogomixcds@gmail.com   → tenant_id = NULL   (superadmin)
 diogotecinove@gmail.com → tenant_id = d23d…  (cliente, dono dos 49.538 pedidos)
```

- `getDashboardMetrics` faz `select tenant_id from profiles where id = userId` e, se vier `null`, retorna `null` sem nem consultar `bling_orders`. Como você é superadmin, sempre cai aqui → **dashboard vazio**.
- `chatWithAgent` faz a mesma checagem e lança `"Sem tenant associado."` antes mesmo de chamar a Minimax → **agente não responde nada**.

Os dados estão lá: `bling_orders` tem **49.538 linhas** sincronizadas com sucesso para o tenant do cliente.

### Causa 2 — Configuração da Minimax incorreta

Conferi a doc oficial (`platform.minimax.io/docs/api-reference/text-chat-openai`). A assinatura correta é:

| Item | O que está hoje | O que a doc oficial pede |
|---|---|---|
| Endpoint | `https://api.minimax.io/v1/text/chatcompletion_v2` | `https://api.minimax.io/v1/chat/completions` (OpenAI-compatível) |
| Header | `Authorization: Bearer <key>` | ✅ igual |
| `model` | `"minimax m2.7"` | `"MiniMax-M2.7"` (case-sensitive, com hífen) |
| Tool calling | `tools` + `tool_choice: "auto"` | ✅ suportado igual ao OpenAI |
| Resposta | `{ base_resp, choices }` | OpenAI-padrão `{ choices, usage }` |

Mesmo que o `tenant_id` estivesse certo, a chamada para Minimax falharia (404 / "model not found").

---

## Plano de correção

### 1. Permitir Superadmin escolher um tenant para BI/Agent

- Adicionar nova server function `listTenantsForAdmin` (super-admin only) em `src/lib/admin.functions.ts` retornando `id, name` dos tenants ativos.
- Criar helper `resolveActiveTenantId(userId, requestedTenantId?)`:
  - Se usuário é superadmin → usa `requestedTenantId` (validado contra a lista de tenants); se não houver, pega o primeiro tenant ativo como default.
  - Se usuário é cliente → ignora `requestedTenantId`, força o `profile.tenant_id`.
- Atualizar:
  - `getDashboardMetrics` → recebe opcional `tenantId` no input.
  - `chatWithAgent` → recebe opcional `tenantId` no input (e persiste a conversa nesse tenant).
- UI:
  - **Dashboard** (`src/routes/_authenticated/dashboard.tsx`): se o usuário for superadmin, mostrar um `<Select>` no topo "Visualizando dados de: [Cliente]" persistido em `localStorage`. Cliente comum não vê o seletor.
  - **Agente** (`src/routes/_authenticated/agent.tsx`): mesma lógica — superadmin escolhe o tenant antes de chatear; o seletor reusa o componente.
- Fallback amigável quando não há nenhum tenant com pedidos: mantém o card vazio com CTA "Rodar Sync Pedidos".

### 2. Corrigir cliente Minimax para conformidade com a doc oficial

Em `src/lib/agent.functions.ts`:

- Trocar constante:
  ```ts
  const MINIMAX_URL = "https://api.minimax.io/v1/chat/completions";
  const MODEL = "MiniMax-M2.7";
  ```
- Ajustar parser de resposta para o formato OpenAI puro (remover dependência de `base_resp`); manter tratamento de 401/402/429.
- Garantir que o `system` message use o formato suportado (`role: "system", content: "<prompt>"`) e que mensagens `tool` sigam o schema OpenAI (`role: "tool", tool_call_id, content`) — já está, só validar.
- Adicionar `max_tokens: 2048` e `temperature: 0.2` para respostas determinísticas de BI.
- Logar `console.error` com `status + body` em caso de erro para facilitar debug futuro via `server-function-logs`.

### 3. Verificação

- Após aplicar, eu vou:
  1. Chamar `getDashboardMetrics` via `invoke-server-function` autenticado como superadmin com o `tenant_id` do cliente real → confirmar que volta `totals.orders ≈ 49538`.
  2. Chamar `chatWithAgent` com a pergunta `"Resuma minhas vendas dos últimos 30 dias."` → confirmar resposta textual com números reais.
  3. Conferir os logs (`server-function-logs`) para garantir que não há mais 404 da Minimax.

### O que NÃO vou tocar

- Esquema do banco (já está correto, dados presentes).
- Diretriz READ-ONLY do Bling.
- Lógica de sincronização de pedidos/estoque/produtos (todas em `ok`).

---

## Detalhes técnicos resumidos

```text
Fluxo atual (quebrado):
  Superadmin → /dashboard → getDashboardMetrics()
    profile.tenant_id = NULL  →  return null  →  KPIs zerados

Fluxo corrigido:
  Superadmin → /dashboard
    → listTenantsForAdmin()  → [{id, name}]
    → seletor (default: 1º tenant)
    → getDashboardMetrics({ tenantId })
    → resolveActiveTenantId valida que é superadmin
    → query bling_orders WHERE tenant_id = X
```

```text
Minimax — antes:  POST /v1/text/chatcompletion_v2  model="minimax m2.7"   → 404
Minimax — depois: POST /v1/chat/completions        model="MiniMax-M2.7"   → 200
```

Quer que eu prossiga com a implementação nessa ordem?
