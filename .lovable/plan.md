## Ajustes solicitados

### 1. Saudação no topo (área cliente)
No `AppShell.tsx`, dentro do `<header>`, adicionar — apenas quando NÃO for rota `/admin` — um título "Bem-vindo, {nome}" usando `full_name` do profile (fallback para parte antes do `@` do email). Vou expor `fullName` no `useAuth` carregando junto com o profile já existente.

### 2. Bootstrap do superadmin na tela de login
Hoje o botão "Primeira instalação? Configurar superadmin" fica sempre visível. Vou:
- Criar uma server function pública `superadminExists()` (sem middleware de auth, usando `supabaseAdmin`) que retorna `true` se já existir alguém com role `superadmin`.
- Em `auth.tsx`, chamar via `useQuery` no mount; só renderizar o bloco de bootstrap se `exists === false`.
- Como camada extra, a função `bootstrapSuperadmin` já deve recusar se já houver superadmin (verificar e reforçar).

### 3. Configurações: tirar do cliente, mover para o Superadmin
- Remover a página `/settings` do menu do cliente (`clientNav` em `AppShell.tsx`) e excluir/deslocar a rota `src/routes/_authenticated/settings.tsx`.
- No painel do superadmin, em `admin.clients.tsx`, abrir um drawer/seção "Configurações do cliente" ao selecionar um tenant, com os campos:
  - Bling ERP: Client ID, Client Secret
  - Resend: API Key
  - Minimax (Agente IA): API Key
- Operações via novas server functions admin (`getTenantSettings`, `upsertTenantSettings`) em `src/lib/admin.functions.ts` usando `supabaseAdmin` + checagem `is_superadmin`.
- Ajustar a policy `tenant_settings` para remover acesso de cliente (apenas superadmin lê/escreve). Migration:
  - drop policies `settings_select_own`, `settings_insert_own`, `settings_update_own`
  - criar policy única `settings_admin_only` (ALL) com `is_superadmin()`.

### Arquivos afetados
- `src/components/AppShell.tsx` (saudação, remover item Configurações)
- `src/hooks/use-auth.tsx` (expor `fullName`)
- `src/routes/auth.tsx` (esconder bootstrap quando já existe superadmin)
- `src/lib/admin.functions.ts` (nova `superadminExists`, `getTenantSettings`, `upsertTenantSettings`)
- `src/routes/_authenticated/_admin/admin.clients.tsx` (UI de configurações por cliente)
- `src/routes/_authenticated/settings.tsx` (excluir)
- nova migration RLS em `tenant_settings`

### Fora de escopo
Nenhuma mudança em outras telas, schema de outras tabelas ou design system.
