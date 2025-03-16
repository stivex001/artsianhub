/* eslint-disable @typescript-eslint/no-explicit-any */
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
  art?: boolean;
  dontShowTime?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
} & React.ComponentProps<typeof Input>;

const ControlledInput: React.FC<ControlledInputProps> = ({
  label,
  name,
  control,
  rules,
  placeholder = "",
  type = "text",
  method,
  variant = "primary",
  dontShowTime = false,
  art = false,
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
    "w-full h-9 py-5 px-4 font-[family-name:var(--font-josefin-sans)]";
  const styles = {
    primary: "border-bordergray bg-gray1 rounded-[10px] focus:ring-primary",
    secondary:
      "border-bordergray bg-white h-14 rounded-[10px] focus:ring-primary",
    tertiary:
      "border border-black focus:border-black rounded-[10px] focus:ring-green-500",
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
      <div className="border border-[#B5B5B5] h-12 rounded-[10px] relative mb-4">
        <Label className="text-[#013975] text-sm font-medium absolute -top-3 left-2 w-fit bg-white px-2 ">
         {label}
        </Label>
        <input
          id={name}
          name={name}
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          ref={ref}
          className={`py-3 w-full bg-transparent outline-none px-3`}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className={`space-y-1`}>
      <Label
        htmlFor={name}
        className={`text-base font-semibold capitalize font-[family-name:var(--font-josefin-sans)]`}
      >
        {label}
      </Label>
      <div className={`flex items-center relative`}>
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

        {type === "color" && (
          <div
            className="w-8 h-8 border rounded"
            style={{ backgroundColor: value || "#ffffff" }}
          />
        )}
        {type === "password" && (
          <div
            className="absolute right-5 cursor-pointer"
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
