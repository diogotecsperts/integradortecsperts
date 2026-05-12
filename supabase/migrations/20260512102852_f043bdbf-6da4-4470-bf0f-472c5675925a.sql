
ALTER TABLE public.bling_sync_runs
  ADD COLUMN IF NOT EXISTS cursor_page integer,
  ADD COLUMN IF NOT EXISTS next_page integer,
  ADD COLUMN IF NOT EXISTS heartbeat_at timestamptz;

CREATE INDEX IF NOT EXISTS idx_bling_sync_runs_tenant_resource_status
  ON public.bling_sync_runs (tenant_id, resource, status, started_at DESC);

CREATE OR REPLACE FUNCTION public.reap_stale_bling_runs()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE n integer;
BEGIN
  WITH upd AS (
    UPDATE public.bling_sync_runs
    SET status = 'error',
        finished_at = now(),
        error_message = COALESCE(error_message, 'Stale: sem heartbeat há mais de 5 minutos')
    WHERE status = 'running'
      AND COALESCE(heartbeat_at, started_at) < now() - interval '5 minutes'
    RETURNING 1
  )
  SELECT count(*) INTO n FROM upd;
  RETURN n;
END;
$$;
