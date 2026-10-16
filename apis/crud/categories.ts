import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface Category {
  _id: string;
  name: string;
  images: { url: string; filename: string }[];
}

export interface SubCategoryItem {
  _id: string;
  name: string;
  categoryId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SubCategoriesResponse {
  data: SubCategoryItem[];
}

export const useCategories = () => {
  const getAllCategories = () =>
    useApiQuery<Category[]>(["categories"], { url: `/categories`, method: "GET" });

  const getCategoryById = (id: string, options?: { enabled?: boolean }) =>
    useApiQuery<Category>(
      ["categories", id],
      { url: `/categories/${id}`, method: "GET" },
      { enabled: options?.enabled ?? !!id }
    );

  const getSubCategoryByCategoryId = (id: string) =>
    useApiQuery<SubCategoriesResponse>(
      ["sub-categories", id],
      { url: `/sub-categories/by-category?categoryId=${id}`, method: "GET" },
      { enabled: !!id }
    );

  const getAllSubCategories = () =>
    useApiQuery<SubCategoriesResponse>(["sub-categories"], {
      url: `/sub-categories`,
      method: "GET",
    });

  const createCategory = useApiMutation<{ success: boolean; data: Category }, FormData>({
    url: "/categories",
    method: "POST",
  });

  const updateCategory = (id: string) =>
    useApiMutation<{ success: boolean; data: Category }, FormData>({
      url: `/categories/${id}`,
      method: "PUT",
    });

  const createSubCategory = () =>
    useApiMutation<{ success: boolean; data: SubCategoryItem }, { name: string; categoryId: string }>({
      url: "/sub-categories",
      method: "POST",
    });

  const deleteCategory = (id: string) =>
    useApiMutation({ url: `/categories/${id}`, method: "DELETE" });

  return {
    getAllCategories,
    getAllSubCategories,
    getSubCategoryByCategoryId,
    getCategoryById,
    updateCategory,
    createCategory,
    createSubCategory,
    deleteCategory,
  };
};
