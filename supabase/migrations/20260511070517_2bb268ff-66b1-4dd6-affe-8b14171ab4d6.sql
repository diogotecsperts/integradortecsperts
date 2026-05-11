
-- Auto-promote seed superadmin
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));

  IF NEW.email = 'diogomixcds@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'superadmin')
      ON CONFLICT DO NOTHING;
  ELSE
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'cliente')
      ON CONFLICT DO NOTHING;
  END IF;

  RETURN NEW;
END; $$;

-- Mock BI seeder
CREATE OR REPLACE FUNCTION public.seed_tenant_mock_bi()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE d date; cats text[] := ARRAY['Eletrônicos','Moda','Casa','Beleza','Esporte'];
BEGIN
  FOR d IN SELECT generate_series(CURRENT_DATE - INTERVAL '180 days', CURRENT_DATE, '1 day')::date LOOP
    INSERT INTO public.bi_metrics_mock (tenant_id, date, sales, orders, avg_ticket, customers, category)
    VALUES (
      NEW.id, d,
      (random()*15000 + 2000)::numeric(12,2),
      (random()*120 + 10)::int,
      (random()*450 + 80)::numeric(12,2),
      (random()*80 + 5)::int,
      cats[1 + floor(random()*5)::int]
    );
  END LOOP;
  RETURN NEW;
END; $$;

CREATE TRIGGER trg_tenant_seed_bi AFTER INSERT ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION public.seed_tenant_mock_bi();

REVOKE EXECUTE ON FUNCTION public.seed_tenant_mock_bi() FROM anon, authenticated;
