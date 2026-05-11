// Cliente HTTP do Bling com refresh transparente de token e throttle por tenant.
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { encrypt, decrypt } from "./crypto.server";

const BLING_BASE = "https://api.bling.com.br/Api/v3";
const BLING_OAUTH_TOKEN = "https://www.bling.com.br/Api/v3/oauth/token";
export const BLING_OAUTH_AUTHORIZE = "https://www.bling.com.br/Api/v3/oauth/authorize";

export class BlingError extends Error {
  status: number;
  body: unknown;
  constructor(status: number, body: unknown, message?: string) {
    super(message ?? `Bling API error ${status}`);
    this.status = status;
    this.body = body;
  }
}

// ============ Throttle simples (3 req/s) por tenant ============
const lastCall = new Map<string, number>();
const MIN_INTERVAL_MS = 350;
async function throttle(tenantId: string) {
  const now = Date.now();
  const last = lastCall.get(tenantId) ?? 0;
  const wait = Math.max(0, last + MIN_INTERVAL_MS - now);
  if (wait > 0) await new Promise((r) => setTimeout(r, wait));
  lastCall.set(tenantId, Date.now());
}

// ============ Credenciais do app (client_id / client_secret) ============
async function getAppCreds(tenantId: string) {
  const { data, error } = await supabaseAdmin
    .from("tenant_settings")
    .select("bling_client_id, bling_client_secret")
    .eq("tenant_id", tenantId)
    .maybeSingle();
  if (error) throw new Error(`Falha ao ler credenciais do app: ${error.message}`);
  if (!data?.bling_client_id || !data?.bling_client_secret) {
    throw new Error("Tenant sem Client ID/Secret do Bling configurados pelo superadmin.");
  }
  return { clientId: data.bling_client_id, clientSecret: data.bling_client_secret };
}

// ============ OAuth: troca de code e refresh ============
type TokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope?: string;
  token_type?: string;
};

async function postToken(
  clientId: string,
  clientSecret: string,
  body: Record<string, string>,
): Promise<TokenResponse> {
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const res = await fetch(BLING_OAUTH_TOKEN, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(body).toString(),
  });
  const text = await res.text();
  let json: unknown;
  try { json = JSON.parse(text); } catch { json = text; }
  if (!res.ok) throw new BlingError(res.status, json, `OAuth token falhou (${res.status})`);
  return json as TokenResponse;
}

export async function exchangeCodeForToken(opts: {
  tenantId: string;
  code: string;
  redirectUri: string;
  connectedBy?: string;
}) {
  const { clientId, clientSecret } = await getAppCreds(opts.tenantId);
  const tok = await postToken(clientId, clientSecret, {
    grant_type: "authorization_code",
    code: opts.code,
    redirect_uri: opts.redirectUri,
  });
  await persistTokens(opts.tenantId, tok, { connectedBy: opts.connectedBy });
}

async function persistTokens(
  tenantId: string,
  tok: TokenResponse,
  extras?: { connectedBy?: string; isRefresh?: boolean },
) {
  const expires_at = new Date(Date.now() + (tok.expires_in - 30) * 1000).toISOString();
  const row: Record<string, unknown> = {
    tenant_id: tenantId,
    access_token_enc: encrypt(tok.access_token),
    refresh_token_enc: encrypt(tok.refresh_token),
    expires_at,
    scope: tok.scope ?? null,
    updated_at: new Date().toISOString(),
  };
  if (extras?.isRefresh) {
    row.last_refresh_at = new Date().toISOString();
  } else {
    row.connected_at = new Date().toISOString();
    row.connected_by = extras?.connectedBy ?? null;
  }
  const { error } = await supabaseAdmin
    .from("bling_credentials")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .upsert(row as any, { onConflict: "tenant_id" });
  if (error) throw new Error(`Falha ao salvar tokens: ${error.message}`);
}

async function refreshIfNeeded(tenantId: string) {
  const { data, error } = await supabaseAdmin
    .from("bling_credentials")
    .select("*")
    .eq("tenant_id", tenantId)
    .maybeSingle();
  if (error) throw new Error(`Falha ao ler credenciais: ${error.message}`);
  if (!data) throw new Error("Bling não conectado para este tenant.");

  const expiresAt = new Date(data.expires_at).getTime();
  const needsRefresh = expiresAt - Date.now() < 5 * 60 * 1000;
  if (!needsRefresh) return decrypt(data.access_token_enc);

  const { clientId, clientSecret } = await getAppCreds(tenantId);
  const refreshToken = decrypt(data.refresh_token_enc);
  const tok = await postToken(clientId, clientSecret, {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });
  await persistTokens(tenantId, tok, { isRefresh: true });
  return tok.access_token;
}

// ============ blingFetch ============
export async function blingFetch<T = unknown>(
  tenantId: string,
  path: string,
  init?: RequestInit & { searchParams?: Record<string, string | number | undefined> },
): Promise<T> {
  await throttle(tenantId);
  const accessToken = await refreshIfNeeded(tenantId);
  const url = new URL(BLING_BASE + path);
  if (init?.searchParams) {
    for (const [k, v] of Object.entries(init.searchParams)) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }
  }
  const res = await fetch(url.toString(), {
    ...init,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      ...(init?.headers ?? {}),
    },
  });
  if (res.status === 429) {
    await new Promise((r) => setTimeout(r, 1500));
    return blingFetch<T>(tenantId, path, init);
  }
  const text = await res.text();
  let json: unknown = null;
  if (text) { try { json = JSON.parse(text); } catch { json = text; } }
  if (!res.ok) throw new BlingError(res.status, json, `Bling ${path} (${res.status})`);
  return json as T;
}

// ============ Status helper ============
export async function getCredentialStatus(tenantId: string) {
  const { data } = await supabaseAdmin
    .from("bling_credentials")
    .select("expires_at, connected_at, last_refresh_at, scope")
    .eq("tenant_id", tenantId)
    .maybeSingle();
  return data;
}
