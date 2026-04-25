import type { Metadata } from "next";
import { headers } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createServerQueryClient,
  detectLocationFromIp,
  prefetchCategoryPageData,
} from "@/lib/serverPrefetch";
import { DigitalArtisansClient } from "@/components/pages/artisanCategoryPage/DigitalArtisansClient";
import { LocationInitializer } from "@/components/shared/LocationInitializer";

export const metadata: Metadata = {
  title: "Digital Artisans",
  description:
    "Hire verified digital artisans — web developers, UI/UX designers, video editors, and social media managers. Find digital talent on ArtisansHub.",
  alternates: { canonical: "/digital-artisans" },
};

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
