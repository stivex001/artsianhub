import Link from "next/link";
import { SpotlightCard } from "@/components/spotlight/SpotlightCard";
import type { FeaturedArtisan } from "@/lib/artisans/featured";

/** Real featured artisans. Hidden when there are none, so the page never shows an empty strip. */
export const SpotlightStrip = ({ artisans }: { artisans: FeaturedArtisan[] }) => {
  if (!artisans.length) return null;
  return (
    <section aria-labelledby="spotlights" className="mx-auto max-w-7xl px-4 py-14">
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h2 id="spotlights" className="text-2xl font-bold md:text-3xl">
          Artisan Spotlights
        </h2>
        <Link href="/artisans" className="shrink-0 text-sm font-semibold text-primary underline">
          See all artisans
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {artisans.map((a) => (
          <SpotlightCard key={a.id} artisan={a} />
        ))}
      </div>
    </section>
  );
};
