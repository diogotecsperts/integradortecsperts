
-- ============ bling_order_items ============
CREATE TABLE IF NOT EXISTS public.bling_order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL,
  order_bling_id bigint NOT NULL,
  bling_item_id bigint,
  produto_id bigint,
  codigo text,
  descricao text,
  quantidade numeric NOT NULL DEFAULT 0,
  preco numeric NOT NULL DEFAULT 0,
  valor_total numeric,
  raw jsonb NOT NULL DEFAULT '{}'::jsonb,
  synced_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_boi_tenant_order ON public.bling_order_items (tenant_id, order_bling_id);
CREATE INDEX IF NOT EXISTS idx_boi_tenant_produto ON public.bling_order_items (tenant_id, produto_id);

ALTER TABLE public.bling_order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY bling_order_items_select ON public.bling_order_items
  FOR SELECT TO authenticated
  USING (is_superadmin() OR tenant_id = get_user_tenant(auth.uid()));

-- ============ bling_contacts ============
CREATE TABLE IF NOT EXISTS public.bling_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL,
  bling_id bigint NOT NULL,
  nome text,
  numero_documento text,
  tipo text,
  email text,
  telefone text,
  cidade text,
  uf text,
  cep text,
  situacao text,
  raw jsonb NOT NULL DEFAULT '{}'::jsonb,
  bling_updated_at timestamptz,
  synced_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (tenant_id, bling_id)
);

CREATE INDEX IF NOT EXISTS idx_bcontacts_tenant_uf ON public.bling_contacts (tenant_id, uf);

ALTER TABLE public.bling_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY bling_contacts_select ON public.bling_contacts
  FOR SELECT TO authenticated
  USING (is_superadmin() OR tenant_id = get_user_tenant(auth.uid()));

-- ============ RPC agent_top_products ============
CREATE OR REPLACE FUNCTION public.agent_top_products(
  _tenant_id uuid, _from date, _to date, _limit int DEFAULT 10
)
RETURNS TABLE(produto_id bigint, codigo text, nome text, qtd_total numeric, faturamento numeric, pedidos_count bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT
    i.produto_id,
    COALESCE(p.codigo, MAX(i.codigo)) AS codigo,
    COALESCE(p.nome, MAX(i.descricao)) AS nome,
    SUM(i.quantidade)::numeric AS qtd_total,
    SUM(COALESCE(i.valor_total, i.quantidade * i.preco))::numeric AS faturamento,
    COUNT(DISTINCT i.order_bling_id)::bigint AS pedidos_count
  FROM public.bling_order_items i
  JOIN public.bling_orders o
    ON o.tenant_id = i.tenant_id AND o.bling_id = i.order_bling_id
  LEFT JOIN public.bling_products p
    ON p.tenant_id = i.tenant_id AND p.bling_id = i.produto_id
  WHERE i.tenant_id = _tenant_id
    AND o.data BETWEEN _from AND _to
    AND i.produto_id IS NOT NULL
  GROUP BY i.produto_id, p.codigo, p.nome
  ORDER BY qtd_total DESC
  LIMIT _limit;
$$;

-- ============ RPC agent_sales_by_region ============
CREATE OR REPLACE FUNCTION public.agent_sales_by_region(
  _tenant_id uuid, _from date, _to date
)
RETURNS TABLE(uf text, total numeric, cnt bigint, customers bigint)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT
    COALESCE(c.uf, '—') AS uf,
    SUM(o.valor_total)::numeric AS total,
    COUNT(*)::bigint AS cnt,
    COUNT(DISTINCT o.cliente_id)::bigint AS customers
  FROM public.bling_orders o
  LEFT JOIN public.bling_contacts c
    ON c.tenant_id = o.tenant_id AND c.bling_id = o.cliente_id
  WHERE o.tenant_id = _tenant_id
    AND o.data BETWEEN _from AND _to
  GROUP BY 1
  ORDER BY total DESC;
$$;

-- ============ Atualizar agent_summarize_sales: branch 'product' ============
CREATE OR REPLACE FUNCTION public.agent_summarize_sales(_tenant_id uuid, _from date, _to date, _group_by text DEFAULT 'none'::text)
 RETURNS TABLE(group_key text, total numeric, cnt bigint, customers bigint)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  ELSIF _group_by = 'product' THEN
    RETURN QUERY
      SELECT COALESCE(p.nome, MAX(i.descricao), 'Produto ' || i.produto_id::text) AS group_key,
             SUM(COALESCE(i.valor_total, i.quantidade * i.preco))::numeric AS total,
             SUM(i.quantidade)::bigint AS cnt,
             COUNT(DISTINCT i.order_bling_id)::bigint AS customers
      FROM public.bling_order_items i
      JOIN public.bling_orders o
        ON o.tenant_id = i.tenant_id AND o.bling_id = i.order_bling_id
      LEFT JOIN public.bling_products p
        ON p.tenant_id = i.tenant_id AND p.bling_id = i.produto_id
      WHERE i.tenant_id = _tenant_id
        AND o.data BETWEEN _from AND _to
        AND i.produto_id IS NOT NULL
      GROUP BY i.produto_id, p.nome
      ORDER BY total DESC
      LIMIT 50;
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
$function$;
