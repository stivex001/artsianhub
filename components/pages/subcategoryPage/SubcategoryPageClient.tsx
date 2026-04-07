"use client";

import { useArtisansNearMe } from "@/hooks/useArtisansNearMe";
import { useCategories } from "@/api/crud/categories";
import { getSubCategoryMeta } from "./subcategoryMeta";
import { SubcategoryHero } from "./SubcategoryHero";
import { FeaturedArtisansGrid } from "./FeaturedArtisansGrid";
import { ExploreOtherSubcategories } from "./ExploreOtherSubcategories";
import { LocationBanner } from "@/components/shared/LocationBanner";
import type { SubcategoryPageClientProps } from "./types";

export const SubcategoryPageClient = ({
  subCategoryId,
  categoryId = "",
  subCategoryName = "Artisan Services",
  categoryName = "Artisans",
  categorySlug = "/",
}: SubcategoryPageClientProps) => {
  const { getSubCategoryByCategoryId } = useCategories();

  // Fetch artisans filtered by location + subcategory name search
  const { artisans, isPending: artisanLoading } = useArtisansNearMe({ q: subCategoryName });

  // Fetch siblings (all subcategories in parent category)
  const { data: siblingsData, isPending: siblingsLoading } =
    getSubCategoryByCategoryId(categoryId);

  // Normalise sibling data — API returns { data: [...] } or an array directly
  const siblingRaw = Array.isArray(siblingsData)
    ? siblingsData
    : (siblingsData as any)?.data ?? [];

  const siblings = siblingRaw.map((s: any) => ({ id: s._id, name: s.name }));

  const meta = getSubCategoryMeta(subCategoryName);

  return (
    <main className="min-h-screen bg-white">
      <LocationBanner />
      <SubcategoryHero
        subCategoryName={subCategoryName}
        description={meta.description}
        emoji={meta.emoji}
        accent={meta.accent}
        categoryName={categoryName}
        categorySlug={categorySlug}
        artisanCount={artisans.length}
      />

      <FeaturedArtisansGrid
        artisans={artisans}
        isLoading={artisanLoading}
        subCategoryName={subCategoryName}
      />

      <ExploreOtherSubcategories
        siblings={siblings}
        currentSubCategoryId={subCategoryId}
        categoryId={categoryId}
        categoryName={categoryName}
        categorySlug={categorySlug}
        isLoading={siblingsLoading}
      />
    </main>
  );
};
