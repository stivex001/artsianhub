import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";

export interface FilterOption {
  value: string;
  label: string;
}

interface FilterProps {
  placeholder?: string;
  options: FilterOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  defaultValue?: string;
}

export const Filter: React.FC<FilterProps> = ({
  placeholder = "Filter by...",
  options,
  value,
  onValueChange,
  className = "",
  disabled = false,
  defaultValue,
}) => {
  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
      defaultValue={defaultValue}
    >
      <SelectTrigger className={`w-full min-w-[150px] ${className}`}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
