// Stores sẽ đảm nhiệm quản lý state cho ứng dụng

import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/type/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

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

      toast.success(
        "Đăng ký thành công! Bạn sẽ được chuyển qua trang đăng nhập."
      );
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký thành công!");
    } finally {
      set({ loading: false });
    }
  },
}));
