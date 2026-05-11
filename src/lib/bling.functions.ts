import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";
import { z } from "zod";
import { randomBytes } from "node:crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { BLING_OAUTH_AUTHORIZE, getCredentialStatus } from "@/lib/bling/client.server";
import { syncDeposits, syncProducts, syncStock, syncOrders } from "@/lib/bling/sync.server";

async function getProfile(userId: string) {
  const { data } = await supabaseAdmin
    .from("profiles").select("tenant_id").eq("id", userId).maybeSingle();
  return data;
}
async function isSuperadmin(userId: string) {
  const { data } = await supabaseAdmin
    .from("user_roles").select("role")
    .eq("user_id", userId).eq("role", "superadmin").maybeSingle();
  return !!data;
}
async function assertTenantAccess(userId: string, tenantId: string) {
  if (await isSuperadmin(userId)) return;
  const profile = await getProfile(userId);
  if (profile?.tenant_id !== tenantId) {
    throw new Response("Forbidden", { status: 403 });
  }
}

function buildRedirectUri() {
  const host = getRequestHost();
  return `https://${host}/api/public/bling/callback`;
}

// ============ STATUS (cliente OU admin) ============
export const getBlingStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ tenantId: z.string().uuid().optional() }).parse(d ?? {}))
  .handler(async ({ data, context }) => {
    let tenantId = data.tenantId;
    if (!tenantId) {
      const p = await getProfile(context.userId);
      if (!p?.tenant_id) {
        return {
          tenantId: null,
          hasAppCreds: false,
          connected: false,
          expiresAt: null,
          connectedAt: null,
          lastRefreshAt: null,
          counts: { products: 0, deposits: 0, stocks: 0, orders: 0 },
          lastRuns: [] as Array<never>,
          noTenant: true as const,
        };
      }
      tenantId = p.tenant_id;
    }
    await assertTenantAccess(context.userId, tenantId);

    const cred = await getCredentialStatus(tenantId);
    const { data: settings } = await supabaseAdmin
      .from("tenant_settings")
      .select("bling_client_id, bling_client_secret")
      .eq("tenant_id", tenantId).maybeSingle();

    const [{ count: nProducts }, { count: nDeposits }, { count: nStocks }, { count: nOrders }] = await Promise.all([
      supabaseAdmin.from("bling_products").select("*", { count: "exact", head: true }).eq("tenant_id", tenantId),
      supabaseAdmin.from("bling_deposits").select("*", { count: "exact", head: true }).eq("tenant_id", tenantId),
      supabaseAdmin.from("bling_stock_balances").select("*", { count: "exact", head: true }).eq("tenant_id", tenantId),
      supabaseAdmin.from("bling_orders").select("*", { count: "exact", head: true }).eq("tenant_id", tenantId),
    ]);
    const { data: lastRuns } = await supabaseAdmin
      .from("bling_sync_runs")
      .select("id, resource, mode, status, started_at, finished_at, items_processed, error_message")
      .eq("tenant_id", tenantId)
      .order("started_at", { ascending: false })
      .limit(15);

    return {
      tenantId,
      hasAppCreds: Boolean(settings?.bling_client_id && settings?.bling_client_secret),
      connected: Boolean(cred),
      expiresAt: cred?.expires_at ?? null,
      connectedAt: cred?.connected_at ?? null,
      lastRefreshAt: cred?.last_refresh_at ?? null,
      counts: { products: nProducts ?? 0, deposits: nDeposits ?? 0, stocks: nStocks ?? 0, orders: nOrders ?? 0 },
      lastRuns: lastRuns ?? [],
    };
  });

// ============ GERAR LINK DE AUTORIZAÇÃO (cliente OU admin) ============
export const createBlingAuthLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ tenantId: z.string().uuid().optional() }).parse(d ?? {}))
  .handler(async ({ data, context }) => {
    let tenantId = data.tenantId;
    if (!tenantId) {
      const p = await getProfile(context.userId);
      if (!p?.tenant_id) throw new Response("Sem tenant associado", { status: 400 });
      tenantId = p.tenant_id;
    }
    await assertTenantAccess(context.userId, tenantId);

    const { data: settings } = await supabaseAdmin
      .from("tenant_settings")
      .select("bling_client_id, bling_client_secret")
      .eq("tenant_id", tenantId).maybeSingle();
    if (!settings?.bling_client_id || !settings?.bling_client_secret) {
      throw new Response("Tenant sem Client ID/Secret do Bling. Peça ao superadmin para configurar.", { status: 400 });
    }

    const state = randomBytes(24).toString("hex");
    const redirectUri = buildRedirectUri();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();
    const { error } = await supabaseAdmin
      .from("bling_oauth_states")
      .insert({ state, tenant_id: tenantId, redirect_uri: redirectUri, expires_at: expiresAt });
    if (error) throw new Response(error.message, { status: 500 });

    const url = new URL(BLING_OAUTH_AUTHORIZE);
    url.searchParams.set("response_type", "code");
    url.searchParams.set("client_id", settings.bling_client_id);
    url.searchParams.set("state", state);
    url.searchParams.set("redirect_uri", redirectUri);
    return { url: url.toString(), redirectUri };
  });

// ============ DESCONECTAR ============
export const disconnectBling = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ tenantId: z.string().uuid().optional() }).parse(d ?? {}))
  .handler(async ({ data, context }) => {
    let tenantId = data.tenantId;
    if (!tenantId) {
      const p = await getProfile(context.userId);
      if (!p?.tenant_id) throw new Response("Sem tenant", { status: 400 });
      tenantId = p.tenant_id;
    }
    await assertTenantAccess(context.userId, tenantId);
    const { error } = await supabaseAdmin
      .from("bling_credentials").delete().eq("tenant_id", tenantId);
    if (error) throw new Response(error.message, { status: 500 });
    return { ok: true };
  });

// ============ SYNCS (apenas superadmin) ============
async function assertSuperadmin(userId: string) {
  if (!(await isSuperadmin(userId))) throw new Response("Forbidden", { status: 403 });
}

export const runBlingSync = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      tenantId: z.string().uuid(),
      resource: z.enum(["deposits", "products", "stock", "orders", "all"]),
      mode: z.enum(["full", "incremental"]).default("full"),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertSuperadmin(context.userId);
    const out: Record<string, unknown> = {};
    try {
      if (data.resource === "deposits" || data.resource === "all") {
        out.deposits = await syncDeposits(data.tenantId);
      }
      if (data.resource === "products" || data.resource === "all") {
        out.products = await syncProducts(data.tenantId, data.mode);
      }
      if (data.resource === "stock" || data.resource === "all") {
        out.stock = await syncStock(data.tenantId);
      }
      if (data.resource === "orders" || data.resource === "all") {
        out.orders = await syncOrders(data.tenantId, data.mode);
      }
      return { ok: true, ...out };
    } catch (e) {
      throw new Response(e instanceof Error ? e.message : String(e), { status: 500 });
    }
  });
