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
    email: string;
    gender: string;
    dateOfBirth: string;
    city: string;
    phoneNumber: string;
    professionalTitle: string;
    skillDescription: string;
    primaryLocation: string;
    serviceType: string[];
    serviceCategories: string[];
    workingDaysAndHours: [];
    description: string;
    pricePerHour: number;
    workDistanceKm: number;
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

export interface SearchData {
  _id: string;
  query: string;
}

export interface ArtisanDetails {
  data: ArtisanData[];
  total: number;
}

export interface SearchQueryDetails {
  data: SearchData[];
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

export interface ArtisanMetrics {
  accepted: number;
  completed: number;
  declined: number;
  total: number;
  revenue: number;
}

export interface ArtisanDashboard {
  data: {
    metrics: ArtisanMetrics;
    checkList: {
      addedPayment: boolean;
      addedPortfolio: boolean;
      setWorkingDays: boolean;
      verifyIdentity: boolean;
    };
    recentAppointments: [];
  };
}

export const useArtisans = () => {
  const getAllArtisan = (options?: { enabled?: boolean }) =>
    useApiQuery<ArtisanDetails>(
      ["all_artisans"],
      {
        url: `/artisans`,
        method: "GET",
      },
      {
        enabled: options?.enabled ?? true,
      }
    );

  const getArtisanDashboard = () =>
    useApiQuery<ArtisanDashboard>(["all_artisans_counts"], {
      url: `/artisans/dashboard`,
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

  const getRecentSearchArtisan = (params?: Record<string, any>) =>
    useApiQuery<SearchQueryDetails>(["all_recent_artisans", params], {
      url: `/searches/recent`,
      method: "GET",
      params,
    });

  const getArtisanAroundMe = (
    params?: {
      q?: string;
      city?: string;
      country?: string;
      page?: number;
      limit?: number;
      sort?: string;
    },
    options?: { enabled?: boolean }
  ) => {

    return useApiQuery<ArtisanDetails>(
      ["filtered_artisans", params],
      {
        url: `/artisans/search`,
        method: "GET",
        params,
      },
      // {
      //   enabled: options?.enabled ?? false,
      // }
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

  const updateArtisanProfile = useApiMutation<AuthResponse, FormData>({
    url: `/artisans`,
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const updateArtisanKyc = useApiMutation<AuthResponse, FormData>({
    url: `/artisans/kyc`,
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return {
    getAllArtisan,
    getArtisanById,
    getFilteredByArtisan,
    getSearchByArtisan,
    getRecentSearchArtisan,
    getArtisanRating,
    getAllArtisanCount,
    getArtisanAroundMe,
    getArtisanDashboard,
    getMyProfile,
    updateArtisanProfile,
    updateArtisanKyc,
  };
};
