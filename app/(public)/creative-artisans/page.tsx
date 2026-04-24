import type { Metadata } from "next";
import { headers } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createServerQueryClient,
  detectLocationFromIp,
  prefetchCategoryPageData,
} from "@/lib/serverPrefetch";
import { CreativeArtisansClient } from "@/components/pages/artisanCategoryPage/CreativeArtisansClient";
import { LocationInitializer } from "@/components/shared/LocationInitializer";

export const metadata: Metadata = {
  title: "Creative Artisans",
  description:
    "Discover talented creative artisans — photographers, graphic designers, artists, and content creators. Hire verified creatives on ArtisansHub.",
  alternates: { canonical: "/creative-artisans" },
};

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}

export default async function CreativeArtisansPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const queryClient = createServerQueryClient();
  const location = await detectLocationFromIp(ip);

  await prefetchCategoryPageData(
    queryClient,
    "Creative Artisans",
    location,
    sp.categoryId
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationInitializer initialLocation={location} />
      <CreativeArtisansClient />
    </HydrationBoundary>
  );
}
