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
  client: string;
  clientEmail: string;
  clientName: string;
  clientPhoneNumber: string;
  date: any;
  description: string;
  price: number;
  _id: string;
}

export interface AllBookings {
  bookings: AppointmentsInfo[];
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

  const bookAppointment = () =>
    useApiMutation<AuthResponse, FormData>({
      url: `/appointments`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  const leaveReview = (id: string) =>
    useApiMutation<AuthResponse, FormData>({
      url: `/rating/artisans/${id}/testimonials`,
      method: "POST",
    });

  const bookingResponse = (id: string) =>
    useApiMutation<AuthResponse, FormData>({
      url: `/booking/response/${id}`,
      method: "POST",
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
    getAllBookings,
    bookingResponse,
    getAllArtisanCount,
    approveAndDisapproveDocuments,
  };
};
