"use client";

import { PolygonWhite } from "@/components/assets/icons/NavIcons";
import { category } from "@/components/data/dummy";
import { DropdownModal } from "@/components/shared/DropdownModal";
import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";
import { CategoriesContent } from "./CategoriesContent";
import { CustomButton } from "@/components/clickable/CustomButton";

type Props = {};

export const Hero = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const categoryOption = category?.map((cat: any) => ({
    value: cat?.value,
    label: cat?.label,
  }));

  return (
    <div className="relative bg-hero bg-cover bg-center bg-no-repeat aspect-[3/2] flex flex-col items-center justify-center ">
      <div className="flex flex-col justify-between">
        <h1 className="text-4xl lg:text-6xl text-center text-white font-[300px] ">
          find and Hire Skilled Artisans
        </h1>
        <div className="w-8/12 lg:w-10/12 mx-auto bg-secondary rounded-[20px] px-6 py-4 text-white shadow-dropShadow mt-14 flex flex-col gap-5">
          <h1 className="text-xs lg:text-base text-center font-bold  ">
            Find Artisans Close to your Area
          </h1>
          <div className="flex flex-wrap items-center justify-between">
            <div className="">
              <p className="font-semibold text-[10px] text-white">
                Category
              </p>
              <div className="relative">
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className="w-[100px] lg:w-[189px] flex items-center justify-between rounded-[20px] py-2 lg:py-4 px-1.5 lg:px-4 truncate text-black font-light text-left text-sm bg-white"
                >
                  <h3 className="font-[300px] text-xs lg:text-xl font-[family-name:var(--font-josefin-sans)] text-primary">
                    {category?.[0]?.label}
                  </h3>

                  <ChevronDownIcon
                    className="pointer-events-none size-4 lg:size-6 text-black"
                    aria-hidden="true"
                  />
                </button>
                <DropdownModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                  icon={PolygonWhite}
                  className=""
                >
                  <CategoriesContent />
                </DropdownModal>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <p className="font-bold text-xs lg:text-sm text-white font-[family-name:var(--font-josefin-sans)]">
                From
              </p>
              <div className="relative">
                <button
                  onClick={() => setIsLocationModalOpen(!isLocationModalOpen)}
                  className="w-[100px] lg:w-[189px] flex items-center justify-between rounded-[20px] py-2 lg:py-4 px-1.5 lg:px-4 truncate text-black font-light text-left text-sm bg-white"
                >
                  <h3 className="font-[300px] text-xs lg:text-xl font-[family-name:var(--font-josefin-sans)] text-primary">
                    {category?.[0]?.label}
                  </h3>

                  <ChevronDownIcon
                    className="pointer-events-none size-4 lg:size-6 text-black"
                    aria-hidden="true"
                  />
                </button>
                <DropdownModal
                  isOpen={isLocationModalOpen}
                  onClose={() => setIsLocationModalOpen(false)}
                  icon={PolygonWhite}
                  className=""
                >
                  <CategoriesContent />
                </DropdownModal>
              </div>
            </div>
            <CustomButton className="bg-[#5691D1] !w-[110px] mt-2">
              Search
            </CustomButton>
          </div>
        </div>
      </div>
      <h1 className="hidden lg:absolute bottom-16 z-50 text-5xl text-white font-[family-name:var(--font-josefin-sans)]">
        Uncover
      </h1>
    </div>
  );
};
