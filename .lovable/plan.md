## Objetivo

Alinhar a tela `/admin/clients` (Integração Bling de cada cliente) com o painel do cliente final, resolvendo dois pontos:

1. A lista de histórico de sync mostra os recursos em inglês (`orders`, `stock`, `products`, `deposits`, `contacts`).
2. Não existe botão individual para `contacts`, embora ele apareça no histórico — fica a impressão de "categoria sem botão".

## Alterações (somente UI, frontend)

**Arquivo:** `src/routes/_authenticated/_admin/admin.clients.tsx`

### 1. Mapa de labels PT-BR
Adicionar, no topo do componente da linha de cliente, um mapa local (igual ao usado em `integracao-bling.tsx`):

```ts
const RES_LABEL: Record<string, string> = {
  contacts: "Contatos",
  orders: "Pedidos",
  products: "Produtos",
  stock: "Estoque",
  deposits: "Depósitos",
};
```

### 2. Histórico em português
Na linha 481, trocar:
```tsx
<span className="font-medium">{r.resource}</span>
```
por:
```tsx
<span className="font-medium">{RES_LABEL[r.resource] ?? r.resource}</span>
```

### 3. Botão individual "Contatos"
Adicionar, junto aos demais `SyncBtn` (após "Pedidos (incr.)", linha 470), um botão para disparar somente contatos:

```tsx
<SyncBtn
  label="Contatos"
  onClick={() => m.mutate({ resource: "contacts" })}
  loading={m.isPending}
  disabled={!data?.connected}
/>
```

E ampliar o tipo do `mutationFn` (linha 384) para aceitar `"contacts"`:
```ts
(v: { resource: "deposits" | "products" | "stock" | "orders" | "contacts" | "all"; mode?: "full" | "incremental" })
```

> Observação: a função `sync` no backend já aceita `contacts` como recurso (é o que o cron full e o botão "Sync FULL (tudo)" disparam). Esta mudança é apenas de UI/typing — nenhum arquivo `*.server.ts` é alterado, nenhuma string enviada ao banco muda, nenhuma lógica de sync é tocada.

## Fora de escopo

- Backend, RPCs, edge functions, schema, RLS, cron — nada é tocado.
- Strings persistidas em `bling_sync_runs` continuam em inglês (apenas a renderização muda).
