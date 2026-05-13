import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";
import { z } from "zod";
import { randomBytes } from "node:crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { BLING_OAUTH_AUTHORIZE, getCredentialStatus } from "@/lib/bling/client.server";
import { syncDeposits, syncProducts, syncStock, syncOrders, syncContacts } from "@/lib/bling/sync.server";

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
          counts: { products: 0, deposits: 0, stocks: 0, orders: 0, contacts: 0, orderItems: 0 },
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

    const [{ count: nProducts }, { count: nDeposits }, { count: nStocks }, { count: nOrders }, { count: nContacts }, { count: nOrderItems }] = await Promise.all([
      supabaseAdmin.from("bling_products").select("*", { count: "estimated", head: true }).eq("tenant_id", tenantId),
      supabaseAdmin.from("bling_deposits").select("*", { count: "estimated", head: true }).eq("tenant_id", tenantId),
      supabaseAdmin.from("bling_stock_balances").select("*", { count: "estimated", head: true }).eq("tenant_id", tenantId),
      supabaseAdmin.from("bling_orders").select("*", { count: "estimated", head: true }).eq("tenant_id", tenantId),
      supabaseAdmin.from("bling_contacts").select("*", { count: "estimated", head: true }).eq("tenant_id", tenantId),
      supabaseAdmin.from("bling_order_items").select("*", { count: "estimated", head: true }).eq("tenant_id", tenantId),
    ]);
    const { data: lastRuns } = await supabaseAdmin
      .from("bling_sync_runs")
      .select("id, resource, mode, status, started_at, finished_at, items_processed, error_message, cursor_page, next_page, heartbeat_at")
      .eq("tenant_id", tenantId)
      .order("started_at", { ascending: false })
      .limit(20);

    const resources: Array<"orders" | "products" | "stock" | "deposits" | "contacts"> = ["orders", "products", "stock", "deposits", "contacts"];
    const freshness = resources.map((res) => {
      const lastOk = (lastRuns ?? []).find((r) => r.resource === res && r.status === "ok");
      const lastAny = (lastRuns ?? []).find((r) => r.resource === res);
      const lastOkAt = lastOk?.finished_at ?? null;
      const ageSeconds = lastOkAt ? Math.max(0, Math.floor((Date.now() - new Date(lastOkAt).getTime()) / 1000)) : null;
      return {
        resource: res,
        lastOkAt,
        ageSeconds,
        lastStatus: lastAny?.status ?? null,
        inProgress: Boolean(lastAny && lastAny.status === "running" && lastAny.next_page),
        nextPage: lastAny?.next_page ?? null,
      };
    });

    return {
      tenantId,
      hasAppCreds: Boolean(settings?.bling_client_id && settings?.bling_client_secret),
      connected: Boolean(cred),
      expiresAt: cred?.expires_at ?? null,
      connectedAt: cred?.connected_at ?? null,
      lastRefreshAt: cred?.last_refresh_at ?? null,
      counts: { products: nProducts ?? 0, deposits: nDeposits ?? 0, stocks: nStocks ?? 0, orders: nOrders ?? 0, contacts: nContacts ?? 0, orderItems: nOrderItems ?? 0 },
      lastRuns: lastRuns ?? [],
      freshness,
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
      resource: z.enum(["deposits", "products", "stock", "orders", "contacts", "all"]),
      mode: z.enum(["full", "incremental"]).default("full"),
      untilDone: z.boolean().default(false),
      maxBatches: z.number().int().min(1).max(20).default(6),
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
        out.products = await runUntil(syncProducts, data.tenantId, data.mode, data.untilDone, data.maxBatches);
      }
      if (data.resource === "stock" || data.resource === "all") {
        out.stock = await syncStock(data.tenantId);
      }
      if (data.resource === "orders" || data.resource === "all") {
        out.orders = await runUntil(syncOrders, data.tenantId, data.mode, data.untilDone, data.maxBatches);
      }
      if (data.resource === "contacts" || data.resource === "all") {
        out.contacts = await runUntil(syncContacts, data.tenantId, data.mode, data.untilDone, data.maxBatches);
      }
      return { ok: true, ...out };
    } catch (e) {
      throw new Response(e instanceof Error ? e.message : String(e), { status: 500 });
    }
  });

type BatchedSyncFn = (
  tenantId: string,
  mode: "full" | "incremental",
  opts?: { resumeRunId?: string },
) => Promise<{ ok: true; count: number; done: boolean; nextPage: number | null; runId: string }>;

async function runUntil(
  fn: BatchedSyncFn,
  tenantId: string,
  mode: "full" | "incremental",
  untilDone: boolean,
  maxBatches: number,
) {
  let res = await fn(tenantId, mode);
  let batches = 1;
  let total = res.count;
  while (untilDone && !res.done && batches < maxBatches) {
    res = await fn(tenantId, mode, { resumeRunId: res.runId });
    total += res.count;
    batches++;
  }
  return { ...res, totalProcessed: total, batches, completed: res.done };
}

// ============ AUTO-CONFIG DO CRON (apenas superadmin) ============
export const setupBlingCron = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertSuperadmin(context.userId);

    const projectId = process.env.VITE_SUPABASE_PROJECT_ID ?? "ydajwcnghxjcmoaqbwwy";
    // URL estável publicada (serve o último deploy publicado).
    const url = `https://project--9225351c-a819-46d4-8167-24170081c08a.lovable.app/api/public/hooks/bling-sync-tick`;
    const apikey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    if (!apikey) throw new Response("SUPABASE_PUBLISHABLE_KEY ausente no servidor", { status: 500 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin.rpc as any)("setup_bling_cron", { p_url: url, p_apikey: apikey });
    if (error) throw new Response(error.message, { status: 500 });
    return { ok: true, schedule: "*/5 * * * *", url, projectId, result: data };
  });

// ============ RETOMAR RUN PAUSADA (apenas superadmin) ============
const RESUMABLE = ["orders", "products", "contacts"] as const;
type ResumableRes = typeof RESUMABLE[number];

export const resumeBlingRun = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      tenantId: z.string().uuid(),
      resource: z.enum(RESUMABLE),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertSuperadmin(context.userId);
    const { data: pending } = await supabaseAdmin
      .from("bling_sync_runs")
      .select("id, next_page, items_processed")
      .eq("tenant_id", data.tenantId)
      .eq("resource", data.resource)
      .in("status", ["running", "paused"])
      .not("next_page", "is", null)
      .order("started_at", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (!pending?.id) {
      return { resumed: false as const, reason: "no-paused-run" as const };
    }

    const fn = data.resource === "orders" ? syncOrders : data.resource === "products" ? syncProducts : syncContacts;
    let result: Awaited<ReturnType<typeof fn>> | null = null;
    let runError: string | null = null;
    try {
      result = await fn(data.tenantId, "incremental", { resumeRunId: pending.id });
    } catch (e) {
      runError = e instanceof Error ? e.message : String(e);
    }

    // Audit log (best-effort)
    try {
      await supabaseAdmin.from("audit_logs").insert({
        tenant_id: data.tenantId,
        user_id: context.userId,
        action: "bling.sync.resume",
        metadata: {
          resource: data.resource,
          runId: pending.id,
          previousNextPage: pending.next_page,
          previousItems: pending.items_processed,
          done: result?.done ?? null,
          count: result?.count ?? null,
          nextPage: result?.nextPage ?? null,
          error: runError,
        },
      });
    } catch (e) {
      console.error("[resumeBlingRun] audit log failed:", e);
    }

    if (runError) throw new Response(runError, { status: 500 });
    return {
      resumed: true as const,
      runId: pending.id,
      previousNextPage: pending.next_page,
      previousItems: pending.items_processed,
      done: result!.done,
      count: result!.count,
      nextPage: result!.nextPage,
    };
  });

// ============ AUDIT LOG DE RESUMES MANUAIS (apenas superadmin) ============
export const getBlingResumeAuditLog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertSuperadmin(context.userId);
    const { data: rows, error } = await supabaseAdmin
      .from("audit_logs")
      .select("id, created_at, tenant_id, user_id, metadata")
      .eq("action", "bling.sync.resume")
      .order("created_at", { ascending: false })
      .limit(20);
    if (error) throw new Response(error.message, { status: 500 });

    const userIds = Array.from(new Set((rows ?? []).map(r => r.user_id).filter(Boolean) as string[]));
    const tenantIds = Array.from(new Set((rows ?? []).map(r => r.tenant_id).filter(Boolean) as string[]));

    const [profilesRes, tenantsRes] = await Promise.all([
      userIds.length
        ? supabaseAdmin.from("profiles").select("id, email, full_name").in("id", userIds)
        : Promise.resolve({ data: [] as Array<{ id: string; email: string | null; full_name: string | null }> }),
      tenantIds.length
        ? supabaseAdmin.from("tenants").select("id, name").in("id", tenantIds)
        : Promise.resolve({ data: [] as Array<{ id: string; name: string }> }),
    ]);

    const userMap = new Map((profilesRes.data ?? []).map(p => [p.id, p]));
    const tenantMap = new Map((tenantsRes.data ?? []).map(t => [t.id, t]));

    return (rows ?? []).map(r => ({
      id: r.id,
      createdAt: r.created_at,
      tenantId: r.tenant_id,
      tenantName: r.tenant_id ? tenantMap.get(r.tenant_id)?.name ?? null : null,
      userId: r.user_id,
      userLabel: r.user_id ? (userMap.get(r.user_id)?.full_name || userMap.get(r.user_id)?.email || r.user_id) : null,
      metadata: (r.metadata ?? {}) as Record<string, string | number | boolean | null>,
    }));
  });

// ============ HEALTH DO CRON (apenas superadmin) ============
type CronHealthRow = {
  jobname: string;
  schedule: string;
  active: boolean;
  last_run_at: string | null;
  last_status: string | null;
  last_http_code: number | null;
  last_message: string | null;
  failures_last_hour: number;
  runs_last_hour: number;
  last_failure_at: string | null;
  last_failure_message: string | null;
  last_failure_command: string | null;
  recent_runs: Array<{ start_time: string; status: string; http_code: number | null; message: string }>;
};

export const getBlingCronHealth = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertSuperadmin(context.userId);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabaseAdmin.rpc as any)("bling_cron_health");
    if (error) throw new Response(error.message, { status: 500 });

    // Pings do endpoint de health (independente do cron) para detectar 404 imediato.
    const projectUrl = `https://project--9225351c-a819-46d4-8167-24170081c08a.lovable.app/api/public/hooks/bling-sync-health`;
    let pingStatus: number | null = null;
    let pingError: string | null = null;
    let pingMs: number | null = null;
    try {
      const t0 = Date.now();
      const res = await fetch(projectUrl, { method: "GET" });
      pingMs = Date.now() - t0;
      pingStatus = res.status;
    } catch (e) {
      pingError = e instanceof Error ? e.message : String(e);
    }

    return {
      jobs: (data ?? []) as CronHealthRow[],
      ping: { url: projectUrl, status: pingStatus, ms: pingMs, error: pingError },
      checkedAt: new Date().toISOString(),
    };
  });

