import { BASE_URL } from "@/constants";
import { useAuthStore } from "@/store/authStore";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Channel": 1,
  },
});

axiosInstance.interceptors.request.use((config) => {
  // Access the store state directly without hooks
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Endpoints that are public — a 401 should never trigger a redirect to login
const PUBLIC_ENDPOINTS = ["/searches/recent"];

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const url = error.config?.url ?? "";
    const isPublic = PUBLIC_ENDPOINTS.some((endpoint) => url.includes(endpoint));

    if (error.response?.status === 401 && !isPublic) {
      // Access the logout function directly from the store
      useAuthStore.getState().logout();
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
