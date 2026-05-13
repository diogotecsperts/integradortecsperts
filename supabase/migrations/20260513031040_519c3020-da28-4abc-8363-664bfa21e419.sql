CREATE OR REPLACE FUNCTION public.bling_cron_health()
RETURNS TABLE(
  jobname text,
  schedule text,
  active boolean,
  last_run_at timestamptz,
  last_status text,
  last_http_code int,
  last_message text,
  failures_last_hour bigint,
  runs_last_hour bigint
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    j.jobname,
    j.schedule,
    j.active,
    d.start_time AS last_run_at,
    d.status AS last_status,
    NULLIF(regexp_replace(COALESCE(d.return_message, ''), '.*status_code\":\s*([0-9]+).*', '\1'), COALESCE(d.return_message, ''))::int AS last_http_code,
    LEFT(COALESCE(d.return_message, ''), 500) AS last_message,
    (SELECT count(*) FROM cron.job_run_details d2
       WHERE d2.jobid = j.jobid
         AND d2.status = 'failed'
         AND d2.start_time > now() - interval '1 hour') AS failures_last_hour,
    (SELECT count(*) FROM cron.job_run_details d3
       WHERE d3.jobid = j.jobid
         AND d3.start_time > now() - interval '1 hour') AS runs_last_hour
  FROM cron.job j
  LEFT JOIN LATERAL (
    SELECT start_time, status, return_message
    FROM cron.job_run_details
    WHERE jobid = j.jobid
    ORDER BY start_time DESC
    LIMIT 1
  ) d ON true
  WHERE j.jobname LIKE '%bling%';
$$;

REVOKE ALL ON FUNCTION public.bling_cron_health() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.bling_cron_health() TO authenticated;