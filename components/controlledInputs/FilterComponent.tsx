import React, { useEffect, useState } from "react";
import filter from "@/components/assets/images/filter.svg";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface Filter {
  id: string;
  label: string;
  value?: string;
}

type FilterProps = {
  onFilterChange: (filterId: string) => void;
  options: any[];
  value?: string;
  className?: string;
  showIcon?: boolean;
  iconStyle?: string;
  filterStyle?: boolean;
};

const FilterComponent = ({
  onFilterChange,
  options,
  value,
  className,
  showIcon,
  iconStyle,
  filterStyle,
}: FilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(value ?? null);

  useEffect(() => {
    if (value !== undefined && value !== selectedFilter) {
      setSelectedFilter(value);
    }
  }, [value]);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFilterSelect = (filter: Filter) => {
    setSelectedFilter(filter.id);
    onFilterChange(filter.id); // now string
    setIsOpen(false);
  };

  const getSelectedFilterLabel = () => {
    const selected = options?.find((filter) => filter.id === selectedFilter);
    return selected?.label || options?.[0]?.label || "Select";
  };

  return (
    <div className="relative z-20">
      <button
        onClick={toggleDropdown}
        className={`${
          filterStyle ? "lg:min-w-[180px]" : "lg:min-w-[120px]"
        } min-w-[300px] flex items-center justify-between gap-2 px-4 py-1.5 bg-white rounded-[20px] h-[50px] border border-black hover:bg-gray-50 transition-colors ${className}`}
      >
        <div className="flex items-center gap-2">
          {!showIcon && (
            <Image src={filter} alt="logo" className="text-white" />
          )}
          <span className={`text-sm lg:text-xl font-[300] text-black ${className}`}>
            {getSelectedFilterLabel()}
          </span>
        </div>
        {showIcon && (
          <ChevronDown
            className={`${iconStyle} text-white transition-transform duration-200 size-4 lg:size-6 ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg z-[99] rounded-[10px] border border-black">
          <ul className="py-1">
            {options?.map((filter) => (
              <li key={filter.id} className="px-1">
                <button
                  onClick={() => handleFilterSelect(filter)}
                  className={`w-full text-left px-3 py-2 text-sm font-[300] rounded-md ${
                    selectedFilter === filter.id
                      ? "bg-secondary text-white"
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
