
-- ============= ENUMS =============
CREATE TYPE public.app_role AS ENUM ('superadmin', 'cliente');
CREATE TYPE public.tenant_status AS ENUM ('active', 'suspended', 'blocked');
CREATE TYPE public.ai_message_role AS ENUM ('user', 'assistant', 'system');

-- ============= TIMESTAMP TRIGGER =============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

-- ============= TENANTS =============
CREATE TABLE public.tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  status public.tenant_status NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_tenants_updated BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;

-- ============= PROFILES =============
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id uuid REFERENCES public.tenants(id) ON DELETE SET NULL,
  full_name text,
  email text,
  avatar_url text,
  is_blocked boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ============= USER ROLES =============
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- ============= SECURITY DEFINER HELPERS =============
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.get_user_tenant(_user_id uuid)
RETURNS uuid LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT tenant_id FROM public.profiles WHERE id = _user_id;
$$;

CREATE OR REPLACE FUNCTION public.is_superadmin()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'superadmin');
$$;

-- ============= TENANT SETTINGS =============
CREATE TABLE public.tenant_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL UNIQUE REFERENCES public.tenants(id) ON DELETE CASCADE,
  bling_client_id text,
  bling_client_secret text,
  resend_api_key text,
  minimax_api_key text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_tenant_settings_updated BEFORE UPDATE ON public.tenant_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE public.tenant_settings ENABLE ROW LEVEL SECURITY;

-- ============= AI CONVERSATIONS =============
CREATE TABLE public.ai_conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT 'Nova conversa',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TRIGGER trg_ai_conv_updated BEFORE UPDATE ON public.ai_conversations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
ALTER TABLE public.ai_conversations ENABLE ROW LEVEL SECURITY;

-- ============= AI MESSAGES =============
CREATE TABLE public.ai_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES public.ai_conversations(id) ON DELETE CASCADE,
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  role public.ai_message_role NOT NULL,
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.ai_messages ENABLE ROW LEVEL SECURITY;

-- ============= BI METRICS MOCK =============
CREATE TABLE public.bi_metrics_mock (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  date date NOT NULL,
  sales numeric(12,2) NOT NULL DEFAULT 0,
  orders integer NOT NULL DEFAULT 0,
  avg_ticket numeric(12,2) NOT NULL DEFAULT 0,
  customers integer NOT NULL DEFAULT 0,
  category text,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.bi_metrics_mock ENABLE ROW LEVEL SECURITY;

-- ============= AUDIT LOGS =============
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES public.tenants(id) ON DELETE SET NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  metadata jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ============= RLS POLICIES =============

-- TENANTS
CREATE POLICY "tenants_select_own_or_admin" ON public.tenants FOR SELECT TO authenticated
  USING (public.is_superadmin() OR id = public.get_user_tenant(auth.uid()));
CREATE POLICY "tenants_admin_all" ON public.tenants FOR ALL TO authenticated
  USING (public.is_superadmin()) WITH CHECK (public.is_superadmin());

-- PROFILES
CREATE POLICY "profiles_select_self_or_admin" ON public.profiles FOR SELECT TO authenticated
  USING (public.is_superadmin() OR id = auth.uid() OR tenant_id = public.get_user_tenant(auth.uid()));
CREATE POLICY "profiles_update_self" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "profiles_admin_all" ON public.profiles FOR ALL TO authenticated
  USING (public.is_superadmin()) WITH CHECK (public.is_superadmin());

-- USER_ROLES
CREATE POLICY "user_roles_select_self_or_admin" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_superadmin());
CREATE POLICY "user_roles_admin_all" ON public.user_roles FOR ALL TO authenticated
  USING (public.is_superadmin()) WITH CHECK (public.is_superadmin());

-- TENANT_SETTINGS
CREATE POLICY "settings_select_own" ON public.tenant_settings FOR SELECT TO authenticated
  USING (public.is_superadmin() OR tenant_id = public.get_user_tenant(auth.uid()));
CREATE POLICY "settings_update_own" ON public.tenant_settings FOR UPDATE TO authenticated
  USING (public.is_superadmin() OR tenant_id = public.get_user_tenant(auth.uid()))
  WITH CHECK (public.is_superadmin() OR tenant_id = public.get_user_tenant(auth.uid()));
CREATE POLICY "settings_insert_own" ON public.tenant_settings FOR INSERT TO authenticated
  WITH CHECK (public.is_superadmin() OR tenant_id = public.get_user_tenant(auth.uid()));
CREATE POLICY "settings_admin_delete" ON public.tenant_settings FOR DELETE TO authenticated
  USING (public.is_superadmin());

-- AI_CONVERSATIONS
CREATE POLICY "ai_conv_tenant_select" ON public.ai_conversations FOR SELECT TO authenticated
  USING (public.is_superadmin() OR tenant_id = public.get_user_tenant(auth.uid()));
CREATE POLICY "ai_conv_tenant_insert" ON public.ai_conversations FOR INSERT TO authenticated
  WITH CHECK (tenant_id = public.get_user_tenant(auth.uid()) AND user_id = auth.uid());
CREATE POLICY "ai_conv_tenant_update" ON public.ai_conversations FOR UPDATE TO authenticated
  USING (tenant_id = public.get_user_tenant(auth.uid()) AND user_id = auth.uid());
CREATE POLICY "ai_conv_tenant_delete" ON public.ai_conversations FOR DELETE TO authenticated
  USING (tenant_id = public.get_user_tenant(auth.uid()) AND user_id = auth.uid());

-- AI_MESSAGES
CREATE POLICY "ai_msg_tenant_select" ON public.ai_messages FOR SELECT TO authenticated
  USING (public.is_superadmin() OR tenant_id = public.get_user_tenant(auth.uid()));
CREATE POLICY "ai_msg_tenant_insert" ON public.ai_messages FOR INSERT TO authenticated
  WITH CHECK (tenant_id = public.get_user_tenant(auth.uid()));

-- BI_METRICS_MOCK
CREATE POLICY "bi_select_own" ON public.bi_metrics_mock FOR SELECT TO authenticated
  USING (public.is_superadmin() OR tenant_id = public.get_user_tenant(auth.uid()));
CREATE POLICY "bi_admin_all" ON public.bi_metrics_mock FOR ALL TO authenticated
  USING (public.is_superadmin()) WITH CHECK (public.is_superadmin());

-- AUDIT_LOGS
CREATE POLICY "audit_select_admin_or_tenant" ON public.audit_logs FOR SELECT TO authenticated
  USING (public.is_superadmin() OR tenant_id = public.get_user_tenant(auth.uid()));
CREATE POLICY "audit_insert_any_auth" ON public.audit_logs FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- ============= USER PROFILE TRIGGER =============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  -- Default role 'cliente' (superadmin pode promover depois)
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'cliente')
    ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============= INDEXES =============
CREATE INDEX idx_profiles_tenant ON public.profiles(tenant_id);
CREATE INDEX idx_ai_conv_tenant ON public.ai_conversations(tenant_id);
CREATE INDEX idx_ai_msg_conv ON public.ai_messages(conversation_id);
CREATE INDEX idx_bi_tenant_date ON public.bi_metrics_mock(tenant_id, date);
CREATE INDEX idx_user_roles_user ON public.user_roles(user_id);
