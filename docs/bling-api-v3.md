# Referência Completa da API Bling

**Versão**: 3.0
**Base URL**: https://api.bling.com.br/Api/v3

## GET /anuncios/categorias
**Resumo**: Obtém categorias de anúncios

**Descrição**: Obtém categorias de anúncios.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/anuncios/categorias" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `tipoIntegracao` | `query` | `string` | Sim | Tipo de integração |
| `idLoja` | `query` | `integer` | Sim | ID da loja |
| `idCategoria` | `query` | `integer` | Não | ID da categoria |
| `tipoProduto` | `query` | `string` | Não | Tipo do produto |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): ID da categoria.
  - **`nome`** (`string`): Nome da categoria.

```json
{
  "data": [
    {
      "id": 101,
      "nome": "Roupas"
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /anuncios/categorias/{idCategoria}
**Resumo**: Obtém uma categoria de anúncio

**Descrição**: Obtém uma categoria de anúncio pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/anuncios/categorias/{idCategoria}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCategoria` | `path` | `string` | Sim | ID da categoria no marketplace (ex.: Mercado Livre) |
| `tipoIntegracao` | `query` | `string` | Sim | Tipo de integração |
| `idLoja` | `query` | `integer` | Sim | ID da loja |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): ID do atributo.
  - **`nome`** (`string`): Nome do atributo.
  - **`obrigatorio`** (`boolean`): Se o atributo é obrigatório.
  - **`tipo`** (`string`): Tipo do atributo.
  - **`unidadePadrao`** (`string`): Unidade padrão do atributo.
  - **`minimo`** (`integer`): Mínimo do atributo.
  - **`maximo`** (`integer`): Máximo do atributo.

```json
{
  "data": {
    "id": 1,
    "nome": "Atributo 1",
    "obrigatorio": true,
    "tipo": "string",
    "unidadePadrao": "unidade",
    "minimo": 1,
    "maximo": 10
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /anuncios
**Resumo**: Obtém anúncios

**Descrição**: Obtém anúncios paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/anuncios" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `situacao` | `query` | `integer` | Não | Situação do anúncio <br> `1` Publicado <br> `2` Rascunho <br> `3` Com problema <br> `4` Pausado |
| `idProduto` | `query` | `integer` | Não | ID do produto |
| `tipoIntegracao` | `query` | `string` | Sim | Tipo de integração |
| `idLoja` | `query` | `integer` | Sim | ID da loja |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): ID do anúncio.
  - **`titulo`** (`string`): Título do anúncio.
  - **`situacao`** (`integer`): Situação do anúncio.

```json
{
  "data": {
    "id": 1,
    "titulo": "Anúncio 1",
    "situacao": 1
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /anuncios
**Resumo**: Cria um anúncio

**Descrição**: Cria um anúncio.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/anuncios" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): ID do anúncio salvo.
  - **`idsVariacoes`** (`array[object]`): Lista de IDs das variações associadas ao anúncio.

```json
{
  "data": {
    "id": 123,
    "idsVariacoes": [
      0
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /anuncios/{idAnuncio}
**Resumo**: Obtém um anúncio

**Descrição**: Obtém os detalhes de um anúncio específico pelo seu ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/anuncios/{idAnuncio}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idAnuncio` | `path` | `integer` | Sim | ID do anúncio |
| `tipoIntegracao` | `query` | `string` | Sim | Tipo de integração |
| `idLoja` | `query` | `integer` | Sim | ID da loja |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): ID do anúncio.
  - **`produto`** (`object`): 
    - **`id`** (`integer`): ID do produto.
  - **`titulo`** (`string`): Título do anúncio.
  - **`descricao`** (`string`): Descrição do anúncio.
  - **`status`** (`integer`): Situação do anúncio.
  - **`atributos`** (`array[object]`): 
    - **`id`** (`integer`): ID do atributo.
    - **`id_externo`** (`string`): ID externo do atributo.
    - **`nome`** (`string`): Nome do atributo.
    - **`tipo`** (`string`): Tipo do atributo.
    - **`valor`** (`string`): Valor do atributo.
    - **`unidade`** (`string`): Unidade do atributo, se aplicável.
  - **`imagens`** (`array[object]`): 
    - **`id`** (`integer`): ID da imagem.
    - **`url`** (`string`): URL da imagem.
    - **`ordem`** (`integer`): Ordem da imagem.
    - **`tipo`** (`string`): Tipo da imagem.
  - **`variacoes`** (`array[object]`): 
    - **`id`** (`integer`): ID da variação.
    - **`nome`** (`string`): Nome da variação.

```json
{
  "data": {
    "id": 1,
    "produto": {
      "id": 12345
    },
    "titulo": "Anúncio 1",
    "descricao": "Descrição do anúncio.",
    "status": 1,
    "atributos": [
      {
        "id": 123,
        "id_externo": "COR",
        "nome": "Cor",
        "tipo": "string",
        "valor": "Azul",
        "unidade": "cm"
      }
    ],
    "imagens": [
      {
        "id": 456,
        "url": "https://exemplo.com/imagem.jpg",
        "ordem": 1,
        "tipo": "principal"
      }
    ],
    "variacoes": [
      {
        "id": 789,
        "nome": "Vermelho / P"
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /anuncios/{idAnuncio}
**Resumo**: Altera um anúncio

**Descrição**: Altera um anúncio pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/anuncios/{idAnuncio}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idAnuncio` | `path` | `integer` | Sim | ID do anúncio |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /anuncios/{idAnuncio}
**Resumo**: Remove um anúncio

**Descrição**: Remove um anúncio pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/anuncios/{idAnuncio}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idAnuncio` | `path` | `integer` | Sim | ID do anúncio |
| `tipoIntegracao` | `query` | `string` | Sim | Tipo de integração |
| `idLoja` | `query` | `integer` | Sim | ID da loja |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /anuncios/{idAnuncio}/publicar
**Resumo**: Publica um anúncio

**Descrição**: Altera o status do anúncio para publicado.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/anuncios/{idAnuncio}/publicar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idAnuncio` | `path` | `integer` | Sim | ID do anúncio |
| `tipoIntegracao` | `query` | `string` | Sim | Tipo de integração |
| `idLoja` | `query` | `integer` | Sim | ID da loja |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /anuncios/{idAnuncio}/pausar
**Resumo**: Pausa um anúncio

**Descrição**: Altera o status do anúncio para pausado.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/anuncios/{idAnuncio}/pausar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idAnuncio` | `path` | `integer` | Sim | ID do anúncio |
| `tipoIntegracao` | `query` | `string` | Sim | Tipo de integração |
| `idLoja` | `query` | `integer` | Sim | ID da loja |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /borderos/{idBordero}
**Resumo**: Obtém um borderô

**Descrição**: Obtém um borderô pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/borderos/{idBordero}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idBordero` | `path` | `integer` | Sim | ID do bordero |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 
  - **`data`** (`string`): 
  - **`historico`** (`string`): 
  - **`portador`** (`object`): 
    - **`id`** (`integer`): 
  - **`categoria`** (`object`): 
    - **`id`** (`integer`): 
  - **`pagamentos`** (`array[object]`): 
    - **`contato`** (`object`): 
      - **`id`** (`integer`): 
    - **`numeroDocumento`** (`string`): 
    - **`valorPago`** (`number`): 
    - **`juros`** (`number`): 
    - **`desconto`** (`number`): 
    - **`acrescimo`** (`number`): 
    - **`tarifa`** (`number`): Tarifa da forma de pagamento

```json
{
  "data": {
    "id": 12345678,
    "data": "2023-01-12",
    "historico": "Referente ao pedido nº 12345678",
    "portador": {
      "id": 12345678
    },
    "categoria": {
      "id": 12345678
    },
    "pagamentos": [
      {
        "contato": {
          "id": 12345678
        },
        "numeroDocumento": "",
        "valorPago": 1500.75,
        "juros": 10,
        "desconto": 10,
        "acrescimo": 10,
        "tarifa": 10
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /borderos/{idBordero}
**Resumo**: Remove um borderô

**Descrição**: Remove um borderô pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/borderos/{idBordero}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idBordero` | `path` | `integer` | Sim | ID do bordero |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /campos-customizados/modulos
**Resumo**: Obtém módulos que possuem campos customizados

**Descrição**: Obtém módulos que possuem campos customizados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/campos-customizados/modulos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

---

## GET /campos-customizados/tipos
**Resumo**: Obtém tipos de campos customizados

**Descrição**: Obtém tipos de campos customizados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/campos-customizados/tipos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

---

## GET /campos-customizados/modulos/{idModulo}
**Resumo**: Obtém campos customizados por módulo

**Descrição**: Obtém campos customizados por módulo paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/campos-customizados/modulos/{idModulo}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idModulo` | `path` | `integer` | Sim |  |
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`nome`** (`string`): Ignorado no método PUT
  - **`situacao`** (`integer`): `0` Inativo <br> `1` Ativo

```json
{
  "data": [
    {
      "id": 12345678,
      "nome": "Marca",
      "situacao": 1
    }
  ]
}
```

---

## GET /campos-customizados/{idCampoCustomizado}
**Resumo**: Obtém um campo customizado

**Descrição**: Obtém um campo customizado pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/campos-customizados/{idCampoCustomizado}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCampoCustomizado` | `path` | `integer` | Sim | ID do campo customizado |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /campos-customizados/{idCampoCustomizado}
**Resumo**: Altera um campo customizado

**Descrição**: Altera um campo customizado pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/campos-customizados/{idCampoCustomizado}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCampoCustomizado` | `path` | `integer` | Sim | ID do campo customizado |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /campos-customizados/{idCampoCustomizado}
**Resumo**: Remove um campo customizado

**Descrição**: Remove um campo customizado pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/campos-customizados/{idCampoCustomizado}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCampoCustomizado` | `path` | `integer` | Sim | ID do campo customizado |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /campos-customizados
**Resumo**: Cria um campo customizado

**Descrição**: Cria um campo customizado.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/campos-customizados" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /campos-customizados/{idCampoCustomizado}/situacoes
**Resumo**: Altera a situação de um campo customizado

**Descrição**: Altera a situação de um campo customizado pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/campos-customizados/{idCampoCustomizado}/situacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCampoCustomizado` | `path` | `integer` | Sim | ID do campo customizado |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`situacao`** (`integer`): `0` Inativo <br> `1` Ativo

**Exemplo de Payload**:
```json
{
  "situacao": 1
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /categorias/lojas
**Resumo**: Obtém categorias de lojas virtuais vinculadas a de produtos

**Descrição**: Obtém categorias de lojas virtuais vinculadas a de produtos paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/categorias/lojas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `idLoja` | `query` | `integer` | Não | ID da loja |
| `idCategoriaProduto` | `query` | `integer` | Não | ID da categoria do produto |
| `idCategoriaProdutoPai` | `query` | `integer` | Não | ID da categoria do produto pai |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`loja`** (`object`): 
    - **`id`** (`integer`): 
  - **`descricao`** (`string`): 
  - **`codigo`** (`string`): Código da categoria na loja.
  - **`categoriaProduto`** (`object`): 
    - **`id`** (`integer`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "loja": {
        "id": 12345678
      },
      "descricao": "Categoria de produto vinculado à loja",
      "codigo": "12345678",
      "categoriaProduto": {
        "id": 12345678
      }
    }
  ]
}
```

---

## POST /categorias/lojas
**Resumo**: Cria o vínculo de uma categoria da loja com a de produto

**Descrição**: Cria o vínculo de uma categoria da loja com a de produto.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/categorias/lojas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`id`** (`integer`): 
- **`loja`** (`object`): 
  - **`id`** (`integer`): 
- **`descricao`** (`string`): 
- **`codigo`** (`string`): Código da categoria na loja.
- **`categoriaProduto`** (`object`): 
  - **`id`** (`integer`): 

**Exemplo de Payload**:
```json
{
  "id": 12345678,
  "loja": {
    "id": 12345678
  },
  "descricao": "Categoria de produto vinculado à loja",
  "codigo": "12345678",
  "categoriaProduto": {
    "id": 12345678
  }
}
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /categorias/lojas/{idCategoriaLoja}
**Resumo**: Obtém uma categoria da loja vinculada a de produto

**Descrição**: Obtém uma categoria da loja vinculada a de produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/categorias/lojas/{idCategoriaLoja}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCategoriaLoja` | `path` | `integer` | Sim | ID do vínculo da categoria de produto com a da loja |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 
  - **`loja`** (`object`): 
    - **`id`** (`integer`): 
  - **`descricao`** (`string`): 
  - **`codigo`** (`string`): Código da categoria na loja.
  - **`categoriaProduto`** (`object`): 
    - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678,
    "loja": {
      "id": 12345678
    },
    "descricao": "Categoria de produto vinculado à loja",
    "codigo": "12345678",
    "categoriaProduto": {
      "id": 12345678
    }
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /categorias/lojas/{idCategoriaLoja}
**Resumo**: Altera o vínculo de uma categoria da loja com a de produto

**Descrição**: Altera o vínculo de uma categoria da loja com a de produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/categorias/lojas/{idCategoriaLoja}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCategoriaLoja` | `path` | `integer` | Sim | ID do vínculo da categoria de produto com a da loja |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`id`** (`integer`): 
- **`loja`** (`object`): 
  - **`id`** (`integer`): 
- **`descricao`** (`string`): 
- **`codigo`** (`string`): Código da categoria na loja.
- **`categoriaProduto`** (`object`): 
  - **`id`** (`integer`): 

**Exemplo de Payload**:
```json
{
  "id": 12345678,
  "loja": {
    "id": 12345678
  },
  "descricao": "Categoria de produto vinculado à loja",
  "codigo": "12345678",
  "categoriaProduto": {
    "id": 12345678
  }
}
```

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /categorias/lojas/{idCategoriaLoja}
**Resumo**: Remove o vínculo de uma categoria da loja com a de produto

**Descrição**: Remove o vínculo de uma categoria da loja com a de produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/categorias/lojas/{idCategoriaLoja}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCategoriaLoja` | `path` | `integer` | Sim | ID do vínculo da categoria de produto com a da loja |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /categorias/produtos
**Resumo**: Obtém categorias de produtos

**Descrição**: Obtém categorias de produtos paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/categorias/produtos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

---

## POST /categorias/produtos
**Resumo**: Cria uma categoria de produto

**Descrição**: Cria uma categoria de produto.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/categorias/produtos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /categorias/produtos/{idCategoriaProduto}
**Resumo**: Obtém uma categoria de produto

**Descrição**: Obtém uma categoria de produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/categorias/produtos/{idCategoriaProduto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCategoriaProduto` | `path` | `integer` | Sim | ID da categoria de produto |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /categorias/produtos/{idCategoriaProduto}
**Resumo**: Altera uma categoria de produto

**Descrição**: Altera uma categoria de produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/categorias/produtos/{idCategoriaProduto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCategoriaProduto` | `path` | `integer` | Sim | ID da categoria de produto |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`id`** (`integer`): 
- **`descricao`** (`string`): Descrição da categoria

**Exemplo de Payload**:
```json
{
  "id": 12345678,
  "descricao": "Eletrônicos"
}
```

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /categorias/produtos/{idCategoriaProduto}
**Resumo**: Remove uma categoria de produto

**Descrição**: Remove uma categoria de produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/categorias/produtos/{idCategoriaProduto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCategoriaProduto` | `path` | `integer` | Sim | ID da categoria de produto |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /categorias/receitas-despesas
**Resumo**: Obtém categorias de receitas e despesas

**Descrição**: Obtém categorias de receitas e despesas paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/categorias/receitas-despesas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `tipo` | `query` | `integer` | Não | `0` Todas<br>`1` Despesa<br>`2` Receita<br>`3` Receita e despesa |
| `situacao` | `query` | `integer` | Não | `0` Ativas e Inativas<br>`1` Ativas<br>`2` Inativas |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

---

## POST /categorias/receitas-despesas
**Resumo**: Cria uma categoria de receita e despesa

**Descrição**: Cria uma categoria de receita e despesa.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/categorias/receitas-despesas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 
  - **`idCategoriaPai`** (`integer`): Id da categoria pai. Se for a categoria raíz será 0.
  - **`descricao`** (`string`): 
  - **`tipo`** (`integer`): `1` Despesa<br>`2` Receita<br>`3` Receita e despesa

```json
{
  "data": {
    "id": 12345678,
    "idCategoriaPai": 0,
    "descricao": "Vendas de mercadorias",
    "tipo": 1
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /categorias/receitas-despesas
**Resumo**: Remove múltiplas categorias de receita e despesa

**Descrição**: Remove múltiplas categorias de receita e despesa a partir de uma lista de IDs.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/categorias/receitas-despesas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsCategorias[]` | `query` | `array` | Sim | IDs das categorias a serem removidas |

### Respostas
#### **204** - No content.

#### **200** - 
- **`data`** (`object`): 
  - **`alertas`** (`array[object]`): 
    - **`error`** (`object`): 
      - **`type`** (`string`): 
      - **`message`** (`string`): 
      - **`description`** (`string`): 
      - **`fields`** (`array[object]`): 
        - **`code`** (`integer`): 
        - **`msg`** (`string`): 
        - **`element`** (`string`): 
        - **`namespace`** (`string`): Referência ao objeto com erro.
        - **`collection`** (`array[object]`): 
          - **`index`** (`integer`): 
          - **`code`** (`integer`): 
          - **`msg`** (`string`): 
          - **`element`** (`string`): 
          - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "data": {
    "alertas": [
      {
        "error": {
          "type": "VALIDATION_ERROR",
          "message": "Não foi possível salvar a venda",
          "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
          "fields": [
            {
              "code": "...",
              "msg": "...",
              "element": "...",
              "namespace": "...",
              "collection": "..."
            }
          ]
        }
      }
    ]
  }
}
```

---

## GET /categorias/receitas-despesas/{idCategoria}
**Resumo**: Obtém uma categoria de receita e despesa

**Descrição**: Obtém uma categoria de receita e despesa pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/categorias/receitas-despesas/{idCategoria}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCategoria` | `path` | `integer` | Sim | ID da categoria de receita e despesa |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /categorias/receitas-despesas/{idCategoria}
**Resumo**: Atualiza uma categoria de receita e despesa

**Descrição**: Atualiza uma categoria de receita e despesa a partir do ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/categorias/receitas-despesas/{idCategoria}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCategoria` | `path` | `integer` | Sim | ID da categoria de receita e despesa |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 
  - **`idCategoriaPai`** (`integer`): Id da categoria pai. Se for a categoria raíz será 0.
  - **`descricao`** (`string`): 
  - **`tipo`** (`integer`): `1` Despesa<br>`2` Receita<br>`3` Receita e despesa

```json
{
  "data": {
    "id": 12345678,
    "idCategoriaPai": 0,
    "descricao": "Vendas de mercadorias",
    "tipo": 1
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /categorias/receitas-despesas/{idCategoria}
**Resumo**: Remove uma categoria de receita e despesa

**Descrição**: Remove uma categoria de receita e despesa pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/categorias/receitas-despesas/{idCategoria}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCategoria` | `path` | `integer` | Sim | ID da categoria de receita e despesa |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /contas-contabeis
**Resumo**: Obtém contas financeiras

**Descrição**: Obtém contas financeiras paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contas-contabeis" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `ocultarInvisiveis` | `query` | `boolean` | Não | Oculta contas financeiras invisíveis |
| `ocultarTipoContaBancaria` | `query` | `boolean` | Não | Oculta contas financeiras do tipo conta bancária |
| `situacoes` | `query` | `array` | Não | Situação da conta financeira<br> `1` Ativo<br> `2` Inativo<br> `3` Pendente<br> `4` Cancelada |
| `aliasIntegracao` | `query` | `string` | Não | Alias da integração |
| `aliasIntegracao` | `path` | `string` | Não | Alias da integração |
| `ordenacao` | `query` | `string` | Não | Ordenação da obtenção pelos campos: <br> `descricao` |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): Id da conta financeira
  - **`descricao`** (`string`): Descrição personalizada da conta financeira
  - **`tipo`** (`string`): `banco` Para configuração de boleto CNAB <br> `caixa` Portador caixa sem integração <br> `conta-bancaria` Contas configuradas para cashout (TED ou pix) <br>`integracao-pagamento` Configurações de integração (Bling Conta, Vindi...)
  - **`aliasIntegracao`** (`string`): Alias identificador da integração de pagamento

```json
{
  "data": [
    {
      "id": 12345678,
      "descricao": "Contas a pagar",
      "tipo": "integracao-pagamento",
      "aliasIntegracao": "BlingPagamentos"
    }
  ]
}
```

---

## GET /contas-contabeis/{idContaContabil}
**Resumo**: Obtém uma conta financeira

**Descrição**: Obtém uma conta financeira pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contas-contabeis/{idContaContabil}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContaContabil` | `path` | `integer` | Sim | ID da conta financeira |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): Id da conta financeira
  - **`descricao`** (`string`): Descrição personalizada da conta financeira
  - **`tipo`** (`string`): `banco` Para configuração de boleto CNAB <br> `caixa` Portador caixa sem integração <br> `conta-bancaria` Contas configuradas para cashout (TED ou pix) <br>`integracao-pagamento` Configurações de integração (Bling Conta, Vindi...)
  - **`aliasIntegracao`** (`string`): Alias identificador da integração de pagamento

```json
{
  "data": {
    "id": 12345678,
    "descricao": "Contas a pagar",
    "tipo": "integracao-pagamento",
    "aliasIntegracao": "BlingPagamentos"
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /contas/receber
**Resumo**: Obtém contas a receber

**Descrição**: Obtém contas a receber paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contas/receber" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `situacoes[]` | `query` | `array` | Não | `1` Em aberto <br>`2` Recebido <br>`3` Parcialmente recebido <br>`4` Devolvido <br>`5` Cancelado |
| `tipoFiltroData` | `query` | `string` | Não | Referente ao campo que será considerado ao filtrar por data inicial e final<br>`E` Data de emissão <br> `V` Data de vencimento <br> `R` Data de recebimento |
| `dataInicial` | `query` | `string` | Não | Data inicial. Por padrão, um ano antes da data atual. |
| `dataFinal` | `query` | `string` | Não | Data final. Por padrão, a data atual. |
| `idsCategorias[]` | `query` | `array` | Não | IDs das categorias de receitas e despesas |
| `idPortador` | `query` | `integer` | Não | ID da conta financeira |
| `idContato` | `query` | `integer` | Não | ID do contato |
| `idVendedor` | `query` | `integer` | Não | ID do vendedor |
| `idFormaPagamento` | `query` | `integer` | Não | ID da forma de pagamento |
| `boletoGerado` | `query` | `integer` | Não | Obtém contas com ou sem boletos emitidos via integração, `0` para boletos não emitidos e `1` para boletos emitidos |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`situacao`** (`integer`): `1` Aberto <br>`2` Pago<br>`3` Parcial<br>`4` Devolvido<br>`5` Cancelado<br>`6` Devolvido parcial<br>`7` Confirmado
  - **`vencimento`** (`string`): 
  - **`valor`** (`number`): 
  - **`idTransacao`** (`string`): 
  - **`linkQRCodePix`** (`string`): 
  - **`linkBoleto`** (`string`): 
  - **`dataEmissao`** (`string`): 
  - **`contato`** (`object`): 
    - **`id`** (`integer`): 
    - **`nome`** (`string`): 
    - **`numeroDocumento`** (`string`): 
    - **`tipo`** (`string`): 
  - **`formaPagamento`** (`object`): 
    - **`id`** (`integer`): 
    - **`codigoFiscal`** (`integer`): `1` Dinheiro <br> `2` Cheque <br> `3` Cartão de crédito <br> `4` Cartão de débito <br> `5` Crédito loja <br> `10` Vale alimentação <br> `11` Vale refeição <br> `12` Vale presente <br> `13` Vale combustível <br> `14` Duplicata mercantil <br> `15` Boleto bancário <br> `16` Depósito bancário <br> `17` PIX <br> `18` Transferência bancária <br> `19` Cartão virtual <br> `90` Sem pagamento <br> `99` Outros
  - **`contaContabil`** (`object`): 
    - **`id`** (`integer`): 
    - **`descricao`** (`string`): 
  - **`origem`** (`object`): 
    - **`id`** (`integer`): 
    - **`tipoOrigem`** (`string`): 
    - **`numero`** (`string`): 
    - **`dataEmissao`** (`string`): 
    - **`valor`** (`number`): 
    - **`situacao`** (`integer`): Situações da nota fiscal: <br> `1` Pendente: Situação inicial. <br> `3` Cancelada: Nota foi emitida e posteriormente cancelada. <br> `4` Aguardando recibo: Quando há uma tentativa de envio de uma nota pendente ou rejeitada. <br> `5` Rejeitada: Rejeição no envio. <br> `6` Autorizada: Sucesso no envio. <br> `7` Emitida DANFE: Após emitir a DANFE de uma nota autorizada. <br> `8` Registrada: Notas importadas no sistema. <br> `9` Aguardando protocolo: Durante uma tentativa de envio sem sucesso. <br> `10` Denegada: Devido a pendências do remetente ou destinatário junto à SEFAZ. <br> `11` Consulta situação: Quando a nota é rejeitada por duplicidade sem diferença na chave de acesso. <br> `12` Bloqueada: Quando ocorrem várias tentativas de envio que resultam na mesma rejeição. <br> `13` Contingência: Quando gerado xml e danfe em modo de contingência, aguardando envio da transmissão. Exclusiva da NFC-e. <br><br> Situações da venda: <br> `0` Em aberto <br> `1` Atendido <br> `2` Cancelado <br> `3` Em andamento <br> `5` Faturado parcialmente <br> `6` Atendido parcialmente <br> `7` Aguardando pagamento <br> `8` Pagamento confirmado <br> `10` Em digitação <br> `11` Verificado <br> `12` Checkout parcial
    - **`url`** (`string`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "situacao": 1,
      "vencimento": "2023-01-12",
      "valor": 1500.75,
      "idTransacao": "vX98D",
      "linkQRCodePix": "doc.view.php?id=9ab1671b3f05765cb49fee83ee0f2496",
      "linkBoleto": "doc.view.php?id=9ab1671b3f05765cb49fee83ee0f2496",
      "dataEmissao": "2023-01-12",
      "contato": {
        "id": 12345678,
        "nome": "Contato Teste",
        "numeroDocumento": "12345678910",
        "tipo": "F"
      },
      "formaPagamento": {
        "id": 12345678,
        "codigoFiscal": 15
      },
      "contaContabil": {
        "id": 12345678,
        "descricao": "Contas a pagar"
      },
      "origem": {
        "id": 12345678,
        "tipoOrigem": "venda",
        "numero": "0921132",
        "dataEmissao": "2023-07-05",
        "valor": 45.76,
        "situacao": 1,
        "url": "doc.view.php?id=9ab1671b3f05765cb49fee83ee0f2496"
      }
    }
  ]
}
```

---

## POST /contas/receber
**Resumo**: Cria uma conta a receber

**Descrição**: Cria uma conta a receber.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/contas/receber" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /contas/receber/{idContaReceber}
**Resumo**: Obtém uma conta a receber

**Descrição**: Obtém uma conta a receber pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contas/receber/{idContaReceber}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContaReceber` | `path` | `integer` | Sim | ID da conta a receber |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /contas/receber/{idContaReceber}
**Resumo**: Altera uma conta a receber

**Descrição**: Altera uma conta a receber pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/contas/receber/{idContaReceber}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContaReceber` | `path` | `integer` | Sim | ID da conta a receber |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /contas/receber/{idContaReceber}
**Resumo**: Remove uma conta a receber

**Descrição**: Remove uma conta a receber pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/contas/receber/{idContaReceber}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContaReceber` | `path` | `integer` | Sim | ID da conta a receber |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /contas/receber/{idContaReceber}/baixar
**Resumo**: Cria o recebimento de uma conta a receber

**Descrição**: Cria o recebimento de uma conta a receber.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/contas/receber/{idContaReceber}/baixar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContaReceber` | `path` | `integer` | Sim | ID da conta a receber |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`data`** (`string`): 
- **`usarDataVencimento`** (`boolean`): 
- **`portador`** (`object`): 
  - **`id`** (`integer`): 
- **`categoria`** (`object`): Categoria de receita e despesa
  - **`id`** (`integer`): 
- **`historico`** (`string`): Descriçao da conta para controle interno da empresa
- **`juros`** (`number`): Valor em reais dos juros.
- **`desconto`** (`number`): Valor em reais do desconto.
- **`acrescimo`** (`number`): Valor em reais do acréscimo.
- **`valorRecebido`** (`number`): Valor bruto da conta, incluindo a taxa do marketplace se aplicável. Se não for especificado, o valor total da conta será usado
- **`tarifa`** (`number`): O valor da tarifa deve ser preenchido caso a forma de pagamento possua taxas de alíquota ou de valor fixo.

**Exemplo de Payload**:
```json
{
  "data": "2023-01-12",
  "usarDataVencimento": false,
  "portador": {
    "id": 12345678
  },
  "categoria": {
    "id": 12345678
  },
  "historico": "",
  "juros": 10.5,
  "desconto": 10.5,
  "acrescimo": 10.5,
  "valorRecebido": 100.5,
  "tarifa": 5
}
```

### Respostas
#### **200** - 
- **`bordero`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "bordero": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /contas/receber/boletos
**Resumo**: Obtém boletos de contas a receber

**Descrição**: Obtém os boletos vinculados a um idOrigem, o qual corresponde ao ID de uma venda ou nota fiscal.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contas/receber/boletos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idOrigem` | `query` | `integer` | Sim | ID da venda ou nota fiscal |
| `situacoes[]` | `query` | `array` | Não | `1` Em aberto <br>`2` Recebido <br>`3` Parcialmente recebido <br>`4` Devolvido <br>`5` Parcialmente devolvido <br>`6` Cancelado |

### Respostas
#### **200** - 
- **`venda`** (`object`): 
  - **`numero`** (`string`): 
- **`notaFiscal`** (`object`): 
  - **`numero`** (`string`): 
- **`valorTotal`** (`number`): 
- **`contas`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`numeroExterno`** (`string`): Código de identificação do boleto
  - **`vencimento`** (`string`): 
  - **`valor`** (`number`): 
  - **`situacao`** (`integer`): `1` Em aberto <br>`2` Recebido <br>`3` Parcialmente recebido <br>`4` Devolvido <br>`5` Parcialmente devolvido <br>`6` Cancelado

```json
{
  "venda": {
    "numero": "123"
  },
  "notaFiscal": {
    "numero": "000001"
  },
  "valorTotal": 111.2,
  "contas": [
    {
      "id": 1328793273,
      "numeroExterno": "BWbXB",
      "vencimento": "2023-09-12",
      "valor": 111.2,
      "situacao": 1
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): Tipo do erro.
  - **`message`** (`string`): Mensagem de erro.
  - **`description`** (`string`): Descrição do erro.

```json
{
  "error": {
    "type": "RESOURCE_NOT_FOUND",
    "message": "Nenhum boleto foi localizado",
    "description": "O recurso requisitado não foi encontrado. Verifique se o endpoint solicitado está correto ou se o ID informado realmente existe no sistema"
  }
}
```

---

## POST /contas/receber/boletos/cancelar
**Resumo**: Cancela boletos de contas a receber

**Descrição**: Cancela um ou todos os boletos em aberto vinculados a uma venda ou nota fiscal.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/contas/receber/boletos/cancelar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`autenticacao`** (`object`): 
  - **`tipo`** (`integer`): Tipo de autenticação:<br>`1` Código de autenticação por dois fatores<br>`4` Senha de 6 dígitos do app Bling Conta
  - **`codigo`** (`string`): 
- **`origem`** (`object`): 
  - **`id`** (`integer`): ID da venda ou nota fiscal que originou a conta.
- **`conta`** (`object`): 
  - **`id`** (`integer`): Para cancelar apenas uma conta, deve-se informar o ID da conta.
- **`motivo`** (`string`): 

**Exemplo de Payload**:
```json
{
  "autenticacao": {
    "tipo": 1,
    "codigo": "111111"
  },
  "origem": {
    "id": 5436875653
  },
  "conta": {
    "id": 6423836115
  },
  "motivo": "Cancelado por força maior"
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`type`** (`string`): 
- **`message`** (`string`): 
- **`description`** (`string`): 
- **`fields`** (`array[object]`): 
  - **`code`** (`integer`): 
  - **`msg`** (`string`): 
  - **`element`** (`string`): 
  - **`namespace`** (`string`): 

```json
{
  "type": "VALIDATION_ERROR",
  "message": "Não foi possível realizar o cancelamento",
  "description": "Não foi possível realizar cancelamento da(s) conta(s) a receber, pois houveram erros de validação.",
  "fields": [
    {
      "code": "",
      "msg": "Conta(s) a receber não foram encontrada(s), verifique se as contas estão em aberto e com forma de pagamento boleto bancário",
      "element": "idDuplicata",
      "namespace": ""
    }
  ]
}
```

---

## GET /contatos
**Resumo**: Obtém contatos

**Descrição**: Obtém contatos paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contatos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `pesquisa` | `query` | `string` | Não | Nome, CPF/CNPJ, fantasia, e-mail ou código do contato |
| `criterio` | `query` | `integer` | Não | Criterio de listagem <br> `1` Todos <br> `2` Excluídos <br> `3` Últimos incluídos <br> `4` Sem movimento |
| `dataInclusaoInicial` | `query` | `string` | Não | Data de inclusão inicial |
| `dataInclusaoFinal` | `query` | `string` | Não | Data de inclusão final |
| `dataAlteracaoInicial` | `query` | `string` | Não | Data de alteração inicial |
| `dataAlteracaoFinal` | `query` | `string` | Não | Data de alteração final |
| `idTipoContato` | `query` | `integer` | Não | ID do tipo do contato |
| `idVendedor` | `query` | `integer` | Não | ID do vendedor relacionado ao contato |
| `uf` | `query` | `string` | Não | UF do contato |
| `telefone` | `query` | `string` | Não | Telefone do contato |
| `idsContatos[]` | `query` | `array` | Não | IDs dos contatos |
| `numeroDocumento` | `query` | `string` | Não |  CPF/CNPJ, desconsiderando a pontuação |
| `tipoPessoa` | `query` | `integer` | Não | Tipo de pessoa <br> `1` Física <br> `2` Jurídica <br> `3` Estrangeiro |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`nome`** (`string`): 
  - **`codigo`** (`string`): 
  - **`situacao`** (`string`): Situação do contato <br> `A` Ativo <br> `E` Excluído <br> `I` Inativo <br> `S` Sem movimentação
  - **`numeroDocumento`** (`string`): CPF ou CNPJ do contato
  - **`telefone`** (`string`): 
  - **`celular`** (`string`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "nome": "Contato",
      "codigo": "ASD001",
      "situacao": "A",
      "numeroDocumento": "123.456.789-10",
      "telefone": "(54) 3333-4444",
      "celular": "(54) 99999-8888"
    }
  ]
}
```

---

## POST /contatos
**Resumo**: Cria um contato

**Descrição**: Cria um contato.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/contatos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /contatos
**Resumo**: Remove múltiplos contatos

**Descrição**: Remove múltiplos contatos pelos IDs.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/contatos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsContatos[]` | `query` | `array` | Sim | IDs dos contatos |

### Respostas
#### **204** - No content.

#### **200** - 
- **`data`** (`object`): 
  - **`alertas`** (`array[object]`): 
    - **`error`** (`object`): 
      - **`type`** (`string`): 
      - **`message`** (`string`): 
      - **`description`** (`string`): 
      - **`fields`** (`array[object]`): 
        - **`code`** (`integer`): 
        - **`msg`** (`string`): 
        - **`element`** (`string`): 
        - **`namespace`** (`string`): Referência ao objeto com erro.
        - **`collection`** (`array[object]`): 
          - **`index`** (`integer`): 
          - **`code`** (`integer`): 
          - **`msg`** (`string`): 
          - **`element`** (`string`): 
          - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "data": {
    "alertas": [
      {
        "error": {
          "type": "VALIDATION_ERROR",
          "message": "Não foi possível salvar a venda",
          "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
          "fields": [
            {
              "code": "...",
              "msg": "...",
              "element": "...",
              "namespace": "...",
              "collection": "..."
            }
          ]
        }
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /contatos/{idContato}
**Resumo**: Obtém um contato

**Descrição**: Obtém um contato pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contatos/{idContato}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContato` | `path` | `integer` | Sim | ID do contato |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /contatos/{idContato}
**Resumo**: Altera um contato

**Descrição**: Altera um contato pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/contatos/{idContato}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContato` | `path` | `integer` | Sim | ID do contato |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /contatos/{idContato}
**Resumo**: Remove um contato

**Descrição**: Remove um contato pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/contatos/{idContato}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContato` | `path` | `integer` | Sim | ID do contato |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /contatos/{idContato}/tipos
**Resumo**: Obtém os tipos de contato de um contato

**Descrição**: Obtém os tipos de contato de um contato pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contatos/{idContato}/tipos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContato` | `path` | `integer` | Sim | ID do contato |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "descricao": "Fornecedor"
    }
  ]
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /contatos/consumidor-final
**Resumo**: Obtém os dados do contato Consumidor Final

**Descrição**: Obtém os dados do contato Consumidor Final. O consumidor final é um contato padrão do sistema que é criado automaticamente e não pode ser alterado.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contatos/consumidor-final" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

---

## PATCH /contatos/{idContato}/situacoes
**Resumo**: Altera a situação de um contato

**Descrição**: Altera a situação de um contato pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/contatos/{idContato}/situacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContato` | `path` | `integer` | Sim | ID do contato |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`situacao`** (`string`): 

**Exemplo de Payload**:
```json
{
  "situacao": "A"
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /contatos/situacoes
**Resumo**: Altera a situação de múltiplos contatos

**Descrição**: Altera a situação de múltiplos contatos pelos IDs.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/contatos/situacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`idsContatos`** (`array[object]`): 
- **`situacao`** (`string`): 

**Exemplo de Payload**:
```json
{
  "idsContatos": [
    12345678
  ],
  "situacao": "A"
}
```

### Respostas
#### **204** - No content.

#### **200** - 
- **`data`** (`object`): 
  - **`alertas`** (`array[object]`): 
    - **`error`** (`object`): 
      - **`type`** (`string`): 
      - **`message`** (`string`): 
      - **`description`** (`string`): 
      - **`fields`** (`array[object]`): 
        - **`code`** (`integer`): 
        - **`msg`** (`string`): 
        - **`element`** (`string`): 
        - **`namespace`** (`string`): Referência ao objeto com erro.
        - **`collection`** (`array[object]`): 
          - **`index`** (`integer`): 
          - **`code`** (`integer`): 
          - **`msg`** (`string`): 
          - **`element`** (`string`): 
          - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "data": {
    "alertas": [
      {
        "error": {
          "type": "VALIDATION_ERROR",
          "message": "Não foi possível salvar a venda",
          "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
          "fields": [
            {
              "code": "...",
              "msg": "...",
              "element": "...",
              "namespace": "...",
              "collection": "..."
            }
          ]
        }
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /contatos/tipos
**Resumo**: Obtém tipos de contato

**Descrição**: Obtém tipos de contato pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contatos/tipos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "descricao": "Fornecedor"
    }
  ]
}
```

---

## GET /contratos
**Resumo**: Obtém contratos

**Descrição**: Obtém contratos paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contratos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `dataCriacaoInicio` | `query` | `string` | Não | Data inicial de criação |
| `dataCriacaoFinal` | `query` | `string` | Não | Data final de criação |
| `dataBaseInicio` | `query` | `string` | Não | Data base inicial para geração de cobranças |
| `dataBaseFinal` | `query` | `string` | Não | Data base final para geração de cobranças |
| `situacao` | `query` | `string` | Não | `0` Inativo<br>`1` Ativo<br>`2` Baixado<br>`3` Isento |
| `idContato` | `query` | `integer` | Não | ID do contato |
| `idContatoCobranca` | `query` | `integer` | Não | ID do contato de cobrança |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 
  - **`data`** (`string`): Data de criação do contrato.
  - **`numero`** (`string`): 
  - **`valor`** (`number`): 
  - **`situacao`** (`integer`): `0` Inativo<br>`1` Ativo<br>`2` Baixado<br>`3` Isento<br>`4` Em avaliação
  - **`contato`** (`object`): 
    - **`id`** (`integer`): 

```json
{
  "data": [
    {
      "id": 123455678,
      "descricao": "Alugel do apartamento A102",
      "data": "2023-02-19",
      "numero": "25",
      "valor": 59.99,
      "situacao": 1,
      "contato": {
        "id": 12345678
      }
    }
  ]
}
```

---

## POST /contratos
**Resumo**: Cria um contrato

**Descrição**: Cria um contrato.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/contratos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /contratos/{idContrato}
**Resumo**: Obtém um contrato

**Descrição**: Obtém um contrato pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contratos/{idContrato}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContrato` | `path` | `integer` | Sim | ID do contrato |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /contratos/{idContrato}
**Resumo**: Altera um contrato

**Descrição**: Altera um contrato pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/contratos/{idContrato}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContrato` | `path` | `integer` | Sim | ID do contrato |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /contratos/{idContrato}
**Resumo**: Remove um contrato

**Descrição**: Remove um contrato pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/contratos/{idContrato}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContrato` | `path` | `integer` | Sim | ID do contrato |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /depositos
**Resumo**: Obtém depósitos

**Descrição**: Obtém depósitos paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/depositos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `descricao` | `query` | `string` | Não | Descrição do depósito |
| `situacao` | `query` | `integer` | Não | `0` Inativo <br> `1` Ativo |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 
  - **`situacao`** (`integer`): `0` Inativo <br> `1` Ativo
  - **`padrao`** (`boolean`): 
  - **`desconsiderarSaldo`** (`boolean`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "descricao": "Depósito Geral",
      "situacao": 1,
      "padrao": false,
      "desconsiderarSaldo": false
    }
  ]
}
```

---

## POST /depositos
**Resumo**: Cria um depósito

**Descrição**: Cria um depósito. Até 100 depósitos podem ser criados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/depositos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`id`** (`integer`): 
- **`descricao`** (`string`): 
- **`situacao`** (`integer`): `0` Inativo <br> `1` Ativo
- **`padrao`** (`boolean`): 
- **`desconsiderarSaldo`** (`boolean`): 

**Exemplo de Payload**:
```json
{
  "id": 12345678,
  "descricao": "Depósito Geral",
  "situacao": 1,
  "padrao": false,
  "desconsiderarSaldo": false
}
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /depositos/{idDeposito}
**Resumo**: Obtém um depósito

**Descrição**: Obtém um depósito pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/depositos/{idDeposito}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idDeposito` | `path` | `integer` | Sim | ID do depósito |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 
  - **`situacao`** (`integer`): `0` Inativo <br> `1` Ativo
  - **`padrao`** (`boolean`): 
  - **`desconsiderarSaldo`** (`boolean`): 

```json
{
  "data": {
    "id": 12345678,
    "descricao": "Depósito Geral",
    "situacao": 1,
    "padrao": false,
    "desconsiderarSaldo": false
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /depositos/{idDeposito}
**Resumo**: Altera um depósito

**Descrição**: Altera um depósito pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/depositos/{idDeposito}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idDeposito` | `path` | `integer` | Sim | ID do depósito |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`id`** (`integer`): 
- **`descricao`** (`string`): 
- **`situacao`** (`integer`): `0` Inativo <br> `1` Ativo
- **`padrao`** (`boolean`): 
- **`desconsiderarSaldo`** (`boolean`): 

**Exemplo de Payload**:
```json
{
  "id": 12345678,
  "descricao": "Depósito Geral",
  "situacao": 1,
  "padrao": false,
  "desconsiderarSaldo": false
}
```

### Respostas
#### **200** - 

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /empresas/me/dados-basicos
**Resumo**: Obtém dados básicos da empresa

**Descrição**: Obtém CNPJ, razão social e e-mail da empresa.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/empresas/me/dados-basicos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`string`): ID da empresa.
  - **`nome`** (`string`): Nome da empresa.
  - **`cnpj`** (`string`): CNPJ da empresa.
  - **`email`** (`string`): Email da empresa.
  - **`dataContrato`** (`string`): Data de início do contrato do plano.

```json
{
  "data": {
    "id": "436c56a5679921f5f13a3d6433561773",
    "nome": "Empresa Teste LTDA",
    "cnpj": "12.345.657/8910-11",
    "email": "empresa@email.com",
    "dataContrato": "2024-12-31"
  }
}
```

---

## GET /estoques/saldos/{idDeposito}
**Resumo**: Obtém o saldo em estoque de produtos por depósito

**Descrição**: Obtém o saldo em estoque de produtos pelo ID do depósito.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/estoques/saldos/{idDeposito}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idDeposito` | `path` | `integer` | Sim | ID do depósito |
| `idsProdutos[]` | `query` | `array` | Sim | IDs dos produtos |
| `codigos[]` | `query` | `array` | Não | Códigos dos produtos |
| `filtroSaldoEstoque` | `query` | `integer` | Não | Filtra o saldo em estoque <br> `0` zerado <br> `1` positivo <br> `2` negativo |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`produto`** (`object`): 
    - **`id`** (`integer`): 
    - **`codigo`** (`string`): 
  - **`saldoFisicoTotal`** (`number`): Saldo físico total do produto
  - **`saldoVirtualTotal`** (`number`): Saldo total do produto desconsiderando produtos reservados

```json
{
  "data": [
    {
      "produto": {
        "id": 12345678,
        "codigo": "12345678"
      },
      "saldoFisicoTotal": 1500.75,
      "saldoVirtualTotal": 1500.75
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /estoques/saldos
**Resumo**: Obtém o saldo em estoque de produtos

**Descrição**: Obtém o saldo em estoque de produtos, em todos os depósitos.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/estoques/saldos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsProdutos[]` | `query` | `array` | Sim | IDs dos produtos |
| `codigos[]` | `query` | `array` | Não | Códigos dos produtos |
| `filtroSaldoEstoque` | `query` | `integer` | Não | Filtra o saldo em estoque <br> `0` zerado <br> `1` positivo <br> `2` negativo |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /estoques
**Resumo**: Cria um registro de estoque

**Descrição**: Cria um registro de estoque.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/estoques" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/lotes
**Resumo**: Obtém lotes de produtos

**Descrição**: Obtém lotes de produtos paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/lotes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `idsProdutos[]` | `query` | `array` | Sim | IDs dos produtos |
| `idsLotes[]` | `query` | `array` | Não | IDs dos lotes |
| `idsDepositos[]` | `query` | `array` | Não | IDs dos depósitos |
| `codigosLotes[]` | `query` | `array` | Não | Códigos dos lotes |
| `status` | `query` | `string` | Não | Status do lote |
| `dataValidadeInicial` | `query` | `string` | Não | Data de validade inicial |
| `dataValidadeFinal` | `query` | `string` | Não | Data de validade final |
| `dataFabricacaoInicial` | `query` | `string` | Não | Data de fabricação inicial |
| `dataFabricacaoFinal` | `query` | `string` | Não | Data de fabricação final |
| `dataCriacaoInicial` | `query` | `string` | Não | Data de inclusão inicial |
| `dataCriacaoFinal` | `query` | `string` | Não | Data de inclusão final |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`idLote`** (`integer`): 
  - **`codigoLote`** (`string`): 
  - **`dataFabricacao`** (`string`): 
  - **`dataValidade`** (`string`): 
  - **`diasPermitidoVenda`** (`integer`): 
  - **`codigoAgregacao`** (`string`): 
  - **`produto`** (`object`): 
    - **`id`** (`integer`): 
  - **`deposito`** (`object`): 
    - **`id`** (`integer`): 
  - **`status`** (`integer`): `1` Ativo <br> `2` Inativo

```json
{
  "data": [
    {
      "idLote": "12345678",
      "codigoLote": "Lote 1",
      "dataFabricacao": "2021-01-01",
      "dataValidade": "2021-01-01",
      "diasPermitidoVenda": 10,
      "codigoAgregacao": "12345678",
      "produto": {
        "id": 12345678
      },
      "deposito": {
        "id": 12345678
      },
      "status": 1
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /produtos/lotes
**Resumo**: Salva lotes de produtos

**Descrição**: Cria/altera lotes de produtos.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/produtos/lotes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`idLote`** (`integer`): 
- **`codigoLote`** (`string`): 
- **`dataFabricacao`** (`string`): 
- **`dataValidade`** (`string`): 
- **`diasPermitidoVenda`** (`integer`): 
- **`codigoAgregacao`** (`string`): 
- **`produto`** (`object`): 
  - **`id`** (`integer`): 
- **`deposito`** (`object`): 
  - **`id`** (`integer`): 
- **`status`** (`integer`): `1` Ativo <br> `2` Inativo

**Exemplo de Payload**:
```json
[
  {
    "idLote": "12345678",
    "codigoLote": "Lote 1",
    "dataFabricacao": "2021-01-01",
    "dataValidade": "2021-01-01",
    "diasPermitidoVenda": 10,
    "codigoAgregacao": "12345678",
    "produto": {
      "id": 12345678
    },
    "deposito": {
      "id": 12345678
    },
    "status": 1
  }
]
```

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`saved`** (`array[object]`): 
    - **`id`** (`integer`): 
    - **`codigoLote`** (`string`): 
    - **`idProduto`** (`integer`): 
  - **`errors`** (`array[object]`): 
    - **`error`** (`object`): 
      - **`type`** (`string`): 
      - **`message`** (`string`): 
      - **`description`** (`string`): 
      - **`fields`** (`array[object]`): 
        - **`code`** (`integer`): 
        - **`msg`** (`string`): 
        - **`element`** (`string`): 
        - **`namespace`** (`string`): Referência ao objeto com erro.
        - **`collection`** (`array[object]`): 
          - **`index`** (`integer`): 
          - **`code`** (`integer`): 
          - **`msg`** (`string`): 
          - **`element`** (`string`): 
          - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "data": {
    "saved": [
      {
        "id": 12345678,
        "codigoLote": "Lote 1",
        "idProduto": 12345678
      }
    ],
    "errors": [
      {
        "error": {
          "type": "VALIDATION_ERROR",
          "message": "Não foi possível salvar a venda",
          "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
          "fields": [
            {
              "code": "...",
              "msg": "...",
              "element": "...",
              "namespace": "...",
              "collection": "..."
            }
          ]
        }
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /produtos/lotes
**Resumo**: Remove lotes de produtos

**Descrição**: Remove lotes de produtos pelos IDs.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/produtos/lotes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsLotes[]` | `query` | `array` | Sim | IDs dos lotes |

### Respostas
#### **204** - No content

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/lotes/{idLote}
**Resumo**: Obtém um lote de um produto

**Descrição**: Obtém um lote de um produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/lotes/{idLote}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLote` | `path` | `integer` | Sim | ID do lote |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`idLote`** (`integer`): 
  - **`codigoLote`** (`string`): 
  - **`dataFabricacao`** (`string`): 
  - **`dataValidade`** (`string`): 
  - **`diasPermitidoVenda`** (`integer`): 
  - **`codigoAgregacao`** (`string`): 
  - **`produto`** (`object`): 
    - **`id`** (`integer`): 
  - **`deposito`** (`object`): 
    - **`id`** (`integer`): 
  - **`status`** (`integer`): `1` Ativo <br> `2` Inativo

```json
{
  "data": {
    "idLote": "12345678",
    "codigoLote": "Lote 1",
    "dataFabricacao": "2021-01-01",
    "dataValidade": "2021-01-01",
    "diasPermitidoVenda": 10,
    "codigoAgregacao": "12345678",
    "produto": {
      "id": 12345678
    },
    "deposito": {
      "id": 12345678
    },
    "status": 1
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /produtos/lotes/{idLote}
**Resumo**: Altera um lote de um produto

**Descrição**: Altera um lote de um produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/produtos/lotes/{idLote}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`codigoLote`** (`string`): 
- **`dataFabricacao`** (`string`): 
- **`dataValidade`** (`string`): 
- **`diasPermitidoVenda`** (`integer`): 
- **`codigoAgregacao`** (`string`): 

**Exemplo de Payload**:
```json
{
  "codigoLote": "Lote 1",
  "dataFabricacao": "2021-01-01",
  "dataValidade": "2021-01-01",
  "diasPermitidoVenda": 10,
  "codigoAgregacao": "12345678"
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/lotes/controla-lote
**Resumo**: Obtém a informação se determinados produtos possuem controle de lote

**Descrição**: Obtém a informação se determinados produtos possuem controle de lote.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/lotes/controla-lote" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsProdutos[]` | `query` | `array` | Sim | IDs dos produtos |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`idProduto`** (`integer`): ID do produto
  - **`controlaLote`** (`boolean`): Indica se o produto controla lote

```json
{
  "data": [
    {
      "idProduto": 12345678,
      "controlaLote": true
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /produtos/{idProduto}/lotes/controla-lote/desativar
**Resumo**: Desativa controle de lotes para o produto

**Descrição**: Desativa controle de lotes para o produto pelo ID do produto.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/produtos/{idProduto}/lotes/controla-lote/desativar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProduto` | `path` | `integer` | Sim | ID do produto |

### Respostas
#### **200** - 

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /produtos/lotes/{idLote}/status
**Resumo**: Altera o status de um lote do produto

**Descrição**: Altera o status de um lote do produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/produtos/lotes/{idLote}/status" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`status`** (`integer`): `1` Ativo <br> `2` Inativo

**Exemplo de Payload**:
```json
{
  "status": 1
}
```

### Respostas
#### **204** - No content

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/lotes/{idLote}/lancamentos
**Resumo**: Obtém os lançamentos de um lote de produto

**Descrição**: Obtém os lançamentos de um lote de produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/lotes/{idLote}/lancamentos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLote` | `path` | `integer` | Sim | ID do lote |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): ID do lancamento do lote
  - **`idLote`** (`integer`): ID do lote
  - **`quantidade`** (`integer`): Quantidade do lote
  - **`tipoLancamento`** (`integer`): Tipo de lançamento <br> `1` Entrada <br> `2` Saída <br> `3` Balanço
  - **`data`** (`string`): Data de lançamento
  - **`idOrigem`** (`integer`): ID da origem
  - **`observacao`** (`string`): Observação do lote

```json
{
  "data": [
    {
      "id": 12345678,
      "idLote": 12345678,
      "quantidade": 12345678,
      "tipoLancamento": "1",
      "data": "2021-01-01 00:00:00",
      "idOrigem": 12345678,
      "observacao": "Observação do lote"
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /produtos/lotes/{idLote}/lancamentos
**Resumo**: Cria um lançamento de um lote

**Descrição**: Inclui lançamento de um lote.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/produtos/lotes/{idLote}/lancamentos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLote` | `path` | `integer` | Sim | ID do lote |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`id`** (`integer`): ID do lancamento do lote
- **`idLote`** (`integer`): ID do lote
- **`quantidade`** (`integer`): Quantidade do lote
- **`tipoLancamento`** (`integer`): Tipo de lançamento <br> `1` Entrada <br> `2` Saída <br> `3` Balanço
- **`data`** (`string`): Data de lançamento
- **`idOrigem`** (`integer`): ID da origem
- **`observacao`** (`string`): Observação do lote

**Exemplo de Payload**:
```json
{
  "id": 12345678,
  "idLote": 12345678,
  "quantidade": 12345678,
  "tipoLancamento": "1",
  "data": "2021-01-01 00:00:00",
  "idOrigem": 12345678,
  "observacao": "Observação do lote"
}
```

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): ID do lancamento do lote
  - **`idLote`** (`integer`): ID do lote
  - **`quantidade`** (`integer`): Quantidade do lote
  - **`tipoLancamento`** (`integer`): Tipo de lançamento <br> `1` Entrada <br> `2` Saída <br> `3` Balanço
  - **`data`** (`string`): Data de lançamento
  - **`idOrigem`** (`integer`): ID da origem
  - **`observacao`** (`string`): Observação do lote

```json
{
  "data": {
    "id": 12345678,
    "idLote": 12345678,
    "quantidade": 12345678,
    "tipoLancamento": "1",
    "data": "2021-01-01 00:00:00",
    "idOrigem": 12345678,
    "observacao": "Observação do lote"
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/lotes/lancamentos/{idLancamento}
**Resumo**: Obtém um lançamento de um lote de produto

**Descrição**: Obtém um lançamento de um lote de produto pelo ID do lançamento.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/lotes/lancamentos/{idLancamento}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLancamento` | `path` | `integer` | Sim | ID do lançamento |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): ID do lancamento do lote
  - **`idLote`** (`integer`): ID do lote
  - **`quantidade`** (`integer`): Quantidade do lote
  - **`tipoLancamento`** (`integer`): Tipo de lançamento <br> `1` Entrada <br> `2` Saída <br> `3` Balanço
  - **`data`** (`string`): Data de lançamento
  - **`idOrigem`** (`integer`): ID da origem
  - **`observacao`** (`string`): Observação do lote

```json
{
  "data": {
    "id": 12345678,
    "idLote": 12345678,
    "quantidade": 12345678,
    "tipoLancamento": "1",
    "data": "2021-01-01 00:00:00",
    "idOrigem": 12345678,
    "observacao": "Observação do lote"
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /produtos/lotes/lancamentos/{idLancamento}
**Resumo**: Altera a observação de um lançamento de um lote de um produto

**Descrição**: Altera a observação de um lançamento de um lote de um produto pelo ID do lançamento.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/produtos/lotes/lancamentos/{idLancamento}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`observacao`** (`string`): Observação do lote

**Exemplo de Payload**:
```json
{
  "observacao": "Observação do lote"
}
```

### Respostas
#### **200** - 

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/{idProduto}/lotes/{idLote}/depositos/{idDeposito}/saldo
**Resumo**: Obtém o saldo de um lote de produto

**Descrição**: Obtém o saldo de um lote de produto.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/{idProduto}/lotes/{idLote}/depositos/{idDeposito}/saldo" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLote` | `path` | `integer` | Sim | ID do lote |
| `idProduto` | `path` | `integer` | Sim | ID do produto |
| `idDeposito` | `path` | `integer` | Sim | ID do depósito |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`idLote`** (`integer`): ID do lote
  - **`produto`** (`object`): 
    - **`id`** (`integer`): 
  - **`deposito`** (`object`): 
    - **`id`** (`integer`): 
  - **`saldoAtual`** (`number`): Saldo atual do lote

```json
{
  "data": {
    "idLote": 12345678,
    "produto": {
      "id": 12345678
    },
    "deposito": {
      "id": 12345678
    },
    "saldoAtual": 12345678.12
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/{idProduto}/lotes/depositos/{idDeposito}/saldo
**Resumo**: Obtém os saldos dos lotes de um produto por depósito

**Descrição**: Obtém os saldos dos lotes de um produto por depósito.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/{idProduto}/lotes/depositos/{idDeposito}/saldo" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsLotes[]` | `query` | `array` | Sim | IDs dos lotes |
| `idProduto` | `path` | `integer` | Sim | ID do produto |
| `idDeposito` | `path` | `integer` | Sim | ID do depósito |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`idLote`** (`integer`): ID do lote
  - **`produto`** (`object`): 
    - **`id`** (`integer`): 
  - **`deposito`** (`object`): 
    - **`id`** (`integer`): 
  - **`saldoAtual`** (`number`): Saldo atual do lote

```json
{
  "data": [
    {
      "idLote": 12345678,
      "produto": {
        "id": 12345678
      },
      "deposito": {
        "id": 12345678
      },
      "saldoAtual": 12345678.12
    }
  ]
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/{idProduto}/lotes/depositos/{idDeposito}/saldo/soma
**Resumo**: Obtém a soma dos saldos dos lotes de um produto em um depósito

**Descrição**: Obtém a soma dos saldos dos lotes de um produto em um depósito.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/{idProduto}/lotes/depositos/{idDeposito}/saldo/soma" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProduto` | `path` | `integer` | Sim | ID do produto |
| `idDeposito` | `path` | `integer` | Sim | ID do depósito |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`produto`** (`object`): 
    - **`id`** (`integer`): 
  - **`deposito`** (`object`): 
    - **`id`** (`integer`): 
  - **`saldoTotal`** (`number`): Soma dos saldos de lotes

```json
{
  "data": [
    {
      "produto": {
        "id": 12345678
      },
      "deposito": {
        "id": 12345678
      },
      "saldoTotal": 12345678.12
    }
  ]
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/{idProduto}/lotes/saldo/soma
**Resumo**: Obtém o saldo total dos lotes de um produto

**Descrição**: Obtém o saldo total dos lotes de um produto pelo ID do produto.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/{idProduto}/lotes/saldo/soma" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProduto` | `path` | `integer` | Sim | ID do produto |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`produto`** (`object`): 
    - **`id`** (`integer`): 
  - **`saldoTotal`** (`number`): Soma dos saldos de lotes

```json
{
  "data": {
    "produto": {
      "id": 12345678
    },
    "saldoTotal": 12345678.12
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /formas-pagamentos
**Resumo**: Obtém formas de pagamentos

**Descrição**: Obtém formas de pagamentos paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/formas-pagamentos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `descricao` | `query` | `string` | Não | Descrição da forma de pagamento |
| `tiposPagamentos[]` | `query` | `array` | Não | `1` Dinheiro<br>`2` Cheque<br>`3` Cartão de Crédito<br>`4` Cartão de Débito<br>`5` Cartão da Loja (Private Label)<br>`10` Vale Alimentação<br>`11` Vale Refeição<br>`12` Vale Presente<br>`13` Vale Combustível<br>`14` Duplicata Mercantil<br>`15` Boleto Bancário<br>`16` Depósito Bancário<br>`17` Pagamento Instantâneo (PIX) - Dinâmico<br>`18` Transferência Bancária, Carteira Digital<br>`19` Programa de Fidelidade, Cashback, Crédito Virtual<br>`20` Pagamento Instantâneo (PIX) – Estático<br>`21` Crédito em loja<br>`22` Pagamento Eletrônico não Informado - falha de hardware do sistema emissor<br>`90` Sem pagamento<br>`99` Outros |
| `situacao` | `query` | `integer` | Não | `0` Inativa<br>`1` Ativa |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 
  - **`tipoPagamento`** (`integer`): `1` Dinheiro<br>`2` Cheque<br>`3` Cartão de Crédito<br>`4` Cartão de Débito<br>`5` Cartão da Loja (Private Label)<br>`10` Vale Alimentação<br>`11` Vale Refeição<br>`12` Vale Presente<br>`13` Vale Combustível<br>`14` Duplicata Mercantil<br>`15` Boleto Bancário<br>`16` Depósito Bancário<br>`17` Pagamento Instantâneo (PIX) - Dinâmico<br>`18` Transferência Bancária, Carteira Digital<br>`19` Programa de Fidelidade, Cashback, Crédito Virtual<br>`20` Pagamento Instantâneo (PIX) – Estático<br>`21` Crédito em loja<br>`22` Pagamento Eletrônico não Informado - falha de hardware do sistema emissor<br>`90` Sem pagamento<br>`99` Outros<br>
  - **`situacao`** (`integer`): `0` Inativa<br>`1` Ativa<br>
  - **`fixa`** (`boolean`): 
  - **`padrao`** (`integer`): `0` Não<br>`1` Padrão<br>`2` Padrão devolução
  - **`finalidade`** (`integer`): `1` Pagamentos<br>`2` Recebimentos<br>`3` Pagamentos e Recebimentos<br>
  - **`juros`** (`number`): Valor em porcentagem, com até 2 casas decimais.
  - **`multa`** (`number`): Valor em porcentagem, com até 2 casas decimais.

```json
{
  "data": [
    {
      "id": 12345678,
      "descricao": "Dinheiro",
      "tipoPagamento": 1,
      "situacao": 1,
      "fixa": false,
      "padrao": 0,
      "finalidade": 1,
      "juros": 0,
      "multa": 0
    }
  ]
}
```

---

## POST /formas-pagamentos
**Resumo**: Cria uma forma de pagamento

**Descrição**: Cria uma forma de pagamento.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/formas-pagamentos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /formas-pagamentos/{idFormaPagamento}
**Resumo**: Obtém uma forma de pagamento

**Descrição**: Obtém uma forma de pagamento pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/formas-pagamentos/{idFormaPagamento}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idFormaPagamento` | `path` | `integer` | Sim | ID da forma de pagamento |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /formas-pagamentos/{idFormaPagamento}
**Resumo**: Altera uma forma de pagamento

**Descrição**: Altera uma forma de pagamento pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/formas-pagamentos/{idFormaPagamento}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idFormaPagamento` | `path` | `integer` | Sim | ID da forma de pagamento |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /formas-pagamentos/{idFormaPagamento}
**Resumo**: Remove uma forma de pagamento

**Descrição**: Remove uma forma de pagamento pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/formas-pagamentos/{idFormaPagamento}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idFormaPagamento` | `path` | `integer` | Sim | ID da forma de pagamento |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /formas-pagamentos/{idFormaPagamento}/padrao
**Resumo**: Altera o padrão de uma forma de pagamento

**Descrição**: Altera o padrão de uma forma de pagamento pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/formas-pagamentos/{idFormaPagamento}/padrao" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idFormaPagamento` | `path` | `integer` | Sim | ID da forma de pagamento |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`padrao`** (`integer`): `1` Pagamento <br> `2` Devolução<br>`3` Fiado

**Exemplo de Payload**:
```json
{
  "padrao": 1
}
```

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /formas-pagamentos/{idFormaPagamento}/situacao
**Resumo**: Altera a situação de uma forma de pagamento

**Descrição**: Altera a situação de uma forma de pagamento pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/formas-pagamentos/{idFormaPagamento}/situacao" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idFormaPagamento` | `path` | `integer` | Sim | ID da forma de pagamento |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`situacao`** (`integer`): Situação que será alterada <br> `1` Ativa <br> `0` Inativa

**Exemplo de Payload**:
```json
{
  "situacao": 1
}
```

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /homologacao/produtos
**Resumo**: Obtém o produto da homologação

**Descrição**: Obtém o produto que será utilizado durante os demais passos da homologação, e, inicia o processo de validação, o qual deve ser acompanhando via interface do cadastro de aplicativos.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/homologacao/produtos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`nome`** (`string`): 
  - **`preco`** (`number`): 
  - **`codigo`** (`string`): 

```json
{
  "data": {
    "nome": "Copo do Bling",
    "preco": 32.56,
    "codigo": "COD-4587"
  }
}
```

---

## POST /homologacao/produtos
**Resumo**: Cria o produto da homologação

**Descrição**: Cria o produto da homologação.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/homologacao/produtos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`nome`** (`string`): 
- **`preco`** (`number`): 
- **`codigo`** (`string`): 

**Exemplo de Payload**:
```json
{
  "nome": "Copo do Bling",
  "preco": 32.56,
  "codigo": "COD-4587"
}
```

### Respostas
#### **201** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /homologacao/produtos/{idProdutoHomologacao}
**Resumo**: Altera o produto da homologação

**Descrição**: Altera o produto da homologação pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/homologacao/produtos/{idProdutoHomologacao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoHomologacao` | `path` | `integer` | Sim | ID do produto da homologação. |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`nome`** (`string`): 
- **`preco`** (`number`): 
- **`codigo`** (`string`): 

**Exemplo de Payload**:
```json
{
  "nome": "Copo do Bling",
  "preco": 32.56,
  "codigo": "COD-4587"
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /homologacao/produtos/{idProdutoHomologacao}
**Resumo**: Remove o produto da homologação

**Descrição**: Remove o produto da homologação pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/homologacao/produtos/{idProdutoHomologacao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoHomologacao` | `path` | `integer` | Sim | ID do produto da homologação. |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /homologacao/produtos/{idProdutoHomologacao}/situacoes
**Resumo**: Altera a situação do produto da homologação

**Descrição**: Altera a situação do produto da homologação pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/homologacao/produtos/{idProdutoHomologacao}/situacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoHomologacao` | `path` | `integer` | Sim | ID do produto da homologação. |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`situacao`** (`string`): 

**Exemplo de Payload**:
```json
{
  "situacao": "I"
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /logisticas
**Resumo**: Obtém logísticas

**Descrição**: Obtém logísticas paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/logisticas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `tipoIntegracao` | `query` | `string` | Não | Parâmetro para filtrar os registros através do tipo da logística. |
| `tiposIntegracoes[]` | `query` | `array` | Não | Parâmetro para filtrar os registros através de uma lista de tipos de logística. |
| `situacao` | `query` | `string` | Não | Parâmetro para filtrar os registros através da situação<br> `H` Habilitado<br> `D` Desabilitado |
| `logisticasReversas` | `query` | `boolean` | Não | Parâmetro para filtrar apenas as logísticas que possuem serviço de reversão. É sobrescrito pelo parâmetro tipoIntegracao, caso enviado junto. |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): ID da logística
  - **`descricao`** (`string`): Descrição da logística
  - **`tipoIntegracao`** (`string`): Tipo da logística
  - **`integracaoNativa`** (`boolean`): 
  - **`situacao`** (`string`): Situação da logística<br> `H` Habilitado<br> `D` Desabilitado
  - **`integracao`** (`object`): 
    - **`id`** (`integer`): 
  - **`servicos`** (`array[object]`): ID dos serviços vinculados a logística
    - **`id`** (`integer`): ID do serviço da logística

```json
{
  "data": [
    {
      "id": 6423813145,
      "descricao": "Correios Cliente",
      "tipoIntegracao": "Correios",
      "integracaoNativa": false,
      "situacao": "H",
      "integracao": {
        "id": 12345678
      },
      "servicos": [
        {
          "id": 6423813145
        }
      ]
    }
  ]
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /logisticas
**Resumo**: Cria logística

**Descrição**: Cria uma logística.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/logisticas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`descricao`** (`string`): Descrição da logística
- **`situacao`** (`string`): Situação da logística<br> `H` Habilitado<br> `D` Desabilitado
- **`servicos`** (`array[object]`): Serviços vinculados à logística

**Exemplo de Payload**:
```json
{
  "descricao": "Correios Cliente",
  "situacao": "H",
  "servicos": [
    null
  ]
}
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /logisticas/{idLogistica}
**Resumo**: Obtém uma logística

**Descrição**: Obtém uma logística pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/logisticas/{idLogistica}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLogistica` | `path` | `integer` | Sim | ID da logística |
| `listarServicosInativos` | `query` | `boolean` | Não | Parâmetro para incluir serviços inativos na resposta.<br> `true` Inclui serviços ativos e inativos<br> `false` Inclui apenas serviços ativos (padrão) |

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /logisticas/{idLogistica}
**Resumo**: Altera uma logística

**Descrição**: Altera uma logística pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/logisticas/{idLogistica}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLogistica` | `path` | `integer` | Sim | ID da logística |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`descricao`** (`string`): Descrição da logística
- **`situacao`** (`string`): Situação da logística<br> `H` Habilitado<br> `D` Desabilitado

**Exemplo de Payload**:
```json
{
  "descricao": "Correios Cliente",
  "situacao": "H"
}
```

### Respostas
#### **200** - 

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /logisticas/{idLogistica}
**Resumo**: Remove uma logística

**Descrição**: Remove uma logística pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/logisticas/{idLogistica}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLogistica` | `path` | `integer` | Sim | ID da logística |

### Respostas
#### **200** - 

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /logisticas/servicos
**Resumo**: Obtém serviços de logísticas

**Descrição**: Obtém serviços de logísticas paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/logisticas/servicos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `tipoIntegracao` | `query` | `string` | Não | Parâmetro para filtrar os registros através do tipo da logística. |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): Id do serviço
  - **`descricao`** (`string`): Descrição do serviço da logística
  - **`codigo`** (`string`): Código do serviço
  - **`aliases`** (`array[object]`): Aliases do serviço
  - **`ativo`** (`boolean`): Define se está ativo ou não
  - **`freteItem`** (`number`): Valor do frete que será calculado para cada item do pedido
  - **`estimativaEntrega`** (`integer`): Será o prazo, em dias úteis, de entrega da mercadoria para esse serviço.
  - **`idCodigoServico`** (`string`): Id do código do servico
  - **`logistica`** (`object`): 
    - **`id`** (`integer`): 
  - **`transportador`** (`object`): 
    - **`id`** (`integer`): 

```json
{
  "data": [
    {
      "id": "123445",
      "descricao": "CARTA REG AR CONV B1 MFD",
      "codigo": "ABC1234",
      "aliases": [
        "ALIAS1"
      ],
      "ativo": true,
      "freteItem": 12.45,
      "estimativaEntrega": 2,
      "idCodigoServico": 13112,
      "logistica": {
        "id": 12345678
      },
      "transportador": {
        "id": 12345678
      }
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /logisticas/servicos
**Resumo**: Cria um serviço de logística

**Descrição**: Cria um serviço de logística personalizada.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/logisticas/servicos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`logistica`** (`object`): 
  - **`id`** (`integer`): 
- **`servicos`** (`array[object]`): Serviços da logística
  - **`descricao`** (`string`): Descrição do serviço da logística
  - **`codigo`** (`string`): Código do serviço
  - **`aliases`** (`array[object]`): Aliases do serviço
  - **`ativo`** (`boolean`): Define se está ativo ou não
  - **`freteItem`** (`number`): Valor do frete que será calculado para cada item do pedido
  - **`estimativaEntrega`** (`integer`): Será o prazo, em dias úteis, de entrega da mercadoria para esse serviço.
  - **`idCodigoServico`** (`string`): Id do código do servico
  - **`transportador`** (`object`): 
    - **`id`** (`integer`): 

**Exemplo de Payload**:
```json
{
  "logistica": {
    "id": 12345678
  },
  "servicos": [
    {
      "descricao": "CARTA REG AR CONV B1 MFD",
      "codigo": "ABC1234",
      "aliases": [
        "ALIAS1"
      ],
      "ativo": true,
      "freteItem": 12.45,
      "estimativaEntrega": 2,
      "idCodigoServico": 13112,
      "transportador": {
        "id": 12345678
      }
    }
  ]
}
```

### Respostas
#### **201** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): Id do serviço

```json
{
  "data": [
    {
      "id": "123445"
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /logisticas/servicos/{idLogisticaServico}
**Resumo**: Obtém um servico de logística

**Descrição**: Obtém um servico de logística pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/logisticas/servicos/{idLogisticaServico}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLogisticaServico` | `path` | `integer` | Sim | ID do serviço |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): Id do serviço
  - **`descricao`** (`string`): Descrição do serviço da logística
  - **`codigo`** (`string`): Código do serviço
  - **`aliases`** (`array[object]`): Aliases do serviço
  - **`ativo`** (`boolean`): Define se está ativo ou não
  - **`freteItem`** (`number`): Valor do frete que será calculado para cada item do pedido
  - **`estimativaEntrega`** (`integer`): Será o prazo, em dias úteis, de entrega da mercadoria para esse serviço.
  - **`idCodigoServico`** (`string`): Id do código do servico
  - **`logistica`** (`object`): 
    - **`id`** (`integer`): 
  - **`transportador`** (`object`): 
    - **`id`** (`integer`): 

```json
{
  "data": {
    "id": "123445",
    "descricao": "CARTA REG AR CONV B1 MFD",
    "codigo": "ABC1234",
    "aliases": [
      "ALIAS1"
    ],
    "ativo": true,
    "freteItem": 12.45,
    "estimativaEntrega": 2,
    "idCodigoServico": 13112,
    "logistica": {
      "id": 12345678
    },
    "transportador": {
      "id": 12345678
    }
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /logisticas/servicos/{idLogisticaServico}
**Resumo**: Altera um serviço de logística pelo ID

**Descrição**: Altera dados de um serviço de logística personalizada pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/logisticas/servicos/{idLogisticaServico}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLogisticaServico` | `path` | `integer` | Sim | ID do serviço |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`descricao`** (`string`): Descrição do serviço da logística
- **`codigo`** (`string`): Código do serviço
- **`aliases`** (`array[object]`): Aliases do serviço
- **`ativo`** (`boolean`): Define se está ativo ou não
- **`freteItem`** (`number`): Valor do frete que será calculado para cada item do pedido
- **`estimativaEntrega`** (`integer`): Será o prazo, em dias úteis, de entrega da mercadoria para esse serviço.
- **`idCodigoServico`** (`string`): Id do código do servico
- **`transportador`** (`object`): 
  - **`id`** (`integer`): 

**Exemplo de Payload**:
```json
{
  "descricao": "CARTA REG AR CONV B1 MFD",
  "codigo": "ABC1234",
  "aliases": [
    "ALIAS1"
  ],
  "ativo": true,
  "freteItem": 12.45,
  "estimativaEntrega": 2,
  "idCodigoServico": 13112,
  "transportador": {
    "id": 12345678
  }
}
```

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): Id do serviço

```json
{
  "data": {
    "id": "123445"
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /logisticas/{idLogisticaServico}/situacoes
**Resumo**: Desativa ou ativa um serviço de uma logística

**Descrição**: Desativa ou ativa um serviço de uma logística personalizada pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/logisticas/{idLogisticaServico}/situacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLogisticaServico` | `path` | `integer` | Sim | ID do serviço |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`ativo`** (`boolean`): Define se está ativo ou não

**Exemplo de Payload**:
```json
{
  "ativo": true
}
```

### Respostas
#### **204** - 

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /logisticas/objetos/{idObjeto}
**Resumo**: Obtém um objeto de logística

**Descrição**: Obtém um objeto de logística pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/logisticas/objetos/{idObjeto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idObjeto` | `path` | `integer` | Sim | ID do objeto logístico |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`pedidoVenda`** (`object`): 
    - **`id`** (`integer`): 
  - **`notaFiscal`** (`object`): 
    - **`id`** (`integer`): 
  - **`servico`** (`object`): 
    - **`id`** (`integer`): 
  - **`rastreamento`** (`object`): 
    - **`codigo`** (`string`): 
    - **`descricao`** (`string`): 
    - **`situacao`** (`integer`): `0` Postado <br> `1` Em andamento <br> `2` Não entregue <br> `3` Entregue <br> `4` Aguardando retirada <br> `5` Etiqueta comprada <br> `6` Vinculado <br> `7` Atrasado <br> `8` Não postado (recomendado para objetos recém-criados) <br> `9` Entrega suspensa
    - **`origem`** (`string`): Cidade e estado de origem
    - **`destino`** (`string`): Cidade e estado de destino
    - **`ultimaAlteracao`** (`string`): Data e hora em que ocorreu a atualização de rastreio.
    - **`url`** (`string`): URL de rastreamento
  - **`dimensao`** (`object`): 
    - **`peso`** (`number`): 
    - **`altura`** (`number`): 
    - **`largura`** (`number`): 
    - **`comprimento`** (`number`): 
    - **`diametro`** (`number`): 
  - **`embalagem`** (`object`): 
    - **`id`** (`integer`): ID do produto utilizado como embalagem
  - **`dataSaida`** (`string`): 
  - **`prazoEntregaPrevisto`** (`integer`): 
  - **`fretePrevisto`** (`number`): 
  - **`valorDeclarado`** (`number`): 
  - **`avisoRecebimento`** (`boolean`): 
  - **`maoPropria`** (`boolean`): 

```json
{
  "data": {
    "pedidoVenda": {
      "id": 12345678
    },
    "notaFiscal": {
      "id": 12345678
    },
    "servico": {
      "id": 12345678
    },
    "rastreamento": {
      "codigo": "EC272330554BR",
      "descricao": "Criado",
      "situacao": "8",
      "origem": "São Paulo, SP",
      "destino": "São Paulo, SP",
      "ultimaAlteracao": "2020-11-11 16:40:33",
      "url": "https://www.rastreamento.exemplo.com.br/EC272330554BR"
    },
    "dimensao": {
      "peso": 1.5,
      "altura": 1.5,
      "largura": 1.5,
      "comprimento": 1.5,
      "diametro": 1.5
    },
    "embalagem": {
      "id": 12345678
    },
    "dataSaida": "2022-12-01",
    "prazoEntregaPrevisto": 15,
    "fretePrevisto": 59.9,
    "valorDeclarado": 55.9,
    "avisoRecebimento": false,
    "maoPropria": false
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /logisticas/objetos/{idObjeto}
**Resumo**: Altera um objeto de logística pelo ID

**Descrição**: Altera dados de um objeto de logística personalizada pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/logisticas/objetos/{idObjeto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idObjeto` | `path` | `integer` | Sim | ID do objeto logístico |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`rastreamento`** (`object`): 
  - **`codigo`** (`string`): 
  - **`descricao`** (`string`): 
  - **`situacao`** (`integer`): `0` Postado <br> `1` Em andamento <br> `2` Não entregue <br> `3` Entregue <br> `4` Aguardando retirada <br> `5` Etiqueta comprada <br> `6` Vinculado <br> `7` Atrasado <br> `8` Não postado (recomendado para objetos recém-criados) <br> `9` Entrega suspensa
  - **`origem`** (`string`): Cidade e estado de origem
  - **`destino`** (`string`): Cidade e estado de destino
  - **`ultimaAlteracao`** (`string`): Data e hora em que ocorreu a atualização de rastreio.
  - **`url`** (`string`): URL de rastreamento
- **`dimensoes`** (`object`): 
  - **`peso`** (`number`): 
  - **`altura`** (`number`): 
  - **`largura`** (`number`): 
  - **`comprimento`** (`number`): 
  - **`diametro`** (`number`): 
- **`embalagem`** (`object`): 
  - **`id`** (`integer`): ID do produto utilizado como embalagem
- **`dataSaida`** (`string`): 
- **`prazoEntregaPrevisto`** (`integer`): 
- **`fretePrevisto`** (`number`): 
- **`valorDeclarado`** (`number`): 
- **`avisoRecebimento`** (`boolean`): 
- **`maoPropria`** (`boolean`): 

**Exemplo de Payload**:
```json
{
  "rastreamento": {
    "codigo": "EC272330554BR",
    "descricao": "Criado",
    "situacao": "8",
    "origem": "São Paulo, SP",
    "destino": "São Paulo, SP",
    "ultimaAlteracao": "2020-11-11 16:40:33",
    "url": "https://www.rastreamento.exemplo.com.br/EC272330554BR"
  },
  "dimensoes": {
    "peso": 1.5,
    "altura": 1.5,
    "largura": 1.5,
    "comprimento": 1.5,
    "diametro": 1.5
  },
  "embalagem": {
    "id": 12345678
  },
  "dataSaida": "2022-12-01",
  "prazoEntregaPrevisto": 15,
  "fretePrevisto": 59.9,
  "valorDeclarado": 55.9,
  "avisoRecebimento": false,
  "maoPropria": false
}
```

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /logisticas/objetos/{idObjeto}
**Resumo**: Remove um objeto de logística personalizada

**Descrição**: Remove um objeto de logística personalizada que não esteja em uma PLP.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/logisticas/objetos/{idObjeto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idObjeto` | `path` | `integer` | Sim | ID do objeto logístico |

### Respostas
#### **204** - 

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /logisticas/objetos
**Resumo**: Cria um objeto de logística

**Descrição**: Cria um objeto de logística personalizada.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/logisticas/objetos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /logisticas/etiquetas
**Resumo**: Obtém etiquetas das vendas

**Descrição**: Obtém as etiquetas dos pedidos de venda a partir dos ID's dos pedidos. No momento, o filtro está limitado para apenas um ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/logisticas/etiquetas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `formato` | `query` | `string` | Sim | Parâmetro para definir o formato do arquivo de impressão.<br> `PDF` - Formato PDF<br> `ZPL` - Formato ZPL |
| `idsVendas[]` | `query` | `array` | Sim | IDs dos pedidos de venda para impressão |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): ID da venda
  - **`link`** (`string`): Link para obter a etiqueta
  - **`observacao`** (`string`): Mensagem de observação

```json
{
  "data": [
    {
      "id": 6423813145,
      "link": "https://bling-storage-dev.s3.sa-east-1.amazonaws.com",
      "observacao": "O formato de impressão selecionado difere do retornado pelo integrador ou pela configuração da logística."
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /logisticas/remessas/{idRemessa}
**Resumo**: Obtém uma remessa de postagem

**Descrição**: Obtém uma remessa de postagem pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/logisticas/remessas/{idRemessa}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idRemessa` | `path` | `integer` | Sim | ID da remessa de postagem |

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /logisticas/remessas/{idRemessa}
**Resumo**: Altera uma remessa de postagem

**Descrição**: Altera uma remessa de postagem pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/logisticas/remessas/{idRemessa}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idRemessa` | `path` | `integer` | Sim | ID da remessa de postagem |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`id`** (`integer`): 
- **`numeroPlp`** (`string`): 
- **`situacao`** (`integer`): `-3` A ser corrigida <br> `-2` Em processamento <br> `-1` Cancelado <br> `0` Em aberto <br> `1` Emitido <br> `2` Pronto para envio <br> `3` Despachado <br> `4` Pronto para envio <br> `5` Etiqueta comprada <br> `6` Etiqueta parcialmente comprada
- **`descricao`** (`string`): 
- **`dataCriacao`** (`string`): 

**Exemplo de Payload**:
```json
{
  "id": 12345678,
  "numeroPlp": "749fdc73",
  "situacao": 0,
  "descricao": "Remessa_18092023",
  "dataCriacao": "2023-09-18"
}
```

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /logisticas/remessas/{idRemessa}
**Resumo**: Remove uma remessa de postagem

**Descrição**: Remove uma remessa de postagem pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/logisticas/remessas/{idRemessa}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idRemessa` | `path` | `integer` | Sim | ID da remessa de postagem |

### Respostas
#### **204** - 

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /logisticas/{idLogistica}/remessas
**Resumo**: Obtém as remessas de postagem de uma logística

**Descrição**: Obtém as remessas de postagem de uma logística pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/logisticas/{idLogistica}/remessas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idLogistica` | `path` | `integer` | Sim | ID da logística |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /logisticas/remessas
**Resumo**: Cria uma remessa de postagem de uma logística

**Descrição**: Cria uma remessa de postagem de uma logística.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/logisticas/remessas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /naturezas-operacoes
**Resumo**: Obtém naturezas de operações

**Descrição**: Obtém naturezas de operação paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/naturezas-operacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `situacao` | `query` | `integer` | Não | `0` Inativo <br> `1` Ativo |
| `descricao` | `query` | `string` | Não | Descrição da natureza de operação |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`situacao`** (`integer`): `0` Inativo <br> `1` Ativo
  - **`padrao`** (`integer`): `0` Sem padrão <br>`1` Padrão venda <br> `2` Padrão compra <br> `3` Padrão venda física <br> `4` Padrão venda jurídica <br> `5` Padrão compra física <br> `6` Padrão compra jurídica <br> `7` Padrão venda cupom <br> `8` Padrão devolução (entrada) <br> `9` Padrão devolução (saída) 
  - **`descricao`** (`string`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "situacao": 1,
      "padrao": 1,
      "descricao": "Compra de Mercadoria"
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /naturezas-operacoes/{idNaturezaOperacao}/obter-tributacao
**Resumo**: Obtém regras de tributação da natureza de operação

**Descrição**: Obtém regras de tributação que incidem sobre o item, dada uma natureza de operação.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/naturezas-operacoes/{idNaturezaOperacao}/obter-tributacao" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNaturezaOperacao` | `path` | `integer` | Sim | ID da natureza de operação |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`tipoNota`** (`integer`): `0` Entrada <br> `1` Saída
- **`uf`** (`string`): UF do destinatário
- **`municipio`** (`object`): 
  - **`id`** (`integer`): ID do município segundo a Tabela de Código de Município do IBGE
- **`obterRegras`** (`boolean`): Se false, os valores das regras de tributação de cada imposto serão zerados (cst, alíquota, base, etc.)
- **`crt`** (`integer`): CRT da empresa <br> `1` Simples Nacional <br> `2` Simples Nacional - excesso de sublimite de receita bruta <br> `3` Regime Normal <br> `4` MEI
- **`loja`** (`object`): 
  - **`id`** (`integer`): 
  - **`unidadeNegocio`** (`object`): 
    - **`id`** (`integer`): 
- **`produto`** (`object`): 
  - **`id`** (`integer`): 
  - **`valorUnitario`** (`number`): 
  - **`cupomFiscal`** (`integer`): 
  - **`origem`** (`integer`): `0` Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8 <br>`1` Estrangeira - Importação direta, exceto a indicada no código 6 <br>`2` Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7 <br> `3` Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70% <br>`4` Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes <br>`5` Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40% <br>`6` Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX <br>`7` Estrangeira - Adquirida no mercado interno, sem similar nacional, constante em lista da CAMEX <br> `8` Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%
  - **`quantidade`** (`number`): 

**Exemplo de Payload**:
```json
{
  "tipoNota": 1,
  "uf": "RS",
  "municipio": {
    "id": 4302105
  },
  "obterRegras": true,
  "crt": 1,
  "loja": {
    "id": 12345678,
    "unidadeNegocio": {
      "id": 12345678
    }
  },
  "produto": {
    "id": 12345678,
    "valorUnitario": 0,
    "cupomFiscal": 0,
    "origem": 0,
    "quantidade": 0
  }
}
```

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`faturada`** (`boolean`): 
  - **`observacoes`** (`string`): 
  - **`pisCofinsPresumido`** (`boolean`): 
  - **`somaImpostosTotal`** (`boolean`): 
  - **`somaIcmsTotal`** (`boolean`): 
  - **`aliquotaFunrural`** (`number`): 
  - **`descontaFunrural`** (`boolean`): 
  - **`consumidorFinal`** (`boolean`): 
  - **`retImpostoRetido`** (`boolean`): 
  - **`retAliquotaIr`** (`number`): 
  - **`retValorIr`** (`number`): 
  - **`retAliquotaCsll`** (`number`): 
  - **`retValorCsll`** (`number`): 
  - **`descontoCondicional`** (`boolean`): 
  - **`baseComissao`** (`number`): 
  - **`icms`** (`any`): 
  - **`valorPmc`** (`number`): 
  - **`aliquotaValorAproxImpostos`** (`number`): 
  - **`informacoesAdicionaisFisco`** (`string`): 
  - **`incluirFreteIpi`** (`boolean`): 
  - **`simples`** (`any`): 
  - **`ipi`** (`any`): 
  - **`issqn`** (`any`): 
  - **`pis`** (`any`): 
  - **`cofins`** (`any`): 
  - **`icmsSt`** (`any`): 
  - **`pisSt`** (`object`): 
    - **`regraOperacao`** (`object`): 
      - **`id`** (`integer`): 
    - **`tributacao`** (`integer`): `1` Tributado <br> `2` Isento <br> `3` Outra situação
    - **`cst`** (`string`): 
    - **`aliquota`** (`number`): 
    - **`base`** (`number`): 
    - **`valorBaseCalculo`** (`number`): 
    - **`valorImposto`** (`number`): 
    - **`observacoes`** (`string`): 
    - **`informacoesAdicionaisFisco`** (`string`): 
  - **`cofinsSt`** (`object`): 
    - **`regraOperacao`** (`object`): 
      - **`id`** (`integer`): 
    - **`tributacao`** (`integer`): `1` Tributado <br> `2` Isento <br> `3` Outra situação
    - **`cst`** (`string`): 
    - **`aliquota`** (`number`): 
    - **`base`** (`number`): 
    - **`valorBaseCalculo`** (`number`): 
    - **`valorImposto`** (`number`): 
    - **`observacoes`** (`string`): 
    - **`informacoesAdicionaisFisco`** (`string`): 
  - **`ii`** (`object`): 
    - **`regraOperacao`** (`object`): 
      - **`id`** (`integer`): 
    - **`tributacao`** (`integer`): `1` Tributado <br> `2` Isento <br> `3` Outra situação
    - **`cst`** (`string`): 
    - **`aliquota`** (`number`): 
    - **`base`** (`number`): 
    - **`valorBaseCalculo`** (`number`): 
    - **`valorImposto`** (`number`): 
    - **`observacoes`** (`string`): 
    - **`informacoesAdicionaisFisco`** (`string`): 
  - **`codigoBeneficioFiscal`** (`string`): 
  - **`porcentagemFcp`** (`number`): 
  - **`cfop`** (`integer`): 
  - **`simplesSt`** (`object`): 
    - **`regraOperacao`** (`object`): 
      - **`id`** (`integer`): 
    - **`tributacao`** (`integer`): `1` Tributado <br> `2` Isento <br> `3` Outra situação
    - **`cst`** (`string`): 
    - **`aliquota`** (`number`): 
    - **`base`** (`number`): 
    - **`valorBaseCalculo`** (`number`): 
    - **`valorImposto`** (`number`): 
    - **`observacoes`** (`string`): 
    - **`informacoesAdicionaisFisco`** (`string`): 
  - **`ibsCbs`** (`object`): 
    - **`regraOperacao`** (`object`): 
      - **`id`** (`integer`): 
    - **`cst`** (`string`): Código de Situação Tributária
    - **`classificacaoTributaria`** (`string`): Código de Classificação Tributária
    - **`valorBaseCalculo`** (`number`): Valor Base de Cálculo IBS/CBS
  - **`ibs`** (`object`): 
    - **`regraOperacao`** (`object`): 
      - **`id`** (`integer`): 
    - **`percentualIbsUf`** (`number`): Percentual IBS UF
    - **`percentualIbsMunicipio`** (`number`): Percentual IBS Município
    - **`percentualReducaoAliquotaUf`** (`number`): % Redução Alíquota UF
    - **`percentualReducaoAliquotaMunicipio`** (`number`): % Redução Alíquota Município
    - **`aliquotaEfetivaUf`** (`number`): Alíquota Efetiva UF
    - **`aliquotaEfetivaMunicipio`** (`number`): Alíquota Efetiva Município
    - **`percentualDiferimentoUf`** (`number`): % Diferimento UF
    - **`percentualDiferimentoMunicipio`** (`number`): % Diferimento Município
    - **`codigoCreditoPresumido`** (`string`): Código Crédito Presumido
    - **`percentualCreditoPresumido`** (`number`): % Crédito Presumido IBS
  - **`cbs`** (`object`): 
    - **`regraOperacao`** (`object`): 
      - **`id`** (`integer`): 
    - **`percentualCbs`** (`number`): Percentual CBS
    - **`percentualReducaoAliquota`** (`number`): % Redução Alíquota
    - **`aliquotaEfetiva`** (`number`): Alíquota Efetiva
    - **`percentualDiferimento`** (`number`): % Diferimento
    - **`codigoCreditoPresumido`** (`string`): Código Crédito Presumido
    - **`percentualCreditoPresumido`** (`number`): % Crédito Presumido CBS
  - **`ibsCbsReg`** (`object`): 
    - **`cstRegular`** (`string`): CST da Tributação Regular
    - **`classificacaoTributariaRegular`** (`string`): Classificação Tributária Regular
    - **`aliquotaEfetivaRegularIbsUf`** (`number`): Alíquota Efetiva Regular IBS UF
    - **`aliquotaEfetivaRegularIbsMunicipio`** (`number`): Alíquota Efetiva Regular IBS Município
    - **`aliquotaEfetivaRegularCbs`** (`number`): Alíquota Efetiva Regular CBS
    - **`valorTributacaoRegularIbsUf`** (`number`): Valor Tributação Regular IBS UF
    - **`valorTributacaoRegularIbsMunicipio`** (`number`): Valor Tributação Regular IBS Município
    - **`valorTributacaoRegularCbs`** (`number`): Valor Tributação Regular CBS

```json
{
  "data": {
    "faturada": false,
    "observacoes": "Total aproximado de tributos: R$ [APROX_TRIB]. Fonte IBPT.",
    "pisCofinsPresumido": false,
    "somaImpostosTotal": false,
    "somaIcmsTotal": false,
    "aliquotaFunrural": 0,
    "descontaFunrural": false,
    "consumidorFinal": false,
    "retImpostoRetido": false,
    "retAliquotaIr": 0,
    "retValorIr": 0,
    "retAliquotaCsll": 0,
    "retValorCsll": 0,
    "descontoCondicional": false,
    "baseComissao": 0,
    "icms": null,
    "valorPmc": 0,
    "aliquotaValorAproxImpostos": 0,
    "informacoesAdicionaisFisco": "",
    "incluirFreteIpi": false,
    "simples": null,
    "ipi": null,
    "issqn": null,
    "pis": null,
    "cofins": null,
    "icmsSt": null,
    "pisSt": {
      "regraOperacao": {
        "id": 12345678
      },
      "tributacao": 1,
      "cst": "49",
      "aliquota": 0,
      "base": 0,
      "valorBaseCalculo": 0,
      "valorImposto": 0,
      "observacoes": "",
      "informacoesAdicionaisFisco": ""
    },
    "cofinsSt": {
      "regraOperacao": {
        "id": 12345678
      },
      "tributacao": 1,
      "cst": "49",
      "aliquota": 0,
      "base": 0,
      "valorBaseCalculo": 0,
      "valorImposto": 0,
      "observacoes": "",
      "informacoesAdicionaisFisco": ""
    },
    "ii": {
      "regraOperacao": {
        "id": 12345678
      },
      "tributacao": 1,
      "cst": "49",
      "aliquota": 0,
      "base": 0,
      "valorBaseCalculo": 0,
      "valorImposto": 0,
      "observacoes": "",
      "informacoesAdicionaisFisco": ""
    },
    "codigoBeneficioFiscal": "",
    "porcentagemFcp": 0,
    "cfop": 0,
    "simplesSt": {
      "regraOperacao": {
        "id": 12345678
      },
      "tributacao": 1,
      "cst": "49",
      "aliquota": 0,
      "base": 0,
      "valorBaseCalculo": 0,
      "valorImposto": 0,
      "observacoes": "",
      "informacoesAdicionaisFisco": ""
    },
    "ibsCbs": {
      "regraOperacao": {
        "id": 12345678
      },
      "cst": "000",
      "classificacaoTributaria": "000001",
      "valorBaseCalculo": 0
    },
    "ibs": {
      "regraOperacao": {
        "id": 12345678
      },
      "percentualIbsUf": 0.1,
      "percentualIbsMunicipio": 0,
      "percentualReducaoAliquotaUf": 0,
      "percentualReducaoAliquotaMunicipio": 0,
      "aliquotaEfetivaUf": 0,
      "aliquotaEfetivaMunicipio": 0,
      "percentualDiferimentoUf": 0,
      "percentualDiferimentoMunicipio": 0,
      "codigoCreditoPresumido": "",
      "percentualCreditoPresumido": 0
    },
    "cbs": {
      "regraOperacao": {
        "id": 12345678
      },
      "percentualCbs": 0.9,
      "percentualReducaoAliquota": 0,
      "aliquotaEfetiva": 0,
      "percentualDiferimento": 0,
      "codigoCreditoPresumido": "",
      "percentualCreditoPresumido": 0
    },
    "ibsCbsReg": {
      "cstRegular": "000",
      "classificacaoTributariaRegular": "000001",
      "aliquotaEfetivaRegularIbsUf": 0,
      "aliquotaEfetivaRegularIbsMunicipio": 0,
      "aliquotaEfetivaRegularCbs": 0,
      "valorTributacaoRegularIbsUf": 0,
      "valorTributacaoRegularIbsMunicipio": 0,
      "valorTributacaoRegularCbs": 0
    }
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /nfce
**Resumo**: Obtém notas fiscais de consumidor

**Descrição**: Obtém notas fiscais de consumidor paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/nfce" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `idTransportador` | `query` | `integer` | Não | ID do contato do transportador |
| `chaveAcesso` | `query` | `integer` | Não | Chave de acesso |
| `numero` | `query` | `integer` | Não | Número da nota fiscal de consumidor |
| `serie` | `query` | `integer` | Não | Série |
| `situacao` | `query` | `integer` | Não | `1` Pendente<br>`2` Cancelada<br>`3` Aguardando recibo<br>`4` Rejeitada<br>`5` Autorizada<br>`6` Emitida DANFE<br>`7` Registrada<br>`8` Aguardando protocolo<br>`9` Denegada<br>`10` Consulta situação<br>`11` Bloqueada |
| `dataEmissaoInicial` | `query` | `string` | Não | Data e hora inicial de emissão |
| `dataEmissaoFinal` | `query` | `string` | Não | Data e hora final de emissão |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`tipo`** (`integer`): `0` Entrada <br> `1` Saída
  - **`situacao`** (`integer`): `1` Pendente<br>`2` Cancelada<br>`3` Aguardando recibo<br>`4` Rejeitada<br>`5` Autorizada<br>`6` Emitida DANFE<br>`7` Registrada<br>`8` Aguardando protocolo<br>`9` Denegada<br>`10` Consulta situação<br>`11` Bloqueada
  - **`numero`** (`string`): 
  - **`dataEmissao`** (`string`): Data e hora da emissão.
  - **`dataOperacao`** (`string`): Data de saída/entrada de acordo com o tipo da nota.
  - **`chaveAcesso`** (`string`): 
  - **`contato`** (`object`): 
    - **`id`** (`integer`): 
    - **`nome`** (`string`): 
    - **`tipoPessoa`** (`string`): `F` Física <br> `J` Jurídica <br> `E` Estrangeira.
    - **`numeroDocumento`** (`string`): CNPJ ou CPF.
    - **`ie`** (`string`): 
    - **`rg`** (`string`): 
    - **`contribuinte`** (`integer`): `1` Contribuinte do ICMS <br> `2` Contribuinte isento de ICMS <br> `9` Não contribuinte.
    - **`telefone`** (`string`): 
    - **`email`** (`string`): 
    - **`endereco`** (`object`): 
      - **`endereco`** (`string`): 
      - **`numero`** (`string`): 
      - **`complemento`** (`string`): 
      - **`bairro`** (`string`): 
      - **`cep`** (`string`): 
      - **`municipio`** (`string`): 
      - **`uf`** (`string`): 
      - **`pais`** (`string`): País do cliente, caso o cliente for estrangeiro (uf: UX)
  - **`naturezaOperacao`** (`object`): 
    - **`id`** (`integer`): 
  - **`loja`** (`object`): 
    - **`id`** (`integer`): 
    - **`numero`** (`string`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "tipo": 1,
      "situacao": 1,
      "numero": "6541",
      "dataEmissao": "2023-01-12 09:52:12",
      "dataOperacao": "2023-01-12 09:52:12",
      "chaveAcesso": "string_value",
      "contato": {
        "id": 12345678,
        "nome": "Contato do Bling",
        "tipoPessoa": "J",
        "numeroDocumento": "30188025000121",
        "ie": "7364873393",
        "rg": "451838701",
        "contribuinte": 1,
        "telefone": "54 3771-7278",
        "email": "pedrosilva@bling.com.br",
        "endereco": {
          "endereco": "Olavo Bilac",
          "numero": "914",
          "complemento": "Sala 101",
          "bairro": "Imigrante",
          "cep": "95702-000",
          "municipio": "Bento Gonçalves",
          "uf": "RS",
          "pais": ""
        }
      },
      "naturezaOperacao": {
        "id": 12345678
      },
      "loja": {
        "id": 12345678,
        "numero": "LOJA_8864"
      }
    }
  ]
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfce
**Resumo**: Cria uma nota fiscal de consumidor

**Descrição**: Cria uma nota fiscal de consumidor.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfce" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /nfce/{idNotaFiscalConsumidor}
**Resumo**: Obtém uma nota fiscal de consumidor

**Descrição**: Obtém uma nota fiscal de consumidor pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/nfce/{idNotaFiscalConsumidor}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscalConsumidor` | `path` | `integer` | Sim | ID da nota fiscal de consumidor |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /nfce/{idNotaFiscalConsumidor}
**Resumo**: Altera uma nota fiscal de consumidor

**Descrição**: Altera uma nota fiscal de consumidor.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/nfce/{idNotaFiscalConsumidor}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscalConsumidor` | `path` | `integer` | Sim | ID da nota fiscal de consumidor |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfce/{idNotaFiscalConsumidor}/enviar
**Resumo**: Envia uma nota de consumidor

**Descrição**: Envia uma nota de consumidor pelo ID para emissão na Sefaz.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfce/{idNotaFiscalConsumidor}/enviar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscalConsumidor` | `path` | `integer` | Sim | ID da nota fiscal de consumidor |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`xml`** (`string`): 

```json
{
  "data": {
    "xml": "string_value"
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfce/{idNotaFiscalConsumidor}/lancar-contas
**Resumo**: Lança as contas de uma nota fiscal

**Descrição**: Lança as contas de uma nota fiscal pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfce/{idNotaFiscalConsumidor}/lancar-contas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscalConsumidor` | `path` | `integer` | Sim | ID da nota fiscal de consumidor |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfce/{idNotaFiscalConsumidor}/estornar-contas
**Resumo**: Estorna as contas de uma nota fiscal

**Descrição**: Estorna as contas de uma nota fiscal pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfce/{idNotaFiscalConsumidor}/estornar-contas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscalConsumidor` | `path` | `integer` | Sim | ID da nota fiscal de consumidor |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfce/{idNotaFiscalConsumidor}/lancar-estoque
**Resumo**: Lança o estoque de uma nota fiscal no depósito padrão

**Descrição**: Lança o estoque de uma nota fiscal pelo ID, no depósito padrão.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfce/{idNotaFiscalConsumidor}/lancar-estoque" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscalConsumidor` | `path` | `integer` | Sim | ID da nota fiscal de consumidor |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfce/{idNotaFiscalConsumidor}/lancar-estoque/{idDeposito}
**Resumo**: Lança o estoque de uma nota fiscal especificando o depósito

**Descrição**: Lança o estoque de uma nota fiscal pelo ID, especificando o ID do depósito.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfce/{idNotaFiscalConsumidor}/lancar-estoque/{idDeposito}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscalConsumidor` | `path` | `integer` | Sim | ID da nota fiscal de consumidor |
| `idDeposito` | `path` | `integer` | Sim | ID do depósito |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfce/{idNotaFiscalConsumidor}/estornar-estoque
**Resumo**: Estorna o estoque de uma nota fiscal

**Descrição**: Estorna o estoque de uma nota fiscal pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfce/{idNotaFiscalConsumidor}/estornar-estoque" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscalConsumidor` | `path` | `integer` | Sim | ID da nota fiscal de consumidor |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /nfe
**Resumo**: Obtém notas fiscais

**Descrição**: Obtém notas fiscais paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/nfe" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `numeroLoja` | `query` | `string` | Não | Número do pedido na loja |
| `idTransportador` | `query` | `integer` | Não | ID do contato do transportador |
| `chaveAcesso` | `query` | `integer` | Não | Chave de acesso |
| `numero` | `query` | `integer` | Não | Número da nota fiscal |
| `serie` | `query` | `integer` | Não | Série |
| `situacao` | `query` | `integer` | Não | `1` Pendente<br>`2` Cancelada<br>`3` Aguardando recibo<br>`4` Rejeitada<br>`5` Autorizada<br>`6` Emitida DANFE<br>`7` Registrada<br>`8` Aguardando protocolo<br>`9` Denegada<br>`10` Consulta situação<br>`11` Bloqueada<br><br>**Observação:** Caso este parâmetro não seja informado, as notas canceladas não serão incluídas na consulta.<br><br> |
| `tipo` | `query` | `string` | Não | `0` Entrada <br> `1` Saída |
| `dataEmissaoInicial` | `query` | `string` | Não | Data e hora incial de emissão |
| `dataEmissaoFinal` | `query` | `string` | Não | Data e hora final de emissão |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`tipo`** (`integer`): `0` Entrada <br> `1` Saída
  - **`situacao`** (`integer`): `1` Pendente<br>`2` Cancelada<br>`3` Aguardando recibo<br>`4` Rejeitada<br>`5` Autorizada<br>`6` Emitida DANFE<br>`7` Registrada<br>`8` Aguardando protocolo<br>`9` Denegada<br>`10` Consulta situação<br>`11` Bloqueada
  - **`numero`** (`string`): 
  - **`dataEmissao`** (`string`): Data e hora da emissão.
  - **`dataOperacao`** (`string`): Data de saída/entrada de acordo com o tipo da nota.
  - **`chaveAcesso`** (`string`): 
  - **`contato`** (`object`): 
    - **`id`** (`integer`): 
    - **`nome`** (`string`): 
    - **`tipoPessoa`** (`string`): `F` Física <br> `J` Jurídica <br> `E` Estrangeira.
    - **`numeroDocumento`** (`string`): CNPJ ou CPF.
    - **`ie`** (`string`): 
    - **`rg`** (`string`): 
    - **`contribuinte`** (`integer`): `1` Contribuinte do ICMS <br> `2` Contribuinte isento de ICMS <br> `9` Não contribuinte.
    - **`telefone`** (`string`): 
    - **`email`** (`string`): 
    - **`endereco`** (`object`): 
      - **`endereco`** (`string`): 
      - **`numero`** (`string`): 
      - **`complemento`** (`string`): 
      - **`bairro`** (`string`): 
      - **`cep`** (`string`): 
      - **`municipio`** (`string`): 
      - **`uf`** (`string`): 
      - **`pais`** (`string`): País do cliente, caso o cliente for estrangeiro (uf: UX)
  - **`naturezaOperacao`** (`object`): 
    - **`id`** (`integer`): 
  - **`loja`** (`object`): 
    - **`id`** (`integer`): 
    - **`numero`** (`string`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "tipo": 1,
      "situacao": 1,
      "numero": "6541",
      "dataEmissao": "2023-01-12 09:52:12",
      "dataOperacao": "2023-01-12 09:52:12",
      "chaveAcesso": "string_value",
      "contato": {
        "id": 12345678,
        "nome": "Contato do Bling",
        "tipoPessoa": "J",
        "numeroDocumento": "30188025000121",
        "ie": "7364873393",
        "rg": "451838701",
        "contribuinte": 1,
        "telefone": "54 3771-7278",
        "email": "pedrosilva@bling.com.br",
        "endereco": {
          "endereco": "Olavo Bilac",
          "numero": "914",
          "complemento": "Sala 101",
          "bairro": "Imigrante",
          "cep": "95702-000",
          "municipio": "Bento Gonçalves",
          "uf": "RS",
          "pais": ""
        }
      },
      "naturezaOperacao": {
        "id": 12345678
      },
      "loja": {
        "id": 12345678,
        "numero": "LOJA_8864"
      }
    }
  ]
}
```

---

## POST /nfe
**Resumo**: Cria uma nota fiscal

**Descrição**: Cria uma nota fiscal.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfe" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /nfe
**Resumo**: Remove múltiplas notas fiscais

**Descrição**: Remove múltiplas notas fiscais por IDs.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/nfe" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsNotas[]` | `query` | `array` | Sim | IDs das notas fiscais |

### Respostas
#### **204** - No content.

#### **200** - 
- **`data`** (`object`): 
  - **`alertas`** (`array[object]`): 
  - **`idsExcluidos`** (`array[object]`): 

```json
{
  "data": {
    "alertas": [
      "12345677: Apenas notas pendentes podem ser excluídas."
    ],
    "idsExcluidos": [
      12345678
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /nfe/{idNotaFiscal}
**Resumo**: Obtém uma nota fiscal

**Descrição**: Obtém uma nota fiscal pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/nfe/{idNotaFiscal}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscal` | `path` | `integer` | Sim | ID da nota fiscal |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /nfe/{idNotaFiscal}
**Resumo**: Altera uma nota fiscal

**Descrição**: Altera uma nota fiscal pelo ID. Notas com vínculos possuem restrições de atualização. Notas autorizadas não podem ter dados fiscais alterados: valores, impostos, informações do destinatário e qualquer outro dado transmitido no XML da nota.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/nfe/{idNotaFiscal}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscal` | `path` | `integer` | Sim | ID da nota fiscal |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfe/{idNotaFiscal}/enviar
**Resumo**: Envia uma nota fiscal

**Descrição**: Envia uma nota fiscal pelo ID para emissão na Sefaz.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfe/{idNotaFiscal}/enviar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscal` | `path` | `integer` | Sim | ID da nota fiscal |
| `enviarEmail` | `query` | `boolean` | Não | Define se deve enviar email após a emissão da nota fiscal |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`xml`** (`string`): 

```json
{
  "data": {
    "xml": "string_value"
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfe/{idNotaFiscal}/lancar-contas
**Resumo**: Lança as contas de uma nota fiscal

**Descrição**: Lança as contas de uma nota fiscal pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfe/{idNotaFiscal}/lancar-contas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscal` | `path` | `integer` | Sim | ID da nota fiscal |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfe/{idNotaFiscal}/estornar-contas
**Resumo**: Estorna as contas de uma nota fiscal

**Descrição**: Estorna as contas de uma nota fiscal pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfe/{idNotaFiscal}/estornar-contas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscal` | `path` | `integer` | Sim | ID da nota fiscal |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfe/{idNotaFiscal}/lancar-estoque
**Resumo**: Lança o estoque de uma nota fiscal no depósito padrão

**Descrição**: Lança o estoque de uma nota fiscal pelo ID, no depósito padrão.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfe/{idNotaFiscal}/lancar-estoque" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscal` | `path` | `integer` | Sim | ID da nota fiscal |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfe/{idNotaFiscal}/lancar-estoque/{idDeposito}
**Resumo**: Lança o estoque de uma nota fiscal especificando o depósito

**Descrição**: Lança o estoque de uma nota fiscal pelo ID, especificando o ID do depósito.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfe/{idNotaFiscal}/lancar-estoque/{idDeposito}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscal` | `path` | `integer` | Sim | ID da nota fiscal |
| `idDeposito` | `path` | `integer` | Sim | ID do depósito |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfe/{idNotaFiscal}/estornar-estoque
**Resumo**: Estorna o estoque de uma nota fiscal

**Descrição**: Estorna o estoque de uma nota fiscal pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfe/{idNotaFiscal}/estornar-estoque" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaFiscal` | `path` | `integer` | Sim | ID da nota fiscal |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /nfe/documento/{chaveAcesso}
**Resumo**: Obtém o documento de uma nota fiscal

**Descrição**: Obtém o PDF ou XML de uma nota fiscal pela chave de acesso. O formato desejado deve ser informado via query param.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/nfe/documento/{chaveAcesso}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `chaveAcesso` | `path` | `string` | Sim | Chave de acesso da nota fiscal (44 dígitos) |
| `formato` | `query` | `string` | Sim | Formato do documento. `pdf` para o DANFE em PDF, `xml` para o XML da NF-e. |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`nome`** (`string`): Nome do documento.
  - **`conteudo`** (`string`): Conteúdo do documento comprimido com GZIP e codificado em base64. Para obter o documento original, decodifique o base64 e descomprima o resultado com GZIP.

```json
{
  "data": [
    {
      "nome": "string_value",
      "conteudo": "H4sIAAAAAAACA8z9BVgcTdc2iiIJGjxAsDBBg..."
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /nfse
**Resumo**: Obtém notas de serviços

**Descrição**: Obtém notas de serviços paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/nfse" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `situacao` | `query` | `integer` | Não | `0` Pendente <br> `1` Emitida <br> `2` Disponível para consulta <br> `3` Cancelada |
| `dataEmissaoInicial` | `query` | `string` | Não | Data incial do período de emissão |
| `dataEmissaoFinal` | `query` | `string` | Não | Data final do período de emissão |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfse
**Resumo**: Cria uma nota de serviço

**Descrição**: Cria uma nota de serviço.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfse" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /nfse/{idNotaServico}
**Resumo**: Obtém uma nota de serviço

**Descrição**: Obtém uma nota de serviço pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/nfse/{idNotaServico}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaServico` | `path` | `integer` | Sim | ID da nota de serviço |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /nfse/{idNotaServico}
**Resumo**: Exclui uma nota de serviço

**Descrição**: Exclui uma nota de serviço pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/nfse/{idNotaServico}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaServico` | `path` | `integer` | Sim | ID da nota de serviço |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfse/{idNotaServico}/enviar
**Resumo**: Envia uma nota de serviço

**Descrição**: Envia uma nota de serviço pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfse/{idNotaServico}/enviar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaServico` | `path` | `integer` | Sim | ID da nota de serviço |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /nfse/{idNotaServico}/cancelar
**Resumo**: Cancela uma nota de serviço

**Descrição**: Cancela uma nota de serviço pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/nfse/{idNotaServico}/cancelar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotaServico` | `path` | `integer` | Sim | ID da nota de serviço |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`codigoMotivo`** (`integer`): `1` Erro na Emissão<br> `2` Serviço não Prestado<br>`9` Outros
- **`justificativa`** (`string`): Justificativa do cancelamento.

**Exemplo de Payload**:
```json
{
  "codigoMotivo": 1,
  "justificativa": "Cancelamento de NFS-e"
}
```

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /nfse/configuracoes
**Resumo**: Configurações de nota de serviço

**Descrição**: Obtém todas as configurações de nota de serviço.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/nfse/configuracoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Respostas
#### **200** - 
- **`basicas`** (`object`): 
  - **`emissorPadrao`** (`integer`): 
  - **`naturezaOperacao`** (`integer`): 
- **`ISS`** (`object`): 
  - **`zerar`** (`boolean`): 
  - **`reter`** (`boolean`): 
  - **`descontar`** (`boolean`): 
  - **`tributos`** (`array[object]`): 
    - **`id`** (`integer`): ID é passado apenas para tributos existentes para fins de atualização
    - **`percentualISS`** (`number`): 
    - **`CNAE`** (`string`): 
    - **`descricaoServico`** (`string`): 
    - **`padrao`** (`boolean`): Determina se o tributo em questão será o padrão para criação de notas
    - **`indicadorOperacao`** (`string`): Indicador de operação da reforma tributária
    - **`codigo`** (`object`): 
      - **`listaServico`** (`string`): 
      - **`tributacao`** (`string`): 
- **`controle`** (`object`): 
  - **`numeracaoRPS`** (`object`): 
    - **`cnpjEmitente`** (`string`): 
    - **`id`** (`integer`): 
    - **`numero`** (`integer`): 
    - **`serie`** (`integer`): 
- **`impostos`** (`object`): 
  - **`bloquearRetencaoPessoaFisica`** (`boolean`): 
  - **`IR`** (`object`): 
    - **`percentual`** (`number`): 
    - **`valorMinimoAlternativoDescontol`** (`number`): 
    - **`descontar`** (`boolean`): Determina se o valor mínimo alternativo de desconto será aplicado
    - **`texto`** (`object`): 
      - **`padrao`** (`string`): 
      - **`isento`** (`string`): 
  - **`outros`** (`object`): 
    - **`CSLLPISCOFINSDTO`** (`object`): 
      - **`calcular`** (`boolean`): Reter CSLL, PIS e COFINS para notas acima de R$ 5.000,00 (Descontinuado pela Lei 13.137)
      - **`reter`** (`boolean`): Reter CSLL, PIS e COFINS quando a soma desses impostos for maior que R$ 10,00(Lei 10.833)
    - **`INSS`** (`object`): 
      - **`reter`** (`boolean`): Determina se o INSS deve ser retido
    - **`aproximados`** (`object`): 
      - **`utilizarAliqIBPT`** (`boolean`): Utilizar alíquotas da tabela do IBPT para cálculo de tributos aproximados
      - **`percentualAliq`** (`number`): Alíquota para cálculo de impostos aproximados
- **`envioEmail`** (`object`): 
  - **`enviarBoletoRPS`** (`boolean`): Enviar junto com o RPS o boleto das contas lançadas através do RPS ou do contrato
  - **`remetente`** (`string`): 
  - **`assunto`** (`string`): 
  - **`mensagem`** (`string`): 
  - **`padrao`** (`object`): 
    - **`copia`** (`string`): 
    - **`resposta`** (`string`): 
- **`adicionais`** (`object`): 
  - **`CFPS`** (`string`): Código Fiscal de Prestação de Serviço
  - **`CFOP`** (`string`): Código Fiscal de Operações e Prestações
  - **`AEDF`** (`string`): Autorização de Emissão de Documento Fiscal Eletrônico
  - **`proximoNumeroLote`** (`integer`): 
  - **`observacaoImpressaNota`** (`string`): Observação utilizada apenas para impressão
  - **`descricaoComplementar`** (`string`): Será adicionada abaixa da descrição do serviço em todas as notas
  - **`tipoEmissao`** (`string`): `T` Todos <br>`R` RPS e NFS-e <br>`N` Apenas NFS-e
  - **`campoNumeroDocContas`** (`boolean`): Escolha qual informação será utilizada como nº do documento ao lançar contas. Utilize o campo RPS caso o lançamento de contas ocorra antes do envio da nota
  - **`incentivadorFiscal`** (`boolean`): 
  - **`alterarSituacao`** (`boolean`): Permitir alteração de situação por usuários
  - **`incluirParcelas`** (`boolean`): Incluir informação das parcelas na descrição dos serviços na emissão da NFS-e
  - **`considerarDataParcela`** (`boolean`): Permite utilizar a data de vencimento da parcela da venda na geração automática de parcelas da nota de serviço
  - **`considerarDataOrdemServico`** (`boolean`): Permite utilizar a data de vencimento da parcela da ordem de serviço na geração automática de parcelas da nota de serviço
  - **`cadastroPrefeitura`** (`object`): 
    - **`login`** (`string`): 
    - **`senha`** (`string`): 

```json
{
  "basicas": {
    "emissorPadrao": 3,
    "naturezaOperacao": 1
  },
  "ISS": {
    "zerar": "false",
    "reter": "true",
    "descontar": "true",
    "tributos": [
      {
        "id": 1,
        "percentualISS": 5,
        "CNAE": "82.99",
        "descricaoServico": "Laudo de Vistoria Veicular",
        "padrao": "false",
        "indicadorOperacao": "010101",
        "codigo": {
          "listaServico": "0107",
          "tributacao": "0107"
        }
      }
    ]
  },
  "controle": {
    "numeracaoRPS": {
      "cnpjEmitente": "48.426.683/0001-70",
      "id": 1,
      "numero": 1,
      "serie": 1
    }
  },
  "impostos": {
    "bloquearRetencaoPessoaFisica": "true",
    "IR": {
      "percentual": 0,
      "valorMinimoAlternativoDescontol": 0,
      "descontar": "false",
      "texto": {
        "padrao": "( - ) IRenda Fonte 1,5%",
        "isento": "IR Isento Cfe. Lei nro. 9430/96 Art.64"
      }
    },
    "outros": {
      "CSLLPISCOFINSDTO": {
        "calcular": "true",
        "reter": "false"
      },
      "INSS": {
        "reter": "true"
      },
      "aproximados": {
        "utilizarAliqIBPT": "true",
        "percentualAliq": 0
      }
    }
  },
  "envioEmail": {
    "enviarBoletoRPS": "true",
    "remetente": "Nome remetente padrão",
    "assunto": "Assunto padrão",
    "mensagem": "Mensagem padrão e-mail",
    "padrao": {
      "copia": "E-mail padrão de cópia",
      "resposta": "E-mail padrão de resposta"
    }
  },
  "adicionais": {
    "CFPS": "9.001",
    "CFOP": "1.250",
    "AEDF": "",
    "proximoNumeroLote": 78,
    "observacaoImpressaNota": "OBS",
    "descricaoComplementar": "OBS",
    "tipoEmissao": "R",
    "campoNumeroDocContas": "true",
    "incentivadorFiscal": "true",
    "alterarSituacao": "true",
    "incluirParcelas": "false",
    "considerarDataParcela": "true",
    "considerarDataOrdemServico": "true",
    "cadastroPrefeitura": {
      "login": "Login prefeitura",
      "senha": "Senha prefeitura"
    }
  }
}
```

---

## PUT /nfse/configuracoes
**Resumo**: Configurações de nota de serviço

**Descrição**: Cria e altera configurações para emissão de notas de serviço.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/nfse/configuracoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`basicas`** (`object`): 
  - **`emissorPadrao`** (`integer`): 
  - **`naturezaOperacao`** (`integer`): 
- **`ISS`** (`object`): 
  - **`zerar`** (`boolean`): 
  - **`reter`** (`boolean`): 
  - **`descontar`** (`boolean`): 
  - **`tributos`** (`array[object]`): 
    - **`id`** (`integer`): ID é passado apenas para tributos existentes para fins de atualização
    - **`percentualISS`** (`number`): 
    - **`CNAE`** (`string`): 
    - **`descricaoServico`** (`string`): 
    - **`padrao`** (`boolean`): Determina se o tributo em questão será o padrão para criação de notas
    - **`indicadorOperacao`** (`string`): Indicador de operação da reforma tributária
    - **`codigo`** (`object`): 
      - **`listaServico`** (`string`): 
      - **`tributacao`** (`string`): 
- **`controle`** (`object`): 
  - **`numeracaoRPS`** (`object`): 
    - **`cnpjEmitente`** (`string`): 
    - **`id`** (`integer`): 
    - **`numero`** (`integer`): 
    - **`serie`** (`integer`): 
- **`impostos`** (`object`): 
  - **`bloquearRetencaoPessoaFisica`** (`boolean`): 
  - **`IR`** (`object`): 
    - **`percentual`** (`number`): 
    - **`valorMinimoAlternativoDescontol`** (`number`): 
    - **`descontar`** (`boolean`): Determina se o valor mínimo alternativo de desconto será aplicado
    - **`texto`** (`object`): 
      - **`padrao`** (`string`): 
      - **`isento`** (`string`): 
  - **`outros`** (`object`): 
    - **`CSLLPISCOFINSDTO`** (`object`): 
      - **`calcular`** (`boolean`): Reter CSLL, PIS e COFINS para notas acima de R$ 5.000,00 (Descontinuado pela Lei 13.137)
      - **`reter`** (`boolean`): Reter CSLL, PIS e COFINS quando a soma desses impostos for maior que R$ 10,00(Lei 10.833)
    - **`INSS`** (`object`): 
      - **`reter`** (`boolean`): Determina se o INSS deve ser retido
    - **`aproximados`** (`object`): 
      - **`utilizarAliqIBPT`** (`boolean`): Utilizar alíquotas da tabela do IBPT para cálculo de tributos aproximados
      - **`percentualAliq`** (`number`): Alíquota para cálculo de impostos aproximados
- **`envioEmail`** (`object`): 
  - **`enviarBoletoRPS`** (`boolean`): Enviar junto com o RPS o boleto das contas lançadas através do RPS ou do contrato
  - **`remetente`** (`string`): 
  - **`assunto`** (`string`): 
  - **`mensagem`** (`string`): 
  - **`padrao`** (`object`): 
    - **`copia`** (`string`): 
    - **`resposta`** (`string`): 
- **`adicionais`** (`object`): 
  - **`CFPS`** (`string`): Código Fiscal de Prestação de Serviço
  - **`CFOP`** (`string`): Código Fiscal de Operações e Prestações
  - **`AEDF`** (`string`): Autorização de Emissão de Documento Fiscal Eletrônico
  - **`proximoNumeroLote`** (`integer`): 
  - **`observacaoImpressaNota`** (`string`): Observação utilizada apenas para impressão
  - **`descricaoComplementar`** (`string`): Será adicionada abaixa da descrição do serviço em todas as notas
  - **`tipoEmissao`** (`string`): `T` Todos <br>`R` RPS e NFS-e <br>`N` Apenas NFS-e
  - **`campoNumeroDocContas`** (`boolean`): Escolha qual informação será utilizada como nº do documento ao lançar contas. Utilize o campo RPS caso o lançamento de contas ocorra antes do envio da nota
  - **`incentivadorFiscal`** (`boolean`): 
  - **`alterarSituacao`** (`boolean`): Permitir alteração de situação por usuários
  - **`incluirParcelas`** (`boolean`): Incluir informação das parcelas na descrição dos serviços na emissão da NFS-e
  - **`considerarDataParcela`** (`boolean`): Permite utilizar a data de vencimento da parcela da venda na geração automática de parcelas da nota de serviço
  - **`considerarDataOrdemServico`** (`boolean`): Permite utilizar a data de vencimento da parcela da ordem de serviço na geração automática de parcelas da nota de serviço
  - **`cadastroPrefeitura`** (`object`): 
    - **`login`** (`string`): 
    - **`senha`** (`string`): 

**Exemplo de Payload**:
```json
{
  "basicas": {
    "emissorPadrao": 3,
    "naturezaOperacao": 1
  },
  "ISS": {
    "zerar": "false",
    "reter": "true",
    "descontar": "true",
    "tributos": [
      {
        "id": 1,
        "percentualISS": 5,
        "CNAE": "82.99",
        "descricaoServico": "Laudo de Vistoria Veicular",
        "padrao": "false",
        "indicadorOperacao": "010101",
        "codigo": {
          "listaServico": "0107",
          "tributacao": "0107"
        }
      }
    ]
  },
  "controle": {
    "numeracaoRPS": {
      "cnpjEmitente": "48.426.683/0001-70",
      "id": 1,
      "numero": 1,
      "serie": 1
    }
  },
  "impostos": {
    "bloquearRetencaoPessoaFisica": "true",
    "IR": {
      "percentual": 0,
      "valorMinimoAlternativoDescontol": 0,
      "descontar": "false",
      "texto": {
        "padrao": "( - ) IRenda Fonte 1,5%",
        "isento": "IR Isento Cfe. Lei nro. 9430/96 Art.64"
      }
    },
    "outros": {
      "CSLLPISCOFINSDTO": {
        "calcular": "true",
        "reter": "false"
      },
      "INSS": {
        "reter": "true"
      },
      "aproximados": {
        "utilizarAliqIBPT": "true",
        "percentualAliq": 0
      }
    }
  },
  "envioEmail": {
    "enviarBoletoRPS": "true",
    "remetente": "Nome remetente padrão",
    "assunto": "Assunto padrão",
    "mensagem": "Mensagem padrão e-mail",
    "padrao": {
      "copia": "E-mail padrão de cópia",
      "resposta": "E-mail padrão de resposta"
    }
  },
  "adicionais": {
    "CFPS": "9.001",
    "CFOP": "1.250",
    "AEDF": "",
    "proximoNumeroLote": 78,
    "observacaoImpressaNota": "OBS",
    "descricaoComplementar": "OBS",
    "tipoEmissao": "R",
    "campoNumeroDocContas": "true",
    "incentivadorFiscal": "true",
    "alterarSituacao": "true",
    "incluirParcelas": "false",
    "considerarDataParcela": "true",
    "considerarDataOrdemServico": "true",
    "cadastroPrefeitura": {
      "login": "Login prefeitura",
      "senha": "Senha prefeitura"
    }
  }
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /notificacoes
**Resumo**: Obtém todas as notificações de uma empresa em um período

**Descrição**: Obtém todas as notificações de uma empresa no período informado. Caso período não seja informado, será considerado o ano atual.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/notificacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `periodo` | `query` | `string` | Não | Apenas ano ou ano e mês em que a empresa foi notificada. Caso não informado, será utilizado o ano atual. |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /notificacoes/{idNotificacao}/confirmar-leitura
**Resumo**: Marca notificação como lida

**Descrição**: Marca a notificação relacionada à empresa como lida.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/notificacoes/{idNotificacao}/confirmar-leitura" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idNotificacao` | `path` | `string` | Sim | ULID da notificação. |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /notificacoes/quantidade
**Resumo**: Obtém a quantidade de notificações de uma empresa em um período

**Descrição**: Obtém a quantidade de notificações de uma empresa no período informado. Caso período não seja informado, será considerado o ano atual.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/notificacoes/quantidade" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `periodo` | `query` | `string` | Não | Apenas ano ou ano e mês em que a empresa foi notificada. Caso não informado, será utilizado o ano atual. |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`quantidade`** (`integer`): Quantidade de notificações.

```json
{
  "data": {
    "quantidade": "10"
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /propostas-comerciais
**Resumo**: Obtém propostas comerciais

**Descrição**: Obtém propostas comerciais paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/propostas-comerciais" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `situacao` | `query` | `string` | Não | O valor referente a situação da proposta: Pendente, Aguardando, Não aprovado, Aprovado, Concluido, Rascunho. Para mais situações, pesquisar pelo número separado por vírgula. |
| `idContato` | `query` | `integer` | Não | ID do contato |
| `dataInicial` | `query` | `string` | Não | Data inicial |
| `dataFinal` | `query` | `string` | Não | Data final |
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`data`** (`string`): 
  - **`situacao`** (`string`): 
  - **`total`** (`number`): 
  - **`totalProdutos`** (`number`): 
  - **`numero`** (`integer`): 
  - **`contato`** (`object`): 
    - **`id`** (`integer`): 
  - **`loja`** (`object`): 
    - **`id`** (`integer`): 
    - **`unidadeNegocio`** (`object`): 
      - **`id`** (`integer`): 

```json
{
  "data": [
    {
      "id": 123456789,
      "data": "2024-04-29",
      "situacao": "Concluído",
      "total": 251,
      "totalProdutos": 500,
      "numero": 13,
      "contato": {
        "id": 12345678
      },
      "loja": {
        "id": 12345678,
        "unidadeNegocio": {
          "id": 12345678
        }
      }
    }
  ]
}
```

---

## POST /propostas-comerciais
**Resumo**: Cria uma proposta comercial

**Descrição**: Cria uma proposta comercial.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/propostas-comerciais" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /propostas-comerciais
**Resumo**: Remove múltiplas propostas comerciais

**Descrição**: Remove múltiplas propostas comerciais pelos IDs.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/propostas-comerciais" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsPropostasComerciais[]` | `query` | `array` | Sim | IDs das propostas comerciais |

### Respostas
#### **204** - No content.

#### **200** - 
- **`data`** (`object`): 
  - **`alertas`** (`array[object]`): 
    - **`error`** (`object`): 
      - **`type`** (`string`): 
      - **`message`** (`string`): 
      - **`description`** (`string`): 
      - **`fields`** (`array[object]`): 
        - **`code`** (`integer`): 
        - **`msg`** (`string`): 
        - **`element`** (`string`): 
        - **`namespace`** (`string`): Referência ao objeto com erro.
        - **`collection`** (`array[object]`): 
          - **`index`** (`integer`): 
          - **`code`** (`integer`): 
          - **`msg`** (`string`): 
          - **`element`** (`string`): 
          - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "data": {
    "alertas": [
      {
        "error": {
          "type": "VALIDATION_ERROR",
          "message": "Não foi possível salvar a venda",
          "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
          "fields": [
            {
              "code": "...",
              "msg": "...",
              "element": "...",
              "namespace": "...",
              "collection": "..."
            }
          ]
        }
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /propostas-comerciais/{idPropostaComercial}
**Resumo**: Obtém uma proposta comercial

**Descrição**: Obtém uma proposta comercial pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/propostas-comerciais/{idPropostaComercial}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPropostaComercial` | `path` | `integer` | Sim | ID da proposta comercial |

### Respostas
#### **200** - 

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /propostas-comerciais/{idPropostaComercial}
**Resumo**: Altera uma proposta comercial

**Descrição**: Altera uma proposta comercial pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/propostas-comerciais/{idPropostaComercial}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPropostaComercial` | `path` | `integer` | Sim | ID da proposta comercial |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /propostas-comerciais/{idPropostaComercial}
**Resumo**: Remove uma proposta comercial

**Descrição**: Remove uma proposta comercial pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/propostas-comerciais/{idPropostaComercial}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPropostaComercial` | `path` | `integer` | Sim | ID da proposta comercial |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /propostas-comerciais/{idPropostaComercial}/situacoes
**Resumo**: Altera a situação de uma proposta comercial

**Descrição**: Altera a situação de uma proposta comercial pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/propostas-comerciais/{idPropostaComercial}/situacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPropostaComercial` | `path` | `integer` | Sim | ID da proposta comercial |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`situacao`** (`string`): 

**Exemplo de Payload**:
```json
{
  "situacao": "Aguardando"
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /pedidos/compras
**Resumo**: Obtém pedidos de compras

**Descrição**: Obtém pedidos de compras paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/pedidos/compras" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `idFornecedor` | `query` | `integer` | Não | ID do contato do tipo fornecedor |
| `valorSituacao` | `query` | `integer` | Não | Valor da situação |
| `idSituacao` | `query` | `integer` | Não | ID da situação |
| `dataInicial` | `query` | `string` | Não | Data inicial do período da compra |
| `dataFinal` | `query` | `string` | Não | Data final do período da compra |
| `idsNotasFiscais[]` | `query` | `array` | Não | IDs das notas fiscais de entrada |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

---

## POST /pedidos/compras
**Resumo**: Cria um pedido de compra

**Descrição**: Cria um pedido de compra.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/compras" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /pedidos/compras/{idPedidoCompra}
**Resumo**: Obtém um pedido de compra

**Descrição**: Obtém um pedido de compra pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/pedidos/compras/{idPedidoCompra}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoCompra` | `path` | `integer` | Sim | ID do pedido de compra |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /pedidos/compras/{idPedidoCompra}
**Resumo**: Altera um pedido de compra

**Descrição**: Altera um pedido de compra pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/pedidos/compras/{idPedidoCompra}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoCompra` | `path` | `integer` | Sim | ID do pedido de compra |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /pedidos/compras/{idPedidoCompra}
**Resumo**: Remove um pedido de compra

**Descrição**: Remove um pedido de compra pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/pedidos/compras/{idPedidoCompra}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoCompra` | `path` | `integer` | Sim | ID do pedido de compra |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /pedidos/compras/{idPedidoCompra}/situacoes/{idSituacao}
**Resumo**: Altera a situação de um pedido de compra

**Descrição**: Altera a situação de um pedido de compra pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/pedidos/compras/{idPedidoCompra}/situacoes/{idSituacao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoCompra` | `path` | `integer` | Sim | ID do pedido de compra |
| `idSituacao` | `path` | `integer` | Sim | ID da situação do pedido de compra |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /pedidos/compras/{idPedidoCompra}/lancar-contas
**Resumo**: Lança as contas de um pedido de compra

**Descrição**: Lança as contas de um pedido de compra pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/compras/{idPedidoCompra}/lancar-contas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoCompra` | `path` | `integer` | Sim | ID do pedido de compra |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /pedidos/compras/{idPedidoCompra}/estornar-contas
**Resumo**: Estorna as contas de um pedido de compra

**Descrição**: Estorna as contas de um pedido de compra pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/compras/{idPedidoCompra}/estornar-contas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoCompra` | `path` | `integer` | Sim | ID do pedido de compra |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /pedidos/compras/{idPedidoCompra}/lancar-estoque
**Resumo**: Lança o estoque de um pedido de compra

**Descrição**: Lança o estoque de um pedido de compra pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/compras/{idPedidoCompra}/lancar-estoque" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoCompra` | `path` | `integer` | Sim | ID do pedido de compra |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /pedidos/compras/{idPedidoCompra}/estornar-estoque
**Resumo**: Estorna o estoque de um pedido de compra

**Descrição**: Estorna o estoque de um pedido de compra pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/compras/{idPedidoCompra}/estornar-estoque" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoCompra` | `path` | `integer` | Sim | ID do pedido de compra |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/estruturas/{idProdutoEstrutura}
**Resumo**: Obtém a estrutura de um produto com composição

**Descrição**: Obtém a estrutura de um produto com composição pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/estruturas/{idProdutoEstrutura}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoEstrutura` | `path` | `integer` | Sim | ID do produto com composição |

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`tipoEstoque`** (`string`): `F` Físico<br> `V` Virtual
  - **`lancamentoEstoque`** (`string`): `A` Produto e Componente<br> `M` Componente<br> `P` Produto
  - **`componentes`** (`array[object]`): 
    - **`produto`** (`object`): 
      - **`id`** (`integer`): 
    - **`quantidade`** (`number`): 

```json
{
  "data": {
    "tipoEstoque": "F",
    "lancamentoEstoque": "A",
    "componentes": [
      {
        "produto": {
          "id": 1
        },
        "quantidade": 2.1
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /produtos/estruturas/{idProdutoEstrutura}
**Resumo**: Altera a estrutura de um produto com composição

**Descrição**: Altera a estrutura de um produto com composição pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/produtos/estruturas/{idProdutoEstrutura}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoEstrutura` | `path` | `integer` | Sim | ID do produto com composição |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`tipoEstoque`** (`string`): `F` Físico<br> `V` Virtual
- **`lancamentoEstoque`** (`string`): `A` Produto e Componente<br> `M` Componente<br> `P` Produto
- **`componentes`** (`array[object]`): 
  - **`produto`** (`object`): 
    - **`id`** (`integer`): 
  - **`quantidade`** (`number`): 

**Exemplo de Payload**:
```json
{
  "tipoEstoque": "F",
  "lancamentoEstoque": "A",
  "componentes": [
    {
      "produto": {
        "id": 1
      },
      "quantidade": 2.1
    }
  ]
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /produtos/estruturas/{idProdutoEstrutura}/componentes
**Resumo**: Adiciona componente(s) a uma estrutura

**Descrição**: Adiciona múltiplos componentes a uma estrutura pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/produtos/estruturas/{idProdutoEstrutura}/componentes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoEstrutura` | `path` | `integer` | Sim | ID do produto com composição |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`produto`** (`object`): 
  - **`id`** (`integer`): 
- **`quantidade`** (`number`): 

**Exemplo de Payload**:
```json
[
  {
    "produto": {
      "id": 1
    },
    "quantidade": 2.1
  }
]
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /produtos/estruturas/{idProdutoEstrutura}/componentes
**Resumo**: Remove componentes específicos de um produto com composição

**Descrição**: Remove os componentes de um produto com composição pelos IDs dos componentes.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/produtos/estruturas/{idProdutoEstrutura}/componentes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoEstrutura` | `path` | `integer` | Sim | ID do produto com composição |
| `idsComponentes[]` | `query` | `array` | Sim | IDs dos produtos |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /produtos/estruturas/{idProdutoEstrutura}/componentes/{idComponente}
**Resumo**: Altera um componente de uma estrutura

**Descrição**: Altera um componente de uma estrutura pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/produtos/estruturas/{idProdutoEstrutura}/componentes/{idComponente}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoEstrutura` | `path` | `integer` | Sim | ID do produto com composição |
| `idComponente` | `path` | `integer` | Sim | ID do componente |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`produto`** (`object`): 
  - **`id`** (`integer`): 
- **`quantidade`** (`number`): 

**Exemplo de Payload**:
```json
{
  "produto": {
    "id": 1
  },
  "quantidade": 2.1
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /produtos/estruturas
**Resumo**: Remove a estrutura de múltiplos produtos

**Descrição**: Remove a estrutura de múltiplos produtos com composição pelos IDs.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/produtos/estruturas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsProdutos[]` | `query` | `array` | Sim | IDs dos produtos |

### Respostas
#### **204** - No content.

#### **200** - 
- **`data`** (`object`): 
  - **`alertas`** (`array[object]`): 
    - **`type`** (`string`): 
    - **`message`** (`string`): 
    - **`description`** (`string`): 
    - **`fields`** (`array[object]`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.
      - **`collection`** (`array[object]`): 
        - **`index`** (`integer`): 
        - **`code`** (`integer`): 
        - **`msg`** (`string`): 
        - **`element`** (`string`): 
        - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "data": {
    "alertas": [
      {
        "type": "VALIDATION_ERROR",
        "message": "Não foi possível salvar a venda",
        "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
        "fields": [
          {
            "code": 49,
            "msg": "Uma ou mais parcelas da venda possuem erros de validação",
            "element": "parcelas",
            "namespace": "VENDAS",
            "collection": [
              "..."
            ]
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/fornecedores
**Resumo**: Obtém produtos fornecedores

**Descrição**: Obtém produtos fornecedores paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/fornecedores" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `idProduto` | `query` | `integer` | Não | ID do produto |
| `idFornecedor` | `query` | `integer` | Não | ID do contato do tipo fornecedor |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

---

## POST /produtos/fornecedores
**Resumo**: Cria um produto fornecedor

**Descrição**: Cria um produto fornecedor.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/produtos/fornecedores" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/fornecedores/{idProdutoFornecedor}
**Resumo**: Obtém um produto fornecedor

**Descrição**: Obtém um produto fornecedor pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/fornecedores/{idProdutoFornecedor}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoFornecedor` | `path` | `integer` | Sim | ID do produto fornecedor |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /produtos/fornecedores/{idProdutoFornecedor}
**Resumo**: Altera um produto fornecedor

**Descrição**: Altera um produto fornecedor pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/produtos/fornecedores/{idProdutoFornecedor}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoFornecedor` | `path` | `integer` | Sim | ID do produto fornecedor |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /produtos/fornecedores/{idProdutoFornecedor}
**Resumo**: Remove um produto fornecedor

**Descrição**: Remove um produto fornecedor pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/produtos/fornecedores/{idProdutoFornecedor}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoFornecedor` | `path` | `integer` | Sim | ID do produto fornecedor |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/lojas
**Resumo**: Obtém vínculos de produtos com lojas

**Descrição**: Obtém vínculos de produtos com lojas paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/lojas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `idProduto` | `query` | `integer` | Não | ID do produto |
| `idLoja` | `query` | `integer` | Não | ID da loja |
| `idCategoriaProduto` | `query` | `integer` | Não | ID da categoria do produto vinculada à loja |
| `dataAlteracaoInicial` | `query` | `string` | Não | Data de alteração inicial |
| `dataAlteracaoFinal` | `query` | `string` | Não | Data de alteração final |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    {}
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /produtos/lojas
**Resumo**: Cria o vínculo de um produto com uma loja

**Descrição**: Cria o vínculo de um produto com uma loja.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/produtos/lojas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/lojas/{idProdutoLoja}
**Resumo**: Obtém um vínculo de produto com loja

**Descrição**: Obtém um vínculo de produto com loja pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/lojas/{idProdutoLoja}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoLoja` | `path` | `integer` | Sim | ID do vínculo do produto com a loja |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /produtos/lojas/{idProdutoLoja}
**Resumo**: Altera o vínculo de um produto com uma loja

**Descrição**: Altera o vínculo de um produto com uma loja pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/produtos/lojas/{idProdutoLoja}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoLoja` | `path` | `integer` | Sim | ID do vínculo do produto com a loja |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /produtos/lojas/{idProdutoLoja}
**Resumo**: Remove o vínculo de um produto com uma loja

**Descrição**: Remove o vínculo de um produto com uma loja pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/produtos/lojas/{idProdutoLoja}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoLoja` | `path` | `integer` | Sim | ID do vínculo do produto com a loja |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos
**Resumo**: Obtém produtos

**Descrição**: Obtém produtos paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `criterio` | `query` | `integer` | Não | Critério de listagem <br> `1` Últimos incluídos <br> `2` Ativos <br> `3` Inativos <br> `4` Excluídos <br> `5` Todos |
| `tipo` | `query` | `string` | Não | `T` Todos <br> `P` Produtos <br> `S` Serviços <br> `E` Composições <br> `PS` Produtos simples <br> `C` Com variações <br> `V` Variações |
| `idComponente` | `query` | `integer` | Não | ID do componente. Utilizado quando o filtro **tipo** for `E`. |
| `dataInclusaoInicial` | `query` | `string` | Não | Data de inclusão inicial |
| `dataInclusaoFinal` | `query` | `string` | Não | Data de inclusão final |
| `dataAlteracaoInicial` | `query` | `string` | Não | Data de alteração inicial |
| `dataAlteracaoFinal` | `query` | `string` | Não | Data de alteração final |
| `idCategoria` | `query` | `integer` | Não | ID da categoria do produto |
| `idLoja` | `query` | `integer` | Não | ID da loja |
| `nome` | `query` | `string` | Não | Nome do produto |
| `idsProdutos[]` | `query` | `array` | Não | IDs dos produtos |
| `codigos[]` | `query` | `array` | Não | Códigos (SKU) dos produtos |
| `gtins[]` | `query` | `array` | Não | GTINs/EANs dos produtos |
| `filtroSaldoEstoque` | `query` | `integer` | Não | Filtra o saldo em estoque <br> `0` zerado <br> `1` positivo <br> `2` negativo |
| `filtroSaldoEstoqueDeposito` | `query` | `integer` | Não | ID do depósito para considerar no filtro de saldo em estoque. Se omitido, considera todos os depósitos. |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`idProdutoPai`** (`integer`): ID do produto pai, caso seja uma variação.
  - **`nome`** (`string`): 
  - **`codigo`** (`string`): 
  - **`preco`** (`number`): 
  - **`precoCusto`** (`number`): Preço de custo do fornecedor padrão do produto.
  - **`estoque`** (`object`): 
    - **`saldoVirtualTotal`** (`number`): Saldo em estoque atual, considerando a reserva de estoque.
  - **`tipo`** (`string`): Tipo do produto <br> `S` Serviço <br> `P` Produto <br> `N` Serviço 06 21 22
  - **`situacao`** (`string`): Situação do produto <br> `A` Ativo <br> `I` Inativo
  - **`formato`** (`string`): Formato do produto <br> `S` Simples <br> `V` Com variações <br> `E` Com composição <br>
  - **`descricaoCurta`** (`string`): 
  - **`imagemURL`** (`string`): Link da primeira imagem de acordo com tipo de armazenamento definido.

```json
{
  "data": [
    {
      "id": 123456789,
      "idProdutoPai": 123456789,
      "nome": "Produto 1",
      "codigo": "CODE_123",
      "preco": 1,
      "precoCusto": 1,
      "estoque": {
        "saldoVirtualTotal": "1.0"
      },
      "tipo": "P",
      "situacao": "A",
      "formato": "S",
      "descricaoCurta": "Descrição curta",
      "imagemURL": "https://www.bling.com.br/imagens/imagens-produtos/123456789.jpg"
    }
  ]
}
```

---

## POST /produtos
**Resumo**: Cria um produto

**Descrição**: Cria um produto.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/produtos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
{}
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`number`): ID do produto
  - **`variations`** (`object`): 
  - **`warnings`** (`array[object]`): 

```json
{
  "data": {
    "id": 6423817751,
    "variations": {},
    "warnings": [
      "Mensagem de aviso."
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **403** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /produtos
**Resumo**: Remove múltiplos produtos

**Descrição**: Remove múltiplos produtos pelos IDs.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/produtos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsProdutos[]` | `query` | `array` | Sim | IDs dos produtos |

### Respostas
#### **204** - No content.

#### **200** - 
- **`data`** (`object`): 
  - **`alertas`** (`array[object]`): 

```json
{
  "data": {
    "alertas": [
      null
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/{idProduto}
**Resumo**: Obtém um produto

**Descrição**: Obtém um produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/{idProduto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProduto` | `path` | `integer` | Sim | ID do produto |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **403** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /produtos/{idProduto}
**Resumo**: Altera um produto

**Descrição**: Altera um produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/produtos/{idProduto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProduto` | `path` | `integer` | Sim | ID do produto |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
{}
```

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`number`): ID do produto
  - **`variations`** (`object`): 
  - **`warnings`** (`array[object]`): 

```json
{
  "data": {
    "id": 6423817751,
    "variations": {},
    "warnings": [
      "Mensagem de aviso."
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **403** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /produtos/{idProduto}
**Resumo**: Remove um produto

**Descrição**: Remove um produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/produtos/{idProduto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProduto` | `path` | `integer` | Sim | ID do produto |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /produtos/{idProduto}
**Resumo**: Altera parcialmente um produto

**Descrição**: Altera parcialmente um produto pelo ID. Somente os campos informados terão o valor alterado.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/produtos/{idProduto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProduto` | `path` | `integer` | Sim | ID do produto |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
{}
```

### Respostas
#### **200** - 
- **`data`** (`object`): 
  - **`id`** (`number`): ID do produto
  - **`variations`** (`object`): 
  - **`warnings`** (`array[object]`): 

```json
{
  "data": {
    "id": 6423817751,
    "variations": {},
    "warnings": [
      "Mensagem de aviso."
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **403** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /produtos/{idProduto}/situacoes
**Resumo**: Altera a situação de um produto

**Descrição**: Altera a situação de um produto pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/produtos/{idProduto}/situacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProduto` | `path` | `integer` | Sim | ID do produto |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`situacao`** (`string`): Situação do produto <br> `A` Ativo <br> `I` Inativo <br> 'E' Excluído

**Exemplo de Payload**:
```json
{
  "situacao": "A"
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /produtos/situacoes
**Resumo**: Altera a situação de múltiplos produtos

**Descrição**: Altera a situação de múltiplos produtos pelos IDs.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/produtos/situacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`idsProdutos`** (`array[object]`): 
- **`situacao`** (`string`): Situação do produto <br> `A` Ativo <br> `I` Inativo <br> 'E' Excluído

**Exemplo de Payload**:
```json
{
  "idsProdutos": [
    12345678
  ],
  "situacao": "A"
}
```

### Respostas
#### **204** - No content.

#### **200** - 
- **`data`** (`object`): 
  - **`alertas`** (`array[object]`): 

```json
{
  "data": {
    "alertas": [
      null
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /produtos/variacoes/{idProdutoPai}
**Resumo**: Obtém o produto e variações

**Descrição**: Obtém o produto e variações pelo ID do produto pai.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/produtos/variacoes/{idProdutoPai}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoPai` | `path` | `integer` | Sim | ID do produto pai |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /produtos/variacoes/atributos/gerar-combinacoes
**Resumo**: Retorna o produto pai com combinações de novas variações

**Descrição**: Ação responsável por retornar o produto pai com combinação de novas variações a partir dos atributos. Esta ação não persistirá os dados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/produtos/variacoes/atributos/gerar-combinacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`produtoPai`** (`object`): 
  - **`id`** (`integer`): 
- **`atributos`** (`array[object]`): 
  - **`nome`** (`string`): 
  - **`opcoes`** (`array[object]`): 

**Exemplo de Payload**:
```json
{
  "produtoPai": {
    "id": 123456789
  },
  "atributos": [
    {
      "nome": "Cor",
      "opcoes": [
        "Azul",
        "Vermelho"
      ]
    }
  ]
}
```

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /produtos/variacoes/{idProdutoPai}/atributos
**Resumo**: Altera o nome do atributo nas variações

**Descrição**: Altera o nome do atributo nas variações de um produto pai.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/produtos/variacoes/{idProdutoPai}/atributos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idProdutoPai` | `path` | `integer` | Sim | ID do produto pai |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`atributoAntigo`** (`string`): 
- **`atributoNovo`** (`string`): 

**Exemplo de Payload**:
```json
{
  "atributoAntigo": "Cor",
  "atributoNovo": "Coloração"
}
```

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 

```json
{
  "data": [
    {
      "id": 12345678
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /situacoes/modulos
**Resumo**: Obtém módulos

**Descrição**: Obtém módulos.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/situacoes/modulos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

---

## GET /situacoes/modulos/{idModuloSistema}
**Resumo**: Obtém situações de um módulo

**Descrição**: Obtém situações de um módulo pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/situacoes/modulos/{idModuloSistema}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idModuloSistema` | `path` | `integer` | Sim | ID do módulo do sistema |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /situacoes/modulos/{idModuloSistema}/acoes
**Resumo**: Obtém as ações de um módulo

**Descrição**: Obtém as ações de um módulo pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/situacoes/modulos/{idModuloSistema}/acoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idModuloSistema` | `path` | `integer` | Sim | ID do módulo do sistema |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /situacoes/modulos/{idModuloSistema}/transicoes
**Resumo**: Obtém as transições de um módulo

**Descrição**: Obtém as transições de um módulo pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/situacoes/modulos/{idModuloSistema}/transicoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idModuloSistema` | `path` | `integer` | Sim | ID do módulo do sistema |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /situacoes/{idSituacao}
**Resumo**: Obtém uma situação

**Descrição**: Obtém uma situação pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/situacoes/{idSituacao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idSituacao` | `path` | `integer` | Sim | ID da situação |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /situacoes/{idSituacao}
**Resumo**: Altera uma situação

**Descrição**: Altera uma situação pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/situacoes/{idSituacao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idSituacao` | `path` | `integer` | Sim | ID da situação |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /situacoes/{idSituacao}
**Resumo**: Remove uma situação

**Descrição**: Remove uma situação pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/situacoes/{idSituacao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idSituacao` | `path` | `integer` | Sim | ID da situação |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /situacoes
**Resumo**: Cria uma situação

**Descrição**: Cria uma situação.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/situacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /situacoes/transicoes/{idTransicao}
**Resumo**: Obtém uma transição

**Descrição**: Obtém uma transição pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/situacoes/transicoes/{idTransicao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idTransicao` | `path` | `integer` | Sim | ID da transição |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /situacoes/transicoes/{idTransicao}
**Resumo**: Altera uma transição

**Descrição**: Altera uma transição pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/situacoes/transicoes/{idTransicao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idTransicao` | `path` | `integer` | Sim | ID da transição |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /situacoes/transicoes/{idTransicao}
**Resumo**: Remove uma transição

**Descrição**: Remove uma transição pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/situacoes/transicoes/{idTransicao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idTransicao` | `path` | `integer` | Sim | ID da transição |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /situacoes/transicoes
**Resumo**: Cria uma transição

**Descrição**: Cria uma transição.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/situacoes/transicoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /usuarios/recuperar-senha
**Resumo**: Envia solicitação de recuperação de senha

**Descrição**: Envia solicitação de recuperação de senha por e-mail.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/usuarios/recuperar-senha" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`message`** (`string`): 

```json
{
  "data": [
    {
      "message": "Caso o e-mail informado esteja cadastrado em nosso sistema, uma mensagem com instruções para a troca de senha será enviada."
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /usuarios/redefinir-senha
**Resumo**: Redefine senha do usuário

**Descrição**: Redefine senha do usuário utilizando token enviado por e-mail.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/usuarios/redefinir-senha" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /usuarios/verificar-hash
**Resumo**: Valida o hash recebido

**Descrição**: Valida o hash recebido por e-mail.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/usuarios/verificar-hash" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `hash` | `query` | `string` | Sim |  |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`valido`** (`boolean`): 

```json
{
  "data": [
    {
      "valido": "true"
    }
  ]
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /pedidos/vendas
**Resumo**: Obtém pedidos de vendas

**Descrição**: Obtém pedidos de vendas paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/pedidos/vendas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `idContato` | `query` | `integer` | Não | ID do contato |
| `idsSituacoes[]` | `query` | `array` | Não | Conjunto de situações |
| `dataInicial` | `query` | `string` | Não | Data incial |
| `dataFinal` | `query` | `string` | Não | Data final |
| `dataAlteracaoInicial` | `query` | `string` | Não | Data inicial da alteração |
| `dataAlteracaoFinal` | `query` | `string` | Não | Data final da alteração |
| `dataPrevistaInicial` | `query` | `string` | Não | Data inicial prevista |
| `dataPrevistaFinal` | `query` | `string` | Não | Data final prevista |
| `numero` | `query` | `integer` | Não | Número do pedido de venda |
| `idLoja` | `query` | `integer` | Não | ID da loja |
| `idVendedor` | `query` | `integer` | Não | ID do vendedor |
| `idControleCaixa` | `query` | `integer` | Não | ID do controle de caixa |
| `numerosLojas[]` | `query` | `array` | Não | Conjunto de números de pedidos nas lojas |
| `idUnidadeNegocio` | `query` | `integer` | Não | ID da unidade de negócio (filial) |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 

```json
{
  "data": [
    null
  ]
}
```

---

## POST /pedidos/vendas
**Resumo**: Cria um pedido de venda

**Descrição**: Cria um pedido de venda.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/vendas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /pedidos/vendas
**Resumo**: Remove pedidos de vendas

**Descrição**: Remove pedidos de vendas pelos IDs.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/pedidos/vendas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsPedidosVendas[]` | `query` | `array` | Sim | IDs dos pedidos de vendas |

### Respostas
#### **204** - No content.

#### **200** - 
- **`data`** (`object`): 
  - **`alertas`** (`array[object]`): 

```json
{
  "data": {
    "alertas": [
      "A venda número 123 contém contas a receber..."
    ]
  }
}
```

---

## GET /pedidos/vendas/{idPedidoVenda}
**Resumo**: Obtém um pedido de venda

**Descrição**: Obtém um pedido de venda pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/pedidos/vendas/{idPedidoVenda}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoVenda` | `path` | `integer` | Sim | ID do pedido de venda |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /pedidos/vendas/{idPedidoVenda}
**Resumo**: Altera um pedido de venda

**Descrição**: Altera um pedido de venda pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/pedidos/vendas/{idPedidoVenda}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoVenda` | `path` | `integer` | Sim | ID do pedido de venda |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /pedidos/vendas/{idPedidoVenda}
**Resumo**: Remove um pedido de venda

**Descrição**: Remove um pedido de venda pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/pedidos/vendas/{idPedidoVenda}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoVenda` | `path` | `integer` | Sim | ID do pedido de venda |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PATCH /pedidos/vendas/{idPedidoVenda}/situacoes/{idSituacao}
**Resumo**: Altera a situação de um pedido de venda

**Descrição**: Altera a situação de um pedido de venda pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PATCH "https://api.bling.com.br/Api/v3/pedidos/vendas/{idPedidoVenda}/situacoes/{idSituacao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoVenda` | `path` | `integer` | Sim | ID do pedido de venda |
| `idSituacao` | `path` | `integer` | Sim | ID da situação do pedido de venda |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /pedidos/vendas/{idPedidoVenda}/lancar-estoque/{idDeposito}
**Resumo**: Lança o estoque de um pedido de venda especificando o depósito

**Descrição**: Lança o estoque de um pedido de venda pelo ID, especificando o ID do depósito.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/vendas/{idPedidoVenda}/lancar-estoque/{idDeposito}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoVenda` | `path` | `integer` | Sim | ID do pedido de venda |
| `idDeposito` | `path` | `integer` | Sim | ID do depósito de estoque |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /pedidos/vendas/{idPedidoVenda}/lancar-estoque
**Resumo**: Lança o estoque de um pedido de venda no depósito padrão

**Descrição**: Lança o estoque de um pedido de venda pelo ID, no depósito padrão.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/vendas/{idPedidoVenda}/lancar-estoque" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoVenda` | `path` | `integer` | Sim | ID do pedido de venda |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /pedidos/vendas/{idPedidoVenda}/estornar-estoque
**Resumo**: Estorna o estoque de um pedido de venda

**Descrição**: Estorna o estoque de um pedido de venda pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/vendas/{idPedidoVenda}/estornar-estoque" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoVenda` | `path` | `integer` | Sim | ID do pedido de venda |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /pedidos/vendas/{idPedidoVenda}/lancar-contas
**Resumo**: Lança as contas de um pedido de venda

**Descrição**: Lança as contas de um pedido de venda pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/vendas/{idPedidoVenda}/lancar-contas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoVenda` | `path` | `integer` | Sim | ID do pedido de venda |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /pedidos/vendas/{idPedidoVenda}/estornar-contas
**Resumo**: Estorna as contas de um pedido de venda

**Descrição**: Estorna as contas de um pedido de venda pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/vendas/{idPedidoVenda}/estornar-contas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoVenda` | `path` | `integer` | Sim | ID do pedido de venda |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /pedidos/vendas/{idPedidoVenda}/gerar-nfe
**Resumo**: Gera nota fiscal eletrônica a partir do pedido de venda

**Descrição**: Gera nota fiscal eletrônica a partir do pedido de venda pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/vendas/{idPedidoVenda}/gerar-nfe" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoVenda` | `path` | `integer` | Sim | ID do pedido de venda |

### Respostas
#### **201** - 
- **`idNotaFiscal`** (`integer`): 

```json
{
  "idNotaFiscal": 12345678
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /pedidos/vendas/{idPedidoVenda}/gerar-nfce
**Resumo**: Gera nota fiscal de consumidor eletrônica a partir do pedido de venda

**Descrição**: Gera nota fiscal de consumidor eletrônica a partir do pedido de venda pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/pedidos/vendas/{idPedidoVenda}/gerar-nfce" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idPedidoVenda` | `path` | `integer` | Sim | ID do pedido de venda |

### Respostas
#### **201** - 
- **`idNotaFiscal`** (`integer`): 

```json
{
  "idNotaFiscal": 12345678
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /vendedores
**Resumo**: Obtém vendedores

**Descrição**: Obtém vendedores paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/vendedores" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `nomeContato` | `query` | `string` | Não | Nome do contato do vendedor |
| `situacaoContato` | `query` | `string` | Não | Situação do contato do vendedor<br>`A` Ativo<br>`I` Inativo<br>`S` Sem movimento<br>`E` Excluído<br>`T` Todos |
| `idContato` | `query` | `integer` | Não | ID do contato do vendedor |
| `idLoja` | `query` | `integer` | Não | ID da loja vinculada ao vendedor |
| `dataAlteracaoInicial` | `query` | `string` | Não | Data de alteração inicial |
| `dataAlteracaoFinal` | `query` | `string` | Não | Data de alteração final |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

---

## GET /vendedores/{idVendedor}
**Resumo**: Obtém um vendedor

**Descrição**: Obtém um vendedor pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/vendedores/{idVendedor}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idVendedor` | `path` | `integer` | Sim | ID do vendedor |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /contas/pagar
**Resumo**: Obtém contas a pagar

**Descrição**: Obtém contas a pagar paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contas/pagar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `dataEmissaoInicial` | `query` | `string` | Não | Data de emissão inicial da conta a pagar |
| `dataEmissaoFinal` | `query` | `string` | Não | Data de emissão final da conta a pagar |
| `dataVencimentoInicial` | `query` | `string` | Não | Data de vencimento inicial da conta a pagar |
| `dataVencimentoFinal` | `query` | `string` | Não | Data de vencimento final da conta a pagar |
| `dataPagamentoInicial` | `query` | `string` | Não | Data de pagamento inicial da conta |
| `dataPagamentoFinal` | `query` | `string` | Não | Data de pagamento final da conta |
| `situacao` | `query` | `integer` | Não | `1` Em aberto <br>`2` Recebido <br>`3` Parcialmente recebido <br>`4` Devolvido <br>`5` Cancelado |
| `idContato` | `query` | `integer` | Não | ID do contato |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`situacao`** (`integer`): `1` Aberto <br>`2` Pago<br>`3` Parcial<br>`4` Devolvido<br>`5` Cancelado<br>`6` Devolvido parcial<br>`7` Confirmado
  - **`vencimento`** (`string`): 
  - **`valor`** (`number`): 
  - **`contato`** (`object`): 
    - **`id`** (`integer`): 
  - **`formaPagamento`** (`object`): 
    - **`id`** (`integer`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "situacao": 1,
      "vencimento": "2023-01-12",
      "valor": 1500.75,
      "contato": {
        "id": 12345678
      },
      "formaPagamento": {
        "id": 12345678
      }
    }
  ]
}
```

---

## POST /contas/pagar
**Resumo**: Cria uma conta a pagar

**Descrição**: Cria uma conta a pagar.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/contas/pagar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`id`** (`integer`): 

```json
{
  "id": 12345678
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /contas/pagar/{idContaPagar}
**Resumo**: Obtém uma conta a pagar

**Descrição**: Obtém uma conta a pagar pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/contas/pagar/{idContaPagar}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContaPagar` | `path` | `integer` | Sim | ID da conta a pagar |

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /contas/pagar/{idContaPagar}
**Resumo**: Atualiza uma conta a pagar

**Descrição**: Atualiza uma conta a pagar pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/contas/pagar/{idContaPagar}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContaPagar` | `path` | `integer` | Sim | ID da conta a pagar |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **200** - 
- **`id`** (`integer`): 

```json
{
  "id": 12345678
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /contas/pagar/{idContaPagar}
**Resumo**: Remove uma conta a pagar

**Descrição**: Remove uma conta a pagar pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/contas/pagar/{idContaPagar}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContaPagar` | `path` | `integer` | Sim | ID da conta a pagar |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /contas/pagar/{idContaPagar}/baixar
**Resumo**: Cria o recebimento de uma conta a pagar

**Descrição**: Cria o recebimento de uma conta a pagar.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/contas/pagar/{idContaPagar}/baixar" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idContaPagar` | `path` | `integer` | Sim | ID da conta a pagar |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`data`** (`string`): 
- **`usarDataVencimento`** (`boolean`): 
- **`portador`** (`object`): 
  - **`id`** (`integer`): 
- **`categoria`** (`object`): Categoria de receita e despesa
  - **`id`** (`integer`): 
- **`historico`** (`string`): Descriçao da conta para controle interno da empresa
- **`juros`** (`number`): Valor em reais dos juros.
- **`desconto`** (`number`): Valor em reais do desconto.
- **`acrescimo`** (`number`): Valor em reais do acréscimo.
- **`valorRecebido`** (`number`): Valor bruto da conta, incluindo a taxa do marketplace se aplicável. Se não for especificado, o valor total da conta será usado
- **`tarifa`** (`number`): O valor da tarifa deve ser preenchido caso a forma de pagamento possua taxas de alíquota ou de valor fixo.

**Exemplo de Payload**:
```json
{
  "data": "2023-01-12",
  "usarDataVencimento": false,
  "portador": {
    "id": 12345678
  },
  "categoria": {
    "id": 12345678
  },
  "historico": "",
  "juros": 10.5,
  "desconto": 10.5,
  "acrescimo": 10.5,
  "valorRecebido": 100.5,
  "tarifa": 5
}
```

### Respostas
#### **200** - 
- **`bordero`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "bordero": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /canais-venda
**Resumo**: Obtém canais de venda

**Descrição**: Obtém canais de venda paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/canais-venda" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `tipos[]` | `query` | `array` | Não | Parâmetro para filtrar os registros através de uma lista de tipos de canal de venda. |
| `situacao` | `query` | `integer` | Não | Parâmetro para filtrar os registros através da situação<br> `1` Habilitado<br> `2` Desabilitado |
| `agrupador` | `query` | `integer` | Não | Agrupador do canal de venda<br> `1` Loja virtual<br> `2` Hub<br> `3` Marketplace<br> `4` API |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): ID do canal de venda.
  - **`descricao`** (`string`): Descrição do canal de venda.
  - **`tipo`** (`string`): Tipo do canal de venda.
  - **`situacao`** (`integer`): Situação do canal de venda<br> `1` Habilitado<br> `2` Desabilitado

```json
{
  "data": [
    {
      "id": 12345678,
      "descricao": "Loja de teste",
      "tipo": "Shopee",
      "situacao": 1
    }
  ]
}
```

---

## GET /canais-venda/{idCanalVenda}
**Resumo**: Obtém um canal de venda

**Descrição**: Obtém uma canal de venda pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/canais-venda/{idCanalVenda}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCanalVenda` | `path` | `integer` | Sim | ID do canal de venda |

### Respostas
#### **200** - 
- **`data`** (`object`): 

```json
{
  "data": {}
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /canais-venda/tipos
**Resumo**: Obtém os tipos de canais de venda

**Descrição**: Obtém os tipos de canais de venda paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/canais-venda/tipos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `agrupador` | `query` | `integer` | Não | Agrupador do canal de venda<br> `1` Loja virtual<br> `2` Hub<br> `3` Marketplace<br> `4` API |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`nome`** (`string`): 
  - **`tipo`** (`string`): 
  - **`agrupador`** (`integer`): Agrupador do canal de venda

```json
{
  "data": [
    {
      "nome": "Loja Integrada",
      "tipo": "LojaIntegrada",
      "agrupador": 1
    }
  ]
}
```

---

## GET /ordens-producao
**Resumo**: Obtém ordens de produção

**Descrição**: Obtém ordens de produção paginadas.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/ordens-producao" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |
| `idsSituacoes[]` | `query` | `array` | Não | IDs das situações |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`dataPrevisaoInicio`** (`string`): 
  - **`dataPrevisaoFinal`** (`string`): 
  - **`dataInicio`** (`string`): 
  - **`dataFim`** (`string`): 
  - **`numero`** (`integer`): 
  - **`responsavel`** (`string`): 
  - **`deposito`** (`object`): 
    - **`idDestino`** (`integer`): 
    - **`idOrigem`** (`integer`): 
  - **`situacao`** (`object`): 
    - **`id`** (`integer`): 
    - **`valor`** (`integer`): 
    - **`nome`** (`string`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "dataPrevisaoInicio": "2021-01-01",
      "dataPrevisaoFinal": "2021-01-01",
      "dataInicio": "2021-01-01",
      "dataFim": "2021-01-01",
      "numero": 12345678,
      "responsavel": "Responsável pela ordem de produção",
      "deposito": {
        "idDestino": 12345678,
        "idOrigem": 12345678
      },
      "situacao": {
        "id": 12345678,
        "valor": 1,
        "nome": "Em aberto"
      }
    }
  ]
}
```

---

## POST /ordens-producao
**Resumo**: Cria uma ordem de produção

**Descrição**: Cria uma ordem de produção.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/ordens-producao" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /ordens-producao/{idOrdemProducao}
**Resumo**: Obtém uma ordem de produção

**Descrição**: Obtém uma ordem de produção pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/ordens-producao/{idOrdemProducao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idOrdemProducao` | `path` | `integer` | Sim | ID da ordem de produção |

### Respostas
#### **200** - 

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /ordens-producao/{idOrdemProducao}
**Resumo**: Altera uma ordem de produção

**Descrição**: Altera uma ordem de produção pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/ordens-producao/{idOrdemProducao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idOrdemProducao` | `path` | `integer` | Sim | ID da ordem de produção |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /ordens-producao/{idOrdemProducao}
**Resumo**: Remove uma ordem de produção

**Descrição**: Remove uma ordem de produção pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/ordens-producao/{idOrdemProducao}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idOrdemProducao` | `path` | `integer` | Sim | ID da ordem de produção |

### Respostas
#### **204** - No content.

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /ordens-producao/{idOrdemProducao}/situacoes
**Resumo**: Altera a situação de uma ordem de produção

**Descrição**: Altera a situação de uma ordem de produção pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/ordens-producao/{idOrdemProducao}/situacoes" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idOrdemProducao` | `path` | `integer` | Sim | ID da ordem de produção |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`idSituacao`** (`integer`): 
- **`quantidade`** (`number`): 
- **`observacoes`** (`string`): 
- **`considerarPerdas`** (`boolean`): Se deve considerar perdas na finalização da ordem de produção. (Válido apenas para finalização

**Exemplo de Payload**:
```json
{
  "idSituacao": 12345678,
  "quantidade": 1,
  "observacoes": "Observação",
  "considerarPerdas": true
}
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /ordens-producao/gerar-sob-demanda
**Resumo**: Gera ordens de produção sob demanda

**Descrição**: Gera ordens de produção sob demanda (abaixo do estoque mínimo).

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/ordens-producao/gerar-sob-demanda" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Respostas
#### **201** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`itens`** (`array[object]`): 
    - **`produto`** (`object`): 
      - **`id`** (`integer`): 
      - **`nome`** (`string`): 
      - **`codigo`** (`string`): 
    - **`quantidade`** (`number`): 
  - **`deposito`** (`object`): 
    - **`idDestino`** (`integer`): 
    - **`idOrigem`** (`integer`): 

```json
{
  "data": [
    {
      "id": 12345678,
      "itens": [
        {
          "produto": {
            "id": 12345678,
            "nome": "Nome do produto",
            "codigo": "Código do produto"
          },
          "quantidade": 1
        }
      ],
      "deposito": {
        "idDestino": 12345678,
        "idOrigem": 12345678
      }
    }
  ]
}
```

---

## GET /grupos-produtos
**Resumo**: Obtém grupos de produtos

**Descrição**: Obtém grupos de produtos paginados.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/grupos-produtos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `nome` | `query` | `string` | Não | O nome do grupo |
| `nomePai` | `query` | `string` | Não | O nome do grupo pai |
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `limite` | `query` | `integer` | Não | Quantidade de registros que devem ser exibidos por página |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`integer`): 
  - **`nome`** (`string`): 
  - **`grupoProdutoPai`** (`object`): 
    - **`id`** (`integer`): 
    - **`nome`** (`string`): 

```json
{
  "data": [
    {
      "id": 123456,
      "nome": "Grupo 1",
      "grupoProdutoPai": {
        "id": 123456,
        "nome": "Grupo 1"
      }
    }
  ]
}
```

---

## POST /grupos-produtos
**Resumo**: Cria um grupo de produtos

**Descrição**: Cria um grupo de produtos.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/grupos-produtos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **201** - 
- **`data`** (`object`): 
  - **`id`** (`integer`): 

```json
{
  "data": {
    "id": 12345678
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /grupos-produtos
**Resumo**: Remove múltiplos grupos de produtos

**Descrição**: Remove múltiplos grupos de produtos pelos IDs.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/grupos-produtos" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idsGruposProdutos[]` | `query` | `array` | Sim | IDs dos grupos de produtos |

### Respostas
#### **204** - No content.

#### **200** - 
- **`data`** (`object`): 
  - **`alertas`** (`array[object]`): 
    - **`error`** (`object`): 
      - **`type`** (`string`): 
      - **`message`** (`string`): 
      - **`description`** (`string`): 
      - **`fields`** (`array[object]`): 
        - **`code`** (`integer`): 
        - **`msg`** (`string`): 
        - **`element`** (`string`): 
        - **`namespace`** (`string`): Referência ao objeto com erro.
        - **`collection`** (`array[object]`): 
          - **`index`** (`integer`): 
          - **`code`** (`integer`): 
          - **`msg`** (`string`): 
          - **`element`** (`string`): 
          - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "data": {
    "alertas": [
      {
        "error": {
          "type": "VALIDATION_ERROR",
          "message": "Não foi possível salvar a venda",
          "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
          "fields": [
            {
              "code": "...",
              "msg": "...",
              "element": "...",
              "namespace": "...",
              "collection": "..."
            }
          ]
        }
      }
    ]
  }
}
```

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /grupos-produtos/{idGrupoProduto}
**Resumo**: Obtém um grupo de produtos

**Descrição**: Obtém um grupo de produtos pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/grupos-produtos/{idGrupoProduto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idGrupoProduto` | `path` | `integer` | Sim | ID do grupo de produto |

### Respostas
#### **200** - 
- **`data`** (`any`): 

```json
{
  "data": null
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /grupos-produtos/{idGrupoProduto}
**Resumo**: Altera um grupo de produtos

**Descrição**: Altera um grupo de produtos pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/grupos-produtos/{idGrupoProduto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idGrupoProduto` | `path` | `integer` | Sim | ID do grupo de produto |

### Request Body (Payload)
**Estrutura dos Dados**:

**Exemplo de Payload**:
```json
null
```

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /grupos-produtos/{idGrupoProduto}
**Resumo**: Remove um grupo de produtos

**Descrição**: Remove um grupo de produtos pelo ID.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/grupos-produtos/{idGrupoProduto}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idGrupoProduto` | `path` | `integer` | Sim | ID do grupo de produto |

### Respostas
#### **204** - No content.

#### **400** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /caixas
**Resumo**: Obtém lista de lançamentos de caixas e bancos.

**Descrição**: Obtém lista de lançamentos de caixas e bancos.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/caixas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `pagina` | `query` | `integer` | Não | N° da página da listagem |
| `dataInicial` | `query` | `string` | Não | Data inicial de consulta de movimentações, só serão retornados os lançamento a partir dessa data. Caso não informado, o padrão será o primeiro dia do mês atual. |
| `dataFinal` | `query` | `string` | Não | Data final de consulta de movimentações, só serão retornados os lançamento até essa data. Caso não informado, o padrão será o último dia do mês atual. |
| `idsCategorias` | `query` | `array` | Não | IDs das categorias de movimentações. |
| `idContaFinanceira` | `query` | `integer` | Não | ID da conta financeira. |
| `pesquisa` | `query` | `string` | Não | Pesquisa por descrição do lançamento. |
| `valor` | `query` | `number` | Não | Valor do lançamento. |
| `situacaoConciliacao` | `query` | `integer` | Não | Situação da conciliação do lançamento <br> `1` Registros conciliados <br> `2` Registros não conciliados <br> `3` Todos os registros |
| `situacao` | `query` | `string` | Não | Situação do lançamento.<br>'R' para registros<br>'E' para excluídos |

### Respostas
#### **200** - 
- **`data`** (`array[object]`): 
  - **`id`** (`string`): ID do lançamento de caixas e bancos
  - **`debCred`** (`string`): Débito ou crédito
  - **`situacao`** (`string`): Situação
  - **`valor`** (`number`): Valor
  - **`data`** (`string`): Data
  - **`observacoes`** (`string`): Observações
  - **`descricao`** (`string`): Descrição
  - **`origem`** (`object`): 
    - **`id`** (`integer`): 
    - **`tipo`** (`string`): Tipo da origem do lançamento <br> 'caixa' para lançamento de caixas e bancos <br> 'duplicata' para contas a receber/pagar <br> 'bordero' para pagamento/recebimento <br> 'estoque' para estoque
  - **`contato`** (`object`): 
    - **`id`** (`integer`): 
    - **`nome`** (`string`): 
    - **`cnpj`** (`string`): 
  - **`contaFinanceira`** (`object`): 
    - **`id`** (`integer`): 
    - **`descricao`** (`string`): 

```json
{
  "data": [
    {
      "id": "1234567",
      "debCred": "D",
      "situacao": "R",
      "valor": 100,
      "data": "2025-01-01",
      "observacoes": "Observações do lançamento",
      "descricao": "Descrição do lançamento",
      "origem": {
        "id": 12345678,
        "tipo": "bordero"
      },
      "contato": {
        "id": 12345678,
        "nome": "Pedro Silva",
        "cnpj": "30188025000121"
      },
      "contaFinanceira": {
        "id": 12345678,
        "descricao": "Conta Contábil"
      }
    }
  ]
}
```

#### **400** - Valor de filtro inválido.
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## POST /caixas
**Resumo**: Cria um novo lançamento de caixa e banco.

**Descrição**: Cria um novo lançamento de caixa e banco com os dados fornecidos.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X POST "https://api.bling.com.br/Api/v3/caixas" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Request Body (Payload)
**Estrutura dos Dados**:
- **`id`** (`integer`): ID do lançamento (deve corresponder ao ID da URL)
- **`data`** (`string`): Data do lançamento
- **`valor`** (`number`): Valor do lançamento
- **`debCred`** (`string`): Tipo de lançamento: <br> `C` - Crédito <br> `D` - Débito
- **`competencia`** (`string`): Data de competência
- **`observacoes`** (`string`): Observações do lançamento
- **`transferencia`** (`string`): Indica se é uma transferência
- **`contaFinanceira`** (`object`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 
- **`categoria`** (`object`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 
- **`origem`** (`object`): 
  - **`id`** (`integer`): 
  - **`tipo`** (`string`): Tipo da origem do lançamento <br> 'caixa' para lançamento de caixas e bancos <br> 'duplicata' para contas a receber/pagar <br> 'bordero' para pagamento/recebimento <br> 'estoque' para estoque
- **`contato`** (`object`): 
  - **`id`** (`integer`): 
  - **`nome`** (`string`): 
  - **`cnpj`** (`string`): 

**Exemplo de Payload**:
```json
{
  "id": 12345678,
  "data": "2025-01-01",
  "valor": "123.00",
  "debCred": "C",
  "competencia": "2025-01-01",
  "observacoes": "Lançamento atualizado",
  "transferencia": "",
  "contaFinanceira": {
    "id": 12345678,
    "descricao": "Conta Contábil"
  },
  "categoria": {
    "id": 12345678,
    "descricao": "Vendas"
  },
  "origem": {
    "id": 12345678,
    "tipo": "bordero"
  },
  "contato": {
    "id": 12345678,
    "nome": "Pedro Silva",
    "cnpj": "30188025000121"
  }
}
```

### Respostas
#### **201** - Lançamento criado com sucesso
- **`id`** (`integer`): ID do lançamento criado

```json
{
  "id": 12345678
}
```

#### **400** - Dados inválidos ou campos obrigatórios não informados
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## GET /caixas/{idCaixa}
**Resumo**: Obtém um lançamento de caixa e banco.

**Descrição**: Obtém um lançamento de caixa e banco.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X GET "https://api.bling.com.br/Api/v3/caixas/{idCaixa}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCaixa` | `path` | `integer` | Sim | ID do lançamento de caixas e bancos |

### Respostas
#### **200** - 
- **`id`** (`integer`): Id do lançamento
- **`debCred`** (`string`): Tipo de lançamento <br> `D` - Débito <br> `C` - Crédito
- **`saldo`** (`string`): É ajuste de saldo após o lançamento <br> `S` - Sim <br> `N` - Não
- **`situacao`** (`string`): Situação do lançamento <br> `R` - Registrado <br> `E` - Excluído <br> `H` - Escondido <br> `N` - Não registrado <br> `P` - Processando (externa) <br> `C` - Cancelado (externa)
- **`transferencia`** (`string`): Indica se o lançamento é uma transferência <br> `1` - Sim <br> `0` - Não
- **`tipoLancamento`** (`string`): Tipo do lançamento <br> `1` - Débito <br> `2` - Crédito
- **`data`** (`string`): Data do lançamento
- **`competencia`** (`string`): Data de competência do lançamento
- **`valor`** (`number`): Valor do lançamento
- **`observacoes`** (`string`): Observações adicionais sobre o lançamento
- **`parcela`** (`object`): 
  - **`id`** (`integer`): Id da parcela do lançamento
- **`categoria`** (`object`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 
- **`conciliacaoMovimentacao`** (`object`): 
  - **`id`** (`integer`): Id da conciliação da movimentação
- **`contato`** (`object`): 
  - **`id`** (`integer`): 
  - **`nome`** (`string`): 
  - **`cnpj`** (`string`): 
- **`origem`** (`object`): 
  - **`id`** (`integer`): 
  - **`tipo`** (`string`): Tipo da origem do lançamento <br> 'caixa' para lançamento de caixas e bancos <br> 'duplicata' para contas a receber/pagar <br> 'bordero' para pagamento/recebimento <br> 'estoque' para estoque
- **`contaFinanceira`** (`object`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 

```json
{
  "id": 12345678,
  "debCred": "D",
  "saldo": "S",
  "situacao": "R",
  "transferencia": "1",
  "tipoLancamento": "1",
  "data": "2025-01-01",
  "competencia": "2025-01-01",
  "valor": 100,
  "observacoes": "Observações",
  "parcela": {
    "id": 12345678
  },
  "categoria": {
    "id": 12345678,
    "descricao": "Vendas"
  },
  "conciliacaoMovimentacao": {
    "id": 12345678
  },
  "contato": {
    "id": 12345678,
    "nome": "Pedro Silva",
    "cnpj": "30188025000121"
  },
  "origem": {
    "id": 12345678,
    "tipo": "bordero"
  },
  "contaFinanceira": {
    "id": 12345678,
    "descricao": "Conta Contábil"
  }
}
```

#### **404** - 
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## PUT /caixas/{idCaixa}
**Resumo**: Atualiza um lançamento de caixa e banco.

**Descrição**: Atualiza um lançamento de caixa e banco existente com os dados fornecidos.

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X PUT "https://api.bling.com.br/Api/v3/caixas/{idCaixa}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCaixa` | `path` | `integer` | Sim | ID do lançamento de caixas e bancos |

### Request Body (Payload)
**Estrutura dos Dados**:
- **`id`** (`integer`): ID do lançamento (deve corresponder ao ID da URL)
- **`data`** (`string`): Data do lançamento
- **`valor`** (`number`): Valor do lançamento
- **`debCred`** (`string`): Tipo de lançamento: <br> `C` - Crédito <br> `D` - Débito
- **`competencia`** (`string`): Data de competência
- **`observacoes`** (`string`): Observações do lançamento
- **`transferencia`** (`string`): Indica se é uma transferência
- **`contaFinanceira`** (`object`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 
- **`categoria`** (`object`): 
  - **`id`** (`integer`): 
  - **`descricao`** (`string`): 
- **`origem`** (`object`): 
  - **`id`** (`integer`): 
  - **`tipo`** (`string`): Tipo da origem do lançamento <br> 'caixa' para lançamento de caixas e bancos <br> 'duplicata' para contas a receber/pagar <br> 'bordero' para pagamento/recebimento <br> 'estoque' para estoque
- **`contato`** (`object`): 
  - **`id`** (`integer`): 
  - **`nome`** (`string`): 
  - **`cnpj`** (`string`): 

**Exemplo de Payload**:
```json
{
  "id": 12345678,
  "data": "2025-01-01",
  "valor": "123.00",
  "debCred": "C",
  "competencia": "2025-01-01",
  "observacoes": "Lançamento atualizado",
  "transferencia": "",
  "contaFinanceira": {
    "id": 12345678,
    "descricao": "Conta Contábil"
  },
  "categoria": {
    "id": 12345678,
    "descricao": "Vendas"
  },
  "origem": {
    "id": 12345678,
    "tipo": "bordero"
  },
  "contato": {
    "id": 12345678,
    "nome": "Pedro Silva",
    "cnpj": "30188025000121"
  }
}
```

### Respostas
#### **200** - Lançamento atualizado com sucesso
- **`id`** (`integer`): ID do lançamento criado

```json
{
  "id": 12345678
}
```

#### **400** - Dados inválidos ou campos obrigatórios não informados
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - Lançamento não encontrado
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

## DELETE /caixas/{idCaixa}
**Resumo**: Remove um lançamento de caixa e banco

**Descrição**: Remove um lançamento de caixa e banco pelo ID. O registro não é excluído permanentemente, apenas marcado como excluído (exclusão lógica).

**Autenticação**: Requer `OAuth2, OAuth2-Docs`

### Exemplo cURL
```bash
curl -X DELETE "https://api.bling.com.br/Api/v3/caixas/{idCaixa}" \
  -H "Accept: application/json" \
  -H "Authorization: Bearer <SEU_TOKEN>" \
```

### Parâmetros da Requisição
| Nome | Local | Tipo | Obrigatório | Descrição |
|---|---|---|---|---|
| `idCaixa` | `path` | `integer` | Sim | ID do lançamento de caixa e banco a ser excluído. |

### Respostas
#### **204** - No content. O lançamento foi excluído com sucesso.

#### **400** - Erro de validação.
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

#### **404** - Lançamento não encontrado.
- **`error`** (`object`): 
  - **`type`** (`string`): 
  - **`message`** (`string`): 
  - **`description`** (`string`): 
  - **`fields`** (`array[object]`): 
    - **`code`** (`integer`): 
    - **`msg`** (`string`): 
    - **`element`** (`string`): 
    - **`namespace`** (`string`): Referência ao objeto com erro.
    - **`collection`** (`array[object]`): 
      - **`index`** (`integer`): 
      - **`code`** (`integer`): 
      - **`msg`** (`string`): 
      - **`element`** (`string`): 
      - **`namespace`** (`string`): Referência ao objeto com erro.

```json
{
  "error": {
    "type": "VALIDATION_ERROR",
    "message": "Não foi possível salvar a venda",
    "description": "A venda não pode ser salva, pois ocorreram problemas em sua validação.",
    "fields": [
      {
        "code": 49,
        "msg": "Uma ou mais parcelas da venda possuem erros de validação",
        "element": "parcelas",
        "namespace": "VENDAS",
        "collection": [
          {
            "index": 1,
            "code": 12,
            "msg": "Id da forma de pagamento inválido.",
            "element": "formaPagamento",
            "namespace": "VENDAS"
          }
        ]
      }
    ]
  }
}
```

---

