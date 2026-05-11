
CREATE TABLE public.bling_orders (
  tenant_id uuid NOT NULL,
  bling_id bigint NOT NULL,
  numero text,
  data date,
  data_saida date,
  valor_total numeric(14,2) NOT NULL DEFAULT 0,
  situacao_id int,
  situacao_valor int,
  situacao_nome text,
  cliente_id bigint,
  cliente_nome text,
  cliente_documento text,
  loja_id bigint,
  numero_loja text,
  raw jsonb NOT NULL DEFAULT '{}'::jsonb,
  bling_updated_at timestamptz,
  synced_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, bling_id)
);

CREATE INDEX bling_orders_tenant_data_idx ON public.bling_orders (tenant_id, data DESC);
CREATE INDEX bling_orders_tenant_situacao_idx ON public.bling_orders (tenant_id, situacao_id);

ALTER TABLE public.bling_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY bling_orders_select ON public.bling_orders
  FOR SELECT TO authenticated
  USING (is_superadmin() OR tenant_id = get_user_tenant(auth.uid()));
