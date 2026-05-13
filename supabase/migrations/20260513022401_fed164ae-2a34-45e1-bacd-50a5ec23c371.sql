
-- 1) Adiciona valor ao enum
ALTER TYPE public.bling_sync_status ADD VALUE IF NOT EXISTS 'paused';

-- 2) Garante extensões necessárias
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 3) Função de auto-setup do cron
CREATE OR REPLACE FUNCTION public.setup_bling_cron(p_url text, p_apikey text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_sql text;
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'bling-sync-tick') THEN
    PERFORM cron.unschedule('bling-sync-tick');
  END IF;

  v_sql := format(
    $c$ SELECT net.http_post(
      url := %L,
      headers := jsonb_build_object('Content-Type','application/json','apikey',%L),
      body := '{}'::jsonb
    ) $c$,
    p_url, p_apikey
  );

  PERFORM cron.schedule('bling-sync-tick', '*/5 * * * *', v_sql);

  RETURN 'scheduled */5 * * * * -> ' || p_url;
END;
$$;

REVOKE ALL ON FUNCTION public.setup_bling_cron(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.setup_bling_cron(text, text) TO service_role;
