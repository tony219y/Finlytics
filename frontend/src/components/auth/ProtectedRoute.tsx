import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

export default function ProtectedRoute() {
  const token = useAuthStore((state) => state.token);
  console.log("ProtectedRoute:: ", token)
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}
