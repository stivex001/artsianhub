"use client";
import { useCategories } from "@/api/crud/categories";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/easing";
import { ArrowRight } from "lucide-react";

export const dummyCategories = [
  {
    icon: "💇🏾‍♀",
    title: "Creative Artisans",
    link: "/creative-artisans",
    accent: "from-rose-500 to-pink-500",
    bg: "bg-rose-50",
    description:
      "From hairdressers and tailors to event planners, our Creative Artisans shape everyday life with style, beauty, and imagination. Explore talents that bring ideas to life through fashion, design, and celebration.",
  },
  {
    icon: "💻",
    title: "Digital Artisans",
    link: "/digital-artisans",
    accent: "from-blue-500 to-indigo-600",
    bg: "bg-blue-50",
    description:
      "From branding to web design, our digital artisans specialise in creating engaging and functional online experiences.",
  },
  {
    icon: "🛠",
    title: "Pro Artisans",
    link: "/skilled-artisans",
    accent: "from-amber-400 to-orange-500",
    bg: "bg-amber-50",
    description:
      "Get skilled home repairs and services from expert trades people — plumbers, electricians, and mechanics.",
  },
  {
    icon: "👗",
    title: "Fashion Marketplace",
    link: "/fashion-marketplace",
    accent: "from-purple-500 to-violet-600",
    bg: "bg-purple-50",
    description:
      "Explore African prints, custom designs, ready‑to‑wear clothing, bags, shoes, and accessories from verified artisans.",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
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
      <Skeleton className="w-20 h-20 rounded-2xl" />
      <Skeleton className="h-7 w-2/3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
      </div>
      <Skeleton className="h-5 w-24 mt-2" />
    </div>
  </div>
);

export const ExploreCategiries = () => {
  const router = useRouter();
  const { getAllCategories } = useCategories();
  const { data: backendCategories, isLoading } = getAllCategories();

  const transformedCategories = (backendCategories || [])
    .map((backendCat) => {
      const dummyMatch = dummyCategories.find(
        (dc) => dc.title === backendCat.name,
      );
      if (dummyMatch) {
        return { ...dummyMatch, id: backendCat._id };
      }
      return null;
    })
    .filter(
      (cat): cat is (typeof dummyCategories)[0] & { id: string } =>
        cat !== null,
    );

  const fashionMarketplace = dummyCategories.find(
    (c) => c.title === "Fashion Marketplace",
  );

  const finalCategories = [...transformedCategories];
  if (
    fashionMarketplace &&
    !finalCategories.some((c) => c.title === "Fashion Marketplace")
  ) {
    finalCategories.push({
      ...fashionMarketplace,
      id: "fashion-marketplace-id",
    } as any);
  }

  return (
    <section id="findArtisan" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Explore Categories
          </h2>
          <p className="text-gray-500 text-base md:text-lg max-w-lg">
            Find the right specialist for every project — browse by craft or
            trade.
          </p>
        </motion.div>

        {/* Grid — 2 columns max so cards stay wide and readable */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {finalCategories.map((cat, index) => (
              <motion.div
                key={cat?.id || index}
                variants={cardVariants}
                whileHover={{
                  y: -6,
                  transition: { duration: 0.22, ease: "easeOut" },
                }}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100 overflow-hidden group"
                onClick={() => router.push(`${cat.link}?categoryId=${cat?.id}`)}
              >
                {/* Gradient accent bar */}
                <div
                  className={`h-1.5 w-full bg-gradient-to-r ${cat.accent}`}
                />

                <div className="p-8">
                  {/* Icon */}
                  <div
                    className={`w-20 h-20 ${cat.bg} rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform duration-300`}
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
                  <div className="flex items-center gap-1.5 mt-6 text-sm font-semibold text-gray-900 translate-x-0 group-hover:translate-x-1 transition-transform duration-200">
                    <span
                      className={`bg-gradient-to-r ${cat.accent} bg-clip-text text-transparent`}
                    >
                      Explore
                    </span>
                    <ArrowRight
                      className={`w-4 h-4`}
                      style={{ color: "currentColor" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};
