import Image from "next/image";
import React from "react";

type Props = {};

export const AboutHero = (props: Props) => {
  return (
    <section className="relative h-80 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Industrial welding with sparks and machinery"
          className="w-full h-full object-cover object-top"
          fill
          priority
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB] via-blue-600 to-[#1E40AF] opacity-80"></div>

      <div className="relative z-10 text-center text-white px-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
          ARTISANSHUB
        </h1>

        <div className="w-full">
          <div className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-8 py-8 text-lg md:text-xl font-medium hover:bg-white/15 transition-all duration-300 ">
            Get to know about US
          </div>
        </div>
      </div>
    </section>
  );
};
