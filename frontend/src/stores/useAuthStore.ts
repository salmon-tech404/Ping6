// Stores sẽ đảm nhiệm quản lý state cho ứng dụng
import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { AuthState } from "@/type/store";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  // set accessToken
  setAccessToken: (accessToken) => {
    set({ accessToken });
  },

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
      console.log(res);
      toast.success("Đăng ký thành công! Chuyển qua trang đăng nhập.");
      return res;
    } catch (error) {
      console.log(error);
      toast.error("Đăng ký không thành công!");
      throw error;
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
      get().setAccessToken(accessToken);
      await get().fetchMe();

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

  // fetchMe
  fetchMe: async () => {
    try {
      set({ loading: true });
      const user = await authService.fetchMe();
      set({ user });
    } catch (error) {
      console.log(error);
      set({ user: null, accessToken: null });
      toast.error("Lỗi xảy ra khi lấy dữ liệu người dùng. Hãy thử lại!");
    } finally {
      set({ loading: false });
    }
  },

  // refresh
  refresh: async () => {
    try {
      set({ loading: true });
      const { user, fetchMe, setAccessToken } = get();
      const accessToken = await authService.refresh();

      setAccessToken(accessToken);

      if (!user) {
        await fetchMe();
      }
    } catch (error) {
      console.error(error);
      toast.error("Phiên đăng nhập hết hạn!");
      get().clearState();
    } finally {
      set({ loading: false });
    }
  },
}));
