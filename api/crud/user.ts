import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface CurrentUserData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePhoto: {
    url: string;
  };
}

export interface CurrentUser {
  access_token?: any;
  firstName: string;
  lastName: string;
  profile: string;
  new: string;
  confirmPassword: string;
  password: string;
  confirm_pass: string;
  createdAt: string;
  id: ID;
  artisanId: ID;
  isActive: boolean;
  data: CurrentUserData;
  referer_bonus_paid: string;
  profilePhoto: {
    url: string;
  };
  user: {
    isAdmin:boolean
    isArtisan:boolean
    isClient:boolean
  };
}

export interface Wallet {
  data: any;
  bonus: any;
}

export const useUser = () => {
  const getCurrentArtisanUser = () =>
    useApiQuery<CurrentUser>(["currentUser"], {
      url: `/artisan/profile`,
      method: "GET",
    });

  const createArtisanProfile = useApiMutation<AuthResponse, FormData>({
    url: "/artisan/profile",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const updateArtisanProfile = useApiMutation<AuthResponse, FormData>({
    url: "/artisan/profile",
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return {
    getCurrentArtisanUser,
    updateArtisanProfile,
    createArtisanProfile,
  };
};
