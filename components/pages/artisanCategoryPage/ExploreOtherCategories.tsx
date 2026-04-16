"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/easing";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCategories } from "@/apis/crud/categories";
import { Skeleton } from "@/components/ui/skeleton";
import { dummyCategories } from "@/components/pages/landingPage/ExploreCategiries";

interface ExploreOtherCategoriesProps {
  /** Title of the current category page — used to exclude it from results */
  currentCategoryTitle: string;
}

const ARTISAN_CATEGORY_TITLES = [
  "Creative Artisans",
  "Digital Artisans",
  "Pro Artisans",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT },
  },
};

const CardSkeleton = () => (
  <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
    <div className="h-1.5 bg-gray-100 w-full" />
    <div className="p-8 space-y-4">
      <Skeleton className="w-16 h-16 rounded-2xl" />
      <Skeleton className="h-7 w-2/3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <Skeleton className="h-4 w-20 mt-3" />
    </div>
  </div>
);

export const ExploreOtherCategories = ({
  currentCategoryTitle,
}: ExploreOtherCategoriesProps) => {
  const router = useRouter();
  const { getAllCategories } = useCategories();
  const { data: backendCategories, isLoading } = getAllCategories();

  // Build enriched list from backend data + dummy metadata
  const enriched = (backendCategories || [])
    .map((backendCat) => {
      const dummy = dummyCategories.find((dc) => dc.title === backendCat.name);
      if (!dummy) return null;
      return { ...dummy, id: backendCat._id };
    })
    .filter(
      (cat): cat is (typeof dummyCategories)[0] & { id: string } =>
        cat !== null &&
        ARTISAN_CATEGORY_TITLES.includes(cat.title) &&
        cat.title !== currentCategoryTitle,
    );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Explore Other{" "}
            <span className="text-[#02198B]">Categories</span>
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            Looking for a different kind of expertise? Browse more artisan
            categories.
          </p>
        </motion.div>

        {/* Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {enriched.map((cat) => (
              <motion.button
                key={cat.id}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.22, ease: "easeOut" },
                }}
                onClick={() =>
                  router.push(`${cat.link}?categoryId=${cat.id}`)
                }
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 text-left group w-full overflow-hidden cursor-pointer"
              >
                {/* Accent bar */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${cat.accent}`}
                />

                <div className="p-8">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${cat.bg} rounded-2xl flex items-center justify-center text-3xl mb-5 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {cat.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {cat.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-500 text-base leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center gap-1.5 mt-6 text-sm font-semibold translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                    <span
                      className={`bg-gradient-to-r ${cat.accent} bg-clip-text text-transparent`}
                    >
                      Explore
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
