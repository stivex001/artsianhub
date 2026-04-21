import { headers } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createServerQueryClient,
  detectLocationFromIp,
  prefetchCategoryPageData,
} from "@/lib/serverPrefetch";
import { SkilledArtisansClient } from "@/components/pages/artisanCategoryPage/SkilledArtisansClient";
import { LocationInitializer } from "@/components/shared/LocationInitializer";

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

export default async function SkilledArtisansPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const queryClient = createServerQueryClient();
  const location = await detectLocationFromIp(ip);

  await prefetchCategoryPageData(
    queryClient,
    "Pro Artisans",
    location,
    sp.categoryId
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationInitializer initialLocation={location} />
      <SkilledArtisansClient />
    </HydrationBoundary>
  );
}
