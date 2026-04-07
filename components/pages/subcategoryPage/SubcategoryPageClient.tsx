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

  // Fetch all artisans for the user's country, then filter client-side by subCategoryId.
  // This correctly handles artisans belonging to multiple subcategories — they appear
  // in every subcategory listed in their subCategories array, not just text-search matches.
  const { artisans: allArtisans, isPending: artisanLoading } = useArtisansNearMe();

  const artisans = subCategoryId
    ? allArtisans.filter((a: any) =>
        a.subCategories?.some((sc: any) => sc._id === subCategoryId)
      )
    : allArtisans;

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
