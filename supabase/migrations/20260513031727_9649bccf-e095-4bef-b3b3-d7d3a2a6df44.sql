DROP FUNCTION IF EXISTS public.bling_cron_health();

CREATE OR REPLACE FUNCTION public.bling_cron_health()
 RETURNS TABLE(
   jobname text,
   schedule text,
   active boolean,
   last_run_at timestamp with time zone,
   last_status text,
   last_http_code integer,
   last_message text,
   failures_last_hour bigint,
   runs_last_hour bigint,
   last_failure_at timestamp with time zone,
   last_failure_message text,
   last_failure_command text,
   recent_runs jsonb
 )
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT
    j.jobname,
    j.schedule,
    j.active,
    d.start_time AS last_run_at,
    d.status AS last_status,
    NULLIF((regexp_match(COALESCE(d.return_message,''), 'status_code"?\s*[:=]\s*([0-9]+)'))[1], '')::int AS last_http_code,
    COALESCE(d.return_message, '') AS last_message,
    (SELECT count(*) FROM cron.job_run_details d2
       WHERE d2.jobid = j.jobid AND d2.status = 'failed'
         AND d2.start_time > now() - interval '1 hour') AS failures_last_hour,
    (SELECT count(*) FROM cron.job_run_details d3
       WHERE d3.jobid = j.jobid
         AND d3.start_time > now() - interval '1 hour') AS runs_last_hour,
    f.start_time AS last_failure_at,
    f.return_message AS last_failure_message,
    f.command AS last_failure_command,
    COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'start_time', r.start_time,
        'status', r.status,
        'http_code', NULLIF((regexp_match(COALESCE(r.return_message,''), 'status_code"?\s*[:=]\s*([0-9]+)'))[1], '')::int,
        'message', LEFT(COALESCE(r.return_message,''), 300)
      ) ORDER BY r.start_time DESC)
      FROM (
        SELECT start_time, status, return_message
        FROM cron.job_run_details
        WHERE jobid = j.jobid
        ORDER BY start_time DESC
        LIMIT 5
      ) r
    ), '[]'::jsonb) AS recent_runs
  FROM cron.job j
  LEFT JOIN LATERAL (
    SELECT start_time, status, return_message
    FROM cron.job_run_details
    WHERE jobid = j.jobid
    ORDER BY start_time DESC
    LIMIT 1
  ) d ON true
  LEFT JOIN LATERAL (
    SELECT start_time, return_message, command
    FROM cron.job_run_details
    WHERE jobid = j.jobid AND status = 'failed'
    ORDER BY start_time DESC
    LIMIT 1
  ) f ON true
  WHERE j.jobname LIKE '%bling%';
$function$;