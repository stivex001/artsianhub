import React, { useState } from "react";
import filter from "@/components/assets/images/filter.svg";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface Filter {
  id: string;
  label: string;
}

type filterProps = {
  onFilterChange: (filterId: string) => void;
  options: Filter[];
  className?: string;
  showIcon?: boolean;
};

const FilterComponent = ({
  onFilterChange,
  options,
  className,
  showIcon,
}: filterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Sample filter options - replace with your actual options

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFilterSelect = (filter: any) => {
    setSelectedFilter(filter.id);
    if (onFilterChange) {
      onFilterChange(filter.id);
    }

    // Close dropdown after selection
    setIsOpen(false);
  };

  // Get the label of the currently selected filter
  const getSelectedFilterLabel = () => {
    if (!selectedFilter) return "Filter";
    const selected = options?.find((filter) => filter.id === selectedFilter);
    return selected ? selected.label : options?.[0]?.label;
  };

  return (
    <div className="relative z-20">
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-between gap-2 px-4 py-1.5 bg-white rounded-[20px] h-[50px] border border-black hover:bg-gray-50 transition-colors ${className}`}
        style={{ minWidth: "120px" }}
      >
        <div className="flex items-center gap-2">
          {!showIcon && (
            <Image src={filter} alt="logo" className="text-white" />
          )}
          <span className={`text-sm text-black ${className}`}>
            {getSelectedFilterLabel()}
          </span>
        </div>
        {showIcon && (
          <ChevronDown
            size={18}
            className={`text-white transition-transform duration-200 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-10 rounded-[10px] border border-black">
          <ul className="py-1">
            {options?.map((filter) => (
              <li key={filter.id} className="px-1">
                <button
                  onClick={() => handleFilterSelect(filter)}
                  className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                    selectedFilter === filter.id
                      ? "bg-purple-100 text-blackColor"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {filter.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
