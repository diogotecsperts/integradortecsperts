## Diagnóstico

### 1. Vazamento de `<think>` — causas reais
- **Backend (`stripThinkTags`)** só remove pares fechados `<think>...</think>`. Se o MiniMax-M2.7 truncar a resposta (max_tokens=2048) ou enviar a tag aberta sem fechamento, o regex `/<think>[\s\S]*?<\/think>/gi` não casa e o conteúdo passa inteiro. Também não cobre variantes vistas no MiniMax (`<thinking>`, `<reasoning>`, `</think>` órfão no início).
- **Persistência histórica:** mensagens `assistant` salvas em `ai_messages` antes do fix continuam com `<think>` cru e voltam ao chat via `history`. O frontend renderiza essas mensagens antigas direto pelo `ReactMarkdown`.
- **Frontend (`cleanAssistant`)** tem o mesmo regex limitado. Não há fallback para tag aberta.

### 2. Tabelas quebradas — causas reais
- O System Prompt instrui "quebras reais (`\n`)" mas como **texto** dentro de uma instrução — o modelo às vezes responde com `\n` **literal** (dois caracteres: barra + n), que o React-Markdown renderiza como string e a tabela vira uma linha só.
- Falta exemplo concreto de tabela bem-formada no prompt; modelos pequenos como o M2.7 copiam o formato do exemplo muito melhor que seguem regras abstratas.
- React-Markdown + remark-gfm exige **linha em branco antes** do `|cabeçalho|` para parsear como tabela. Sem isso, vira parágrafo com pipes inline.
- Não há normalizador no servidor que conserte `\n` literal nem que garanta a linha em branco.

### 3. Renderização frontend
- `remark-gfm` está configurado corretamente (já instalado e passado em `remarkPlugins`).
- Classes prose para `table/th/td` estão presentes — OK.
- O problema NÃO é o componente, é o markdown bruto chegando malformado.

---

## Plano de Correção

### A. `src/lib/agent.functions.ts` — sanitização robusta

1. Reescrever `stripThinkTags` → `sanitizeAssistant(text)`:
   - Remover pares fechados: `<think>...</think>`, `<thinking>...</thinking>`, `<reasoning>...</reasoning>` (case-insensitive, multiline).
   - **Cobrir tag aberta sem fechamento:** se encontrar `<think>` sem `</think>` correspondente, remover de `<think>` até o fim.
   - Remover tags órfãs: `</think>`, `</thinking>`, `</reasoning>` soltas no início.
   - Remover `<tool_call>` e `<|...|>` artifacts conhecidos do MiniMax.
   - Trim final.

2. **Normalizador de markdown** `normalizeMarkdown(text)`:
   - Substituir `\n` literal (backslash + n) por newline real: `text.replace(/\\n/g, "\n")`.
   - Garantir linha em branco antes/depois de blocos de tabela (regex que detecta `^\s*\|.+\|\s*$` consecutivos e injeta `\n` antes/depois quando faltar).
   - Colapsar 3+ newlines em 2.

3. Aplicar `normalizeMarkdown(sanitizeAssistant(content))` antes de:
   - Persistir em `ai_messages` (assistant).
   - Retornar `reply` para o cliente.

### B. `src/lib/agent.functions.ts` — System Prompt explícito

Reformular a seção de Markdown para usar **exemplo literal** em vez de regras abstratas:

```
FORMATAÇÃO DE RESPOSTA:
- Para listas curtas, use bullets:
  - Item 1: valor
  - Item 2: valor
- Para tabelas (mínimo 3 colunas, sempre com LINHA EM BRANCO antes e depois):

| Coluna A | Coluna B | Coluna C |
| --- | --- | --- |
| dado | dado | dado |

- NUNCA escreva "\n" como texto literal. Use quebras de linha reais.
- NUNCA use tabela para 2 colunas — use bullets.
- NUNCA exponha tags <think>, <thinking>, <reasoning> ou <tool_call>.
```

### C. `src/routes/_authenticated/agent.tsx` — limpeza defensiva

1. Reescrever `cleanAssistant` espelhando `sanitizeAssistant + normalizeMarkdown` do backend (mesma lógica), para limpar:
   - Mensagens antigas do histórico já contaminadas.
   - Qualquer caso que escape do servidor.

2. Manter `remarkGfm` e classes prose como já estão.

### D. (Opcional, baixo risco) Limpeza retroativa do histórico

Não migrar dados — apenas confiar no `cleanAssistant` do frontend para sanear mensagens legadas em runtime. Sem migração SQL.

---

## Verificação

- "Resuma minhas vendas dos últimos 30 dias" → tabela com 3+ colunas renderiza com linhas separadas, sem `<think>` visível.
- Mensagens antigas com `<think>` no histórico aparecem limpas após reload (sanitizadas no client).
- Resposta com `\n` literal vinda do modelo aparece com quebras reais.

## Fora de escopo

- Lógica das tools, RLS, sync Bling, autenticação, dashboard.
- Migração de dados em `ai_messages`.
