## Ajuste do modal de Configurações do cliente

**Problema atual** (`src/routes/_authenticated/_admin/admin.clients.tsx`, função `Modal`):
- `max-w-md` → muito estreito.
- Sem altura máxima nem `overflow-y-auto` → conteúdo (Bling + Resend + Minimax + Persona IA + Painel Bling) ultrapassa a viewport e a parte inferior fica inacessível.
- Padding fixo no container, sem separação header/scroll.

## Mudanças (apenas no componente `Modal`)

1. **Largura:** trocar `max-w-md` por `max-w-3xl` (≈ 768px) e `w-full` mantido — confortável em desktop, ainda responsivo em telas menores.
2. **Altura + rolagem:** envelopar em flex coluna com `max-h-[90vh]`; header sticky no topo, corpo com `overflow-y-auto` e `flex-1`.
3. **Estrutura:**
   ```
   <div max-w-3xl max-h-[90vh] flex flex-col>
     <header sticky com título + botão fechar (X)>
     <div flex-1 overflow-y-auto p-6>
       {children}
     </div>
   </div>
   ```
4. **Botão de fechar (X)** no header — hoje só fecha clicando no backdrop; um X explícito melhora UX premium.
5. **Layout interno do `TenantSettingsForm`:** com a largura maior, agrupar os blocos de credenciais (Bling / Resend / Minimax) em **grid 2 colunas no desktop** (`md:grid-cols-2`), mantendo o textarea da Persona IA e o painel Bling em largura total. Isso aproveita o espaço novo sem mudar a lógica.

## Fora de escopo
- Lógica do form, validações, server functions.
- Outros modais (`Novo Tenant`, `Novo Usuário`) — são pequenos, ficam como estão (poderiam herdar o novo `Modal` sem prejuízo, já que `max-w-3xl` é só um teto).

## Verificação
- Abrir Configurações de qualquer tenant → modal largo, header fixo, conteúdo rola até o painel Bling no fim, botão X funciona.
