
CREATE INDEX IF NOT EXISTS idx_bling_orders_tenant ON public.bling_orders(tenant_id);
CREATE INDEX IF NOT EXISTS idx_bling_orders_tenant_updated ON public.bling_orders(tenant_id, bling_updated_at);
CREATE INDEX IF NOT EXISTS idx_bling_order_items_tenant ON public.bling_order_items(tenant_id);
CREATE INDEX IF NOT EXISTS idx_bling_order_items_tenant_order ON public.bling_order_items(tenant_id, order_bling_id);
CREATE INDEX IF NOT EXISTS idx_bling_contacts_tenant ON public.bling_contacts(tenant_id);
CREATE INDEX IF NOT EXISTS idx_bling_products_tenant ON public.bling_products(tenant_id);
CREATE INDEX IF NOT EXISTS idx_bling_stock_balances_tenant ON public.bling_stock_balances(tenant_id);
CREATE INDEX IF NOT EXISTS idx_bling_sync_runs_tenant_resource ON public.bling_sync_runs(tenant_id, resource, started_at DESC);

CREATE OR REPLACE FUNCTION public.reap_stale_bling_runs()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE n integer;
BEGIN
  WITH upd AS (
    UPDATE public.bling_sync_runs
    SET status = 'error',
        finished_at = now(),
        error_message = COALESCE(error_message, 'Stale: sem heartbeat há mais de 8 minutos')
    WHERE status = 'running'
      AND COALESCE(heartbeat_at, started_at) < now() - interval '8 minutes'
    RETURNING 1
  )
  SELECT count(*) INTO n FROM upd;
  RETURN n;
END;
$function$;
