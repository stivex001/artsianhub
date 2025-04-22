import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SearchIcon } from "../assets/icons/NavIcons";
import { useFilterState } from "@/store/filterStore";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  // onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  icon?: React.ReactNode;
  value?: string;
  pageKey?: string;
}

const SearchInputComp = ({
  placeholder = "Search...",
  // onChange,
  onClick,
  className,
  icon,
  inputClassName,
  value,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(value || "");
  const { setSearch } = useFilterState();

  // Sync local state with the prop `value` from the global store (useEffect)
  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Update local state
  };

  const handleSearchClick = () => {
    setSearch(inputValue);
  };

  // Handle clear icon click (clear input field and reset search state)
  const handleClearSearch = () => {
    setInputValue("");
    setSearch("");
  };

  return (
    <div
      className={`flex items-center text-black bg-[#F5F6FA] border-[3px] border-primary rounded-[10px]  h-[38px]  focus-within:border-primary focus-within:outline-none focus-within:border ${className}`}
    >
      {icon && <div className="ml-2">{icon}</div>}
      {/* Search Icon */}
      {!icon && (
        <div onClick={handleSearchClick} className="ml-2 cursor-pointer">
          <SearchIcon />
        </div>
      )}
      {/* Input */}
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
        value={inputValue}
        onClick={onClick}
        className={`flex-grow bg-transparent outline-none placeholder-black text-black text-sm font-[200] w-full ${inputClassName}`}
      />

      {inputValue && (
        <div
          onClick={handleClearSearch}
          className="ml-2 cursor-pointer text-[#9295AB]"
        >
          <X />
        </div>
      )}
    </div>
  );
};

export default SearchInputComp;
