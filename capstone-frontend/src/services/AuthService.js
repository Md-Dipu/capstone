import { api } from "../libs/api";

export const signup = (data) => api.post("/auth/signup", data);
export const signin = (data) => api.post("/auth/signin", data);
export const refresh = () => api.post("/auth/refresh");
export const logout = () => api.post("/auth/logout");
