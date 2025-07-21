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

export interface PortfolioData {
  _id: string;
  artisanId: string;
  title: string;
  location: string;
  serviceType: string[];
  description: string;
  date: string;
  photos: {
    url: string;
    _id: string;
  }[];
}

export interface GetServicesData {
  data: PortfolioData[];
}

export interface GetSingleServicesData {
  data: PortfolioData;
}

export interface GetArtianServices {
  artisanId: {
    _id: string;
    firstName: string;
    lastName: string;
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
      url: `/top-rated-portfolios`,
      method: "GET",
    });

  const getAllServices = () =>
    useApiQuery<GetArtianServices[]>(["artisan_services"], {
      url: `/portfolios`,
      method: "GET",
    });

  const getArtisanServices = (id: string) =>
    useApiQuery<GetServicesData>(["artisan_services"], {
      url: `/portfolios/artisan/${id}`,
      method: "GET",
    });

  const getServicesById = (id: string) =>
    useApiQuery<GetSingleServicesData>(["single-service"], {
      url: `/portfolios/${id}`,
      method: "GET",
    });

  const createServices = useApiMutation<AuthResponse, FormData>({
    url: "/portfolios",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const updateServices = (id: string) => {
    useApiMutation<AuthResponse, FormData>({
      url: `/portfolios/${id}`,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  const deleteService = (id: string) =>
    useApiMutation({
      url: `/portfolios/${id}`,
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
