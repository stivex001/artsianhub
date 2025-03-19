"use client";

import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Control, useController } from "react-hook-form";
import { cn } from "@/lib/utils";

type CustomSelectProps = {
  options: any;
  placeholder?: string;
  className?: string;
  dropdownChoice?: boolean;
  name: string;
  label?: string;
  control?: Control<any>;
  rules?: { required: boolean };
  variant?: "primary" | "secondary" | "tertiary";
};

export const CustomSelect = ({
  options,
  placeholder,
  dropdownChoice,
  control,
  rules,
  className,
  label,
  name,
  variant = "primary",
}: CustomSelectProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
    rules,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options?.filter((option: any) =>
    option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const baseStyles =
    "w-full py-2 px-4 h-14 rounded-[8px] border outline-none text-[#64748B] text-base";
  const styles = {
    primary: "focus:border-accent focus:ring-accent",
    secondary:
      "border-yellow-300 focus:border-yellow-500 focus:ring-yellow-500",
    tertiary: "border-green-300 focus:border-green-500 focus:ring-green-500",
    invalid: "border-red-500 focus:border-red-500 focus:ring-red-500",
  };

  const inputClassName = cn(baseStyles, styles[variant], {
    [styles.invalid]: invalid,
  });

  return (
    <div className="mb-4 space-y-2">
      <Label
        htmlFor={name}
        className="text-base capitalize font-semibold"
      >
        {label}
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`${inputClassName} ${className}`}>
          <SelectValue
            className="text-textbrown text-xs"
            placeholder={placeholder}
          />
        </SelectTrigger>
        <SelectContent className="bg-white z-[99]">
          <div className="p-2 sticky top-0 z-50 bg-white">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm mb-2 outline-none"
            />
          </div>

          <SelectGroup>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))
            ) : (
              <div className="p-2 text-gray-500">No options found</div>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && (
        <div className="text-red-400 text-xs flex items-center gap-1 mt-1">
          <div className="w-3 h-3 rounded-full text-white bg-red-500 flex items-center justify-center">
            !
          </div>
          <p>{typeof error === "string" ? error : error.message}</p>
        </div>
      )}
    </div>
  );
};
