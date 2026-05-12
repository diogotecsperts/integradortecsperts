## Avaliação da instrução do Antigravity

O plano encaixa **bem** na arquitetura atual (já existe `tenant_settings` + `getTenantSettings`/`upsertTenantSettings` + modal "Configurações" do superadmin). Porém tenho **2 ressalvas técnicas** que recomendo alinhar antes de implementar:

### Ressalva 1 — escopo do "custom prompt" (importante)
O prompt atual contém DUAS camadas críticas que, se forem sobrescritas pelo superadmin, **quebram o produto**:

1. **Contexto temporal** (datas do dia) — o plano já cobre.
2. **Regras de formatação Markdown e anti-vazamento de tags** (`<think>`, `<tool_call>`, formato de tabela com linha em branco) — o plano **não cobre**, e foram justamente as correções que acabamos de aplicar nas mensagens anteriores. Se um admin colar um prompt sem essas regras, o vazamento de raciocínio e tabelas quebradas voltam imediatamente.

**Recomendação:** tratar o `agent_system_prompt` como **PERSONA/REGRAS DE NEGÓCIO** (ex.: "Você é o consultor da Loja X, foca em margem", "responda sempre em tom formal", "nunca recomende descontos > 10%"), e manter como camadas **fixas e não-editáveis** o bloco de **CONTEXTO TEMPORAL** + **FORMATAÇÃO + ANTI-VAZAMENTO**.

Estrutura final do prompt enviado ao MiniMax:
```
[BLOCO FIXO 1 — CONTEXTO TEMPORAL injetado em runtime]
[BLOCO CUSTOMIZÁVEL — agent_system_prompt do tenant, OU fallback padrão de "Especialista em BI/ERP"]
[BLOCO FIXO 2 — DIRETRIZES DE TOOLS + FORMATAÇÃO + ANTI-VAZAMENTO]
```

Isso preserva a UI premium independente do que o admin escrever.

### Ressalva 2 — UX do "Restaurar Padrão"
"Limpar o campo" ≠ "ver o padrão". Sugiro:
- Botão **"Carregar Padrão como base"** → preenche o textarea com o texto do prompt-persona padrão (para o admin editar a partir dele).
- Botão **"Restaurar Padrão"** → grava `NULL` no banco (campo vazio = usa fallback).
- Placeholder no textarea quando vazio: "Vazio = usa o prompt padrão do sistema."

---

## Plano de Correção (após confirmação das ressalvas)

### 1. Migration

Adicionar coluna em `tenant_settings`:
```sql
ALTER TABLE public.tenant_settings
  ADD COLUMN agent_system_prompt text;
```
Sem default (NULL = usa fallback). Sem alteração de RLS (já é admin-only).

### 2. Backend — `src/lib/agent.functions.ts`

a) Refatorar `buildSystemPrompt()` em três funções:
   - `buildTemporalContext()` → bloco de datas (já existe, extrair).
   - `buildFormattingRules()` → bloco de DIRETRIZES + FORMATAÇÃO + anti-vazamento (já existe, extrair).
   - `DEFAULT_PERSONA` → constante com a persona "Especialista em BI/ERP integrado ao Bling…".

b) Nova `buildSystemPrompt(customPersona?: string | null)`:
   ```
   return [
     buildTemporalContext(),
     (customPersona?.trim() || DEFAULT_PERSONA),
     buildFormattingRules(),
   ].join("\n\n");
   ```

c) Em `chatWithAgent.handler`, ler `agent_system_prompt` do `tenant_settings` (mesma query do `minimax_api_key`) e passar para `buildSystemPrompt`.

### 3. Admin functions — `src/lib/admin.functions.ts`

a) `getTenantSettings`: incluir `agent_system_prompt` no fallback retornado.

b) `upsertTenantSettings`: adicionar `agent_system_prompt: z.string().nullable().optional()` e gravar `null` quando vazio (assim ativa o fallback).

### 4. UI — `src/routes/_authenticated/_admin/admin.clients.tsx`

No `TenantSettingsForm`, abaixo do bloco "Minimax (Agente IA)":

- Novo bloco **"Configurações da IA"** com:
  - `<textarea>` (rows=12, monospace, max-h scroll) ligado a `form.agent_system_prompt`.
  - Placeholder: "Vazio = usa o prompt padrão do sistema (Especialista em BI/ERP). Você pode escrever instruções específicas: persona, tom, regras de negócio do cliente, etc."
  - Subtexto: "O contexto temporal (datas) e as regras de formatação Markdown são adicionados automaticamente — você só edita a persona/instruções de negócio."
  - Linha de botões secundários:
    - **"Carregar Padrão"** → preenche textarea com `DEFAULT_PERSONA` (exposto via constante exportada de `agent.functions.ts` ou duplicada no admin).
    - **"Restaurar Padrão"** → seta string vazia (gravará NULL → fallback).

### 5. Verificação

- Editar prompt → salvar → abrir chat do tenant → resposta reflete a persona nova (ex.: tom diferente).
- Limpar campo → salvar → comportamento volta ao padrão.
- Em ambos os casos: tabelas continuam bem formatadas, sem `<think>` vazando, datas corretas.

---

## Fora de escopo
- Versionamento/histórico de prompts.
- Variáveis de template no prompt (ex.: `{{nome_cliente}}`).
- Preview do prompt final concatenado no admin (posso adicionar se quiser, mas não estava pedido).

---

**Antes de implementar, preciso da sua confirmação:**
1. Concorda em **separar persona (editável) de regras técnicas (fixas)** em vez de o admin sobrescrever o prompt inteiro?
2. Concorda com o esquema dos botões "Carregar Padrão" + "Restaurar Padrão"?
