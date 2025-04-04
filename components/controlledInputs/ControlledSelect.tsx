import { useState } from "react";
import { Label } from "../ui/label";
import { Control, useController } from "react-hook-form";
import { cn } from "../../lib/utils";

type CustomSelectProps = {
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
  name: string;
  label?: string;
  control?: Control<any>;
  rules?: { required: boolean };
  variant?: "primary" | "secondary" | "tertiary" | "normal";
  art?: boolean;
  labelClassName?: string;
};

export const ControlledSelect = ({
  options,
  placeholder,
  control,
  rules,
  className,
  label,
  name,
  variant = "primary",
  art = false,
  labelClassName,
}: CustomSelectProps) => {
  const {
    field: { onChange, value, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
    rules,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options?.filter((option) =>
    option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const baseStyles =
    "w-full text-white py-3 px-4 placeholder:text-lightgray border";
  const styles = {
    normal:
      "border-white bg-white rounded-[10px] h-14 text-black focus:ring-primary",
    primary:
      "border border-bordergray bg-bordergrey rounded-[10px] focus:ring-primary",
    secondary:
      "border border-bordergray  h-14 rounded-[10px] focus:ring-primary",
    tertiary:
      "border border-black text-[#9694A4] focus:border-black rounded-[10px] focus:ring-green-500",
    invalid: "border-red-500 focus:border-red-500 focus:ring-red-500",
  };
  const inputClassName = cn(baseStyles, styles[variant], {
    [styles.invalid]: invalid,
  });

  if (art) {
    return (
      <div>
        <div
          className={`border border-[#B5B5B5]  rounded-[10px] relative mb-4 ${className}`}
        >
          <Label
            className={`text-[#013975] text-sm font-medium absolute -top-3 left-2 w-fit bg-white px-2 ${labelClassName}`}
          >
            {label}
          </Label>
          <select
            ref={ref}
            id={name}
            name={name}
            value={value ?? ""}
            onChange={onChange}
            className={`w-full bg-transparent outline-none py-4 px-3`}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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
      {label && (
        <Label htmlFor={name} className="text-base font-semibold capitalize">
          {label}
        </Label>
      )}

      <div className="relative">
        {/* <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search options..."
          className="absolute top-0 left-0 w-full px-4 py-2 border border-gray-300 rounded-lg text-sm mb-2 outline-none z-10"
        /> */}

        <select
          ref={ref}
          id={name}
          name={name}
          value={value ?? ""}
          onChange={onChange}
          className={`${inputClassName} ${className}`}
        >
          {/* {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option disabled>No options found</option>
          )} */}
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

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
