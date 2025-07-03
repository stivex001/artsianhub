"use client"
import React from "react";
import { Scissors, Zap, Target, Circle } from "lucide-react";

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
    <div className={`${backgroundColor} rounded-2xl p-8 max-w-6xl mx-auto`}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
        <p className="text-gray-600 text-lg max-w-2xl">{subtitle}</p>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mr-4">
                  {category.icon}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {category.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Image */}
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-amber-100 to-orange-100">
            <img
              src={featuredImage}
              alt="Fashion artisan at work"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to gradient background if image fails to load
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        </div>
      </div>

      {/* Call to Action Button */}
      <div className="mt-8 flex justify-start">
        <button
          onClick={onButtonClick}
          className="bg-gray-900 text-white px-8 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
        >
          <span>{buttonText}</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
