import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "../ui/select";

type OptionType = {
  // id: number;
  value: string;
  label: string;
  // flag: string;
};

type Props = {
  desc?: string;
  options: OptionType[];
};

const Dropdown = ({ desc, options }: Props) => {
  const [selectedValue, setSelectedValue] = useState(options?.[0]?.value || ""); // Default value is first option

  const selectedOption = options?.find((opt) => opt?.value === selectedValue);

  return (
    <Select value={selectedValue} onValueChange={setSelectedValue}>
      <SelectTrigger className="flex items-center w-[189px] h-12 bg-white py-5 rounded-[20px]  focus:ring-0 focus:outline-none">
        <p className="font-bold text-base text-black font-[family-name:var(--font-josefin-sans)]">
          {selectedOption?.label}
        </p>
      </SelectTrigger>

      <SelectContent className="py-3 bg-white">
        {desc && (
          <div className="px-4 border-b">
            <p className="font-bold text-base text-black font-[family-name:var(--font-josefin-sans)]">{desc}</p>
          </div>
        )}
        <SelectGroup>
          {options?.length > 0 ? (
            options?.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="px-4"
              >
                <div className="flex items-center gap-5 h-14">
                  <p className="font-bold text-base text-black font-[family-name:var(--font-josefin-sans)]">
                    {option.label}
                  </p>
                </div>
              </SelectItem>
            ))
          ) : (
            <div className="p-2 text-gray-500">No options found</div>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
