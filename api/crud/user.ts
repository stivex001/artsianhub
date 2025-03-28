import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface CurrentUserData {
  email: string;
  name: string;
  password: string;
  profilePhoto: {
    url: string;
  };
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
  artisanId: ID;
  isActive: boolean;
  data: CurrentUserData;
  referer_bonus_paid: string;
  profilePhoto: {
    url: string;
  };
  user: string;
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

  return {
    getCurrentArtisanUser,
  };
};
