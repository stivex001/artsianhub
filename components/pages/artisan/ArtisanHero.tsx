"use client";
import { RatingIcon } from "@/components/assets/icons/NavIcons";
import { CustomButton } from "@/components/clickable/CustomButton";
import Image from "next/image";
import React, { useState } from "react";
import { ArtisanDetails, useArtisans } from "@/apis/crud/artisans";

type Props = {
  selectedArtisan: any;
};

export const ArtisanHero = ({ selectedArtisan }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const { getArtisanRating } = useArtisans();

  const { data: ratings } = getArtisanRating(selectedArtisan?._id as string);

  return (
    <div className="w-11/12 mx-auto py-8 pb-[160px]">
      <div className="flex justify-between mb-6">
        <CustomButton
          label="Leave a review"
          className="!bg-secondary mb-4 sm:mb-0"
          onClick={() => setShowModal(true)}
        />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-light text-primary">Rate</h1>
          <div className="relative">
            <RatingIcon />
            <span className="absolute top-5 left-[20px] text-base text-white font-semibold">
              {ratings?.totalRating}
            </span>
          </div>
        </div>
      </div>

      {/* Main hero section */}
      <section className="flex flex-col gap-10 lg:gap-0 lg:flex-row items-center">
        {/* Left text content */}
        <div className="w-full lg:w-[45%]">
          <p className="text-primary text-base font-semibold">
            The best solution
          </p>
          <h1 className="text-primary max-w-lg text-4xl md:text-5xl lg:text-6xl font-semibold pt-3 pb-6">
            The best solution for every house problem...
          </h1>
          <p className="text-base text-primary font-semibold">
            The best solution for every house <br /> problem... The best
            solution for every house problem...
          </p>
        </div>

        {/* Right image circles */}
        <div className="w-[55%] flex">
          <div className="relative w-full max-w-sm lg:max-w-lg 2xl:max-w-[1000px] aspect-square">
            {/* First circular image */}
            <div className="absolute -left-10 z-10 w-4/5 h-full rounded-full overflow-hidden shadow-dropShadow">
              <Image
                src={selectedArtisan?.profilePhoto?.url}
                alt={selectedArtisan?.user?.firstName}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            {/* Second circular image (overlapping) */}
            <div className="absolute w-4/5 h-full left-2/4 rounded-full overflow-hidden shadow-dropShadow">
              <Image
                src={selectedArtisan?.profilePhoto?.url}
                alt={selectedArtisan?.user?.firstName}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            {/* Bottom indicator line */}
            <div className="absolute -bottom-10 left-[60%] -translate-x-1/2 w-1/3 h-1 bg-blue-900 rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
};
