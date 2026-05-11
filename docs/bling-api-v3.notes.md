# Bling API v3 — Notas operacionais

Anotações coletadas durante a implementação. Atualizar conforme aprendemos.

## OAuth2 (Authorization Code)
- **Authorize**: `GET https://www.bling.com.br/Api/v3/oauth/authorize?response_type=code&client_id=...&state=...&redirect_uri=...`
- **Token**: `POST https://www.bling.com.br/Api/v3/oauth/token`
  - Header: `Authorization: Basic base64(client_id:client_secret)`
  - Body (`application/x-www-form-urlencoded`):
    - `grant_type=authorization_code` + `code=...` (troca inicial)
    - `grant_type=refresh_token` + `refresh_token=...` (renovação)
- Retorno: `{ access_token, refresh_token, expires_in, token_type, scope }`
- Tokens expiram em ~6h. Refresh token é rotativo: ao renovar, o antigo é invalidado.
- Escopo padrão da Bling cobre todos os módulos liberados ao app no painel.

## Paginação
- Query `pagina` (1-based) e `limite` (1..100, default 100).
- Responses sem total — paginar até receber `data: []`.

## Filtros incrementais
- `/produtos` aceita `dataAlteracaoInicial` (ISO 8601 `YYYY-MM-DD HH:mm:ss`).
- `/estoques/saldos` não tem filtro temporal — sempre full por depósito.

## Rate limit
- Documentado: 3 req/segundo por client_id, 120.000 req/dia.
- Usamos throttle in-memory por tenant + retry exponencial em 429.

## Notas de campos
- `produto.tipo`: `'P'` produto, `'S'` serviço.
- `produto.formato`: `'S'` simples, `'V'` variação, `'E'` com variações (pai).
- `produto.situacao`: `'A'` ativo, `'I'` inativo, `'E'` excluído.

## Estoques (saldos)
- `GET /estoques/saldos/{idDeposito}` e `GET /estoques/saldos` exigem `idsProdutos[]` (query, array, **obrigatório**).
- Não há paginação por `pagina/limite` — chunkar a lista de produtos (usamos 100 por chamada) e iterar por depósito.
- Resposta: `data[].produto.id`, `saldoFisicoTotal`, `saldoVirtualTotal` (não `saldoFisico/saldoVirtual`).
