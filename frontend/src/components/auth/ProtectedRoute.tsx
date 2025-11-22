import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { accessToken, loading } = useAuthStore();

  // (2) Nếu không có accessToken → chặn và chuyển đến Signin
  if (!accessToken) {
    return <Navigate to='/signin' replace />;
  }

  // (3) Nếu có token → cho vào trang bên trong
  return <Outlet />;
};

export default ProtectedRoute;
