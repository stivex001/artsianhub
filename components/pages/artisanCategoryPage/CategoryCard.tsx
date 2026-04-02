"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/easing";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getSubCategoryMeta } from "@/components/pages/subcategoryPage/subcategoryMeta";

interface CategoryCardProps {
  id: string;
  title: string;
  description: string;
  onClick: () => void;
  index?: number;
}

export const CategoryCard = ({
  title,
  description,
  onClick,
  index = 0,
}: CategoryCardProps) => {
  const meta = getSubCategoryMeta(title);

  return (
    <motion.button
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        ease: EASE_OUT,
        delay: index * 0.08,
      }}
      whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
      onClick={onClick}
      className="relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 text-left group w-full overflow-hidden cursor-pointer"
    >
      {/* Gradient accent bar */}
      <div className={`h-1.5 w-full bg-gradient-to-r ${meta.accent}`} />

      <div className="p-7">
        {/* Emoji icon */}
        <div
          className={`w-16 h-16 ${meta.bg} rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}
        >
          {meta.emoji}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
          {meta.description || description}
        </p>

        {/* CTA */}
        <div className="flex items-center gap-1.5 mt-5 text-sm font-semibold text-[#02198B] translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
          <span>Explore</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </motion.button>
  );
};

export const CategoryCardSkeleton = () => (
  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
    <div className="h-1.5 w-full bg-gray-100" />
    <div className="p-7 space-y-4">
      <Skeleton className="w-16 h-16 rounded-2xl" />
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-4 w-20 mt-2" />
    </div>
  </div>
);
