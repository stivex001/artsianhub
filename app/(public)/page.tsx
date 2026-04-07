import { headers } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createServerQueryClient,
  detectLocationFromIp,
  prefetchCategories,
  prefetchAllSubCategories,
} from "@/lib/serverPrefetch";
import { LocationInitializer } from "@/components/shared/LocationInitializer";
import { ExploreCategiries } from "@/components/pages/landingPage/ExploreCategiries";
import { Hero } from "@/components/pages/landingPage/Hero";
import HowItWorks from "@/components/pages/landingPage/HowItWorks";
import ArtisanCTA from "@/components/pages/landingPage/ArtisanCTA";
import Review from "@/components/pages/landingPage/Review";

export default async function Home() {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const queryClient = createServerQueryClient();
  const location = await detectLocationFromIp(ip);

  // Prefetch categories (ExploreCategiries) and all sub-categories (PopularService)
  // concurrently — neither depends on the other.
  await Promise.all([
    prefetchCategories(queryClient),
    prefetchAllSubCategories(queryClient),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationInitializer initialLocation={location} />
      <Hero />
      <ExploreCategiries />
      <HowItWorks />
      <ArtisanCTA />
      <Review />
    </HydrationBoundary>
  );
}
