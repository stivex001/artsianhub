import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface ServicesData {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  media: {
    url: string;
  }[];
}

export interface Services {
  topServices: ServicesData[];
}

export interface GetServicesData {}

export interface GetArtianServices {
  artisanId: {
    _id: string;
  };
  categoryId: {
    _id: string;
    name: string;
    images: {
      url: string;
      filename: string;
    }[];
  };
  media: {
    url: string;
    filename: string;
  }[];
  name: string;
  ratings: number[];
  description: string;
  _id: string;
}

export const useServices = () => {
  const getTopRatedService = () =>
    useApiQuery<Services>(["services"], {
      url: `/top-rated-artisan-services`,
      method: "GET",
    });

  const getAllServices = () =>
    useApiQuery<GetArtianServices[]>(["artisan_services"], {
      url: `/artisan-services`,
      method: "GET",
    });

  const getArtisanServices = (id: string) =>
    useApiQuery<GetArtianServices[]>(["artisan_services"], {
      url: `/artisan-services/artisan-get-services/${id}`,
      method: "GET",
    });

  const getServicesById = (id: string) =>
    useApiQuery<Services>(["services"], {
      url: `/artisan-services/${id}`,
      method: "GET",
    });

  const createServices = useApiMutation<AuthResponse, FormData>({
    url: "/artisan-services",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const updateServices = (id: string) => {
    useApiMutation<AuthResponse, FormData>({
      url: `/artisan-services/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const deleteService = (id: string) =>
    useApiMutation({
      url: `/artisan-services/${id}`,
      method: "DELETE",
    });

  return {
    getTopRatedService,
    updateServices,
    createServices,
    getServicesById,
    deleteService,
    getAllServices,
    getArtisanServices,
  };
};
