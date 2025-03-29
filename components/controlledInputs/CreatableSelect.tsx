"use client";

import React from "react";
import CreatableSelect from "react-select/creatable";
import { useController, Control } from "react-hook-form";
import { Label } from "../ui/label";
import { MultiValue } from "react-select";

type Option = { value: string; label: string };

interface CreatableSelectProps {
  name: string;
  label: string;
  control: Control<any>;
  placeholder?: string;
}

const CreatableSelectComponent: React.FC<CreatableSelectProps> = ({
  name,
  label,
  control,
  placeholder = "Type and press enter...",
}) => {
  const {
    field: { onChange, value },
    fieldState: { error },
  } = useController({ name, control });

  const selectedOptions: Option[] = Array.isArray(value)
    ? value.map((val) => ({ value: val, label: val }))
    : [];

    console.log("Current Value in Form:", value);


  const handleChange = (newValue: MultiValue<Option>) => {
    const selectedValues = newValue?.map((opt) => opt.value);
    onChange(selectedValues); 
  };

  return (
    <div className="space-y-1">
      <Label htmlFor={name} className={`text-base font-semibold capitalize `}>
        {label}
      </Label>
      <CreatableSelect
        isMulti
        value={selectedOptions}
        onChange={handleChange}
        placeholder={placeholder}
        className="mt-1"
        styles={{
          control: (base: any) => ({
            ...base,
            borderRadius: "10px",
            minHeight: "48px",
          }),
        }}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default CreatableSelectComponent;
