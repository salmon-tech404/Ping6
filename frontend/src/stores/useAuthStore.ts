// Stores sẽ đảm nhiệm quản lý state cho ứng dụng

import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/type/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  // clear state
  clearState: () => {
    set({ accessToken: null, user: null, loading: false });
  },
  // Signup
  signUp: async (username, password, email, firstname, lastname) => {
    try {
      set({ loading: true });
      //   gọi api
      const res = await authService.signUp(
        username,
        password,
        email,
        firstname,
        lastname
      );

      toast.success("Đăng ký thành công! Chuyển qua trang đăng nhập.");
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký không thành công!");
    } finally {
      set({ loading: false });
    }
  },

  // Signin
  signIn: async (username, password) => {
    try {
      set({ loading: true });
      // gọi api
      const { accessToken } = await authService.signIn(username, password);
      set({ accessToken });

      toast.success("Chào mừng bạn quay lại với Ping6!");
    } catch (error) {
      console.log(error);
      toast.error("Đăng nhập không thành công!");
    } finally {
      set({ loading: false });
    }
  },

  // Signout
  signOut: async () => {
    try {
      get().clearState();
      await authService.signOut();
      toast.success("Logout thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi, xin hãy thử lại!");
    }
  },
}));
