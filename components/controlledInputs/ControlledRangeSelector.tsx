/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useController, Control } from "react-hook-form";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type ControlledInputProps = {
  name: string;
  label: string;
  control?: Control<any>;
  rules?: { required: boolean; pattern?: RegExp; maxLength?: number };
  placeholder?: string;
  type?: string;
  desc?: string;
  className?: string;
  labelClassName?: string;
  minLength?: number;
  maxLength?: number;
  variant?: "primary" | "secondary" | "tertiary" | "normal";
} & React.ComponentProps<typeof Input>;

const ControlledRangeSelector: React.FC<ControlledInputProps> = ({
  label,
  name,
  control,
  rules,
  placeholder = "",
  type = "text",
  desc,
  variant = "primary",
  className,
  labelClassName,
  maxLength = "0",
  minLength = "200",

  ...props
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
    rules,
  });

  const baseStyles =
    "w-full text-[#98A2B3] py-3 px-4 placeholder:text-[#98A2B3] border rounded-[10px] outline-none ";
  const styles = {
    normal: "border-white bg-white h-14 text-black ",
    primary: "border-[#E4E5EA] bg-white ",
    secondary: "border-bordergray bg-white text-black h-14 ",
    tertiary:
      "border border-black text-[#9694A4] focus:border-black focus:ring-green-500",
    invalid: "border-red-500 focus:border-red-500 focus:ring-red-500",
  };

  const inputClassName = cn(baseStyles, styles[variant], {
    [styles.invalid]: invalid,
  });



  return (
    <div className="space-y-1">
      <Label
        htmlFor={name}
        className={`text-sm font-medium text-paragrah capitalize ${labelClassName} `}
      >
        {label}
      </Label>
      {desc && <p className="text-sm text-[#667185]">{desc}</p>}
      <div className="flex items-center gap-5 mt-2">
        <div className="flex-1 ">
          <input
            id={name}
            name={name}
            type={type}
            min={minLength}
            max={maxLength}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            {...props}
            style={{
              background: `linear-gradient(to right, #1129A0 0%, #1129A0 ${
                (Number(value) / Number(maxLength)) * 100
              }%, #e5e7eb ${
                (Number(value) / Number(maxLength)) * 100
              }%, #e5e7eb 100%)`,
            }}
          />
        </div>
        <span className="text-base font-semibold text-gray-900 min-w-[60px]">
          {value}m
        </span>
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500 capitalize">{error.message}</p>
      )}

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 2px solid #1129A0;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #1129A0;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

export default ControlledRangeSelector;
