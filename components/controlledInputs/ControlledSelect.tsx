import { Label } from "../ui/label";
import { Control, useController } from "react-hook-form";
import { cn } from "../../lib/utils";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDownIcon } from "lucide-react";

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
  multi?: boolean;
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
  multi = false,
}: CustomSelectProps) => {
  const {
    field: { onChange, value },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
    rules,
  });

  const baseStyles =
    "w-full text-[#98A2B3] !h-14 py-3 px-4 placeholder:text-[#98A2B3] border rounded-[10px] !focus:none !outline-none ";
  const styles = {
    normal: "!border-white bg-white !h-14 text-black ",
    primary: "border-[#E4E5EA] bg-white ",
    secondary: "border-bordergray bg-white text-black h-14 ",
    tertiary:
      "border border-black text-[#9694A4] focus:border-black focus:ring-green-500",
    invalid: "border-red-500 focus:border-red-500 focus:ring-red-500",
  };

  const inputClassName = cn(baseStyles, styles[variant], {
    [styles.invalid]: invalid,
  });

  if (multi) {
    // Handle both array and string formats
    let selectedValues: string[] = [];
    
    if (Array.isArray(value)) {
      selectedValues = value;
    } else if (typeof value === 'string' && value) {
      // If it's a comma-separated string, convert it to array
      selectedValues = value.split(',').map(v => v.trim()).filter(Boolean);
    }

    const toggleOption = (optionValue: string) => {
      let newValues: string[] = [];
      if (selectedValues.includes(optionValue)) {
        newValues = selectedValues.filter((v) => v !== optionValue);
      } else {
        newValues = [...selectedValues, optionValue];
      }
      // Always ensure we're passing an array
      onChange(newValues);
    };

    return (
      <div className="space-y-2">
        {label && (
          <Label
            htmlFor={name}
            className={`text-sm font-medium text-paragrah capitalize ${labelClassName}`}
          >
            {label}
          </Label>
        )}

        <Popover>
          <PopoverTrigger
            className={cn(
              inputClassName,
              className,
              "text-left flex items-center justify-between"
            )}
          >
            {selectedValues.length > 0
              ? `${selectedValues.length} option(s) selected`
              : placeholder || "Select..."}

            <ChevronDownIcon className="size-6 opacity-50 text-black" />
          </PopoverTrigger>

          <PopoverContent className="bg-white p-2">
            {options?.map((option) => {
              const isChecked = selectedValues.includes(option.value);

              return (
                <div
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className="w-full flex items-center space-x-2 mb-2 cursor-pointer"
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggleOption(option.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span>{option.label}</span>
                </div>
              );
            })}
          </PopoverContent>
        </Popover>

        {selectedValues.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedValues.map((val) => {
              const opt = options.find((o) => o.value === val);
              return (
                <div
                  key={val}
                  className="px-3 py-1.5 bg-[#1129A00D] rounded-[20px] text-xs font-medium text-body flex items-center gap-1"
                >
                  <span>{opt?.label || val}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newValues = selectedValues.filter((v) => v !== val);
                      onChange(newValues);
                    }}
                    className="hover:text-red-700"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {error && (
          <div className="text-red-400 text-xs mt-1">
            {typeof error === "string" ? error : error.message}
          </div>
        )}
      </div>
    );
  }

  if (art) {
    return (
      <div>
        <div
          className={`border border-[#B5B5B5] rounded-[10px] relative mb-4 ${className}`}
        >
          <Label
            className={`text-[#013975] text-sm font-medium absolute -top-3 left-2 w-fit bg-white px-2 ${labelClassName}`}
          >
            {label}
          </Label>
          <select
            id={name}
            name={name}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
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
        <Label
          htmlFor={name}
          className={`text-sm font-medium text-paragrah capitalize ${labelClassName}`}
        >
          {label}
        </Label>
      )}

      <ShadcnSelect value={value} onValueChange={onChange}>
        <SelectTrigger className={cn(inputClassName, className)}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>

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