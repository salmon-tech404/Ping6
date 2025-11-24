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

export default api;
