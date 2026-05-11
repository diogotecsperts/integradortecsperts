import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import * as React from "react";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/_authenticated/_admin")({
  component: AdminGuard,
});

function AdminGuard() {
  const { role, loading } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (!loading && role !== "superadmin") navigate({ to: "/dashboard" });
  }, [role, loading, navigate]);
  if (loading || role !== "superadmin") return null;
  return <Outlet />;
}
