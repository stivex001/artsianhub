"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useArtisansNearMe } from "@/hooks/useArtisansNearMe";
import { ArtisanCard } from "@/components/Artisan/ArtisanCard";
import { CardSkeletonLoader } from "@/components/loader/CardSkeletonLoader";
import { LocationBanner } from "@/components/shared/LocationBanner";
import { QueryErrorBoundary } from "@/components/shared/QueryErrorBoundary";
import { useLocationStore } from "@/store/locationStore";
import { Search, Home, ArrowRight, Wrench, Palette, Monitor } from "lucide-react";

const CATEGORIES = [
  {
    emoji: "🔧",
    title: "Pro Artisans",
    description: "Plumbers, electricians, mechanics & handymen",
    href: "/skilled-artisans",
    icon: Wrench,
    accent: "from-orange-400 to-red-500",
    bg: "bg-orange-50",
  },
  {
    emoji: "🎨",
    title: "Creative Artisans",
    description: "Hairdressers, tailors, chefs & photographers",
    href: "/creative-artisans",
    icon: Palette,
    accent: "from-pink-400 to-purple-500",
    bg: "bg-pink-50",
  },
  {
    emoji: "💻",
    title: "Digital Artisans",
    description: "Designers, developers & content creators",
    href: "/digital-artisans",
    icon: Monitor,
    accent: "from-blue-400 to-indigo-500",
    bg: "bg-blue-50",
  },
];

const SUGGESTIONS = [
  "Logo Design",
  "Home Repair",
  "Custom Tailoring",
  "Web Developer",
  "Personal Chef",
  "Photographer",
];

export function ArtisansPageClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || undefined;

  const { country, useCityFilter, city, setCityFilter } = useLocationStore();
  const { artisans, isPending, isError } = useArtisansNearMe({ q });

  const locationLabel = useCityFilter && city ? city : country;

  return (
    <div className="min-h-screen bg-white">
      <LocationBanner />

      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              {q ? (
                <>
                  Results for{" "}
                  <span className="text-[#02198B]">&ldquo;{q}&rdquo;</span>
                </>
              ) : (
                <>
                  Artisans <span className="text-[#02198B]">near you</span>
                </>
              )}
            </h1>
            {locationLabel && (
              <p className="text-gray-500 text-base">
                Showing results in{" "}
                <span className="font-medium text-gray-700">{locationLabel}</span>
              </p>
            )}
          </div>

          <QueryErrorBoundary>
            {isError ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-gray-500 mb-4">
                  Failed to load artisans. Please try again.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-5 py-2.5 bg-[#02198B] text-white rounded-full text-sm font-medium hover:bg-blue-800 transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : isPending ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <CardSkeletonLoader key={i} />
                ))}
              </div>
            ) : artisans.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {artisans.map((artisan: any) => (
                  <ArtisanCard key={artisan._id} artisan={artisan} />
                ))}
              </div>
            ) : (
              <EmptyState
                q={q}
                useCityFilter={useCityFilter}
                city={city}
                country={country}
                onClearCityFilter={() => setCityFilter(false)}
                onSuggestionClick={(term) =>
                  router.push(
                    `/artisans?q=${encodeURIComponent(term)}&country=${country}`
                  )
                }
                onCategoryClick={(href) => router.push(href)}
                onBackHome={() => router.push("/")}
              />
            )}
          </QueryErrorBoundary>
        </div>
      </div>
    </div>
  );
}

interface EmptyStateProps {
  q?: string;
  useCityFilter: boolean;
  city: string | null;
  country: string | null;
  onClearCityFilter: () => void;
  onSuggestionClick: (term: string) => void;
  onCategoryClick: (href: string) => void;
  onBackHome: () => void;
}

function EmptyState({
  q,
  useCityFilter,
  city,
  country,
  onClearCityFilter,
  onSuggestionClick,
  onCategoryClick,
  onBackHome,
}: EmptyStateProps) {
  return (
    <div className="space-y-16">
      <div className="flex flex-col items-center text-center py-12">
        <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6">
          <Search className="w-10 h-10 text-[#02198B]/40" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          {q ? `No artisans found for "${q}"` : "No artisans found"}
        </h2>
        <p className="text-gray-500 text-base max-w-md leading-relaxed mb-8">
          {useCityFilter && city
            ? `We couldn't find any artisans in ${city}. Try broadening your location to all of ${country || "the country"}.`
            : "We couldn't find a match. Try a different keyword or browse by category below."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {useCityFilter && city && (
            <button
              onClick={onClearCityFilter}
              className="px-5 py-2.5 bg-[#02198B] text-white rounded-full text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              Show all in {country}
            </button>
          )}
          {q && (
            <button
              onClick={() => onSuggestionClick("")}
              className="px-5 py-2.5 border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:border-gray-400 transition-colors"
            >
              Clear search
            </button>
          )}
          <button
            onClick={onBackHome}
            className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:border-gray-400 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Try searching for
        </h3>
        <div className="flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => onSuggestionClick(s)}
              className="px-4 py-2 border border-gray-200 text-gray-600 rounded-full text-sm hover:border-[#02198B] hover:text-[#02198B] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Or browse by category
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.title}
              onClick={() => onCategoryClick(cat.href)}
              className="group text-left bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className={`h-1 w-full bg-gradient-to-r ${cat.accent}`} />
              <div className="p-6">
                <div
                  className={`w-12 h-12 ${cat.bg} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  {cat.emoji}
                </div>
                <h4 className="font-bold text-gray-900 mb-1">{cat.title}</h4>
                <p className="text-gray-500 text-sm leading-snug mb-4">
                  {cat.description}
                </p>
                <span className="flex items-center gap-1 text-sm font-medium text-[#02198B] group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
