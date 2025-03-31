import { useEffect, useRef, useState } from "react";
import { useController, Control } from "react-hook-form";
import { FiChevronDown } from "react-icons/fi";
import { Label } from "@radix-ui/react-label";
import { CustomButton } from "../clickable/CustomButton";

interface FilterProps {
  options: any;
  placeholder: string;
  multiSelect?: boolean;
  name: string;
  label: string;
  control: Control<any>;
  rules?: { required: boolean };
  defaultValue?: any;
}

const CustomControlledMultiSelect = ({
  options,
  placeholder,
  multiSelect = true,
  name,
  label,
  control,
}: FilterProps) => {
  const {
    field: { value = [], onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: "This field is required" },
  });

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    const newSelectedOptions = value?.includes(optionValue)
      ? value?.filter((option: string) => option !== optionValue)
      : [...value, optionValue];

    onChange(newSelectedOptions);
  };

  const selectedLabels = options
    .filter((option: any) => value.includes(option.value))
    .map((option: any) => option.label);

  return (
    <div className="mb-4 space-y-2">
      <Label
        htmlFor={name}
        className="text-base font-semibold capitalize"
      >
        {label}
      </Label>
      <div className="relative" ref={dropdownRef}>
        <CustomButton
          variant="transparent"
          className="w-full flex justify-start items-center h-[45px] rounded-[10px] !hover:bg-transparent "
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-sm line-clamp-1 text-left">
            {placeholder}{" "}
            <span className="font-semibold">
              {selectedLabels.length > 0 ? selectedLabels.join(", ") : "None"}
            </span>
          </p>
          <FiChevronDown className="ml-auto mt-1 size-4 shrink-0" />
        </CustomButton>
        {isOpen && (
          <div className="absolute top-full left-0  w-full bg-white mt-3 shadow-lg rounded-lg p-4 z-10">
            <div className="mb-4">
              {options?.map((option: any) => (
                <div key={option.value} className="mb-2">
                  <label className="flex items-center flex-wrap space-x-2 cursor-pointer group">
                    <div className="relative">
                      <input
                        name={name}
                        type="checkbox"
                        checked={value.includes(option.value)}
                        onChange={() => handleOptionClick(option.value)}
                        className="sr-only peer"
                      />
                      <div
                        className={`
                size-5 border border-gray-300 rounded
                peer-checked:bg-primary peer-checked:border-primary
                group-hover:border-primary transition-colors duration-200
                ${multiSelect ? "" : "rounded-full"}
            `}
                      >
                        {value.includes(option.value) && (
                          <svg
                            className="w-5 h-5 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-700 group-hover:text-primary transition-colors ease-linear duration-200">
                      {option.label}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  );
};

export default CustomControlledMultiSelect;
