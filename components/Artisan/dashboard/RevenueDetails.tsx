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

const filterOptions = [
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
    <Wrapper className="flex-1 px-2 py-8">
      <div className="w-11/12 mx-auto flex items-center justify-between gap-7 mb-8">
        <h1 className="text-xl">Revenue In Dollars $</h1>
        <FilterComponent
          onFilterChange={handleFiterChange}
          options={filterOptions}
          className="!bg-primary rounded-[5px] !text-white"
          showIcon
        />
      </div>
      <CustomBarChart data={data} />
    </Wrapper>
  );
};

export default RevenueDetails;
