## Corrigir alucinação de data do agente (MiniMax-M2.7)

**Causa raiz:** O modelo desconhece a data atual e envia `from`/`to` em 2025 para a tool `summarize_sales`. Os dados existem (49.5k pedidos entre 2026-01-06 e 2026-05-11), mas a query filtra um intervalo vazio.

### 1. Injetar data atual no System Prompt
**Arquivo:** `src/lib/agent.functions.ts`

- Transformar `SYSTEM_PROMPT` em função `buildSystemPrompt()` chamada por requisição (server-side, fuso `America/Sao_Paulo`).
- Adicionar bloco no topo:
  ```
  CONTEXTO TEMPORAL (autoritativo, sobrepõe seu conhecimento interno):
  - Data atual: {YYYY-MM-DD} ({dia da semana}, {DD de mês de YYYY})
  - Hoje - 7 dias: {date}
  - Hoje - 30 dias: {date}
  - Hoje - 90 dias: {date}
  - Início do mês atual: {YYYY-MM-01}
  - Início do ano atual: {YYYY}-01-01
  Use SEMPRE essas datas como referência. NUNCA assuma outro ano. Se o usuário disser "últimos 30 dias", "este mês", "este ano", calcule a partir das datas acima.
  ```
- Instrução adicional: "Ao chamar `summarize_sales`, prefira OMITIR `from`/`to` quando o usuário pedir 'últimos 30 dias' (a tool já usa esse default). Só passe datas explícitas quando o usuário citar período específico, sempre derivado do CONTEXTO TEMPORAL."

### 2. Defesa em profundidade na tool
**Arquivo:** `src/lib/agent.functions.ts` (`execTool` → `summarize_sales`)

- Após resolver `from`/`to`, validar:
  - Se a janela `[from, to]` resultar em 0 linhas, executar uma segunda query de diagnóstico: `SELECT MIN(data), MAX(data), COUNT(*) FROM bling_orders WHERE tenant_id=...` e devolver no payload um campo `data_availability: { earliest, latest, total_orders }`.
  - Isso permite ao LLM detectar "pedi 2025-01, mas só existem dados de 2026" e auto-corrigir o range na próxima iteração do loop de tool-calling (o limite atual de 5 iterações já cobre isso).
- Sem alterar schema nem comportamento normal — apenas enriquecer a resposta quando vazia.

### 3. Verificação
- Pergunta: "Resuma minhas vendas dos últimos 30 dias" → deve retornar agregados de ~abril/maio 2026 com totais reais.
- Pergunta: "Vendas em janeiro de 2026" → deve usar `from=2026-01-01, to=2026-01-31`.
- Pergunta: "Vendas em 2024" → deve responder vazio e citar o range disponível (`data_availability`).

### Fora de escopo
- Lógica de tools (`get_stock_for_product`, `low_stock_alerts`, `search_products`).
- Frontend, RLS, sync do Bling.