import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface AdminSubcategory {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  parentId?: string;
  categoryId?: string;
  image?: { url: string; filename: string };
  createdAt?: string;
  updatedAt?: string;
}

export interface AdminCategory {
  _id: string;
  name: string;
  description?: string;
  isActive: boolean;
  sortOrder?: number;
  image?: { url: string; filename: string };
  subCategories: AdminSubcategory[];
  createdAt?: string;
  updatedAt?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

export const useAdminCategories = () => {
  // ── Queries ────────────────────────────────────────────────────────────────
  const getAll = () =>
    useApiQuery<{ data: AdminCategory[] }>(["admin_categories"], {
      url: "/admin/categories",
      method: "GET",
    });

  // ── Category mutations ─────────────────────────────────────────────────────
  const createCategory = () =>
    useApiMutation<{ success: boolean; data: AdminCategory }, FormData>({
      url: "/admin/categories",
      method: "POST",
    });

  const updateCategory = (id: string) =>
    useApiMutation<{ success: boolean; data: AdminCategory }, FormData>({
      url: `/admin/categories/${id}`,
      method: "PATCH",
    });

  const deleteCategory = (id: string) =>
    useApiMutation<{ success: boolean }, void>({
      url: `/admin/categories/${id}`,
      method: "DELETE",
    });

  // ── Subcategory mutations ──────────────────────────────────────────────────
  const createSubcategory = (parentId: string) =>
    useApiMutation<{ success: boolean; data: AdminSubcategory }, FormData>({
      url: `/admin/categories/${parentId}/subcategories`,
      method: "POST",
    });

  const updateSubcategory = (id: string) =>
    useApiMutation<{ success: boolean; data: AdminSubcategory }, FormData>({
      url: `/admin/categories/subcategories/${id}`,
      method: "PATCH",
    });

  const deleteSubcategory = (id: string) =>
    useApiMutation<{ success: boolean }, void>({
      url: `/admin/categories/subcategories/${id}`,
      method: "DELETE",
    });

  return {
    getAll,
    createCategory,
    updateCategory,
    deleteCategory,
    createSubcategory,
    updateSubcategory,
    deleteSubcategory,
  };
};
