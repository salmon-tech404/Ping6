import api from "@/lib/axios"; //API cấu hình trong axios.ts
import axios from "axios";

// Gửi request http lên server
export const authService = {
  // tham số sẽ gửi lên BE
  signUp: async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      // gửi POST lên BE
      const res = await api.post(
        "/auth/signup",
        { username, password, email, firstName, lastName },
        { withCredentials: true }
      );
      // nếu thành công trả return
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log("Signup error response:", error.response?.data);
      } else {
        console.log("Unexpected error:", error);
      }
      throw error;
    }
  },
  signIn: async (username: string, password: string) => {
    try {
      const res = await api.post(
        "/auth/signin",
        { username, password },
        { withCredentials: true }
      );

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Login error:", error.response?.data);
      }
      throw error;
    }
  },
  signOut: async () => {
    return api.post("/auth/signout", {}, { withCredentials: true });
  },
  fetchMe: async () => {
    const res = await api.get("/users/me", { withCredentials: true });
    return res.data.user;
  },

  refresh: async () => {
    const res = await api.post("/auth/refresh", {}, { withCredentials: true });
    return res.data.accessToken;
  },
};
