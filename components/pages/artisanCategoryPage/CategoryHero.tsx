"use client";

import { motion } from "framer-motion";
import { EASE_OUT, EASE_SPRING } from "@/lib/easing";
import { Sparkles } from "lucide-react";

interface CategoryHeroProps {
  title: string;
  description: string;
  emoji: string;
  tagline: string;
}

export const CategoryHero = ({
  title,
  description,
  emoji,
  tagline,
}: CategoryHeroProps) => {
  return (
    <section className="relative bg-[#02198B] overflow-hidden min-h-[360px] md:min-h-[440px] flex items-center">
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

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-3xl">
          {/* Emoji icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: EASE_SPRING }}
            className="w-20 h-20 md:w-24 md:h-24 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center text-4xl md:text-5xl mb-6 border border-white/15 shadow-2xl shadow-black/20"
          >
            {emoji}
          </motion.div>

          {/* Tagline chip */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-5"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            {tagline}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5 leading-[1.1] tracking-tight"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.25 }}
            className="text-white/75 text-lg md:text-xl leading-relaxed max-w-2xl"
          >
            {description}
          </motion.p>
        </div>
      </div>
    </section>
  );
};
