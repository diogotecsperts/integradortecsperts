import { supabaseAdmin } from "@/integrations/supabase/client.server";

/**
 * Resolve o tenant ativo para um usuário em endpoints de leitura.
 * - Superadmin: usa requestedTenantId; se ausente, primeiro tenant ativo.
 * - Cliente: força profile.tenant_id (ignora request).
 */
export async function resolveActiveTenantId(
  userId: string,
  requestedTenantId?: string,
): Promise<string | null> {
  const { data: roleRow } = await supabaseAdmin
    .from("user_roles").select("role").eq("user_id", userId).eq("role", "superadmin").maybeSingle();
  const isSuper = !!roleRow;
  if (isSuper) {
    if (requestedTenantId) {
      const { data: t } = await supabaseAdmin
        .from("tenants").select("id").eq("id", requestedTenantId).maybeSingle();
      if (t) return t.id;
    }
    const { data: first } = await supabaseAdmin
      .from("tenants").select("id").eq("status", "active").order("created_at").limit(1).maybeSingle();
    return first?.id ?? null;
  }
  const { data: prof } = await supabaseAdmin
    .from("profiles").select("tenant_id").eq("id", userId).maybeSingle();
  return prof?.tenant_id ?? null;
}
