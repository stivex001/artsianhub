import { RatingIcon } from "@/components/assets/icons/NavIcons";
import { CustomButton } from "@/components/clickable/CustomButton";
import Image from "next/image";
import React from "react";
import image1 from "@/components/assets/images/port.png";

type Props = {};

export const ArtisanHero = (props: Props) => {
  return (
    <div className="w-10/12 mx-auto py-8 pb-[160px]">
      {/* Top section with button and rating */}
      <div className="flex justify-between mb-6">
        <CustomButton
          label="Leave a review"
          className="!bg-secondary mb-4 sm:mb-0"
        />
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-light text-primary">Rate</h1>
          <div className="relative">
            <RatingIcon />
            <span className="absolute top-5 left-[18px] text-base text-white font-semibold">
              25
            </span>
          </div>
        </div>
      </div>

      {/* Main hero section */}
      <section className="flex flex-col lg:flex-row items-center">
        {/* Left text content */}
        <div className="w-full lg:w-[45%]">
          <p className="text-primary text-base font-semibold">
            The best solution
          </p>
          <h1 className="text-primary text-4xl md:text-5xl lg:text-6xl font-semibold pt-3 pb-6">
            The best solution for every house problem...
          </h1>
          <p className="text-base text-primary font-semibold">
            The best solution for every house <br /> problem... The best
            solution for every house problem...
          </p>
        </div>

        {/* Right image circles */}
        <div className="w-full lg:w-[55%] flex">
          <div className="relative w-full max-w-sm lg:max-w-lg 2xl:max-w-[1000px] aspect-square">
            {/* First circular image */}
            <div className="absolute -left-10 z-10 w-4/5 h-full rounded-full overflow-hidden shadow-dropShadow">
              <Image
                src={image1}
                alt="Construction worker"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            {/* Second circular image (overlapping) */}
            <div className="absolute w-4/5 h-full left-2/4 rounded-full overflow-hidden shadow-dropShadow">
              <Image
                src={image1}
                alt="Construction worker"
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
