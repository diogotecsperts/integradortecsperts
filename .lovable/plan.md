## Avaliação
A instrução encaixa bem na arquitetura. O `_admin` layout já protege via `role === "superadmin"` e o `AppShell` já tem `adminNav`. Sem ressalvas — só duas escolhas técnicas que vale alinhar:

- **PK textual `'global'`**: vou usar `text` com `CHECK (id = 'global')` para garantir tabela single-row.
- **Acesso**: leitura no backend usa `supabaseAdmin` (bypassa RLS); a tabela ainda terá RLS habilitada com policy admin-only para compliance.

## Plano

### 1. Migration
Criar `global_settings` (single-row) + seed:
```sql
CREATE TABLE public.global_settings (
  id text PRIMARY KEY DEFAULT 'global' CHECK (id = 'global'),
  default_agent_persona text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.global_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "global_settings_admin_all" ON public.global_settings
  FOR ALL TO authenticated
  USING (is_superadmin()) WITH CHECK (is_superadmin());
CREATE TRIGGER trg_global_settings_updated
  BEFORE UPDATE ON public.global_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
INSERT INTO public.global_settings (id, default_agent_persona)
VALUES ('global', 'Você é um Especialista em BI e ERP integrado ao Bling, atuando dentro do sistema Tecsperts. Responda SEMPRE em PT-BR, de forma objetiva, profissional e consultiva.')
ON CONFLICT (id) DO NOTHING;
```

### 2. Backend — `src/lib/admin.functions.ts`
Adicionar duas server functions admin-only:
- `getGlobalSettings()` → lê a row `'global'`. Se não existir, retorna `{ default_agent_persona: DEFAULT_FALLBACK }`.
- `upsertGlobalSettings({ default_agent_persona })` → upsert na row `'global'`.

### 3. Backend — `src/lib/agent.functions.ts`
Em `chatWithAgent.handler`, após ler `tenant_settings`:
- Se `customPersona` (tenant) vazio → buscar `global_settings.default_agent_persona`.
- Se ambos vazios/erro → usa o fallback fixo já existente (`DEFAULT_AGENT_PERSONA`).
- Passar o resolvido para `buildSystemPrompt(persona)`.

Implementação em uma única query paralela (`Promise.all`) para não adicionar latência quando o tenant tem custom prompt (caso comum).

### 4. UI Superadmin — nova rota
- Criar `src/routes/_authenticated/_admin/admin.settings.tsx` (rota `/admin/settings`, protegida pelo `_admin`).
- Layout consistente com `admin.clients.tsx`: glass card com seção **"IA Global"**, textarea grande (rows=14, monospace), botões **Salvar** e **Restaurar Padrão Original** (volta ao texto de seed).
- Subtexto explicando a hierarquia: cliente > global > fallback.
- Adicionar entrada no `adminNav` em `src/components/AppShell.tsx`:
  ```ts
  { to: "/admin/settings", label: "Configurações", icon: Settings }
  ```

### 5. UX — `src/routes/_authenticated/_admin/admin.clients.tsx`
No `AgentPromptField`, atualizar o subtexto e o placeholder do textarea:
- Placeholder: `"Vazio = usa o prompt padrão global definido em Configurações do Sistema."`
- Subtexto: `"Hierarquia: Cliente → Global (Configurações do Sistema) → Padrão. O contexto temporal e regras de formatação são adicionados automaticamente."`

### 6. Verificação
- Migration aplica sem erro.
- `/admin/settings` acessível só para superadmin (cliente vai pra `/dashboard`).
- Editar global → salvar → tenant SEM custom prompt usa o novo global.
- Tenant COM custom prompt continua usando o seu (global ignorado).
- Limpar global e custom → fallback fixo do código entra em ação.

### Fora de escopo
- Versionamento/histórico do prompt global.
- Outras configurações globais (ex.: limites, modelos) — só a persona pediu agora.
