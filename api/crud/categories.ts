import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface CategoryData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  profilePhoto: {
    url: string;
  };
}

export interface Category {
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
  data: CategoryData;
  referer_bonus_paid: string;
  profilePhoto: {
    url: string;
  };
  user: string;
}

export const useCategories = () => {
  const getAllCategories = () =>
    useApiQuery<Category>(["categories"], {
      url: `/category/get-all-categories`,
      method: "GET",
    });

  const getCategoryById = (id: string) =>
    useApiQuery<Category>(["categories"], {
      url: `/category/get-category/${id}`,
      method: "GET",
    });

  const createCategory = useApiMutation<AuthResponse, FormData>({
    url: "/category/create-category",
    method: "POST",
  });

  const updateCategory = (id: string) => {
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
    getAllCategories,
    updateCategory,
    createCategory,
    getCategoryById,
    deleteCategory,
  };
};
