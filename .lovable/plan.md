## Correções no Chat do Agente

### 1. Remover vazamento de `<think>...</think>` (backend)
**Arquivo:** `src/lib/agent.functions.ts`

- Adicionar helper `stripThinkTags(text: string)` que remove `/<think>[\s\S]*?<\/think>/gi` e também tags órfãs `<think>` / `</think>` soltas, depois faz `.trim()`.
- Aplicar no conteúdo do assistant **antes** de:
  - Persistir em `ai_messages` (a versão salva já fica limpa).
  - Retornar para o cliente no payload da server function.
- Manter o raciocínio fora dos logs visíveis (apenas `console.debug` opcional, não retornado).

### 2. Renderização correta de tabelas Markdown (frontend)
**Arquivo:** `src/routes/_authenticated/agent.tsx`

- Instalar `remark-gfm` (`bun add remark-gfm`).
- Importar e passar `remarkPlugins={[remarkGfm]}` ao `<ReactMarkdown>`.
- Envolver em `<div className="prose prose-sm dark:prose-invert max-w-none">` para herdar tipografia consistente (Tailwind typography já presente no projeto; se não, usar classes utilitárias para `table`, `th`, `td` com `border`, `px-2`, `py-1`).
- Como salvaguarda extra, aplicar `stripThinkTags` também no cliente antes de renderizar (defesa em profundidade para mensagens antigas já salvas).

### 3. Ajuste no System Prompt
**Arquivo:** `src/lib/agent.functions.ts` (`SYSTEM_PROMPT`)

Adicionar diretrizes de formatação:
- "Nunca exponha seu raciocínio interno ou tags `<think>`. Responda apenas com o resultado final."
- "Ao usar tabelas Markdown, sempre separe o cabeçalho, a linha divisória e cada linha de dados com quebras de linha reais (`\n`), e deixe uma linha em branco antes e depois da tabela."
- "Prefira listas com bullets (`-`) para comparações curtas; use tabelas apenas quando houver 3+ colunas relevantes."

### 4. Verificação
- Rodar nova pergunta no chat que provoque tool-calling + tabela.
- Confirmar: nenhuma tag `<think>` visível, tabela renderizada com linhas/colunas corretas, mensagens persistidas em `ai_messages` já vêm limpas.

### Fora de escopo
Lógica de tool-calling, queries de BI, autenticação, sync do Bling — permanecem intactos.