REVOKE ALL ON FUNCTION public.agent_summarize_sales(uuid, date, date, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.agent_sales_availability(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.agent_low_stock(uuid, numeric, int) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.agent_summarize_sales(uuid, date, date, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.agent_sales_availability(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.agent_low_stock(uuid, numeric, int) TO service_role;