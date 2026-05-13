## Avaliação do que já existe

| # | Pedido | Status atual |
|---|---|---|
| 1 | **Auto-retomada** quando o tick voltar a 200 | ✅ **Já implementado** em `src/routes/api/public/hooks/bling-sync-tick.tsx` — toda execução procura `status IN ('running','paused')` + `next_page IS NOT NULL` e chama `syncX(..., { resumeRunId })`. Não precisa código novo. |
| 2 | **Trilha de auditoria** dos resumes manuais | ❌ Não existe. `resumeBlingRun` não grava em `audit_logs`. Útil. |
| 3 | **Detalhes do erro do tick no card** | ⚠️ Parcial. O RPC `bling_cron_health` retorna `last_message` truncado a 500 e tenta extrair `last_http_code` via regex frágil. O card mostra só um resumo. Útil expandir. |

Conclusão: 1 não precisa fazer nada; 2 e 3 são melhorias reais.

## Plano

### A. Auditoria de retomadas manuais (item 2)

Editar `src/lib/bling.functions.ts` → `resumeBlingRun.handler`:
- Após chamar `fn(...)` (sucesso ou erro), inserir em `public.audit_logs` via `supabaseAdmin`:
  ```ts
  await supabaseAdmin.from("audit_logs").insert({
    tenant_id: data.tenantId,
    user_id: context.userId,
    action: "bling.sync.resume",
    metadata: { resource, runId, previousNextPage, previousItems, done, count, nextPage, error? }
  });
  ```
- Envolver em try/catch para não derrubar a retomada se o log falhar.

Adicionar server function nova `getBlingResumeAuditLog` (superadmin):
- `SELECT id, created_at, tenant_id, user_id, metadata FROM audit_logs WHERE action = 'bling.sync.resume' ORDER BY created_at DESC LIMIT 20`.
- Join com `profiles` para mostrar `email`/`full_name` de quem retomou.
- Join com `tenants` para mostrar nome do tenant.

### B. Detalhes do erro no card (item 3)

Melhorar o RPC `public.bling_cron_health` (migration):
- Remover o regex frágil de `last_http_code`; em vez disso devolver `return_message` cru (sem truncar) + `command` da última execução com `status = 'failed'` (separado da última execução em geral).
- Expor também as 5 últimas execuções com timestamp + status + http_code (parseado de forma robusta com `(regexp_match(return_message, 'status_code"?\s*:\s*(\d+)'))[1]::int`).
- Adicionar campo `last_failure_at`, `last_failure_message`, `last_failure_command`.

Atualizar `BlingCronHealthCard.tsx`:
- Quando vermelho/amarelo, mostrar um `<details>` "Ver erro completo" com:
  - mensagem completa do último `failed`
  - HTTP code parseado
  - timestamp
  - timeline pequena das últimas 5 execuções (badge verde/vermelho + horário + código)
- Adicionar uma aba/seção "Histórico de retomadas manuais" que lista o resultado de `getBlingResumeAuditLog` (data, usuário, tenant, recurso, runId, próximo page anterior → atual).

### C. Nada a fazer no tick

O comportamento de auto-retomada já é o desejado. Vou apenas confirmar isso na resposta final ao usuário e não tocar no arquivo.

## Arquivos

**Editar**
- `src/lib/bling.functions.ts` — gravar audit log em `resumeBlingRun`; nova `getBlingResumeAuditLog`; tipagem do retorno expandido de `getBlingCronHealth`.
- `src/components/admin/BlingCronHealthCard.tsx` — bloco expandível de erro + timeline + lista de retomadas.

**Migration**
- Recriar `public.bling_cron_health()` com colunas adicionais (`last_failure_at`, `last_failure_message`, `last_failure_command`, `recent_runs jsonb`) e parsing robusto de `status_code`.

**Não editar**
- `bling-sync-tick.tsx` (já cobre auto-retomada).
- Tabela `audit_logs` — schema já serve.

## Fora de escopo

- Retentativa automática de runs em `error` (auto-resume só de `paused`/`running`, conforme o pedido).
- Notificações por e-mail de falhas.