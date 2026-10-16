"use client";

import React, { useState } from "react";
import Image, { StaticImageData } from "next/image";
import image1 from "@/components/assets/images/port.png";
import CustomPagination from "../shared/CustomPagination";
import { useRouter } from "next/navigation";
import { ArtisanByCategory, ArtisanDetails } from "@/apis/crud/artisans";
import SkeletonLoader from "@/components/shared/SkeletonModal";
import { RenderRatings } from "@/utils/RenderRatings";

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
  artisans?: ArtisanDetails | any;
  isLoading?: boolean;
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

const SearchedArtisan: React.FC<Props> = ({ onClose, artisans, isLoading }) => {
  const artisansData = artisans?.services;
  const pagination = artisans?.pagination;

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage);
  const totalPages = pagination?.totalPages;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log(artisansData?.[0]?.categoryId?.name, "dtatattatat");

  return (
    <section className=" w-10/12 mx-auto">
      {/* <div className="flex items-center justify-end">
        <CustomButton
          type="button"
          label="Filter"
          className="bg-white text-black"
        />
      </div> */}
      <div className="flex flex-col gap-10 mt-2">
        <h1 className="font-medium lg:text-5xl text-white text-center">
          Artisan Around You
        </h1>
        <p className="lg:text-5xl font-light text-white text-center">
          {artisansData?.[0]?.categoryId?.name} in Chesterfield
        </p>

        <div className="grid lg:grid-cols-3 gap-x-20 gap-y-3">
          {isLoading ? (
            <div className=" rounded-[10px] overflow-hidden w-[300] h-[350px]">
              <SkeletonLoader type="image" count={3} bgColor="white" />
            </div>
          ) : (
            artisansData?.map((artisan: ArtisanByCategory) => (
              <div key={artisan?.artisanId?._id}>
                <div
                  onClick={() => {
                    router.push(
                      `/available-artisan/${artisan?.artisanId?._id}`
                    );
                    onClose;
                  }}
                  className="relative rounded-[10px] h-[350px] border overflow-hidden cursor-pointer"
                >
                  <Image
                    src={artisan?.profilePhoto?.url}
                    alt={artisan?.artisanId?.firstName}
                    className="w-full h-full object-cover"
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute top-0 left-0 p-4 w-full h-full flex flex-col justify-between">
                    <div className="flex justify-between">
                      <span className="font-semibold text-sm text-black">
                        {artisan?.artisanId?.firstName}{" "}
                        {artisan?.artisanId?.lastName}
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
                </div>
                <div className="flex justify-center mt-auto mb-4">
                  <RenderRatings rating={artisan?.ratings} />
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
            showGoToPage={false}
          />
        )}
      </div>
    </section>
  );
};

export default SearchedArtisan;
