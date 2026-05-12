# Plano: i18n dos nomes de recursos na lista de sync Bling

## Diagnóstico

Em `src/routes/_authenticated/integracao-bling.tsx` já existe o map `RES_LABEL` (usado nos cards de status, linha 197) com os nomes em PT. A tabela de histórico (linha 232) ainda renderiza `r.resource` cru, em inglês.

## Mudança

- **Arquivo único**: `src/routes/_authenticated/integracao-bling.tsx`
- Linha 232: trocar `{r.resource}` por `{RES_LABEL[r.resource as keyof typeof RES_LABEL] ?? r.resource}`.
- Garantir que `RES_LABEL` cobre todos os recursos: `contacts → Contatos`, `orders → Pedidos`, `products → Produtos`, `stock → Estoque`, `deposits → Depósitos`. Se faltar alguma chave, adicionar.

## Fora de escopo

- Nenhuma alteração em backend, sync, RPC ou banco — strings enviadas/persistidas seguem em inglês.
