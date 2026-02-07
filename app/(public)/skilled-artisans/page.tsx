"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Handymen,
  Mechanic,
  Plumbers,
  Watchmakers,
} from "@/components/assets/icons/FeaturedIcons";
import { FeaturesArtisan } from "@/components/pages/landingPage/FeaturesArtisan";
import { CustomButton } from "@/components/clickable/CustomButton";
import carpenter from "@/components/assets/images/profession.jpg";
import { LoginPromptModal } from "@/components/shared/LoginPromptModal";
import { useState } from "react";
import { useArtisans } from "@/api/crud/artisans";
import { Descriptions } from "@/components/shared/Headings";
import { ArtisanCard } from "@/components/Artisan/ArtisanCard";
import { CardSkeletonLoader } from "@/components/loader/CardSkeletonLoader";
import { useSearchParams } from "next/navigation";
import { useCategories } from "@/api/crud/categories";

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
    title: "Cleaning Services ",
    description: "Professional home and office cleaning.",
    icon: <Watchmakers />,
  },
  {
    id: "Handymen",
    title: "Handymen & General Repair Specialists",
    description: "Home improvement and DIY professionals..",
    icon: <Handymen />,
  },
];

export default function SkilledArtisansPage() {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const { getArtisanAroundMe } = useArtisans();
  const { getSubCategoryByCategoryId } = useCategories();

  const { data: subCat, isPending: subPending } = getSubCategoryByCategoryId(
    categoryId || "",
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data, isPending } = getArtisanAroundMe();
  const skilled_artisan = data?.data || [];

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
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
    <div className="min-h-screen bg-white ">
      <section className="relative min-h-[60vh] md:min-h-screen pt-3 overflow-hidden flex flex-col md:flex-row items-center justify-between px-4 md:px-10 lg:px-20 bg-[#EFF6FF]">
        <div className="absolute inset-0">
          <Image
            src={carpenter}
            alt="Industrial welding with sparks and machinery"
            className="w-full h-full object-cover object-top"
            fill
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-primary opacity-30"></div>
      </section>

      <section
        id="categories"
        className="py-12 md:py-20 px-4 md:px-10 lg:px-20"
      >
        <h2 className="text-3xl font-semibold text-center mb-8 md:mb-12">
          Explore Pro Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {subPending
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-6 shadow-boxShadow animate-pulse"
                >
                  <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))
            : transformedSubCategories.map((cat: any) => (
                <div
                  key={cat?.id}
                  onClick={() => handleCategoryClick(cat)}
                  role="button"
                  tabIndex={0}
                  className="bg-white rounded-xl p-6 shadow-boxShadow hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-center mb-4">{cat?.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{cat?.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    {cat?.description}
                  </p>
                </div>
              ))}
        </div>
      </section>
      <section className=" px-4 md:px-10 lg:px-20  text-center">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Descriptions
            title="Featured Artisans"
            desc=" Meet some of our top-rated artisans who consistently deliver
                        exceptional work."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {isPending
            ? Array.from({ length: 8 }).map((_, i) => (
                <CardSkeletonLoader key={i} />
              ))
            : skilled_artisan?.map((item: any) => (
                <ArtisanCard key={item._id} artisan={item} />
              ))}
        </div>
      </section>

      <LoginPromptModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        selectedCategory={selectedCategory ?? undefined}
      />
    </div>
  );
}
