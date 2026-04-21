import { BASE_URL } from "@/constants";
import { useAuthStore } from "@/store/authStore";
import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Channel": 1,
  },
});

// ── Token refresh state ───────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token!)));
  failedQueue = [];
}

// ── Request interceptor ───────────────────────────────────────────────────────
axiosInstance.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});

// Endpoints that are public — a 401 should never trigger a redirect to login
const PUBLIC_ENDPOINTS = ["/searches/recent"];

// Admin auth endpoints — 401 here is wrong credentials, not session expiry
const ADMIN_AUTH_ENDPOINTS = [
  "/admin/auth/login",
  "/admin/auth/forgot-password",
  "/admin/auth/reset-password",
  "/admin/auth/refresh",
];

// ── Response interceptor with token refresh ───────────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const url = error.config?.url ?? "";
    const isPublic = PUBLIC_ENDPOINTS.some((ep) => url.includes(ep));
    const isAdminAuthEndpoint = ADMIN_AUTH_ENDPOINTS.some((ep) => url.includes(ep));

    if (error.response?.status === 401 && !isPublic && !isAdminAuthEndpoint) {
      const { refreshToken, setAccessToken, logout } = useAuthStore.getState();
      const isAdminRoute = window.location.pathname.startsWith("/admin");

      const doLogout = () => {
        logout();
        window.location.href = isAdminRoute ? "/admin/auth/login" : "/auth/login";
      };

      // Token refresh only applies to admin sessions — artisan/client flows
      // do not use refresh tokens and redirect straight to their login page.
      if (!isAdminRoute || !refreshToken) {
        doLogout();
        return Promise.reject(error);
      }

      // Queue concurrent 401s while refresh is in progress
      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          const config = error.config!;
          config.headers["Authorization"] = `Bearer ${token}`;
          return axiosInstance(config);
        });
      }

      isRefreshing = true;

      try {
        const { data } = await axios.post<{ success: boolean; token: string }>(
          `${BASE_URL}/admin/auth/refresh`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const newToken = data.token;
        setAccessToken(newToken);
        processQueue(null, newToken);

        const config = error.config!;
        config.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(config);
      } catch (refreshError) {
        processQueue(refreshError, null);
        doLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
