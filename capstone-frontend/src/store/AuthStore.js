import { create } from "zustand";
import { signup, signin, logout } from "../services/AuthService";

export const useAuthStore = create((set) => ({
  user: null,
  accessToken: null,

  signup: async (data) => {
    await signup(data);
    return "Signup success, please signin.";
  },

  signin: async (data) => {
    const res = await signin(data);
    set({
      user: res.data.user,
      accessToken: res.data.accessToken,
    });
  },

  logout: async () => {
    await logout();
    set({ user: null, accessToken: null });
  },
}));
