import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface Testimonial {
  customerName: string;
  testimonial: string;
  rating: number;
  date: string;
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

export interface ArtisanDetails {
  artisanId: string;
  _id: string;
  profilePhoto: Media;
  serviceCategory: string;
  specialization: string;
  skillDescription: string;
  portfolio: {
    description: string;
    media: Media;
  }[];
  servicePricing: number;
  yearsOfExperience: number;
  governmentIssuedID: Media;
  proofOfAddress: Media;
  professionalCertification: Media;
  testimonials: Testimonial[];
  workAvailability: WorkAvailability;
  serviceArea: ServiceArea;
  languagesSpoken: string[];
  termsAccepted: boolean;
  isProfileComplete: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  user: UserInfo;
  professionalCertifications: any[];
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
    completed:number
  };
}

export const useArtisans = () => {
  const getAllArtisan = () =>
    useApiQuery<ArtisanDetails[]>(["all_artisans"], {
      url: `/artisan`,
      method: "GET",
    });

  const getBookingCount = () =>
    useApiQuery<Appointemnts>(["total_appointments"], {
      url: `/booking/counts`,
      method: "GET",
    });

  const bookAppointment = (id: string) =>
    useApiMutation<AuthResponse, FormData>({
      url: `/booking/artisan/${id}`,
      method: "POST",
    });

  const leaveReview = (id: string) =>
    useApiMutation<AuthResponse, FormData>({
      url: `/rating/artisans/${id}/testimonials`,
      method: "POST",
    });

  return {
    getAllArtisan,
    bookAppointment,
    leaveReview,
    getBookingCount,
  };
};
