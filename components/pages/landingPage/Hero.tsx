"use client";

import { category, location } from "@/components/data/dummy";
import { DropdownModal } from "@/components/shared/DropdownModal";
import React, { useState } from "react";
import { CustomButton } from "@/components/clickable/CustomButton";
import FilterComponent from "@/components/controlledInputs/FilterComponent";

type Props = {};

export const Hero = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const categoryOption = category?.map((cat: any) => ({
    value: cat?.value,
    label: cat?.label,
  }));

  const handleFiterChange = () => {
    // Handle filter change
    console.log("Filter changed");
  };

  return (
    <div className="relative bg-hero bg-cover bg-center bg-no-repeat aspect-[3/2] flex flex-col items-center justify-center ">
      <div className="flex flex-col justify-between">
        <h1 className="text-4xl lg:text-6xl text-center text-white font-[300] ">
          find and Hire Skilled Artisans
        </h1>

        <div className="w-8/12 lg:w-10/12 mx-auto bg-secondary rounded-[20px] px-6 py-4 text-white shadow-dropShadow mt-14 flex flex-col gap-5">
          <h1 className="text-xs lg:text-base text-center font-bold  ">
            Find Artisans Close to your Area
          </h1>
          <div className="flex flex-wrap items-center justify-between">
            <div className="">
              <p className="font-semibold text-[10px] text-white">Category</p>
              <FilterComponent
                onFilterChange={handleFiterChange}
                options={category}
                className="rounded-[20px] text-sm lg:text-xl "
                showIcon
                iconStyle="!text-black"
                filterStyle
              />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <p className="font-bold text-xs lg:text-sm text-white">From</p>
              <FilterComponent
                onFilterChange={handleFiterChange}
                options={location}
                className="rounded-[20px] text-sm lg:text-xl "
                showIcon
                iconStyle="!text-black"
                filterStyle
              />
            </div>
            <CustomButton className="bg-[#5691D1] !w-[110px] mt-2">
              Search
            </CustomButton>
          </div>
        </div>
        <h1 className="pt-20 text-5xl text-white text-center">Uncover</h1>
      </div>
    </div>
  );
};
