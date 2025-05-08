import { AuthResponse, ID } from "@/components/api/type";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface CategoryData {
  name: string;
  images: string[];
  _id: string;
}

export interface Category {
  name: string;
  images: {
    url: string;
    filename: string;
  }[];
  _id: string;
}

export const useCategories = () => {
  const getAllCategories = () =>
    useApiQuery<Category[]>(["categories"], {
      url: `/category/get-all-categories`,
      method: "GET",
    });

  const getCategoryById = (id: string, options?: object) =>
    useApiQuery<Category>(["category", id], {
      url: `/category/get-category/${id}`,
      method: "GET",
      ...options,
    });

  const createCategory = useApiMutation<AuthResponse, FormData>({
    url: "/category/create-category",
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const updateCategory = (id: string) => {
    useApiMutation<AuthResponse, FormData>({
      url: `/category/update-category/${id}`,
      method: "PUT",
    });
  };

  const deleteCategory = (id: string) =>
    useApiMutation({
      url: `/category/delete-category/${id}`,
      method: "DELETE",
    });

  return {
    getAllCategories,
    updateCategory,
    createCategory,
    getCategoryById,
    deleteCategory,
  };
};
