import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";

export interface CurrentUserData {
  email: string;
  name: string;
  password: string;
  artisanId: string;
}

export interface CurrentUser {
  access_token?: any;
  name: string;
  profile: string;
  isArtisan: boolean;
  isAdmin: boolean;
  confirmPassword: string;
  password: string;
  confirm_pass: string;
  createdAt: string;
  id: ID;
  isActive: boolean;
  data: CurrentUserData;
  artisanId: ID;

}

export interface Wallet {
  data: any;
  bonus: any;
}

export const useAuth = () => {
  const registerUser = useApiMutation<AuthResponse, FormData>({
    url: "/auth/register ",
    method: "POST",
  });

  const loginUser = useApiMutation<AuthResponse, FormData>({
    url: "/auth/login ",
    method: "POST",
  });

  const verifyOTP = useApiMutation<AuthResponse, FormData>({
    url: "/auth/verify-otp",
    method: "POST",
  });

  const resendOTP = useApiMutation<AuthResponse, FormData>({
    url: "/auth/resend-otp",
    method: "POST",
  });

  const changePassword = useApiMutation<AuthResponse, FormData>({
    url: "/changepassword",
    method: "POST",
  });

  const updatePassword = useApiMutation<AuthResponse, FormData>({
    url: "/updatepassword",
    method: "POST",
  });

  const updateProfile = useApiMutation<AuthResponse, FormData>({
    url: "/profile-update",
    method: "POST",
  });

  return {
    loginUser,
    registerUser,
    verifyOTP,
    resendOTP,
    updatePassword,
    changePassword,
    updateProfile,
  };
};
