import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertSuperadmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "superadmin")
    .maybeSingle();
  if (error || !data) throw new Response("Forbidden", { status: 403 });
}

/** Bootstrap: cria o primeiro superadmin (somente se nenhum existir).  */
export const bootstrapSuperadmin = createServerFn({ method: "POST" })
  .inputValidator((d) =>
    z.object({ email: z.string().email(), password: z.string().min(8) }).parse(d),
  )
  .handler(async ({ data }) => {
    const { count } = await supabaseAdmin
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "superadmin");
    if ((count ?? 0) > 0) {
      throw new Response("Superadmin já existe", { status: 409 });
    }
    if (data.email !== "diogomixcds@gmail.com") {
      throw new Response("E-mail não autorizado para bootstrap", { status: 403 });
    }
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });
    if (error) throw new Response(error.message, { status: 400 });
    return { ok: true, userId: created.user?.id };
  });

/** Cria um tenant. */
export const createTenant = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ name: z.string().min(2), slug: z.string().min(2).regex(/^[a-z0-9-]+$/) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertSuperadmin(context.userId);
    const { data: t, error } = await supabaseAdmin
      .from("tenants")
      .insert({ name: data.name, slug: data.slug })
      .select()
      .single();
    if (error) throw new Response(error.message, { status: 400 });
    await supabaseAdmin.from("tenant_settings").insert({ tenant_id: t.id });
    return t;
  });

/** Cria usuário cliente vinculado a um tenant. */
export const createTenantUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      email: z.string().email(),
      password: z.string().min(8),
      tenantId: z.string().uuid(),
      fullName: z.string().optional(),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertSuperadmin(context.userId);
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { full_name: data.fullName ?? data.email },
    });
    if (error) throw new Response(error.message, { status: 400 });
    const uid = created.user!.id;
    await supabaseAdmin
      .from("profiles")
      .update({ tenant_id: data.tenantId, full_name: data.fullName ?? data.email })
      .eq("id", uid);
    return { userId: uid };
  });

/** Atualiza status de tenant. */
export const setTenantStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      tenantId: z.string().uuid(),
      status: z.enum(["active", "suspended", "blocked"]),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertSuperadmin(context.userId);
    const { error } = await supabaseAdmin
      .from("tenants")
      .update({ status: data.status })
      .eq("id", data.tenantId);
    if (error) throw new Response(error.message, { status: 400 });
    return { ok: true };
  });

/** Bloqueia/desbloqueia usuário. */
export const setUserBlocked = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ userId: z.string().uuid(), blocked: z.boolean() }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertSuperadmin(context.userId);
    await supabaseAdmin.from("profiles").update({ is_blocked: data.blocked }).eq("id", data.userId);
    // Banimento real: ban duration em auth.users
    const { error } = await supabaseAdmin.auth.admin.updateUserById(data.userId, {
      ban_duration: data.blocked ? "8760h" : "none",
    });
    if (error) throw new Response(error.message, { status: 400 });
    return { ok: true };
  });

/** Lista todos os tenants com contagem de usuários (admin). */
export const listTenantsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertSuperadmin(context.userId);
    const { data: tenants } = await supabaseAdmin
      .from("tenants")
      .select("*")
      .order("created_at", { ascending: false });
    const { data: profiles } = await supabaseAdmin
      .from("profiles")
      .select("id, email, full_name, tenant_id, is_blocked, created_at");
    return {
      tenants: tenants ?? [],
      profiles: profiles ?? [],
    };
  });
