"use client";
import React from "react";
import { Descriptions } from "./Headings";
import { ArrowRightIcon } from "../assets/icons/SvgIcons";
import Image, { StaticImageData } from "next/image";

export interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturedCardProps {
  title: string;
  subtitle: string;
  categories: CategoryItem[];
  featuredImage: StaticImageData;
  backgroundColor?: string;
  borderColor?: string;
  buttonText: string;
  onButtonClick: () => void;
  order?: boolean;
}

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  title = "",
  subtitle = "",
  categories,
  featuredImage,
  backgroundColor = "bg-amber-50",
  borderColor,
  buttonText = "",
  order = false,
  onButtonClick = () => console.log("Button clicked"),
}) => {
  return (
    <div
      className={`lg:rounded-[40px] border-b py-24 max-w-7xl mx-auto`}
      style={{ borderColor: borderColor, backgroundColor: backgroundColor }}
    >
      <div
        className={`max-w-6xl mx-auto flex flex-col items-center gap-16 ${
          order ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div className="flex-1">
          <div className="mb-12">
            <Descriptions title={title} desc={subtitle} />
          </div>
          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-white rounded-xl p-6 shadow-boxShadow hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center mb-4">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          {/* Call to Action Button */}
          <div className="mt-10">
            <button
              onClick={onButtonClick}
              className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
            >
              <span>{buttonText}</span>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
        {/* Featured Image */}
        <div className="relative flex-1">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
            <Image
              src={featuredImage}
              alt="Fashion artisan at work"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                (e.currentTarget as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
