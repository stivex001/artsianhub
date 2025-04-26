"use client";

import React, { useState } from "react";
import { CustomButton } from "../clickable/CustomButton";
import Image, { StaticImageData } from "next/image";
import image1 from "@/components/assets/images/port.png";
import CustomPagination from "../shared/CustomPagination";
import { useRouter } from "next/navigation";
import { useArtisans } from "@/api/crud/artisans";
import SkeletonLoader from "@/components/shared/SkeletonModal";

// Types
interface Artisan {
  status: "Available" | "Unavailable";
  accountName: string;
  rating: number;
  id: number;
  photo: StaticImageData;
}

interface Props {
  onClose: (value: boolean) => void;
  // artisans: ArtisanDetails | any;
}

// Mock Data
const artisanData: Artisan[] = Array.from({ length: 6 }).map(() => ({
  id: Math.floor(Math.random()),
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
  const { getAllArtisan } = useArtisans();
  const { data: artisans = [], isLoading } = getAllArtisan();


  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const artisansPerPage = 6;
  const totalPages = Math.ceil(artisans?.length / artisansPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedArtisans = artisans.slice(
    (currentPage - 1) * artisansPerPage,
    currentPage * artisansPerPage
  );

  return (
    <section className=" w-10/12 mx-auto">
      <div className="flex items-center justify-end">
        <CustomButton
          type="button"
          label="Filter"
          className="bg-white text-black"
        />
      </div>
      <div className="flex flex-col gap-10 mt-2">
        <h1 className="font-medium lg:text-5xl text-white text-center">
          Artisan Around You
        </h1>
        <p className="lg:text-5xl font-light text-white text-center">
          Plumber in Chesterfield
        </p>

        <div className="grid lg:grid-cols-3 gap-x-20 gap-y-3">
          {isLoading ? (
            <div className=" rounded-[10px] overflow-hidden w-[300] h-[350px]">
              <SkeletonLoader type="image" count={3} bgColor="white" />
            </div>
          ) : (
            paginatedArtisans?.map((artisan) => (
              <div key={artisan?.artisanId}>
                <div
                  onClick={() => {
                    router.push(`/available-artisan/${artisan?.artisanId}`);
                    onClose;
                  }}
                  className="relative rounded-[10px] overflow-hidden cursor-pointer"
                >
                  <Image
                    src={artisan?.profilePhoto?.url}
                    alt={artisan?.user?.firstName}
                    className="w-full h-full object-cover"
                    width={300}
                    height={350}
                  />
                  <div className="absolute top-0 left-0 p-4 w-full h-full flex flex-col justify-between">
                    <div className="flex justify-between">
                      <span className="font-semibold text-sm text-black">
                        {artisan?.user?.firstName} {artisan?.user?.lastName}
                      </span>
                      <span
                        className={`text-sm px-2 py-1 rounded-[20px] text-white font-semibold ${getStatusColor(
                          "Available"
                        )}`}
                      >
                        Available
                      </span>
                    </div>
                  </div>
                  {/* <div className="flex justify-center mt-auto mb-4">
                  {renderStars(artisan.rating)}
                </div> */}
                </div>
              </div>
            ))
          )}
        </div>

        {totalPages > 1 && (
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default SearchedArtisan;
