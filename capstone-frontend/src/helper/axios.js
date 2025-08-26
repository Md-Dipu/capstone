import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: baseUrl,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});
