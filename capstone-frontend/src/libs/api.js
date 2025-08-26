import axios from "axios";
import { useAuthStore } from "../store/AuthStore";

const baseUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // send cookies
});

// Add request interceptor to attach accessToken
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await useAuthStore.getState().refresh();
      if (newToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);
