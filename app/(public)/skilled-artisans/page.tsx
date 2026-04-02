"use client";

import {
  Handymen,
  Mechanic,
  Plumbers,
  Watchmakers,
} from "@/components/assets/icons/FeaturedIcons";
import { useArtisans } from "@/api/crud/artisans";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategories } from "@/api/crud/categories";
import { CategoryHero } from "@/components/pages/artisanCategoryPage/CategoryHero";
import {
  CategoryCard,
  CategoryCardSkeleton,
} from "@/components/pages/artisanCategoryPage/CategoryCard";
import { CategoryFeaturedArtisans } from "@/components/pages/artisanCategoryPage/CategoryFeaturedArtisans";
import { ExploreOtherCategories } from "@/components/pages/artisanCategoryPage/ExploreOtherCategories";

const dummySubCategories = [
  {
    id: "Plumbers",
    title: "Plumbers & Electricians",
    description: "Home maintenance and repair specialists.",
    icon: <Plumbers />,
  },
  {
    id: "Mechanics",
    title: "Mechanics & Motorbikes Technicians",
    description: "Car and Motorbike servicing experts.",
    icon: <Mechanic />,
  },
  {
    id: "cleaningServices",
    title: "Cleaning Services",
    description: "Professional home and office cleaning.",
    icon: <Watchmakers />,
  },
  {
    id: "Handymen",
    title: "Handymen & General Repair Specialists",
    description: "Home improvement and DIY professionals.",
    icon: <Handymen />,
  },
];

export default function SkilledArtisansPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const { getArtisanAroundMe } = useArtisans();
  const { getSubCategoryByCategoryId } = useCategories();

  const { data: subCat, isPending: subPending } = getSubCategoryByCategoryId(
    categoryId || "",
  );

  const { data, isPending } = getArtisanAroundMe();
  const skilled_artisan = data?.data || [];

  const handleCategoryClick = (cat: any) => {
    const params = new URLSearchParams({
      categoryId: categoryId || "",
      name: cat.title,
      categoryName: "Pro Artisans",
      categorySlug: `/skilled-artisans?categoryId=${categoryId}`,
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
      description: "Explore our expert pro services in this category.",
      icon: <Plumbers />,
      link: "#",
    };
  });

  return (
    <div className="min-h-screen bg-white">
      <CategoryHero
        emoji="🔧"
        tagline="Mensayhub"
        title="Pro Artisans"
        description="Hire trusted tradespeople and skilled professionals — from plumbers and electricians to mechanics, cleaners, and handymen — ready to get the job done right."
      />

      <section
        id="categories"
        className="py-12 md:py-20 px-4 md:px-10 lg:px-20 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Explore <span className="text-[#02198B]">Pro Categories</span>
            </h2>
            <p className="text-gray-500 text-base md:text-lg">
              Find verified tradespeople and repair specialists near you.
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
        artisans={skilled_artisan}
        isLoading={isPending}
        categoryName="Pro"
      />

      <ExploreOtherCategories currentCategoryTitle="Pro Artisans" />
    </div>
  );
}
