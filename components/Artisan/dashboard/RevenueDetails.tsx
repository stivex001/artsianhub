import FilterComponent from "@/components/controlledInputs/FilterComponent";
import CustomBarChart from "@/components/shared/CustomBarChart";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {};

const data = [
  {
    name: "Artisan Revenue",
    value: 200,
    color: "#013975",
    labelColor: "#013975",
  },
];

export const filterOptions = [
  { id: 1, label: "January" },
  { id: 2, label: "February" },
  { id: 3, label: "March" },
  { id: 4, label: "April" },
  { id: 5, label: "May" },
  { id: 6, label: "June" },
  { id: 7, label: "July" },
  { id: 8, label: "August" },
  { id: 9, label: "September" },
  { id: 10, label: "October" },
  { id: 11, label: "November" },
  { id: 12, label: "December" },
];

const RevenueDetails = (props: Props) => {
  const handleFiterChange = () => {
    // Handle filter change
    console.log("Filter changed");
  };

  return (
    <Wrapper className="lg:w-[45%] ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-base font-bold text-paragrah">
          Appointment Review
        </h1>
        <FilterComponent
          onFilterChange={handleFiterChange}
          options={filterOptions}
          showIcon
        />
      </div>
      <CustomBarChart data={data} />
    </Wrapper>
  );
};

export default RevenueDetails;
