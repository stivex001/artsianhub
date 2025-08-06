import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";

export const useAuth = () => {
  const registerUser = useApiMutation<AuthResponse, FormData>({
    url: "/api/auth/register ",
    method: "POST",
  });

  const loginUser = useApiMutation<AuthResponse, FormData>({
    url: "/api/auth/login ",
    method: "POST",
  });

  const verifyOTP = useApiMutation<AuthResponse, FormData>({
    url: "/api/auth/verify-otp",
    method: "POST",
  });

  const resendOTP = useApiMutation<AuthResponse, FormData>({
    url: "/api/auth/resend-otp",
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
