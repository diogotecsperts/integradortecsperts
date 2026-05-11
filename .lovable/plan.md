## Problema

No painel do Superadmin, ao criar um tenant nada aparece na lista de Clientes. A causa real (vista nos logs de rede) é que **todas as chamadas para `/_serverFn/...` voltam com `401 Unauthorized: No authorization header provided`**. Ou seja:

- `createTenant` → 401 → tenant **não é criado** (o toast de sucesso pode aparecer porque o erro vem como `Response` e a UI não trata bem)
- `listTenantsAdmin` → 401 → lista vem vazia
- `createTenantUser`, `setTenantStatus`, `setUserBlocked` → 401

O middleware `requireSupabaseAuth` exige `Authorization: Bearer <token>` no request, mas o cliente do TanStack Start (`useServerFn`) faz `fetch` para `/_serverFn/...` sem esse header. O Supabase JS só anexa o token em chamadas para o próprio Supabase, não para nosso backend.

Sobre o campo de senha do usuário cliente: **já existe** no formulário "Adicionar usuário" (label "Senha (8+)") e já é repassado para `supabaseAdmin.auth.admin.createUser` em `createTenantUser`. Não é necessário adicionar nada — só destravar o 401 para que efetivamente funcione.

## O que fazer

### 1. Anexar Authorization header automaticamente nas Server Functions
Criar um interceptor de `fetch` no cliente (carregado no bootstrap da app) que, para qualquer request cujo path comece com `/_serverFn/`, injeta `Authorization: Bearer <access_token>` lendo a sessão atual do Supabase (`supabase.auth.getSession()`). 

Arquivo novo: `src/integrations/supabase/server-fn-fetch.ts` — exporta uma função `installServerFnAuthFetch()` que faz patch único em `window.fetch`. Importada em `src/router.tsx` (ou em `__root.tsx`) apenas no browser.

### 2. Melhorar feedback de erro no painel de Clientes
Hoje, quando o server fn lança `Response("...", { status: 4xx })`, o `useMutation.onError` recebe um `Error` genérico. Ajustar `admin.clients.tsx` para extrair a mensagem real (ler `.text()` da Response quando aplicável) e exibir no toast — assim, qualquer falha futura fica visível em vez de silenciosa.

### 3. Garantir refresh da lista após criar tenant
Após `createTenant` retornar com sucesso, manter `qc.invalidateQueries({ queryKey: ["admin","tenants"] })` (já existe) e adicionar `await` no `mutationFn` para garantir ordem. Sem alterações de schema.

### 4. Validação manual após o deploy
1. Login como superadmin.
2. Ir em **Clientes** → confirmar que a lista carrega (sem 401 nos network logs).
3. Criar um tenant "Popular Farma" → ele deve aparecer imediatamente na lista.
4. Clicar em **Adicionar usuário** no card do tenant → preencher Nome, E-mail, **Senha (8+)** → confirmar criação.
5. Testar Bloquear/Desbloquear e mudança de status.

## Fora do escopo

- Nenhuma alteração de schema, RLS ou triggers.
- Nenhuma alteração no fluxo de bootstrap do superadmin.
- Sem mudanças em estética/UI além do toast de erro.

## Detalhe técnico (referência)

Padrão do interceptor (resumo):

```text
patch window.fetch:
  if URL pathname starts with "/_serverFn/":
    const { data } = await supabase.auth.getSession()
    if data.session: headers.Authorization = `Bearer ${data.session.access_token}`
  call original fetch
```

Idempotente (guarda flag para não aplicar duas vezes em HMR).
