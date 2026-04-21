export interface SubCategoryItem {
  id: string;
  name: string;
  description: string;
  emoji: string;
  accent: string;
}

export interface SubcategoryPageClientProps {
  subCategoryId: string;
  categoryId?: string;
  subCategoryName?: string;
  categoryName?: string;
  categorySlug?: string;
}
