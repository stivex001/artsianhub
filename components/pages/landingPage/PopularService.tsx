"use client";
import React from "react";

type Props = {
  setSearchTerm: (value: string) => void;
};

// Popular service categories
const popularServices = [
  "Custom Tailoring",
  "Personal Chef",
  "Furniture Making",
  "Logo Design",
  "Home Repair",
];

export const PopularService = ({ setSearchTerm }: Props) => {
  return (
    <div className="mb-16 ">
      <div className="flex flex-wrap items-center gap-3 ">
        <p className="text-textgray mb-4 text-sm mt-2 ">Popular:</p>
        {popularServices.map((service, index) => (
          <button
            key={index}
            onClick={() => setSearchTerm(service)}
            className="px-4 py-2 border border-[#FFFFFF33] text-white rounded-full text-sm transition-colors duration-200 hover:border-slate-500"
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  );
};
