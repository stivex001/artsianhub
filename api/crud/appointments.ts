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

export interface ReviewData {
  customerName: string;
  rating: number;
  testimonial: string;
}

export interface Appointemnts {
  counts: {
    accepted: number;
    declined: number;
    pending: number;
    total: number;
    completed: number;
  };
}

export interface AppointmentsInfo {
  status: string;
  artisanId: string;
  location: string;
  email: string;
  clientId: string;
  clientPhoneNumber: string;
  preferredDate: any;
  preferredTime: any;
  description: string;
  price: number;
  _id: string;
  images: {
    url: string;
    _id: string;
  }[];
}

export interface ReviewInfo {
  status: string;
  artisanId: string;
  location: string;
  email: string;
  client: {
    profilePicture: string;
    firstName: string;
    lastName: string;
  };
  clientPhoneNumber: string;
  createdAt: any;
  preferredTime: any;
  comment: string;
  rating: number;
  _id: string;
  images: {
    url: string;
    _id: string;
  }[];
}

export interface SingleBooking {
  data: AppointmentsInfo;
  pagination: {
    totalPages: number;
    currentPage: number;
    totalCount: number;
  };
}

export interface AllBookings {
  data: AppointmentsInfo[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalCount: number;
  };
}

export interface AllReviews {
  data: {
    reviews: ReviewInfo[];
    totalReviews: number;
    ratings: any;
  };
  pagination: {
    totalPages: number;
    currentPage: number;
    totalCount: number;
  };
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

export const useAppointments = () => {
  const getBookingCount = () =>
    useApiQuery<Appointemnts>(["total_appointments"], {
      url: `/booking/counts`,
      method: "GET",
    });

  const getAllBookings = () =>
    useApiQuery<AllBookings>(["all_appointments"], {
      url: `/appointments`,
      method: "GET",
    });

  const getMyBookings = () =>
    useApiQuery<AllBookings>(["my_appointments"], {
      url: `/appointments/me`,
      method: "GET",
    });

  const getSingleBooking = (id: string) =>
    useApiQuery<SingleBooking>(["single_appointment", id], {
      url: `/appointments/${id}`,
      method: "GET",
    });

  const getArtisanRating = (id: string) =>
    useApiQuery<Rating>(["artisan_rating", id], {
      url: `/artisan-rating/${id}/ratings`,
      method: "GET",
    });

  const getArtisanReview = (id: string) =>
    useApiQuery<AllReviews>(["artisan_review", id], {
      url: `/reviews/artisan/${id}`,
      method: "GET",
    });

  const getAllArtisanCount = () =>
    useApiQuery<AllBookingsCounts>(["all_artisan_count"], {
      url: `/admin/view-artisans-services-counts`,
      method: "GET",
    });

  const bookAppointment = () =>
    useApiMutation<AuthResponse, FormData>({
      url: `/appointments`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  const leaveReview = useApiMutation<AuthResponse, FormData>({
    url: `/reviews`,
    method: "POST",
  });

  const updateBookingResponse = <T = any>(id: string) =>
    useApiMutation<AuthResponse, T>({
      url: `/appointments/${id}`,
      method: "PUT",
    });

  const approveAndDisapproveDocuments = (id: string) =>
    useApiMutation<AuthResponse, FormData>({
      url: `/admin/artisan-profile/${id}/credential-status`,
      method: "PATCH",
    });

  return {
    getArtisanRating,
    bookAppointment,
    leaveReview,
    getBookingCount,
    getArtisanReview,
    getAllBookings,
    getMyBookings,
    getSingleBooking,
    updateBookingResponse,
    getAllArtisanCount,
    approveAndDisapproveDocuments,
  };
};
