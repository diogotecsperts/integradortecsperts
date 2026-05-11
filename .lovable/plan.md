# Correção do Sync de Estoque (Bling)

## Diagnóstico

Erro real lido em `bling_sync_runs`:

```
Bling /estoques/saldos/14888850048 (400)
{ "error": { "type": "VALIDATION_ERROR",
  "message": "Não foi possível obter o saldo em estoque",
  "description": "O saldo em estoque não pode ser obtido, pois nenhum produto foi informado." } }
```

Conferindo `docs/bling-api-v3.md` (linhas 5995–6150), tanto `GET /estoques/saldos/{idDeposito}` quanto `GET /estoques/saldos` exigem o parâmetro **`idsProdutos[]` (query, array, obrigatório)**. Não existe paginação por `pagina/limite` neste endpoint — a "paginação" é feita pelo cliente, dividindo a lista de produtos em lotes.

A implementação atual (`src/lib/bling/sync.server.ts → syncStock`) chama `/estoques/saldos/{depId}` apenas com `pagina/limite`, sem `idsProdutos[]` — daí o 400.

## Mudanças (apenas leitura — respeita a diretriz READ-ONLY)

### 1. `src/lib/bling/client.server.ts`
Estender o tipo de `searchParams` em `blingFetch` para aceitar arrays e enviá-los como múltiplos pares `chave[]=valor`:

```ts
searchParams?: Record<string, string | number | Array<string | number> | undefined>
```

No loop de montagem da URL, quando o valor for array, usar `url.searchParams.append(`${k}[]`, String(v))` para cada item. Manter compatibilidade com os usos atuais (produtos/depósitos), que continuam passando escalares.

### 2. `src/lib/bling/sync.server.ts → syncStock`
Reescrever o loop:

1. Carregar `bling_id` de **todos** os depósitos espelhados do tenant (já feito).
2. Carregar `bling_id` de **todos os produtos** do tenant a partir de `bling_products` (`select bling_id`).
3. Se não houver produtos, encerrar a run com `meta.note = "Sem produtos espelhados — rode sync de produtos primeiro."`.
4. Para cada depósito, dividir a lista de produtos em **chunks de 100** (limite seguro de URL e padrão de loteamento na v3) e chamar:
   ```
   blingFetch(tenantId, `/estoques/saldos/${depId}`, {
     searchParams: { idsProdutos: chunkOfBlingIds }
   })
   ```
5. Mapear cada item retornado para `bling_stock_balances` (campos do retorno: `produto.id`, `saldoFisicoTotal`, `saldoVirtualTotal`) e fazer upsert com `onConflict: "tenant_id,produto_id,deposito_id"`. Atualmente o mapper usa `saldoFisico/saldoVirtual` — corrigir para os nomes reais do endpoint (`saldoFisicoTotal/saldoVirtualTotal`).
6. Continuar usando `startRun/endRun` e acumulando `count`. Em caso de erro, propagar via `endRun(false, count, errMessage(e))` (já implementado).

### 3. `docs/bling-api-v3.notes.md`
Acrescentar uma nota curta sobre o endpoint de estoques: `idsProdutos[]` obrigatório, sem paginação, fazer chunks de 100 e iterar por depósito.

## Fora de escopo

- Nenhuma escrita em endpoints transacionais do Bling (somente GET).
- Sem alterações em RLS, migrations, OAuth, rotas ou UI.
- Sem mudanças no fluxo de produtos/depósitos.

## Verificação

Após o deploy, você clica em **Sync Estoque** no painel do cliente. Esperado: `status=ok`, `items_processed > 0` (≈ produtos com saldo × depósitos), e `bling_stock_balances` populada. Se o Bling retornar 400 novamente, o `error_message` agora dirá exatamente qual campo faltou.
