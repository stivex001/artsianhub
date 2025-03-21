"use client";

import React, { useState } from "react";
import { CustomButton } from "../clickable/CustomButton";
import Image, { StaticImageData } from "next/image";
import image1 from "@/components/assets/images/port.png";
import CustomPagination from "../shared/CustomPagination";

// Types
interface Artisan {
  status: "Available" | "Unavailable";
  accountName: string;
  rating: number;
  photo: StaticImageData;
}

interface Props {
  onClose: (value: boolean) => void;
}

// Mock Data
const artisanData: Artisan[] = Array.from({ length: 6 }).map(() => ({
  status: Math.random() > 0.5 ? "Available" : "Unavailable",
  accountName: "John Henry",
  rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
  photo: image1,
}));

// Helper: Get status color
const getStatusColor = (status: Artisan["status"]): string =>
  status === "Available" ? "bg-primary" : "bg-[#B5B5B5]";

// Helper: Render star ratings
const renderStars = (rating: number) => {
  return Array.from({ length: 5 }).map((_, index) => (
    <span
      key={index}
      className={index < rating ? "text-primary" : "text-white"}
    >
      ★
    </span>
  ));
};

const SearchedArtisan: React.FC<Props> = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(3);

  const totalPages = 6;

  const handlePageChange = (page: number) => {
    console.log(`Changing to page ${page}`);
    setCurrentPage(page);
  };

  return (
    <section className="w-10/12 mx-auto">
      <div className="flex items-center justify-end">
        <CustomButton
          type="button"
          label="Filter"
          className="bg-white text-black"
        />
      </div>
      <div className="flex flex-col gap-10 mt-2">
        <h1 className="font-medium text-5xl text-white text-center">
          Artisan Around You
        </h1>
        <p className="text-5xl font-light text-white text-center">
          Plumber in Chesterfield
        </p>

        <div className="grid grid-cols-3 gap-x-20 gap-y-3">
          {artisanData.map((artisan, index) => (
            <div key={index}>
              <div className="relative rounded-[10px] overflow-hidden">
                <Image
                  src={artisan.photo}
                  alt={artisan.accountName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 p-4 w-full h-full flex flex-col justify-between">
                  <div className="flex justify-between">
                    <span className="font-semibold text-sm text-black">
                      {artisan.accountName}
                    </span>
                    <span
                      className={`text-sm px-2 py-1 rounded-[20px] text-white font-semibold ${getStatusColor(
                        artisan.status
                      )}`}
                    >
                      {artisan.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-center mt-auto mb-4">
                  {renderStars(artisan.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>

        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default SearchedArtisan;
