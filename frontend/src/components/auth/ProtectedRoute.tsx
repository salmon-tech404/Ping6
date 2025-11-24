import { useAuthStore } from "@/stores/useAuthStore";
import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { accessToken, user, loading, refresh, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      if (!accessToken) {
        await refresh();
      }

      if (accessToken && !user) {
        await fetchMe();
      }

      setStarting(false);
    };

    initialize();
  }, [accessToken, user, refresh, fetchMe]);

  if (starting || loading) {
    return (
      <div className='flex h-screen items-center justify-center'>
        Đang tải trang...
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to='/signin' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
