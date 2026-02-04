"use client";

import Image from "next/image";
import { BrushIcon, CalendarIcon } from "lucide-react";
import {
  ScissorsIcon,
  WeaverIcon,
} from "@/components/assets/icons/FeaturedIcons";
import creative from "@/components/assets/images/creative.jpg";
import { useState } from "react";
import { LoginPromptModal } from "@/components/shared/LoginPromptModal";
import { ArtisanCard } from "@/components/Artisan/ArtisanCard";
import { useArtisans } from "@/api/crud/artisans";
import { Descriptions } from "@/components/shared/Headings";
import { CardSkeletonLoader } from "@/components/loader/CardSkeletonLoader";

const subCategories = [
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

export default function CreativeArtisansPage() {
  const { getArtisanAroundMe } = useArtisans();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    title?: string;
  } | null>(null);

  const { data, isPending } = getArtisanAroundMe();
  const creative_artisan = data?.data || [];

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-white ">
      <section className="relative min-h-[60vh] md:min-h-screen pt-3 overflow-hidden flex flex-col md:flex-row items-center justify-between px-4 md:px-10 lg:px-20 bg-[#EFF6FF]">
        <div className="absolute inset-0">
          <Image
            src={creative}
            alt="Industrial welding with sparks and machinery"
            className="w-full h-full object-cover object-top"
            fill
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-primary opacity-30"></div>
      </section>

      {/* Subcategory Section */}
      <section
        id="categories"
        className="py-12 md:py-20 px-4 md:px-10 lg:px-20"
      >
        <h2 className="text-3xl font-semibold text-center mb-8 md:mb-12">
          Explore Creative Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {subCategories.map((cat) => (
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
            : creative_artisan?.map((item: any) => (
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
