import type { Metadata } from "next";
import { headers } from "next/headers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import {
  createServerQueryClient,
  detectLocationFromIp,
  prefetchCategories,
  prefetchAllSubCategories,
} from "@/lib/serverPrefetch";
import { LocationInitializer } from "@/components/shared/LocationInitializer";
import { Hero } from "@/components/pages/landingPage/Hero";
import HowItWorks from "@/components/pages/landingPage/HowItWorks";
import ArtisanCTA from "@/components/pages/landingPage/ArtisanCTA";
import Review from "@/components/pages/landingPage/Review";
import { SpotlightStrip } from "@/components/pages/landingPage/SpotlightStrip";
import { EventBanner } from "@/components/pages/landingPage/EventBanner";
import { getAllEventsServer } from "@/lib/events/serverEvents";
import { pickFeaturedEvent } from "@/lib/events/helpers";
import { getPlatformSettings } from "@/lib/membership/serverSettings";
import { getFeaturedArtisans } from "@/lib/artisans/featured";

export const metadata: Metadata = {
  title: "ArtisansHub — Find Skilled Artisans Near You",
  description:
    "Browse and hire verified skilled artisans — tailors, carpenters, photographers, and more. ArtisansHub connects you with trusted professionals in your area.",
  alternates: { canonical: "/" },
};

export default async function Home() {
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? null;

  const queryClient = createServerQueryClient();
  const location = await detectLocationFromIp(ip);

  // Prefetch categories and sub-categories (used by the header Explore menu)
  // concurrently — neither depends on the other.
  // Events, spotlights and settings never throw; a failure just hides that section.
  const [, , events, featuredArtisans, settings] = await Promise.all([
    prefetchCategories(queryClient),
    prefetchAllSubCategories(queryClient),
    getAllEventsServer(),
    getFeaturedArtisans(4),
    getPlatformSettings(),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LocationInitializer initialLocation={location} />
      <Hero />
      <SpotlightStrip artisans={featuredArtisans} />
      <EventBanner event={pickFeaturedEvent(events)} />
      <HowItWorks />
      <ArtisanCTA settings={settings} />
      <Review />
    </HydrationBoundary>
  );
}
