import { ID } from "@/components/api/type";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface ArtisanData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePhoto: {
    url: string;
  };
}

export interface ArtisanDetails {
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
  data: ArtisanData;
  referer_bonus_paid: string;
  profilePhoto: {
    url: string;
  };
  user: string;
}

export const useArtisans = () => {
  const getAllArtisan = () =>
    useApiQuery<ArtisanDetails>(["all_artisans"], {
      url: `/artisan`,
      method: "GET",
    });

  return {
    getAllArtisan,
  };
};
