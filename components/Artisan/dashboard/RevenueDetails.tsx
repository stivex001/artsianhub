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
  { id: "January", label: "January" },
  { id: "Febuary", label: "Febuary" },
  { id: "March", label: "March" },
  { id: "April", label: "April" },
  { id: "May", label: "May" },
  { id: "June", label: "June" },
  { id: "July", label: "July" },
  { id: "August", label: "August" },
  { id: "September", label: "September" },
  { id: "October", label: "October" },
  { id: "November", label: "November" },
  { id: "December", label: "December" },
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
