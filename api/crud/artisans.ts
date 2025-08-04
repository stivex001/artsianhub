import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface Testimonial {
  customerName: string;
  testimonial: string;
  profilePhoto: string;
  rating: number;
  date: string;
}

export interface Rating {
  totalRating: number;
  count: number;
  averageRating: number;
}

export interface Media {
  url: string;
  public_id: string;
  filename: string;
}

export interface WorkAvailability {
  days: string[];
  availableHours: string;
}

export interface ServiceArea {
  type: string;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface UserInfo {
  googleId: string | null;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  specialization: string;
  residentialAddress: string;
  gender: string;
  isArtisan: boolean;
  isVerifiedArtisan: boolean;
  isAdmin: boolean;
  isVerified: boolean;
  isClient: boolean;
  isProfileComplete: boolean;
  createdAt: string;
  updatedAt: string;
  oneSignalPlayerId: string;
  isApproved: boolean;
  _id: string;
}

export interface ArtisanData {
  _id: string;
  artisanId: string;
  firstName: string;
  lastName: string;
  professionalTitle: string;
  primaryLocation: string;
  serviceType: string[];
  description: string;
  pricePerHour: number;
  date: string;
  photos: {
    url: string;
    _id: string;
  }[];
}

export interface GetSingleArtisan {
  data: {
    _id: string;
    artisanId: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    location: string;
    phoneNumber: string;
    professionalTitle: string;
    primaryLocation: string;
    serviceType: string[];
    description: string;
    pricePerHour: number;
    date: string;
    profilePicture: string;
    totalReviews: string;
    averageRating: number;
    userId: {
      _id: string;
      role: string;
      email: string;
    };
    ratingBreakdown: any;
  };
}

export interface ArtisanDetails {
  data: ArtisanData[];
}

export interface ArtisanByCategory {
  artisanId: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    _id: string;
  };
  profilePhoto: Media;
  ratings: number[];
}

export interface AllBookingsCounts {
  appointments: {
    acceptedAppointments: number;
    completedAppointments: number;
    declinedAppointments: number;
    totalAppointments: number;
  };
  users: {
    activeArtisans: number;
    deactivatedArtisans: number;
    inactiveArtisans: number;
    totalArtisans: number;
  };
}

export const useArtisans = () => {
  const getAllArtisan = () =>
    useApiQuery<ArtisanDetails>(["all_artisans"], {
      url: `/artisans`,
      method: "GET",
    });

  const getMyProfile = () =>
    useApiQuery<GetSingleArtisan>(["my-profile"], {
      url: `/artisans/me`,
      method: "GET",
    });

  const getArtisanById = (id: string) =>
    useApiQuery<GetSingleArtisan>(["single-artisan", id], {
      url: `/artisans/${id}`,
      method: "GET",
    });

  const getFilteredByArtisan = (params?: Record<string, any>) =>
    useApiQuery<ArtisanDetails[]>(["all_filtered_artisans", params], {
      url: `/admin/admin-filter-artisans`,
      method: "GET",
      params,
    });

  const getSearchByArtisan = (params?: Record<string, any>) =>
    useApiQuery<ArtisanDetails[]>(["all_filtered_artisans", params], {
      url: `/admin/admin-search-artisans`,
      method: "GET",
      params,
    });

  const getArtisanByCatgeory = (params?: Record<string, any>) => {
    const enabled = Boolean(params?.categoryId);
    return useApiQuery<ArtisanByCategory[]>(
      ["all_filtered_artisans", params],
      {
        url: `/artisan-services/filter-artisan-service-by-category`,
        method: "GET",
        params,
      },
      {
        enabled,
      }
    );
  };

  const getArtisanRating = (id: string) =>
    useApiQuery<Rating>(["artisan_rating"], {
      url: `/artisan-rating/${id}/ratings`,
      method: "GET",
    });

  const getAllArtisanCount = () =>
    useApiQuery<AllBookingsCounts>(["all_artisan_count"], {
      url: `/admin/view-artisans-services-counts`,
      method: "GET",
    });

  const updateArtisanProfile = <T = any>(id: string) =>
    useApiMutation<AuthResponse, T>({
      url: `/artisans/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  const updateArtisanKyc =  
    useApiMutation<AuthResponse, FormData>({
      url: `/artisans/kyc`,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  return {
    getAllArtisan,
    getArtisanById,
    getFilteredByArtisan,
    getSearchByArtisan,
    getArtisanRating,
    getAllArtisanCount,
    getArtisanByCatgeory,
    updateArtisanProfile,
    getMyProfile,
    updateArtisanKyc
  };
};
