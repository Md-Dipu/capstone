import { apiClient } from "../helper/axios";

export const signup = (data) => apiClient.post("/auth/signup", data);
export const signin = (data) => apiClient.post("/auth/signin", data);
export const refresh = () => apiClient.post("/auth/refresh");
export const logout = () => apiClient.post("/auth/logout");
