import { headers } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createServerQueryClient,
  detectLocationFromIp,
  prefetchCategoryPageData,
} from "@/lib/serverPrefetch";
import { DigitalArtisansClient } from "@/components/pages/artisanCategoryPage/DigitalArtisansClient";
import { LocationInitializer } from "@/components/shared/LocationInitializer";

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

export default async function DigitalArtisansPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const queryClient = createServerQueryClient();
  const location = await detectLocationFromIp(ip);

  await prefetchCategoryPageData(
    queryClient,
    "Digital Artisans",
    location,
    sp.categoryId
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationInitializer initialLocation={location} />
      <DigitalArtisansClient />
    </HydrationBoundary>
  );
}
