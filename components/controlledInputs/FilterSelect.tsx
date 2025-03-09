"use client";

import { cn } from "@/lib/utils";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

type Option = {
  id?: string | number;
  name?: string;
  [key: string]: any;
};

interface FilterSelectProps<T extends Option | string> {
  options: T[];
  label?: string;
  keyExtractor?: (item: T) => React.Key;
  displayExtractor?: (item: T) => string;
  onChange?: (selectedItem: T) => void;
  value?: T;
  className?: string;
}

function FilterSelect<T extends Option | string>({
  options,
  label,
  keyExtractor = (item) =>
    typeof item === "object" ? item?.id ?? JSON.stringify(item) : item,
  displayExtractor = (item) =>
    typeof item === "object"
      ? item?.name ?? JSON.stringify(item)
      : item?.toString(),
  onChange,
  value,
  className,
}: FilterSelectProps<T>) {
  const [selected, setSelected] = useState<T | undefined>(
    value || options?.[0]
  );

  useEffect(() => {
    setSelected(value); // Sync selected state with prop value
  }, [value]);

  const handleChange = (selectedItem: T) => {
    setSelected(selectedItem);
    onChange?.(selectedItem);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      <ListboxButton
        className={cn(
          className,
          "relative w-[189px] flex items-center justify-between rounded-[20px] py-5 px-4 truncate text-black font-light text-left text-sm bg-white",
          "focus:outline-none"
        )}
      >
        <span className="font-bold text-base">
          {displayExtractor(selected ?? options[0])}
        </span>
        <ChevronDownIcon
          className="pointer-events-none size-6 text-black"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        className={clsx(
          "w-full rounded-[10px] mt-2 bg-white z-50 shadow-dropShadow p-1 focus:outline-none",
          "transition duration-100 ease-in opacity-100"
        )}
      >
        {options?.map((option) => (
          <ListboxOption
            key={keyExtractor(option)}
            value={option}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg cursor-pointer select-none group"
          >
            <p className="text-black font-bold text-base group-data-[selected]:bg-secondary group-data-[selected]:p-1 group-data-[selected]:rounded group-data-[selected]:text-white w-full">
              {displayExtractor(option)}
            </p>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  );
}

export default FilterSelect;
