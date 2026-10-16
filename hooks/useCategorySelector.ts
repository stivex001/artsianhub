import { useCategories } from "@/apis/crud/categories";

export const useCategorySelector = () => {
  const { getAllCategories, getAllSubCategories } = useCategories();

  const { data: category } = getAllCategories();
  const { data } = getAllSubCategories();
  const subCategory = data?.data;

  const categoryOptions = Array.isArray(category)
    ? category?.map((cat) => ({
        id: cat?._id,
        value: cat?._id,
        label: cat?.name,
      }))
    : [];

  const subCategoryOptions = Array.isArray(subCategory)
    ? subCategory?.map((cat) => ({
        id: cat?._id,
        value: cat?._id,
        label: cat?.name,
      }))
    : [];

  return { categoryOptions, subCategoryOptions };
};
