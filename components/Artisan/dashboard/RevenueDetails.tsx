import { Filter, FilterOption } from "@/components/controlledInputs/Filter";
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

const periodOptions: FilterOption[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const RevenueDetails = (props: Props) => {
  const [selectedPeriod, setSelectedPeriod] = React.useState<string>("");
  const [selectedStatus, setSelectedStatus] = React.useState<string>("");

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
        <Filter
          placeholder="Monthly"
          options={periodOptions}
          value={selectedPeriod}
          onValueChange={setSelectedPeriod}
          className="w-fit border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <CustomBarChart data={data} />
    </Wrapper>
  );
};

export default RevenueDetails;
