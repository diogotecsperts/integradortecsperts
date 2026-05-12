## Objetivo

Transformar `/agent` em interface multi-conversas estilo ChatGPT (sidebar + histórico) com motor de BI já otimizado via RPCs no Postgres. As RPCs (`agent_summarize_sales`, `agent_sales_availability`, `agent_low_stock`) e a refatoração de `agent.functions.ts` para usá-las **já foram implementadas em turno anterior** — esta entrega foca na interface multi-conversas e nas server functions de gerenciamento.

## Backend — `src/lib/agent.functions.ts`

Adicionar 3 server functions novas (todas com `requireSupabaseAuth` e escopo por tenant ativo via `resolveActiveTenantId`):

- **`listConversations({ tenantId? })`** → `{ id, title, updated_at }[]` de `ai_conversations` filtrando `tenant_id` resolvido + `user_id = context.userId`, ordenado `updated_at DESC`, `limit 100`.
- **`getConversationMessages({ conversationId })`** → valida ownership (tenant + user) e retorna `ai_messages` (`id, role, content, created_at`) ordenado `created_at ASC`.
- **`deleteConversation({ conversationId })`** → valida ownership, apaga `ai_messages` da conversa e em seguida o registro em `ai_conversations` (cascata manual via `supabaseAdmin`). RLS já permite `DELETE` ao dono.

Ajustar **`chatWithAgent`** para fazer `update ai_conversations set updated_at = now() where id = convId` no fim (mantém a lista ordenada por atividade). O título automático já é gerado no insert (`data.message.slice(0, 60)`) — atende ao requisito.

## Frontend — `src/routes/_authenticated/agent.tsx`

Layout em 2 colunas:

```
[ Sidebar 280px (md+) ] [ Chat flex-1 ]
```

### Sidebar (`ConversationsSidebar`, componente inline no mesmo arquivo)
- Cabeçalho com botão **`+ Nova Conversa`**: limpa `conversationId` + `messages`, foca o input. Não cria registro no banco — `chatWithAgent` cria a conversa ao receber a 1ª mensagem (comportamento já existente).
- `useQuery(["conversations", tenantId], listConversations)` renderiza a lista. Cada item exibe título truncado + data relativa via `formatRelative` (já existe em `@/lib/utils`).
- Item ativo destacado (`bg-primary/15`).
- Hover revela ícone `Trash2` → `AlertDialog` confirma → `deleteConversation` → `invalidate(["conversations"])`. Se a conversa ativa foi excluída, limpar estado local.
- Click em item → `setConversationId(id)` dispara `useQuery(["conv-messages", id], getConversationMessages)` que hidrata `messages` mapeando para o tipo `Msg` local.
- Em `< md`: sidebar vira `Sheet` (drawer) acionado por botão hamburger no header do chat. Visível inline em `md+`.

### Chat (direita)
- Após `chatWithAgent` resolver: `setConversationId(r.conversationId)` (já existe) + `queryClient.invalidateQueries({ queryKey: ["conversations"] })` para a sidebar mostrar o título imediatamente.
- Trocar tenant continua resetando conversa ativa; a key da query refaz a lista.
- Mantém: sugestões na tela vazia, `ThinkingBubble`, render de markdown, sanitização.

### Hidratação
Ao carregar mensagens do servidor, mapear para `Msg = { id, role, content }` (descartar `created_at` no estado de UI).

## Sem mudanças

- Sem migration nova (RLS de `ai_conversations`/`ai_messages` já cobre; `ai_conv_tenant_delete` permite apagar a própria conversa; RPCs de BI já existem).
- Sem alteração em persona, sync Bling, outras rotas.

## Arquivos

- **Editado**: `src/lib/agent.functions.ts` (3 server functions novas + bump de `updated_at` em `chatWithAgent`).
- **Editado**: `src/routes/_authenticated/agent.tsx` (layout 2 colunas + sidebar inline + hidratação por `conversationId` + invalidação de cache).

## Fora de escopo

Streaming de respostas, busca dentro do histórico, renomear conversa manualmente, paginação além de 100, compartilhamento de conversas.
