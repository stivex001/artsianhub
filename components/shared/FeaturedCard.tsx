"use client";
import React from "react";
import { Scissors, Zap, Target, Circle } from "lucide-react";
import { Descriptions } from "./Headings";
import { ArrowRightIcon } from "../assets/icons/SvgIcons";

interface CategoryItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FeaturedCardProps {
  title?: string;
  subtitle?: string;
  categories?: CategoryItem[];
  featuredImage?: string;
  backgroundColor?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const defaultCategories: CategoryItem[] = [
  {
    id: "tailors",
    title: "Tailors & Dressmakers",
    description: "Custom clothing, alterations, and bespoke fashion.",
    icon: <Scissors className="w-6 h-6 text-amber-600" />,
  },
  {
    id: "shoemakers",
    title: "Shoemakers & Leatherworkers",
    description: "Handmade shoes, bags, and accessories.",
    icon: <Zap className="w-6 h-6 text-amber-600" />,
  },
  {
    id: "weavers",
    title: "Weavers & Textile Designers",
    description: "Handwoven fabrics, scarves, and upholstery.",
    icon: <Target className="w-6 h-6 text-amber-600" />,
  },
  {
    id: "embroidery",
    title: "Embroidery Artists",
    description: "Custom embroidery for clothing and decor.",
    icon: <Circle className="w-6 h-6 text-amber-600" />,
  },
];

export const FeaturedCard: React.FC<FeaturedCardProps> = ({
  title = "Fashion & Textile Artisans",
  subtitle = "Explore top-tier fashion and textile artisans who specialize in custom designs, alterations, and more.",
  categories = defaultCategories,
  featuredImage = "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center",
  backgroundColor = "bg-amber-50",
  buttonText = "Explore Fashion & Textile Artisans",
  onButtonClick = () => console.log("Button clicked"),
}) => {
  return (
    <div
      className={`${backgroundColor} lg:rounded-[40px] border border-[${backgroundColor}] py-24 max-w-7xl mx-auto`}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
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
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                    {category.icon}
                  </div>
                </div>
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
            <img
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
