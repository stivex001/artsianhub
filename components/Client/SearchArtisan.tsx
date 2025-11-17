"use client";
import React, { useState, useEffect } from "react";
import {
  CaseIcon,
  LocationIcon,
  SearchLocationIcon,
} from "../assets/icons/OtherIcons";
import { Spinner } from "../shared/Spinner";
import { RecentSearch } from "./RecentSearch";

type Props = {
  onSearch: any;
  isLoading: boolean;
  onClear: any;
  defaultLocation?: string;
};

export const SearchArtisan = ({
  onSearch,
  isLoading,
  onClear,
  defaultLocation,
}: Props) => {
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");


  // populate initial value when defaultLocation arrives
  useEffect(() => {
    if (defaultLocation) {
      setLocation(defaultLocation);
    }
  }, [defaultLocation]);

  const handleSearch = () => {
    if (category && location) {
      onSearch(category, location);
    } else {
      onClear();
    }
  };

  return (
    <div>
      <div className="bg-white max-w-[600px] mx-auto rounded-2xl px-4 py-2 flex flex-col sm:flex-row gap-4 justify-between ">
        {/* Category */}
        <div className="w-full flex items-center gap-2">
          <div className="pointer-events-none">
            <CaseIcon />
          </div>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Search artisans, services, or skills..."
            className="w-full text-grayis placeholder-grayis border-0 focus:ring-0 focus:outline-none text-sm"
          />
          <div className="border border-[#6B728033] h-8" />
        </div>

        {/* Location */}
        <div className="w-full flex items-center gap-2">
          <div className="pointer-events-none">
            <LocationIcon />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter location"
            className="w-full text-grayis placeholder-grayis border-0 focus:ring-0 focus:outline-none text-sm"
          />
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors flex items-center lg:justify-center gap-2 font-medium text-lg"
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <SearchLocationIcon />
              <span className="lg:hidden">Search</span>
            </>
          )}
        </button>
      </div>
      <div className="pt-8">
        <RecentSearch setSearchTerm={setCategory} />
      </div>
    </div>
  );
};
