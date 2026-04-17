import { useApiMutation } from "@/hooks/useApiMutation";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface AdminLoginBody {
  email: string;
  password: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  roleLabel?: string;
}

export interface AdminLoginResponse {
  success: boolean;
  token: string;
  refreshToken?: string;
  admin: AdminUser;
}

export interface AdminForgotPasswordBody {
  email: string;
}

export interface AdminResetPasswordBody {
  email: string;
  otp: string;
  newPassword: string;
}

export interface AdminChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export interface Admin2FASetupResponse {
  secret: string;
  qrCodeUrl: string; // data:image/png;base64 string
}

export interface AdminRefreshBody {
  refreshToken: string;
}

export interface AdminRefreshResponse {
  success: boolean;
  token: string;
}

export type AdminMessageResponse = {
  success: boolean;
  message: string;
};

// ── Hooks ─────────────────────────────────────────────────────────────────────
export const useAdminAuth = () => {
  const login = useApiMutation<AdminLoginResponse, AdminLoginBody>({
    url: "/admin/auth/login",
    method: "POST",
  });

  const forgotPassword = useApiMutation<AdminMessageResponse, AdminForgotPasswordBody>({
    url: "/admin/auth/forgot-password",
    method: "POST",
  });

  const resetPassword = useApiMutation<AdminMessageResponse, AdminResetPasswordBody>({
    url: "/admin/auth/reset-password",
    method: "POST",
  });

  const changePassword = useApiMutation<AdminMessageResponse, AdminChangePasswordBody>({
    url: "/admin/auth/change-password",
    method: "PATCH",
  });

  const logout = useApiMutation<AdminMessageResponse, undefined>({
    url: "/admin/auth/logout",
    method: "POST",
  });

  const setup2FA = useApiMutation<Admin2FASetupResponse, undefined>({
    url: "/admin/auth/2fa/setup",
    method: "POST",
  });

  const refreshAccessToken = useApiMutation<AdminRefreshResponse, AdminRefreshBody>({
    url: "/admin/auth/refresh",
    method: "POST",
  });

  return { login, forgotPassword, resetPassword, changePassword, logout, setup2FA, refreshAccessToken };
};
