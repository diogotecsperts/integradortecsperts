-- Indexes for aggregation performance
CREATE INDEX IF NOT EXISTS idx_bling_orders_tenant_data ON public.bling_orders(tenant_id, data);
CREATE INDEX IF NOT EXISTS idx_bling_stock_tenant_produto ON public.bling_stock_balances(tenant_id, produto_id);

-- Aggregate sales summary
CREATE OR REPLACE FUNCTION public.agent_summarize_sales(
  _tenant_id uuid,
  _from date,
  _to date,
  _group_by text DEFAULT 'none'
)
RETURNS TABLE(group_key text, total numeric, cnt bigint, customers bigint)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF _group_by = 'day' THEN
    RETURN QUERY
      SELECT to_char(o.data, 'YYYY-MM-DD') AS group_key,
             COALESCE(SUM(o.valor_total), 0)::numeric AS total,
             COUNT(*)::bigint AS cnt,
             COUNT(DISTINCT o.cliente_id)::bigint AS customers
      FROM public.bling_orders o
      WHERE o.tenant_id = _tenant_id AND o.data BETWEEN _from AND _to
      GROUP BY 1
      ORDER BY 1;
  ELSIF _group_by = 'month' THEN
    RETURN QUERY
      SELECT to_char(o.data, 'YYYY-MM') AS group_key,
             COALESCE(SUM(o.valor_total), 0)::numeric,
             COUNT(*)::bigint,
             COUNT(DISTINCT o.cliente_id)::bigint
      FROM public.bling_orders o
      WHERE o.tenant_id = _tenant_id AND o.data BETWEEN _from AND _to
      GROUP BY 1
      ORDER BY 1;
  ELSIF _group_by = 'situacao' THEN
    RETURN QUERY
      SELECT COALESCE(o.situacao_nome, 'Sit ' || COALESCE(o.situacao_id::text, '?')) AS group_key,
             COALESCE(SUM(o.valor_total), 0)::numeric,
             COUNT(*)::bigint,
             COUNT(DISTINCT o.cliente_id)::bigint
      FROM public.bling_orders o
      WHERE o.tenant_id = _tenant_id AND o.data BETWEEN _from AND _to
      GROUP BY 1
      ORDER BY 2 DESC;
  ELSE
    RETURN QUERY
      SELECT NULL::text AS group_key,
             COALESCE(SUM(o.valor_total), 0)::numeric,
             COUNT(*)::bigint,
             COUNT(DISTINCT o.cliente_id)::bigint
      FROM public.bling_orders o
      WHERE o.tenant_id = _tenant_id AND o.data BETWEEN _from AND _to;
  END IF;
END;
$$;

-- Sales availability diagnostic
CREATE OR REPLACE FUNCTION public.agent_sales_availability(_tenant_id uuid)
RETURNS TABLE(earliest date, latest date, total_orders bigint)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT MIN(data), MAX(data), COUNT(*)::bigint
  FROM public.bling_orders
  WHERE tenant_id = _tenant_id;
$$;

-- Low stock aggregated
CREATE OR REPLACE FUNCTION public.agent_low_stock(
  _tenant_id uuid,
  _threshold numeric DEFAULT 5,
  _limit int DEFAULT 20
)
RETURNS TABLE(produto_id bigint, saldo_total numeric, codigo text, nome text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT s.produto_id,
         SUM(s.saldo_fisico)::numeric AS saldo_total,
         p.codigo,
         p.nome
  FROM public.bling_stock_balances s
  LEFT JOIN public.bling_products p
    ON p.tenant_id = s.tenant_id AND p.bling_id = s.produto_id
  WHERE s.tenant_id = _tenant_id
  GROUP BY s.produto_id, p.codigo, p.nome
  HAVING SUM(s.saldo_fisico) <= _threshold
  ORDER BY saldo_total ASC
  LIMIT _limit;
$$;