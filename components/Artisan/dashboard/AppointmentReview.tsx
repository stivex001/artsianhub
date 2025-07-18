"use client";

import FilterComponent from "@/components/controlledInputs/FilterComponent";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import { Filter, FilterOption } from "@/components/controlledInputs/Filter";

type Props = {};

const periodOptions: FilterOption[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

export const AppointmentReview = (props: Props) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>("");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");

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
        <Filter
          placeholder="Monthly"
          options={periodOptions}
          value={selectedPeriod}
          onValueChange={setSelectedPeriod}
          className="w-fit border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </Wrapper>
  );
};
