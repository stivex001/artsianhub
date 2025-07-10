"use client";
import { MapPin, Search } from "lucide-react";
import React, { useState } from "react";
import hero from "@/components/assets/images/clienthero.jpg";
import Image from "next/image";

type Props = {};

export const ClientHero = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Chesterfield");

  return (
    <section className=" lg:h-[70vh] pt-16 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 ">
        <div className="w-full h-full  bg-gradient-to-r from-black/70 to-black/50">
          <Image
            src={hero}
            alt="Construction worker"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-[#0000004D]"></div>
      </div>

      {/* Hero Content */}
      <div className="relative  z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-3xl lg:text-[40px] font-[900] text-white">
            Find Trusted Artisans Near You
          </h1>
          <p className="text-base lg:text-xl text-white font-medium mb-12">
            Get access to skilled professionals for your home or office needs.
          </p>

          {/* Search Interface */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2">
              {/* Search Input */}
              <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search artisans, services, or skills..."
                  className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-500 border-0 focus:ring-0 focus:outline-none text-lg"
                />
              </div>

              {/* Location Input */}
              <div className="relative sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  className="w-full pl-12 pr-4 py-4 text-gray-700 placeholder-gray-500 border-0 focus:ring-0 focus:outline-none text-lg sm:border-l sm:border-gray-200"
                />
              </div>

              {/* Search Button */}
              <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center lg:justify-center gap-2 font-medium text-lg">
                <Search size={20} className="sm:mr-2" />
                <span className="">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
