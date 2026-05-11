# Bling API v3 — Índice navegável
Use este índice para localizar endpoints na doc completa em `bling-api-v3.md` e abrir somente o trecho relevante via `code--view ... lines=A-B`.
## Convenções
- **Base URL**: `https://api.bling.com.br/Api/v3`
- **Auth**: `Authorization: Bearer <access_token>` (OAuth2, ver `bling-api-v3.notes.md` para o fluxo)
- **Paginação**: query `pagina` (1..N) e `limite` (máx 100)
- **Erros**: payload `{ error: { type, message, fields[] } }`
- **Rate limit**: ~3 req/s, 120k req/dia
## Recursos (29 totais, 255 endpoints)

### /anuncios — Anúncios (marketplaces) (9)
- `GET /anuncios/categorias` — L6-90
- `GET /anuncios/categorias/{idCategoria}` — L91-226
- `GET /anuncios` — L227-313
- `POST /anuncios` — L314-400
- `GET /anuncios/{idAnuncio}` — L401-574
- `PUT /anuncios/{idAnuncio}` — L575-696
- `DELETE /anuncios/{idAnuncio}` — L697-810
- `POST /anuncios/{idAnuncio}/publicar` — L811-926
- `POST /anuncios/{idAnuncio}/pausar` — L927-1042

### /borderos — Borderôs (2)
- `GET /borderos/{idBordero}` — L1043-1156
- `DELETE /borderos/{idBordero}` — L1157-1268

### /campos-customizados — Campos customizados (8)
- `GET /campos-customizados/modulos` — L1269-1296
- `GET /campos-customizados/tipos` — L1297-1324
- `GET /campos-customizados/modulos/{idModulo}` — L1325-1366
- `GET /campos-customizados/{idCampoCustomizado}` — L1367-1441
- `PUT /campos-customizados/{idCampoCustomizado}` — L1442-1570
- `DELETE /campos-customizados/{idCampoCustomizado}` — L1571-1638
- `POST /campos-customizados` — L1639-1718
- `PATCH /campos-customizados/{idCampoCustomizado}/situacoes` — L1719-1843

### /categorias — Categorias de produto (16)
- `GET /categorias/lojas` — L1844-1897
- `POST /categorias/lojas` — L1898-1997
- `GET /categorias/lojas/{idCategoriaLoja}` — L1998-2089
- `PUT /categorias/lojas/{idCategoriaLoja}` — L2090-2228
- `DELETE /categorias/lojas/{idCategoriaLoja}` — L2229-2296
- `GET /categorias/produtos` — L2297-2330
- `POST /categorias/produtos` — L2331-2413
- `GET /categorias/produtos/{idCategoriaProduto}` — L2414-2488
- `PUT /categorias/produtos/{idCategoriaProduto}` — L2489-2615
- `DELETE /categorias/produtos/{idCategoriaProduto}` — L2616-2727
- `GET /categorias/receitas-despesas` — L2728-2763
- `POST /categorias/receitas-despesas` — L2764-2852
- `DELETE /categorias/receitas-despesas` — L2853-2920
- `GET /categorias/receitas-despesas/{idCategoria}` — L2921-2995
- `PUT /categorias/receitas-despesas/{idCategoria}` — L2996-3133
- `DELETE /categorias/receitas-despesas/{idCategoria}` — L3134-3245

### /contas-contabeis — Contas contábeis (2)
- `GET /contas-contabeis` — L3246-3294
- `GET /contas-contabeis/{idContaContabil}` — L3295-3378

### /contas — Contas a pagar/receber (14)
- `GET /contas/receber` — L3379-3481
- `POST /contas/receber` — L3482-3564
- `GET /contas/receber/{idContaReceber}` — L3565-3639
- `PUT /contas/receber/{idContaReceber}` — L3640-3761
- `DELETE /contas/receber/{idContaReceber}` — L3762-3873
- `POST /contas/receber/{idContaReceber}/baixar` — L3874-3988
- `GET /contas/receber/boletos` — L3989-4105
- `POST /contas/receber/boletos/cancelar` — L4106-4180
- `GET /contas/pagar` — L22702-22762
- `POST /contas/pagar` — L22763-22842
- `GET /contas/pagar/{idContaPagar}` — L22843-22917
- `PUT /contas/pagar/{idContaPagar}` — L22918-23046
- `DELETE /contas/pagar/{idContaPagar}` — L23047-23158
- `POST /contas/pagar/{idContaPagar}/baixar` — L23159-23273

### /contatos — Contatos (11)
- `GET /contatos` — L4181-4242
- `POST /contatos` — L4243-4325
- `DELETE /contatos` — L4326-4437
- `GET /contatos/{idContato}` — L4438-4512
- `PUT /contatos/{idContato}` — L4513-4634
- `DELETE /contatos/{idContato}` — L4635-4746
- `GET /contatos/{idContato}/tipos` — L4747-4828
- `GET /contatos/consumidor-final` — L4829-4854
- `PATCH /contatos/{idContato}/situacoes` — L4855-4979
- `POST /contatos/situacoes` — L4980-5103
- `GET /contatos/tipos` — L5104-5136

### /contratos — Contratos (5)
- `GET /contratos` — L5137-5195
- `POST /contratos` — L5196-5278
- `GET /contratos/{idContrato}` — L5279-5353
- `PUT /contratos/{idContrato}` — L5354-5485
- `DELETE /contratos/{idContrato}` — L5486-5597

### /depositos — Depósitos (4)
- `GET /depositos` — L5598-5644
- `POST /depositos` — L5645-5738
- `GET /depositos/{idDeposito}` — L5739-5824
- `PUT /depositos/{idDeposito}` — L5825-5957

### /empresas — Empresa (perfil) (1)
- `GET /empresas/me/dados-basicos` — L5958-5994

### /estoques — Estoques (saldos) (3)
- `GET /estoques/saldos/{idDeposito}` — L5995-6130
- `GET /estoques/saldos` — L6131-6209
- `POST /estoques` — L6210-6292

### /produtos — Produtos (44)
- `GET /produtos/lotes` — L6293-6406
- `PUT /produtos/lotes` — L6407-6559
- `DELETE /produtos/lotes` — L6560-6671
- `GET /produtos/lotes/{idLote}` — L6672-6771
- `PUT /produtos/lotes/{idLote}` — L6772-6899
- `GET /produtos/lotes/controla-lote` — L6900-6981
- `POST /produtos/{idProduto}/lotes/controla-lote/desativar` — L6982-7095
- `PATCH /produtos/lotes/{idLote}/status` — L7096-7215
- `GET /produtos/lotes/{idLote}/lancamentos` — L7216-7351
- `POST /produtos/lotes/{idLote}/lancamentos` — L7352-7510
- `GET /produtos/lotes/lancamentos/{idLancamento}` — L7511-7644
- `PATCH /produtos/lotes/lancamentos/{idLancamento}` — L7645-7764
- `GET /produtos/{idProduto}/lotes/{idLote}/depositos/{idDeposito}/saldo` — L7765-7856
- `GET /produtos/{idProduto}/lotes/depositos/{idDeposito}/saldo` — L7857-7994
- `GET /produtos/{idProduto}/lotes/depositos/{idDeposito}/saldo/soma` — L7995-8129
- `GET /produtos/{idProduto}/lotes/saldo/soma` — L8130-8212
- `GET /produtos/estruturas/{idProdutoEstrutura}` — L17195-17286
- `PUT /produtos/estruturas/{idProdutoEstrutura}` — L17287-17425
- `POST /produtos/estruturas/{idProdutoEstrutura}/componentes` — L17426-17557
- `DELETE /produtos/estruturas/{idProdutoEstrutura}/componentes` — L17558-17670
- `PATCH /produtos/estruturas/{idProdutoEstrutura}/componentes/{idComponente}` — L17671-17801
- `DELETE /produtos/estruturas` — L17802-17912
- `GET /produtos/fornecedores` — L17913-17948
- `POST /produtos/fornecedores` — L17949-18028
- `GET /produtos/fornecedores/{idProdutoFornecedor}` — L18029-18103
- `PUT /produtos/fornecedores/{idProdutoFornecedor}` — L18104-18232
- `DELETE /produtos/fornecedores/{idProdutoFornecedor}` — L18233-18344
- `GET /produtos/lojas` — L18345-18427
- `POST /produtos/lojas` — L18428-18507
- `GET /produtos/lojas/{idProdutoLoja}` — L18508-18582
- `PUT /produtos/lojas/{idProdutoLoja}` — L18583-18711
- `DELETE /produtos/lojas/{idProdutoLoja}` — L18712-18779
- `GET /produtos` — L18780-18856
- `POST /produtos` — L18857-18989
- `DELETE /produtos` — L18990-19071
- `GET /produtos/{idProduto}` — L19072-19190
- `PUT /produtos/{idProduto}` — L19191-19328
- `DELETE /produtos/{idProduto}` — L19329-19396
- `PATCH /produtos/{idProduto}` — L19397-19534
- `PATCH /produtos/{idProduto}/situacoes` — L19535-19659
- `POST /produtos/situacoes` — L19660-19753
- `GET /produtos/variacoes/{idProdutoPai}` — L19754-19828
- `POST /produtos/variacoes/atributos/gerar-combinacoes` — L19829-19926
- `PATCH /produtos/variacoes/{idProdutoPai}/atributos` — L19927-20021

### /formas-pagamentos — Formas de pagamento (7)
- `GET /formas-pagamentos` — L8213-8268
- `POST /formas-pagamentos` — L8269-8348
- `GET /formas-pagamentos/{idFormaPagamento}` — L8349-8423
- `PUT /formas-pagamentos/{idFormaPagamento}` — L8424-8552
- `DELETE /formas-pagamentos/{idFormaPagamento}` — L8553-8664
- `PATCH /formas-pagamentos/{idFormaPagamento}/padrao` — L8665-8789
- `PATCH /formas-pagamentos/{idFormaPagamento}/situacao` — L8790-8914

### /homologacao — Homologação (5)
- `GET /homologacao/produtos` — L8915-8947
- `POST /homologacao/produtos` — L8948-9034
- `PUT /homologacao/produtos/{idProdutoHomologacao}` — L9035-9119
- `DELETE /homologacao/produtos/{idProdutoHomologacao}` — L9120-9187
- `PATCH /homologacao/produtos/{idProdutoHomologacao}/situacoes` — L9188-9268

### /logisticas — Logísticas (20)
- `GET /logisticas` — L9269-9373
- `POST /logisticas` — L9374-9465
- `GET /logisticas/{idLogistica}` — L9466-9541
- `PUT /logisticas/{idLogistica}` — L9542-9624
- `DELETE /logisticas/{idLogistica}` — L9625-9736
- `GET /logisticas/servicos` — L9737-9844
- `POST /logisticas/servicos` — L9845-9961
- `GET /logisticas/servicos/{idLogisticaServico}` — L9962-10065
- `PUT /logisticas/servicos/{idLogisticaServico}` — L10066-10219
- `PATCH /logisticas/{idLogisticaServico}/situacoes` — L10220-10344
- `GET /logisticas/objetos/{idObjeto}` — L10345-10482
- `PUT /logisticas/objetos/{idObjeto}` — L10483-10662
- `DELETE /logisticas/objetos/{idObjeto}` — L10663-10774
- `POST /logisticas/objetos` — L10775-10857
- `GET /logisticas/etiquetas` — L10858-10986
- `GET /logisticas/remessas/{idRemessa}` — L10987-11061
- `PUT /logisticas/remessas/{idRemessa}` — L11062-11204
- `DELETE /logisticas/remessas/{idRemessa}` — L11205-11316
- `GET /logisticas/{idLogistica}/remessas` — L11317-11437
- `POST /logisticas/remessas` — L11438-11520

### /naturezas-operacoes — Naturezas de operação (2)
- `GET /naturezas-operacoes` — L11521-11609
- `POST /naturezas-operacoes/{idNaturezaOperacao}/obter-tributacao` — L11610-12011

### /nfce — NFC-e (10)
- `GET /nfce` — L12012-12163
- `POST /nfce` — L12164-12243
- `GET /nfce/{idNotaFiscalConsumidor}` — L12244-12318
- `PUT /nfce/{idNotaFiscalConsumidor}` — L12319-12447
- `POST /nfce/{idNotaFiscalConsumidor}/enviar` — L12448-12571
- `POST /nfce/{idNotaFiscalConsumidor}/lancar-contas` — L12572-12685
- `POST /nfce/{idNotaFiscalConsumidor}/estornar-contas` — L12686-12799
- `POST /nfce/{idNotaFiscalConsumidor}/lancar-estoque` — L12800-12913
- `POST /nfce/{idNotaFiscalConsumidor}/lancar-estoque/{idDeposito}` — L12914-13028
- `POST /nfce/{idNotaFiscalConsumidor}/estornar-estoque` — L13029-13098

### /nfe — NF-e (12)
- `GET /nfe` — L13099-13208
- `POST /nfe` — L13209-13288
- `DELETE /nfe` — L13289-13374
- `GET /nfe/{idNotaFiscal}` — L13375-13449
- `PUT /nfe/{idNotaFiscal}` — L13450-13578
- `POST /nfe/{idNotaFiscal}/enviar` — L13579-13703
- `POST /nfe/{idNotaFiscal}/lancar-contas` — L13704-13817
- `POST /nfe/{idNotaFiscal}/estornar-contas` — L13818-13931
- `POST /nfe/{idNotaFiscal}/lancar-estoque` — L13932-14045
- `POST /nfe/{idNotaFiscal}/lancar-estoque/{idDeposito}` — L14046-14160
- `POST /nfe/{idNotaFiscal}/estornar-estoque` — L14161-14230
- `GET /nfe/documento/{chaveAcesso}` — L14231-14357

### /nfse — NFS-e (8)
- `GET /nfse` — L14358-14438
- `POST /nfse` — L14439-14518
- `GET /nfse/{idNotaServico}` — L14519-14593
- `DELETE /nfse/{idNotaServico}` — L14594-14705
- `POST /nfse/{idNotaServico}/enviar` — L14706-14826
- `POST /nfse/{idNotaServico}/cancelar` — L14827-14953
- `GET /nfse/configuracoes` — L14954-15128
- `PUT /nfse/configuracoes` — L15129-15353

### /notificacoes — Notificações (webhooks) (3)
- `GET /notificacoes` — L15354-15430
- `POST /notificacoes/{idNotificacao}/confirmar-leitura` — L15431-15509
- `GET /notificacoes/quantidade` — L15510-15587

### /propostas-comerciais — Propostas comerciais (7)
- `GET /propostas-comerciais` — L15588-15653
- `POST /propostas-comerciais` — L15654-15736
- `DELETE /propostas-comerciais` — L15737-15848
- `GET /propostas-comerciais/{idPropostaComercial}` — L15849-15916
- `PUT /propostas-comerciais/{idPropostaComercial}` — L15917-16038
- `DELETE /propostas-comerciais/{idPropostaComercial}` — L16039-16106
- `PATCH /propostas-comerciais/{idPropostaComercial}/situacoes` — L16107-16231

### /pedidos — Pedidos (24)
- `GET /pedidos/compras` — L16232-16271
- `POST /pedidos/compras` — L16272-16351
- `GET /pedidos/compras/{idPedidoCompra}` — L16352-16426
- `PUT /pedidos/compras/{idPedidoCompra}` — L16427-16555
- `DELETE /pedidos/compras/{idPedidoCompra}` — L16556-16623
- `PATCH /pedidos/compras/{idPedidoCompra}/situacoes/{idSituacao}` — L16624-16738
- `POST /pedidos/compras/{idPedidoCompra}/lancar-contas` — L16739-16852
- `POST /pedidos/compras/{idPedidoCompra}/estornar-contas` — L16853-16966
- `POST /pedidos/compras/{idPedidoCompra}/lancar-estoque` — L16967-17080
- `POST /pedidos/compras/{idPedidoCompra}/estornar-estoque` — L17081-17194
- `GET /pedidos/vendas` — L21223-21270
- `POST /pedidos/vendas` — L21271-21350
- `DELETE /pedidos/vendas` — L21351-21388
- `GET /pedidos/vendas/{idPedidoVenda}` — L21389-21463
- `PUT /pedidos/vendas/{idPedidoVenda}` — L21464-21592
- `DELETE /pedidos/vendas/{idPedidoVenda}` — L21593-21704
- `PATCH /pedidos/vendas/{idPedidoVenda}/situacoes/{idSituacao}` — L21705-21819
- `POST /pedidos/vendas/{idPedidoVenda}/lancar-estoque/{idDeposito}` — L21820-21934
- `POST /pedidos/vendas/{idPedidoVenda}/lancar-estoque` — L21935-22048
- `POST /pedidos/vendas/{idPedidoVenda}/estornar-estoque` — L22049-22118
- `POST /pedidos/vendas/{idPedidoVenda}/lancar-contas` — L22119-22232
- `POST /pedidos/vendas/{idPedidoVenda}/estornar-contas` — L22233-22346
- `POST /pedidos/vendas/{idPedidoVenda}/gerar-nfe` — L22347-22467
- `POST /pedidos/vendas/{idPedidoVenda}/gerar-nfce` — L22468-22588

### /situacoes — Situações (12)
- `GET /situacoes/modulos` — L20022-20049
- `GET /situacoes/modulos/{idModuloSistema}` — L20050-20126
- `GET /situacoes/modulos/{idModuloSistema}/acoes` — L20127-20203
- `GET /situacoes/modulos/{idModuloSistema}/transicoes` — L20204-20280
- `GET /situacoes/{idSituacao}` — L20281-20355
- `PUT /situacoes/{idSituacao}` — L20356-20440
- `DELETE /situacoes/{idSituacao}` — L20441-20552
- `POST /situacoes` — L20553-20632
- `GET /situacoes/transicoes/{idTransicao}` — L20633-20707
- `PUT /situacoes/transicoes/{idTransicao}` — L20708-20792
- `DELETE /situacoes/transicoes/{idTransicao}` — L20793-20904
- `POST /situacoes/transicoes` — L20905-20984

### /usuarios — Usuários (3)
- `POST /usuarios/recuperar-senha` — L20985-21069
- `PATCH /usuarios/redefinir-senha` — L21070-21142
- `GET /usuarios/verificar-hash` — L21143-21222

### /vendedores — Vendedores (2)
- `GET /vendedores` — L22589-22626
- `GET /vendedores/{idVendedor}` — L22627-22701

### /canais-venda — Canais de venda (3)
- `GET /canais-venda` — L23274-23319
- `GET /canais-venda/{idCanalVenda}` — L23320-23394
- `GET /canais-venda/tipos` — L23395-23434

### /ordens-producao — Ordens de produção (7)
- `GET /ordens-producao` — L23435-23500
- `POST /ordens-producao` — L23501-23583
- `GET /ordens-producao/{idOrdemProducao}` — L23584-23651
- `PUT /ordens-producao/{idOrdemProducao}` — L23652-23773
- `DELETE /ordens-producao/{idOrdemProducao}` — L23774-23841
- `PUT /ordens-producao/{idOrdemProducao}/situacoes` — L23842-23972
- `POST /ordens-producao/gerar-sob-demanda` — L23973-24028

### /grupos-produtos — Grupos de produtos (6)
- `GET /grupos-produtos` — L24029-24076
- `POST /grupos-produtos` — L24077-24159
- `DELETE /grupos-produtos` — L24160-24271
- `GET /grupos-produtos/{idGrupoProduto}` — L24272-24346
- `PUT /grupos-produtos/{idGrupoProduto}` — L24347-24468
- `DELETE /grupos-produtos/{idGrupoProduto}` — L24469-24580

### /caixas — Caixas (5)
- `GET /caixas` — L24581-24703
- `POST /caixas` — L24704-24828
- `GET /caixas/{idCaixa}` — L24829-24961
- `PUT /caixas/{idCaixa}` — L24962-25135
- `DELETE /caixas/{idCaixa}` — L25136-25247
