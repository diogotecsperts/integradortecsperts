## Diagnóstico

A página `/integracao-bling` foi desenhada exclusivamente para o **cliente final** (perfil com `tenant_id`). Quando o **superadmin** (sem `tenant_id` no `profiles`) acessa a rota:

- `getBlingStatus({})` no servidor entra no ramo `if (!tenantId) throw Response("Sem tenant associado", 400)`.
- O `useQuery` no cliente entra em estado de erro, mas o componente não tem `errorComponent` configurado e a guarda `if (!data) return null` é insuficiente (a renderização do `Stat` em `data.counts.products` é o que estoura quando `data` chega parcialmente em determinadas race conditions de refetch).
- Resultado: ErrorBoundary genérica → "Algo deu errado / Cannot read properties of undefined (reading 'products')".

Conceitualmente: **superadmin não conecta Bling para si mesmo** — ele gerencia conexões dos tenants via `BlingAdminPanel` em `/admin/clients`. A rota `/integracao-bling` é exclusiva do cliente.

## Correções

### 1. `src/routes/_authenticated/integracao-bling.tsx`
- Ler `role` e `tenantId` via `useAuth()`.
- Se `role === "superadmin"`: renderizar um card informativo direcionando ao painel `/admin/clients` (sem disparar o `useQuery`). Sem crash, sem confusão.
- Para o cliente: adicionar optional chaining defensivo em `data?.counts?.products ?? 0` (e demais), garantir `errorComponent` na rota com mensagem clara, e tratar o estado de erro do `useQuery` exibindo a mensagem retornada pelo servidor em vez de quebrar.

### 2. `src/lib/bling.functions.ts` — `getBlingStatus`
- Em vez de `throw Response(400)`, retornar um shape consistente quando não houver tenant: `{ tenantId: null, hasAppCreds: false, connected: false, counts: { products: 0, deposits: 0, stocks: 0 }, lastRuns: [], noTenant: true }`.
- Mantém o contrato para o cliente, evita 400 no caminho feliz e elimina a possibilidade de o componente receber `data` malformado.

### 3. (Defesa adicional) `errorComponent` da rota
- Adicionar `errorComponent` em `createFileRoute` que mostra o erro com botão "Tentar novamente" usando `router.invalidate() + reset()` — substituindo a ErrorBoundary genérica no contexto desta rota.

## Escopo do que NÃO muda

- Nenhuma alteração em RLS, migrations, OAuth, sync, criptografia ou no `BlingAdminPanel` de superadmin.
- Nada de novas rotas Bling de escrita (continua respeitada a diretriz READ-ONLY).
- `tenantSettings`/credenciais permanecem intactos.

## Validação

1. Logar como **superadmin** → acessar `/integracao-bling` → ver card "Use o painel de administração" sem erro.
2. Logar como **cliente** com tenant → ver status normal (Desconectado/Conectado, contadores, últimos runs).
3. Forçar erro (ex.: derrubar tenant_id temporariamente) → ver `errorComponent` com botão de retry, sem ErrorBoundary global.
