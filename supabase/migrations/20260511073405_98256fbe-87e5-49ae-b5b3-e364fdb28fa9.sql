DROP POLICY IF EXISTS settings_select_own ON public.tenant_settings;
DROP POLICY IF EXISTS settings_insert_own ON public.tenant_settings;
DROP POLICY IF EXISTS settings_update_own ON public.tenant_settings;
DROP POLICY IF EXISTS settings_admin_delete ON public.tenant_settings;

CREATE POLICY settings_admin_all ON public.tenant_settings
  FOR ALL TO authenticated
  USING (public.is_superadmin())
  WITH CHECK (public.is_superadmin());