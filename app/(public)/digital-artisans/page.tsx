"use client";

import {
  Code,
  Graphic,
  SocialContent,
  UX,
} from "@/components/assets/icons/FeaturedIcons";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategories } from "@/api/crud/categories";
import { useArtisansNearMe } from "@/hooks/useArtisansNearMe";
import { CategoryHero } from "@/components/pages/artisanCategoryPage/CategoryHero";
import {
  CategoryCard,
  CategoryCardSkeleton,
} from "@/components/pages/artisanCategoryPage/CategoryCard";
import { CategoryFeaturedArtisans } from "@/components/pages/artisanCategoryPage/CategoryFeaturedArtisans";
import { ExploreOtherCategories } from "@/components/pages/artisanCategoryPage/ExploreOtherCategories";
import { LocationBanner } from "@/components/shared/LocationBanner";

const dummySubCategories = [
  {
    id: "Graphic",
    title: "Graphic Designers & Illustrators",
    description: "Branding, logos, and digital art.",
    icon: <Graphic />,
  },
  {
    id: "Web",
    title: "Web Designers & Developers",
    description: "Custom websites and eCommerce stores.",
    icon: <Code />,
  },
  {
    id: "UX",
    title: "UI/UX Designers",
    description: "User experience and app interface design.",
    icon: <UX />,
  },
  {
    id: "Content",
    title: "Content Creators & Social Media Managers",
    description: "Digital marketing, branding, and online engagement.",
    icon: <SocialContent />,
  },
];

export default function DigitalArtisansPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const { getSubCategoryByCategoryId } = useCategories();
  const { artisans: digital_artisan, isPending, city, country, useCityFilter } = useArtisansNearMe();

  const { data: subCat, isPending: subPending } = getSubCategoryByCategoryId(
    categoryId || "",
  );

  const handleCategoryClick = (cat: any) => {
    const params = new URLSearchParams({
      categoryId: categoryId || "",
      name: cat.title,
      categoryName: "Digital Artisans",
      categorySlug: `/digital-artisans?categoryId=${categoryId}`,
    });
    router.push(`/subcategory/${cat.id}?${params.toString()}`);
  };

  const subCatList = Array.isArray(subCat)
    ? subCat
    : (subCat as any)?.data || [];

  const transformedSubCategories = subCatList.map((backendSub: any) => {
    const dummyMatch = dummySubCategories.find(
      (ds) => ds.title === backendSub.name,
    );
    if (dummyMatch) {
      return {
        ...dummyMatch,
        id: backendSub._id,
        title: backendSub.name,
      };
    }
    return {
      id: backendSub._id,
      title: backendSub.name,
      description: "Explore our expert digital services in this category.",
      icon: <Graphic />,
      link: "#",
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <LocationBanner />
      <CategoryHero
        emoji="💻"
        tagline="Mensayhub"
        title="Digital Artisans"
        description="Connect with skilled digital professionals — from graphic designers and web developers to UI/UX experts and content creators — who turn ideas into impactful digital experiences."
      />

      <section
        id="categories"
        className="py-12 md:py-20 px-4 md:px-10 lg:px-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Explore{" "}
              <span className="text-[#02198B]">Digital Categories</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              Find the right digital professional for your next project.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {subPending
              ? Array.from({ length: 4 }).map((_, i) => (
                  <CategoryCardSkeleton key={i} />
                ))
              : transformedSubCategories.map((cat: any, i: number) => (
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
        </div>
      </section>

      <CategoryFeaturedArtisans
        artisans={digital_artisan}
        isLoading={isPending}
        categoryName="Digital"
        locationNote={
          !useCityFilter && country
            ? `Showing all artisans in ${country}`
            : useCityFilter && city
              ? `Filtered to ${city}`
              : undefined
        }
      />

      <ExploreOtherCategories currentCategoryTitle="Digital Artisans" />
    </div>
  );
}
