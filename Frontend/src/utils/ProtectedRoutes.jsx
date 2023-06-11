import { Navigate, Outlet } from "react-router-dom";
import { useGlobalState } from "../context/AuthContext";

const ProtectedRoutes = () => {
  const { isAuthenticated, user } = useGlobalState();

  if (!isAuthenticated) return <Navigate to="/" replace />

  return <Outlet />

}

export default ProtectedRoutes