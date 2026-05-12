CREATE TABLE public.global_settings (
  id text PRIMARY KEY DEFAULT 'global' CHECK (id = 'global'),
  default_agent_persona text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.global_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "global_settings_admin_all" ON public.global_settings
  FOR ALL TO authenticated
  USING (public.is_superadmin())
  WITH CHECK (public.is_superadmin());

CREATE TRIGGER trg_global_settings_updated
  BEFORE UPDATE ON public.global_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.global_settings (id, default_agent_persona)
VALUES ('global', 'Você é um Especialista em BI e ERP integrado ao Bling, atuando dentro do sistema Tecsperts. Responda SEMPRE em PT-BR, de forma objetiva, profissional e consultiva. Use os dados retornados pelas ferramentas como verdade absoluta e nunca invente números.')
ON CONFLICT (id) DO NOTHING;