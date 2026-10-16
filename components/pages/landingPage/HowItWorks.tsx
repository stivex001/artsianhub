"use client";

import React from "react";
import { Search, MessageCircle, FileCheck, Star } from "lucide-react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/easing";

interface Step {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HowItWorksProps {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}

const defaultSteps: Step[] = [
  {
    id: 1,
    icon: <Search className="w-6 h-6 text-[#071D8A]" />,
    title: "Search & Browse",
    description:
      "Find the artisan you need by searching or browsing categories.",
  },
  {
    id: 2,
    icon: <MessageCircle className="w-6 h-6 text-[#071D8A]" />,
    title: "Contact & Discuss",
    description: "Chat with the artisan and finalize details of your project.",
  },
  {
    id: 3,
    icon: <FileCheck className="w-6 h-6 text-[#071D8A]" />,
    title: "Agree & Get Started",
    description: "Agree on terms and get started with the work.",
  },
  {
    id: 4,
    icon: <Star className="w-6 h-6 text-[#071D8A]" />,
    title: "Pay & Review",
    description: "Secure payment and leave feedback after project completion.",
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT, delay: i * 0.13 },
  }),
};

const HowItWorks: React.FC<HowItWorksProps> = ({
  title = "How It Works",
  subtitle = "It's simple to find an artisan or join as one. Here's how:",
  steps = defaultSteps,
}) => {
  return (
    <section id="howitworks" className="bg-white py-20 px-4 text-center">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="max-w-2xl mx-auto text-center mb-14"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {title}
          </h2>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </motion.div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                custom={index}
                variants={stepVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                className="relative flex flex-col items-center"
              >
                {/* Connector lines */}
                {index > 0 && (
                  <div className="hidden lg:block absolute top-12 -left-1/2 w-9/12 h-px bg-gradient-to-r from-transparent via-gray-200 to-gray-200" />
                )}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 right-0 w-1/2 h-px bg-gradient-to-r from-gray-200 to-transparent" />
                )}

                <motion.div
                  className="p-4 rounded-2xl w-full hover:bg-blue-50/40 transition-colors duration-300"
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <div className="relative mb-6 inline-block">
                    {/* Step number badge */}
                    <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#071D8A] text-white rounded-full flex items-center justify-center text-xs font-bold z-20 shadow-md shadow-blue-900/30">
                      {step.id}
                    </div>
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="text-base font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
