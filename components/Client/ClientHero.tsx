"use client";
import React, { useEffect, useState } from "react";
import hero from "@/components/assets/images/hero2.jpg";
import Image from "next/image";
import {
  CaseIcon,
  LocationIcon,
  SearchLocationIcon,
} from "../assets/icons/OtherIcons";
import { Spinner } from "../shared/Spinner";
import { RecentSearch } from "./RecentSearch";

type Props = {
  onSearch: (q: string, city: string) => void;
  onClear: () => void;
  isLoading: boolean;
  defaultLocation?: string;
};

export const ClientHero = ({
  onSearch,
  isLoading,
  onClear,
  defaultLocation,
}: Props) => {
  const [q, setQ] = useState("");
  const [city, setCity] = useState(defaultLocation || "");

  useEffect(() => {
    if (defaultLocation) setCity(defaultLocation);
  }, [defaultLocation]);

  const handleSearch = () => {
    onSearch(q, city);
  };

  const handleClear = () => {
    setQ("");
    setCity(defaultLocation || "");
    onClear();
  };

  return (
    <section className="min-h-[80vh] lg:h-[70vh] px-5 flex justify-center items-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 ">
        <div className="w-full h-full  bg-gradient-to-r from-black/70 to-black/50">
          <Image
            src={hero}
            alt="Construction worker"
            className="w-full h-full object-cover "
          />
        </div>
        <div className="absolute inset-0 bg-[#0000004D]"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto ">
        <div className="text-center">
          <h1 className="text-3xl lg:text-[40px] font-[900] text-white">
            Find Trusted Artisans Near You
          </h1>
          <p className="text-base lg:text-xl text-white font-medium mb-5">
            Get access to skilled professionals that will meet your
            every day needs...
          </p>

          <div>
            <div className="bg-white max-w-[600px] mx-auto rounded-2xl px-4 py-2 flex flex-col sm:flex-row gap-4 justify-between ">
              {/* Category */}
              <div className="w-full flex items-center gap-2">
                <div className="pointer-events-none">
                  <CaseIcon />
                </div>
                <input
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search artisans, services, or skills..."
                  className="w-full text-grayis placeholder-grayis border-0 focus:ring-0 focus:outline-none text-sm"
                />
                <div className="border border-[#6B728033] h-8" />
              </div>

              {/* Location */}
              <div className="w-full flex items-center gap-2">
                <div className="pointer-events-none">
                  <LocationIcon />
                </div>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter location"
                  className="w-full text-grayis placeholder-grayis border-0 focus:ring-0 focus:outline-none text-sm"
                />
              </div>

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center lg:justify-center gap-2 font-medium text-lg"
              >
                {isLoading ? (
                  <Spinner />
                ) : (
                  <>
                    <SearchLocationIcon />
                    <span className="lg:hidden">Search</span>
                  </>
                )}
              </button>
            </div>
            <div className="pt-8">
              <RecentSearch setSearchTerm={setQ} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
