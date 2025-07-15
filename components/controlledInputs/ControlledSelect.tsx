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

  if (art) {
    // keep native fallback for art
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
        <Label
          htmlFor={name}
          className={`text-sm font-medium text-paragrah capitalize ${labelClassName} `}
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
