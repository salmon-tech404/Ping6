// Axios là công cụ giúp gọi API một cách dễ, sạch, và mạnh hơn so với fetch.
import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";

const api = axios.create({
  //Tất cả những request sẽ tự động thêm vào URL này.
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5050/api/"
      : "/api",
  withCredentials: true,
});

// gắn access accessToken vào header
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Tự động gọi refresh api khi accessToken hết hạn
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // api cần check
    if (
      originalRequest.url.includes("/auth/signin") ||
      originalRequest.url.includes("/auth/signup") ||
      originalRequest.url.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }
    originalRequest._retry = originalRequest._retry || 0;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );
        const newAccessToken = res.data.accessToken;

        useAuthStore.getState().setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearState();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
export default api;
