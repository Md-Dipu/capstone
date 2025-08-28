import { create } from "zustand";
import { persist } from "zustand/middleware";
import { signup, signin, logout, refresh } from "../services/AuthService";

export const useAuthStore = create(
  persist(
    (set, get) => ({
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

      refresh: async () => {
        try {
          const res = await refresh(); // backend sends new access token
          set({ accessToken: res.data.accessToken });
          return res.data.accessToken;
        } catch {
          set({ user: null, accessToken: null });
          return null;
        }
      },

      logout: async () => {
        await logout();
        set({ user: null, accessToken: null });
      },
    }),
    { name: "auth-storage" }
  )
);
