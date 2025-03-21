import { RatingIcon } from "@/components/assets/icons/NavIcons";
import { CustomButton } from "@/components/clickable/CustomButton";
import Image from "next/image";
import React from "react";
import image1 from "@/components/assets/images/port.png";

type Props = {};

export const ArtisanHero = (props: Props) => {
  return (
    <div className="w-10/12 mx-auto">
      <div className="flex items-center justify-between mb-3">
        <CustomButton label="Leave a review" className="!bg-secondary" />
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
      <section className="flex items-center justify-between">
        <div className="w-[40%]">
          <p className="text-primary text-base font-semibold">
            The best solution
          </p>
          <h1 className="text-primary text-6xl font-semibold pt-3 pb-8">
            The best solution for every house problem...
          </h1>
          <p className="text-base text-primary font-semibold">
            The best solution for every house problem... The best solution for
            every house problem...
          </p>
        </div>
        <div className="w-[60%]  flex -space-x-48 ">
        {/* <div className="w-[220px] h-1 bg-primary mx-auto absolute bottom-0"/> */}
          <div className="flex-1 ">
            <Image src={image1} alt="" className="rounded-full shadow-dropShadow" />
          </div>
          <div className="flex-1">
            <Image src={image1} alt="" className="rounded-full shadow-dropShadow " />
          </div>
          
        </div>
      </section>
    </div>
  );
};
