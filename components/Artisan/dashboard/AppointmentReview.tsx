"use client";

import FilterComponent from "@/components/controlledInputs/FilterComponent";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import { filterOptions } from "./RevenueDetails";

type Props = {};

export const AppointmentReview = (props: Props) => {
  const handleFiterChange = () => {
    // Handle filter change
    console.log("Filter changed");
  };

  return (
    <Wrapper className="lg:w-[55%]">
      <h1 className="text-base font-bold text-paragrah mb-4">
        Appointment Review
      </h1>
      <div className="flex items-center justify-between mb-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-[#667185]">Total Revenue</p>
          <h1 className="text-base font-bold text-paragrah">$20,983</h1>
        </div>
        <FilterComponent
          onFilterChange={handleFiterChange}
          options={filterOptions}
          showIcon
        />
      </div>
    </Wrapper>
  );
};
