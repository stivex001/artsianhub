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
  user: string;
}

export interface Wallet {
  data: any;
  bonus: any;
}

export const useContactUs = () => {
  const getAllContact = () =>
    useApiQuery<CurrentUser>(["contact"], {
      url: `/contact-us`,
      method: "GET",
    });

  const createContactUs = useApiMutation<AuthResponse, FormData>({
    url: "/contact-us",
    method: "POST",
  });

  const getContactById = (id: string) => {
    useApiMutation<AuthResponse, FormData>({
      url: `/contact-us/${id}`,
      method: "GET",
    });
  };

  const deleteContact = (id: string) => {
    useApiMutation<AuthResponse, FormData>({
      url: `/contact-us/${id}`,
      method: "DELETE",
    });
  };

  return {
    getAllContact,
    deleteContact,
    createContactUs,
    getContactById,
  };
};
