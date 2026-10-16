"use client";
import {
  BeautyIcon,
  CraftIcon,
  CutileryIcon,
  DigitalIcon,
  FashionIcon,
  InteriorIcon,
  SkilledTradeIcon,
  VisualIcon,
} from "@/components/assets/icons/OtherIcons";
import { Descriptions } from "@/components/shared/Headings";
import { useRouter } from "next/navigation";
import React from "react";

export const categories = [
  {
    icon: FashionIcon,
    title: "Fashion & Textile",
  },
  {
    icon: CutileryIcon,
    title: "Food & Culinary",
  },
  {
    icon: InteriorIcon,
    title: "Home & Interior",
  },
  {
    icon: BeautyIcon,
    title: "Beauty & Care",
  },
  {
    icon: VisualIcon,
    title: "Visual Arts",
  },
  {
    icon: DigitalIcon,
    title: "Digital & Creative",
  },
  {
    icon: SkilledTradeIcon,
    title: "Skilled Trades",
  },
  {
    icon: CraftIcon,
    title: "Craft & Handmade Goods Artisans",
  },
];

export const FindPerfectArtisan = () => {
  const router = useRouter();
  return (
    <section className="bg-milky py-20 px-4 text-center">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Descriptions
            title="Find Your Perfect Artisan"
            desc="Whether you need a tailor, a tech expert, or a home repair specialist,
          ArtisansHub has a skilled artisan ready for your project."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6 md:gap-y-16">
          {categories?.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                onClick={() => router.push("/auth/login")}
                className="bg-white border cursor-pointer border-[#F3F4F6] max-h-44 shadow-boxshadow rounded-lg p-6 flex flex-col gap-4 items-center hover:shadow-md transition"
              >
                <Icon />
                <h3 className="text-xl font-semibold text-textdeep">
                  {category.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
