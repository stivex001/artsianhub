import { headers } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createServerQueryClient,
  detectLocationFromIp,
  prefetchArtisans,
  prefetchSubCategories,
} from "@/lib/serverPrefetch";
import { SubcategoryPageClient } from "@/components/pages/subcategoryPage/SubcategoryPageClient";
import { LocationInitializer } from "@/components/shared/LocationInitializer";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SubcategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const sp = await searchParams;
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const str = (v: string | string[] | undefined) =>
    Array.isArray(v) ? v[0] : v;

  const subCategoryName = str(sp.name);
  const categoryId = str(sp.categoryId);

  const queryClient = createServerQueryClient();
  const location = await detectLocationFromIp(ip);

  // Prefetch artisans (search by subcategory name) and sibling subcategories concurrently
  await Promise.all([
    location && subCategoryName
      ? prefetchArtisans(queryClient, location.country, subCategoryName)
      : Promise.resolve(),
    categoryId
      ? prefetchSubCategories(queryClient, categoryId)
      : Promise.resolve(),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationInitializer initialLocation={location} />
      <SubcategoryPageClient
        subCategoryId={id}
        categoryId={categoryId}
        subCategoryName={subCategoryName}
        categoryName={str(sp.categoryName)}
        categorySlug={str(sp.categorySlug)}
      />
    </HydrationBoundary>
  );
}
