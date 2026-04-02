"use client";

import React, { useState } from "react";
import { Trusted } from "./Trusted";
import { SearchIcon } from "@/components/assets/icons/SvgIcons";
import { PopularService } from "./PopularService";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/easing";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT, delay },
  }),
};

export const Hero = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section
      id="home"
      className="relative bg-hero bg-cover bg-center bg-no-repeat min-h-screen"
    >
      <div className="absolute inset-0 bg-custom-gradient opacity-95 z-0" />

      {/* Subtle animated glow orbs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-lightblue/10 rounded-full blur-[100px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-start justify-center py-28 px-4 relative z-10">
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          <Trusted />
        </motion.div>

        <div className="mb-8 max-w-2xl">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight"
            variants={fadeUp}
            custom={0.15}
            initial="hidden"
            animate="visible"
          >
            Find the perfect{" "}
            <span className="text-lightblue">skilled artisan</span> for your
            project
          </motion.h1>
          <motion.p
            className="text-bordergrey text-lg leading-relaxed"
            variants={fadeUp}
            custom={0.3}
            initial="hidden"
            animate="visible"
          >
            Find the right artisan for your everyday needs — fast, affordable,
            and reliable craftsmanship at your fingertips.
          </motion.p>
        </div>

        {/* Search Section */}
        <motion.div
          className="w-full max-w-2xl mb-8"
          variants={fadeUp}
          custom={0.45}
          initial="hidden"
          animate="visible"
        >
          <div className="flex gap-0 bg-white rounded-full shadow-lg shadow-black/20 ring-1 ring-white/10">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for any service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-gray-700 bg-transparent border-none outline-none placeholder-gray-400 text-base"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="bg-darkBlue hover:bg-blue-700 px-8 py-4 rounded-tr-full rounded-br-full transition-colors duration-200 flex items-center justify-center min-w-[88px]"
            >
              <SearchIcon />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={0.6}
          initial="hidden"
          animate="visible"
        >
          <PopularService setSearchTerm={setSearchTerm} />
        </motion.div>
      </div>
    </section>
  );
};
