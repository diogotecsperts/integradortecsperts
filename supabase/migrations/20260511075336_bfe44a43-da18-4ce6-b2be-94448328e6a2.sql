
-- ============ Credenciais OAuth (1 por tenant) ============
CREATE TABLE public.bling_credentials (
  tenant_id uuid PRIMARY KEY REFERENCES public.tenants(id) ON DELETE CASCADE,
  access_token_enc text NOT NULL,
  refresh_token_enc text NOT NULL,
  expires_at timestamptz NOT NULL,
  scope text,
  connected_by uuid,
  connected_at timestamptz NOT NULL DEFAULT now(),
  last_refresh_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.bling_credentials ENABLE ROW LEVEL SECURITY;
CREATE POLICY bling_cred_admin_all ON public.bling_credentials
  FOR ALL TO authenticated USING (is_superadmin()) WITH CHECK (is_superadmin());

CREATE TRIGGER bling_credentials_set_updated_at BEFORE UPDATE ON public.bling_credentials
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ States OAuth (anti-CSRF) ============
CREATE TABLE public.bling_oauth_states (
  state text PRIMARY KEY,
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  redirect_uri text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL,
  used_at timestamptz
);
ALTER TABLE public.bling_oauth_states ENABLE ROW LEVEL SECURITY;
CREATE POLICY bling_state_admin_all ON public.bling_oauth_states
  FOR ALL TO authenticated USING (is_superadmin()) WITH CHECK (is_superadmin());
CREATE INDEX bling_oauth_states_tenant_idx ON public.bling_oauth_states(tenant_id);

-- ============ Espelho: Depósitos ============
CREATE TABLE public.bling_deposits (
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  bling_id bigint NOT NULL,
  nome text,
  descricao text,
  situacao text,
  padrao boolean DEFAULT false,
  desconsiderar_saldo boolean DEFAULT false,
  raw jsonb NOT NULL DEFAULT '{}'::jsonb,
  synced_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, bling_id)
);
ALTER TABLE public.bling_deposits ENABLE ROW LEVEL SECURITY;
CREATE POLICY bling_deposits_select ON public.bling_deposits
  FOR SELECT TO authenticated
  USING (is_superadmin() OR tenant_id = get_user_tenant(auth.uid()));

-- ============ Espelho: Produtos ============
CREATE TABLE public.bling_products (
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  bling_id bigint NOT NULL,
  codigo text,
  nome text,
  preco numeric(14,4),
  situacao text,
  tipo text,
  formato text,
  unidade text,
  gtin text,
  peso_liquido numeric(14,4),
  imagem_url text,
  categoria_id bigint,
  parent_id bigint,
  raw jsonb NOT NULL DEFAULT '{}'::jsonb,
  bling_updated_at timestamptz,
  synced_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, bling_id)
);
ALTER TABLE public.bling_products ENABLE ROW LEVEL SECURITY;
CREATE POLICY bling_products_select ON public.bling_products
  FOR SELECT TO authenticated
  USING (is_superadmin() OR tenant_id = get_user_tenant(auth.uid()));
CREATE INDEX bling_products_codigo_idx ON public.bling_products(tenant_id, codigo);
CREATE INDEX bling_products_updated_idx ON public.bling_products(tenant_id, bling_updated_at DESC);

-- ============ Espelho: Saldos de Estoque ============
CREATE TABLE public.bling_stock_balances (
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  produto_id bigint NOT NULL,
  deposito_id bigint NOT NULL,
  saldo_fisico numeric(14,4) NOT NULL DEFAULT 0,
  saldo_virtual numeric(14,4) NOT NULL DEFAULT 0,
  raw jsonb NOT NULL DEFAULT '{}'::jsonb,
  synced_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (tenant_id, produto_id, deposito_id)
);
ALTER TABLE public.bling_stock_balances ENABLE ROW LEVEL SECURITY;
CREATE POLICY bling_stock_select ON public.bling_stock_balances
  FOR SELECT TO authenticated
  USING (is_superadmin() OR tenant_id = get_user_tenant(auth.uid()));

-- ============ Histórico de syncs ============
CREATE TYPE public.bling_sync_status AS ENUM ('running','ok','error');

CREATE TABLE public.bling_sync_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  resource text NOT NULL,
  mode text,
  status public.bling_sync_status NOT NULL DEFAULT 'running',
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  items_processed integer NOT NULL DEFAULT 0,
  error_message text,
  meta jsonb
);
ALTER TABLE public.bling_sync_runs ENABLE ROW LEVEL SECURITY;
CREATE POLICY bling_runs_select ON public.bling_sync_runs
  FOR SELECT TO authenticated
  USING (is_superadmin() OR tenant_id = get_user_tenant(auth.uid()));
CREATE INDEX bling_sync_runs_tenant_started_idx ON public.bling_sync_runs(tenant_id, started_at DESC);
