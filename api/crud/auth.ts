import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface CurrentUserData {
  email: string;
  name: string;
  password: string;
}

export interface CurrentUser {
  access_token?: any;
  name: string;
  profile: string;
  new: string;
  confirmPassword: string;
  password: string;
  confirm_pass: string;
  createdAt: string;
  id: ID;
  isActive: boolean;
  data: CurrentUserData;
  referer_bonus_paid: string;
}

export interface Wallet {
  data: any;
  bonus: any;
}

export const useAuth = () => {
  const registerUser = useApiMutation<AuthResponse, FormData>({
    url: "/registering ",
    method: "POST",
  });

  const loginUser = useApiMutation<AuthResponse, FormData>({
    url: "/user/login ",
    method: "POST",
  });

  const forgotPassword = useApiMutation<AuthResponse, FormData>({
    url: "/forgetpas",
    method: "POST",
  });

  const resetPassword = useApiMutation<AuthResponse, FormData>({
    url: "/reset-password",
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

  const getCurrentUser = () =>
    useApiQuery<CurrentUser>(["currentUser"], {
      url: `/profile`,
      method: "GET",
    });

  return {
    loginUser,
    registerUser,
    forgotPassword,
    resetPassword,
    updatePassword,
    changePassword,
    getCurrentUser,
    updateProfile,
  };
};
