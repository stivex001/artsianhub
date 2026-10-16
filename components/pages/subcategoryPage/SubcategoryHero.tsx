"use client";

import { motion } from "framer-motion";
import { EASE_OUT, EASE_SPRING } from "@/lib/easing";
import { Users, Sparkles } from "lucide-react";
import { SubcategoryBreadcrumb } from "./SubcategoryBreadcrumb";

interface SubcategoryHeroProps {
  subCategoryName: string;
  description: string;
  emoji: string;
  accent: string;
  categoryName: string;
  categorySlug: string;
  artisanCount?: number;
}

export const SubcategoryHero = ({
  subCategoryName,
  description,
  emoji,
  categoryName,
  categorySlug,
  artisanCount,
}: SubcategoryHeroProps) => {
  return (
    <section className="relative bg-[#02198B] overflow-hidden min-h-[420px] md:min-h-[480px] flex items-center">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* Glow orbs */}
      <motion.div
        className="absolute -top-24 -right-24 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[140px] pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px] pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <SubcategoryBreadcrumb
            categoryName={categoryName}
            categorySlug={categorySlug}
            subCategoryName={subCategoryName}
          />
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <div className="flex-1 max-w-3xl">
            {/* Emoji icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: EASE_SPRING, delay: 0.05 }}
              className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center text-4xl md:text-5xl mb-6 border border-white/15 shadow-2xl shadow-black/20"
            >
              {emoji}
            </motion.div>

            {/* Category chip */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-5"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              {categoryName}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.18 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-[1.1] tracking-tight"
            >
              {subCategoryName}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.28 }}
              className="text-white/75 text-lg md:text-xl leading-relaxed max-w-2xl"
            >
              {description}
            </motion.p>
          </div>

          {/* Stats card */}
          {artisanCount !== undefined && artisanCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.38 }}
              className="flex-shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl px-8 py-7 flex items-center gap-5 shadow-xl shadow-black/20"
            >
              <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-white text-4xl font-bold leading-none">
                  {artisanCount}+
                </p>
                <p className="text-white/60 text-base mt-1.5">
                  Artisans available
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
