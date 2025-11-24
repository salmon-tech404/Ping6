import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);

  const init = async () => {
    if (!accessToken) {
      await refresh();
    }

    if (accessToken && !user) {
      await fetchMe();
    }

    setStarting(false);
  };

  useEffect(() => {
    init();
  }, []);

  if (starting || loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        Đang tải trang...
      </div>
    );
  }

  // (2) Nếu không có accessToken → chặn và chuyển đến Signin
  if (!accessToken) {
    return <Navigate to='/signin' replace />;
  }

  // (3) Nếu có token → cho vào trang bên trong
  return <Outlet></Outlet>;
};

export default ProtectedRoute;
