"use client";

import React, { useState } from "react";
import { Trusted } from "./Trusted";
import { SearchIcon } from "@/components/assets/icons/SvgIcons";
import { PopularService } from "./PopularService";
import { TrustedBy } from "./TrustedBy";
import { useRouter } from "next/navigation";

type Props = {};

export const Hero = (props: Props) => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useState<{ categoryId?: string }>({});
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    router.push("/auth/login");
    if (!selectedCategory) return;
    setSearchParams({ categoryId: selectedCategory });
  };

  return (
    <section
      id="home"
      className="relative bg-hero bg-cover bg-center bg-no-repeat min-h-screen "
    >
      <div className="absolute inset-0 bg-custom-gradient opacity-95 z-0" />
      <div className="max-w-6xl mx-auto flex flex-col items-start justify-center py-24 px-4 relative z-10">
        <Trusted />

        <div className="mb-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Find the perfect{" "}
            <span className="text-lightblue">skilled artisan</span> for your
            project
          </h1>
          <p className="text-bordergrey text-lg  max-w-2xl mx-auto leading-relaxed">
            Find the right artisan for your everyday needs — fast, affordable,
            and reliable craftsmanship at your fingertips.
          </p>
        </div>

        {/* Search Section */}
        <div className="w-full max-w-2xl mb-8">
          <div className="flex gap-0 bg-white rounded-full shadow-dropShadow">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search for any service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 text-textgray bg-transparent border-none outline-none  placeholder-gray-500 text-lg"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-darkBlue hover:bg-blue-700 px-8 py-4 rounded-tr-full rounded-br-full  transition-colors duration-200 flex items-center justify-center min-w-[88px]"
            >
              <SearchIcon />
            </button>
          </div>
        </div>

        <PopularService setSearchTerm={setSearchTerm} />
        {/* <TrustedBy /> */}
      </div>
    </section>
  );
};
