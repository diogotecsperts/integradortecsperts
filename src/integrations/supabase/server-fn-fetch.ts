import { supabase } from "./client";

let installed = false;

/**
 * Patches window.fetch to inject `Authorization: Bearer <token>` on requests
 * to TanStack Start server functions (`/_serverFn/...`). Without this, our
 * `requireSupabaseAuth` middleware rejects every server-fn call with 401.
 */
export function installServerFnAuthFetch() {
  if (installed) return;
  if (typeof window === "undefined") return;
  installed = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    try {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.toString()
            : (input as Request).url;

      const isServerFn = url.includes("/_serverFn/");

      if (isServerFn) {
        const { data } = await supabase.auth.getSession();
        const token = data.session?.access_token;

        if (token) {
          const headers = new Headers(
            init?.headers ??
              (input instanceof Request ? input.headers : undefined),
          );
          if (!headers.has("authorization")) {
            headers.set("Authorization", `Bearer ${token}`);
          }
          return originalFetch(input, { ...init, headers });
        }
      }
    } catch (err) {
      console.warn("[server-fn-fetch] failed to attach auth header", err);
    }

    return originalFetch(input, init);
  };
}
