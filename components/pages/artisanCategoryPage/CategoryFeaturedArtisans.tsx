"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/easing";
import { Users } from "lucide-react";
import { ArtisanCard } from "@/components/Artisan/ArtisanCard";
import { CardSkeletonLoader } from "@/components/loader/CardSkeletonLoader";

interface CategoryFeaturedArtisansProps {
  artisans: any[];
  isLoading: boolean;
  categoryName: string;
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
};

const EmptyState = ({ categoryName }: { categoryName: string }) => (
  <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
    <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-5">
      <Users className="w-10 h-10 text-blue-300" />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 mb-3">
      No featured artisans yet in {categoryName}
    </h3>
    <p className="text-gray-500 text-base max-w-sm leading-relaxed">
      Check back soon as more artisans join and get verified in this category.
    </p>
  </div>
);

export const CategoryFeaturedArtisans = ({
  artisans,
  isLoading,
  categoryName,
}: CategoryFeaturedArtisansProps) => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
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
            Featured{" "}
            <span className="text-[#02198B]">{categoryName}</span> Artisans
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Top-rated artisans consistently delivering exceptional work.
          </p>
        </motion.div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeletonLoader key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {artisans.length === 0 ? (
              <EmptyState categoryName={categoryName} />
            ) : (
              artisans.map((artisan: any) => (
                <motion.div key={artisan._id} variants={itemVariants}>
                  <ArtisanCard artisan={artisan} />
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};
