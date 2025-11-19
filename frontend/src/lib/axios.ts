// Axios là công cụ giúp gọi API một cách dễ, sạch, và mạnh hơn so với fetch.
import axios from "axios";

const api = axios.create({
  //Tất cả những request sẽ tự động thêm vào URL này.
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5050/api/"
      : "/api",
});

export default api;
