"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Code,
  Graphic,
  SocialContent,
  UX,
} from "@/components/assets/icons/FeaturedIcons";
import { FeaturesArtisan } from "@/components/pages/landingPage/FeaturesArtisan";
import digital from "@/components/assets/images/digital.jpg";
import { CustomButton } from "@/components/clickable/CustomButton";
import { useState } from "react";
import { LoginPromptModal } from "@/components/shared/LoginPromptModal";
import { Descriptions } from "@/components/shared/Headings";
import { ArtisanCard } from "@/components/Artisan/ArtisanCard";
import { useArtisans } from "@/api/crud/artisans";

const subCategories = [
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
  const { getArtisanAroundMe } = useArtisans();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data, isPending } = getArtisanAroundMe();
  const digital_artisan = data?.data || [];

  const handleCategoryClick = (category: any) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white ">
      <section className="relative min-h-[60vh] md:min-h-screen pt-3 overflow-hidden flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 md:px-10 lg:px-20 bg-[#EFF6FF]">
        <div className="absolute inset-0">
          <Image
            src={digital}
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
        <h2 className="text-2xl lg:text-3xl font-semibold text-center mb-8 md:mb-12">
          Explore Digital Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {subCategories.map((cat) => (
            <div
              key={cat?.id}
              onClick={() => handleCategoryClick(cat)}
              role="button"
              tabIndex={0}
              className="bg-white rounded-xl p-6 cursor-pointer shadow-boxShadow hover:shadow-md transition-shadow duration-200"
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
          {digital_artisan?.map((item: any) => (
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
