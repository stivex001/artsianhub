import type { Metadata } from "next";
import { headers } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createServerQueryClient,
  detectLocationFromIp,
  prefetchArtisans,
} from "@/lib/serverPrefetch";
import { ArtisansPageClient } from "@/components/pages/artisanCategoryPage/ArtisansPageClient";
import { LocationInitializer } from "@/components/shared/LocationInitializer";

export const metadata: Metadata = {
  title: "Browse Artisans",
  description:
    "Find and hire verified artisans near you. Browse profiles, view portfolios, check reviews, and connect with skilled professionals on ArtisansHub.",
  alternates: { canonical: "/artisans" },
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function ArtisansPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const queryClient = createServerQueryClient();
  const location = await detectLocationFromIp(ip);

  if (location) {
    await prefetchArtisans(queryClient, location.country, sp.q);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationInitializer initialLocation={location} />
      <ArtisansPageClient />
    </HydrationBoundary>
  );
}
