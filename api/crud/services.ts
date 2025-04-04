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

export const useServices = () => {
  const getTopRatedService = () =>
    useApiQuery<Services>(["services"], {
      url: `/top-rated-artisan-services`,
      method: "GET",
    });

  const getAllServices = () =>
    useApiQuery<Services>(["services"], {
      url: `/artisan-services`,
      method: "GET",
    });

  const getServicesById = (id: string) =>
    useApiQuery<Services>(["services"], {
      url: `/category/get-category/${id}`,
      method: "GET",
    });

  const createServices = useApiMutation<AuthResponse, FormData>({
    url: "/category/create-category",
    method: "POST",
  });

  const updateServices = (id: string) => {
    useApiMutation<AuthResponse, FormData>({
      url: `/category/update-category/${id}`,
      method: "PUT",
    });
  };

  const deleteCategory = (id: string) => {
    useApiMutation<AuthResponse, FormData>({
      url: `/category/delete-category/${id}`,
      method: "DELETE",
    });
  };

  return {
    getTopRatedService,
    updateServices,
    createServices,
    getServicesById,
    deleteCategory,
    getAllServices,
  };
};
