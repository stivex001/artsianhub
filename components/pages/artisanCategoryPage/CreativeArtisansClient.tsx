"use client";

import { BrushIcon, CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ScissorsIcon,
  WeaverIcon,
} from "@/components/assets/icons/FeaturedIcons";
import { useCategories } from "@/apis/crud/categories";
import { useArtisansNearMe } from "@/hooks/useArtisansNearMe";
import { CategoryHero } from "@/components/pages/artisanCategoryPage/CategoryHero";
import {
  CategoryCard,
  CategoryCardSkeleton,
} from "@/components/pages/artisanCategoryPage/CategoryCard";
import { CategoryFeaturedArtisans } from "@/components/pages/artisanCategoryPage/CategoryFeaturedArtisans";
import { ExploreOtherCategories } from "@/components/pages/artisanCategoryPage/ExploreOtherCategories";
import { LocationBanner } from "@/components/shared/LocationBanner";
import { QueryErrorBoundary } from "@/components/shared/QueryErrorBoundary";

const dummySubCategories = [
  {
    id: "hairdressers",
    title: "Hairdressers & Barbers",
    description:
      "Bringing confidence to life through expert styling, grooming, and creative flair.",
    icon: <BrushIcon />,
    link: "/creative/hairdressers",
  },
  {
    id: "tailors",
    title: "Tailors & Fashion Designers",
    description:
      "Crafting unique outfits that blend tradition, creativity, and personal expression.",
    icon: <ScissorsIcon />,
    link: "/creative/tailors",
  },
  {
    id: "event_planners",
    title: "Event Planners & Decorators",
    description:
      "Designing memorable moments and breathtaking spaces for every occasion.",
    icon: <CalendarIcon />,
    link: "/creative/event-planners",
  },
  {
    id: "make_up",
    title: "Make-up Artists",
    description:
      "Designing memorable moments and breathtaking spaces for every occasion.",
    icon: <WeaverIcon />,
    link: "/creative/event-planners",
  },
  {
    id: "chef",
    title: "Chefs",
    description:
      "Designing memorable moments and breathtaking spaces for every occasion.",
    icon: <WeaverIcon />,
    link: "/creative/event-planners",
  },
  {
    id: "photgrapher",
    title: "Photographers and Videographers",
    description:
      "Designing memorable moments and breathtaking spaces for every occasion.",
    icon: <WeaverIcon />,
    link: "/creative/photographers",
  },
];

export function CreativeArtisansClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const { getSubCategoryByCategoryId, getAllCategories } = useCategories();
  const { artisans: allArtisans, isPending, city, country, useCityFilter } =
    useArtisansNearMe();

  const { data: subCat, isPending: subPending, isError: subError } =
    getSubCategoryByCategoryId(categoryId || "");

  const { data: allCategories } = getAllCategories();
  const resolvedCategoryId =
    categoryId ||
    (allCategories || []).find((c) => c.name === "Creative Artisans")?._id ||
    null;

  const creative_artisan = resolvedCategoryId
    ? allArtisans.filter((artisan: any) =>
        (artisan.subCategories || []).some(
          (sub: any) => sub.category === resolvedCategoryId
        )
      )
    : allArtisans;

  const handleCategoryClick = (cat: any) => {
    const params = new URLSearchParams({
      categoryId: categoryId || "",
      name: cat.title,
      categoryName: "Creative Artisans",
      categorySlug: `/creative-artisans?categoryId=${categoryId}`,
    });
    router.push(`/subcategory/${cat.id}?${params.toString()}`);
  };

  const subCatList = Array.isArray(subCat)
    ? subCat
    : (subCat as any)?.data || [];

  const transformedSubCategories = subCatList.map((backendSub: any) => {
    const dummyMatch = dummySubCategories.find(
      (ds) => ds.title === backendSub.name
    );
    if (dummyMatch) {
      return { ...dummyMatch, id: backendSub._id, title: backendSub.name };
    }
    return {
      id: backendSub._id,
      title: backendSub.name,
      description: "Explore our expert services in this category.",
      icon: <BrushIcon />,
      link: "#",
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <LocationBanner />
      <CategoryHero
        emoji="🎨"
        tagline="Mensayhub"
        title="Creative Artisans"
        description="Discover talented creatives — from hairdressers and tailors to event planners, chefs, and photographers — all ready to bring your vision to life."
      />

      <section
        id="categories"
        className="py-12 md:py-20 px-4 md:px-10 lg:px-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Explore{" "}
              <span className="text-[#02198B]">Creative Categories</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              Find the right creative professional for every occasion.
            </p>
          </div>

          {subError ? (
            <p className="text-sm text-red-500">
              Failed to load categories. Please refresh.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {subPending
                ? Array.from({ length: 6 }).map((_, i) => (
                    <CategoryCardSkeleton key={i} />
                  ))
                : transformedSubCategories?.map((cat: any, i: number) => (
                    <CategoryCard
                      key={cat?.id}
                      id={cat?.id}
                      title={cat?.title}
                      description={cat?.description}
                      onClick={() => handleCategoryClick(cat)}
                      index={i}
                    />
                  ))}
            </div>
          )}
        </div>
      </section>

      <QueryErrorBoundary>
        <CategoryFeaturedArtisans
          artisans={creative_artisan}
          isLoading={isPending}
          categoryName="Creative"
          locationNote={
            !useCityFilter && country
              ? `Showing all artisans in ${country}`
              : useCityFilter && city
                ? `Filtered to ${city}`
                : undefined
          }
        />
      </QueryErrorBoundary>

      <ExploreOtherCategories currentCategoryTitle="Creative Artisans" />
    </div>
  );
}
