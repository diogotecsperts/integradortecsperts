# Conectar Bling pelo Painel do Superadmin

## Objetivo
Permitir que o superadmin, dentro do modal de Configurações de cada cliente, inicie o fluxo OAuth do Bling **em nome do tenant** ou copie o link de autorização para enviar ao cliente final. Hoje o painel `BlingAdminPanel` mostra status e botões de Sync, mas não tem como gerar o `authorize_url`.

## Mudanças

### 1. `src/routes/_authenticated/_admin/admin.clients.tsx` — `BlingAdminPanel`
- Importar `createBlingAuthLink` e `disconnectBling` de `@/lib/bling.functions` (além das já presentes), `Plug`, `Unplug`, `Copy`, `ExternalLink` de `lucide-react`.
- Adicionar duas mutations:
  - `mLink = useMutation({ mutationFn: () => link({ data: { tenantId } }) })` — em `onSuccess`, abre `r.url` em nova aba (`window.open(...,"_blank","noopener,noreferrer,width=720,height=820")`) e exibe toast.
  - `mDisc = useMutation({ mutationFn: () => disc({ data: { tenantId } }) })` — invalida a query no sucesso.
- Adicionar handler "Copiar Link": gera o link via `link({ data: { tenantId } })` e copia para `navigator.clipboard`, com toast "Link copiado — envie ao cliente".
- Renderizar, **acima da grade de botões de Sync**, uma nova linha com:
  - Quando `!data?.connected`:
    - Botão primário **"Autorizar Bling"** (gradient `var(--gradient-primary)`, ícone `Plug` + `ExternalLink`), `disabled={!data?.hasAppCreds || mLink.isPending}`.
    - Botão outline **"Copiar Link"** (ícone `Copy`), mesmas regras de disabled.
  - Quando `data?.connected`:
    - Badge "Conectado — expira em {expiresAt}".
    - Botão **"Desconectar"** outline destrutivo (ícone `Unplug`).
- Aviso inline (texto pequeno âmbar) caso `!data?.hasAppCreds`: "Cadastre Client ID/Secret antes de autorizar".

### 2. Reativação automática dos botões de Sync
Já implementado: `SyncBtn` e o "Sync FULL" usam `disabled={!data?.connected}` e a query tem `refetchInterval: 10000`. Após o callback gravar `bling_credentials`, o próximo refetch (≤10s) flipa `connected=true` e os botões ficam clicáveis. Sem alteração necessária aqui — apenas confirmar comportamento no QA.

## Fora do escopo
- Nenhuma mudança em server functions, RLS, migrations, sync ou criptografia.
- Sem alteração na rota `/integracao-bling` (cliente final).
- Diretiva READ-ONLY (sem POST/PUT/PATCH/DELETE em vendas/pedidos/NFe) preservada — `createBlingAuthLink` apenas grava `bling_oauth_states` e gera URL.

## Detalhes técnicos
- `createBlingAuthLink` já aceita `tenantId` opcional e valida `assertTenantAccess` (superadmin passa). Reuso direto.
- O `redirect_uri` continua sendo derivado do host atual (`integrador.tecsperts.com`) — então abrir a janela funciona tanto para o admin quanto para enviar o link ao cliente.
- "Copiar Link" usa `navigator.clipboard.writeText`; fallback de erro mostra a URL em toast para cópia manual.
