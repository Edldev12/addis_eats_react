import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "./useAdminAuth";

function ProtectedAdminRoute() {
  const { isAdmin } = useAdminAuth();

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedAdminRoute;