/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { useController, Control } from "react-hook-form";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { EyeIcon } from "../assets/icons/NavIcons";

type ControlledInputProps = {
  name: string;
  label: string;
  control?: Control<any>;
  rules?: { required: boolean; pattern?: RegExp; maxLength?: number };
  placeholder?: string;
  type?: string;
  method?: string;
  className?: string;
  labelClassName?: string;
  art?: boolean;
  dontShowTime?: boolean;
  isTextArea?: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  cols?: number;
  variant?: "primary" | "secondary" | "tertiary"| "normal";
} & React.ComponentProps<typeof Input>;

const ControlledInput: React.FC<ControlledInputProps> = ({
  label,
  name,
  control,
  rules,
  placeholder = "",
  type = "text",
  isTextArea = false,
  method,
  variant = "primary",
  dontShowTime = false,
  art = false,
  className,
  labelClassName,
  maxLength,
  minLength,
  rows = 4,
  cols = 50,
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

  const baseStyles = "w-full text-white py-3 px-4 placeholder:text-lightgray border";
  const styles = {
    normal:
      "border-white bg-white rounded-[10px] h-14 text-black focus:ring-primary",
    primary:
      "border border-bordergray bg-bordergrey rounded-[10px] focus:ring-primary",
    secondary:
      "border-bordergray bg-white text-black h-14 rounded-[10px] focus:ring-primary",
    tertiary:
      "border border-black text-[#9694A4] focus:border-black rounded-[10px] focus:ring-green-500",
    invalid: "border-red-500 focus:border-red-500 focus:ring-red-500",
  };

  const inputClassName = cn(baseStyles, styles[variant], {
    [styles.invalid]: invalid,
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (art) {
    return (
      <div>
        <div
          className={`border border-[#B5B5B5]  rounded-[10px] relative mb-4 ${className}`}
        >
          <Label
            className={`text-primary text-sm font-medium absolute -top-3 left-2 w-fit bg-white px-2 ${labelClassName}`}
          >
            {label}
          </Label>
          {isTextArea ? (
            <textarea
              id={name}
              name={name}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              className={`bg-transparent outline-none py-4 px-3 placeholder:text-white h-auto resize-none`}
              maxLength={maxLength}
              minLength={minLength}
              rows={rows}
              cols={cols}
            />
          ) : (
            <input
              id={name}
              name={name}
              type={type === "password" && showPassword ? "text" : type}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              ref={ref}
              className="py-3 w-full bg-transparent outline-none px-3 placeholder:text-white"
              {...props}
            />
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-red-500 capitalize">
            {error.message}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <Label
        htmlFor={name}
        className={`text-base font-semibold capitalize ${labelClassName} `}
      >
        {label}
      </Label>

      <div className="relative">
        {isTextArea ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            className={`${inputClassName} h-auto resize-none`}
            maxLength={maxLength}
            minLength={minLength}
            rows={rows}
            cols={cols}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type === "password" && showPassword ? "text" : type}
            placeholder={placeholder}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            ref={ref}
            className={inputClassName}
            {...props}
          />
        )}

        {type === "password" && !isTextArea && (
          <div
            className="absolute right-5 top-1/2 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            <EyeIcon />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500 capitalize">{error.message}</p>
      )}
    </div>
  );
};

export default ControlledInput;
