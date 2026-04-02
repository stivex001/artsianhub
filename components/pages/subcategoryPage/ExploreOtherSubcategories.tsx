"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/easing";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getSubCategoryMeta } from "./subcategoryMeta";

interface SiblingSubCategory {
  id: string;
  name: string;
}

interface ExploreOtherSubcategoriesProps {
  siblings: SiblingSubCategory[];
  currentSubCategoryId: string;
  categoryId: string;
  categoryName: string;
  categorySlug: string;
  isLoading: boolean;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

const SubCategoryCardSkeleton = () => (
  <div className="bg-white rounded-3xl p-7 border border-gray-100 space-y-4">
    <Skeleton className="w-16 h-16 rounded-2xl" />
    <Skeleton className="h-6 w-3/4" />
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
    <Skeleton className="h-4 w-24 mt-2" />
  </div>
);

export const ExploreOtherSubcategories = ({
  siblings,
  currentSubCategoryId,
  categoryId,
  categoryName,
  categorySlug,
  isLoading,
}: ExploreOtherSubcategoriesProps) => {
  const router = useRouter();

  const others = siblings.filter((s) => s.id !== currentSubCategoryId);

  if (!isLoading && others.length === 0) return null;

  const handleNavigate = (sub: SiblingSubCategory) => {
    const params = new URLSearchParams({
      categoryId,
      name: sub.name,
      categoryName,
      categorySlug,
    });
    router.push(`/subcategory/${sub.id}?${params.toString()}`);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            More from{" "}
            <span className="text-[#02198B]">{categoryName}</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Explore other specialisations within this category.
          </p>
        </motion.div>

        {/* Grid — max 3 columns to keep cards big and readable */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <SubCategoryCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {others.map((sub) => {
              const meta = getSubCategoryMeta(sub.name);
              return (
                <motion.button
                  key={sub.id}
                  variants={cardVariants}
                  whileHover={{ y: -6, transition: { duration: 0.22, ease: "easeOut" } }}
                  onClick={() => handleNavigate(sub)}
                  className="relative bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 text-left group w-full overflow-hidden"
                >
                  {/* Gradient accent bar at top */}
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
                      {sub.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                      {meta.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center gap-1.5 mt-5 text-sm font-semibold text-[#02198B] translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                      <span>Explore</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};
