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

export interface SubCategory {
  data: Category[];
}

export const useCategories = () => {
  const getAllCategories = () =>
    useApiQuery<Category[]>(["categories"], {
      url: `/categories`,
      method: "GET",
    });

  const getCategoryById = (id: string, options?: object) =>
    useApiQuery<Category>(["categories", id], {
      url: `/categories/${id}`,
      method: "GET",
      ...options,
    });

  const getSubCategoryByCategoryId = (id: string, options?: object) =>
    useApiQuery<SubCategory>(["sub-categories", id], {
      url: `/sub-categories/by-category?categoryId=${id}`,
      method: "GET",
      ...options,
    });

  const getAllSubCategories = () =>
    useApiQuery<SubCategory>(["sub-categories"], {
      url: `/sub-categories`,
      method: "GET",
    });

  const createCategory = useApiMutation<AuthResponse, FormData>({
    url: "/categories",
    method: "POST",
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // },
  });

  const updateCategory = (id: string) => {
    useApiMutation<AuthResponse, FormData>({
      url: `/categories/${id}`,
      method: "PUT",
    });
  };

  const deleteCategory = (id: string) =>
    useApiMutation({
      url: `/categories/${id}`,
      method: "DELETE",
    });

  return {
    getAllCategories,
    getAllSubCategories,
    getSubCategoryByCategoryId,
    updateCategory,
    createCategory,
    getCategoryById,
    deleteCategory,
  };
};
