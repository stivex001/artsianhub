"use client";
import { useArtisans } from "@/api/crud/artisans";
import ArtisanTable from "@/components/Artisan/ArtisanTable";
import { CustomButton } from "@/components/clickable/CustomButton";
import CustomDatePicker from "@/components/controlledInputs/CustomDatePicker";
import SearchInputComp from "@/components/controlledInputs/SearchInputComp";
import FilterTabs from "@/components/shared/FilterTabs";
import { Descriptions } from "@/components/shared/Headings";
import Pagination from "@/components/shared/Pagination";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";

import Wrapper from "@/components/shared/Wrapper";
import { mapFilterTabToQuery } from "@/hooks/useMapFilterTabQuery";
import { useFilterState } from "@/store/filterStore";
import { addDays, format } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

type Props = {};

const filterTabs = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  // { label: "Deactivated", value: "deactivated" },
  { label: "Suspended", value: "suspended" },
  { label: "KYC Uploaded (YES)", value: "kyc_yes" },
  { label: "KYC Uploaded (NO)", value: "kyc_no" },
];

const ManageArtisans = (props: Props) => {
  const {
    search,
    startDate,
    endDate,
    filterTab,
    setFilterTab,
    setStartDate,
    setEndDate,
  } = useFilterState();

  const useFilteredByArtisan = ["pending", "kyc_yes", "kyc_no"].includes(
    filterTab
  );
  const useSearchByArtisan = [
    "suspended",
    "active",
    "inactive",
    "deactivated",
  ].includes(filterTab);

  const [currentPage, setCurrentPage] = useState(1);
  const date = {
    from: startDate || undefined,
    to: endDate || undefined,
  };
  const totalPages = 5;
  const entriesPerPage = 10;

  const params: Record<string, string | boolean> = {
    ...(filterTab && filterTab !== "all" ? mapFilterTabToQuery(filterTab) : {}),
  };

  if (search) params.searchTerm = search;
  if (startDate) params.startDate = format(startDate, "yyyy-MM-dd");
  if (endDate) params.endDate = format(endDate, "yyyy-MM-dd");

  const shouldUseFilter = [
    "pending",
    "kyc_yes",
    "kyc_no",,
  ].includes(filterTab);
  const hasSearchInputOrDate = !!search || !!startDate || !!endDate;
  const shouldUseSearch = hasSearchInputOrDate && !shouldUseFilter;

  const { getAllArtisan, getSearchByArtisan, getFilteredByArtisan } =
    useArtisans();

  const { data: artisans = [], isPending: isAllPending } = getAllArtisan();
  const { data: searchedArtisans = [], isPending: isSearchPending } =
    getSearchByArtisan(shouldUseSearch ? params : undefined);
  const { data: filteredArtisans = [], isPending: isFilterPending } =
    getFilteredByArtisan(shouldUseFilter ? params : undefined);

  console.log(searchedArtisans, "search_art");

  const handlePageChange = (page: number) => {
    console.log(`Changing to page ${page}`);
    setCurrentPage(page);
  };

  const handleDateChange = (range: DateRange | undefined) => {
    if (range?.from) setStartDate(range.from);
    else setStartDate(null);

    if (range?.to) setEndDate(range.to);
    else setEndDate(null);
  };

  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Manage Artisans" className="font-normal" />
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="">
          <CustomDatePicker
            range
            date={date}
            setDate={handleDateChange}
            className="h-10"
          />
        </div>
        <div className="w-full max-w-[475px]">
          <SearchInputComp
            value={search}
            placeholder="Search Artisan ID, Date Created, Phone Number, Email Address"
          />
        </div>
        <CustomButton label="Add Artisan" className="rounded-[10px]" />
      </div>
      <div className="w-full">
        <FilterTabs
          tabs={filterTabs}
          activeTab={filterTab}
          setActiveTab={setFilterTab}
        />
      </div>

      <Wrapper className="overflow-hidden no-scrollbar scrollbar-hidden shadow-dropShadow border-none">
        {isAllPending  ? (
          <SkeletonTableLoader />
        ) : shouldUseFilter ? (
          filteredArtisans?.length > 0 ? (
            <div>
              <ArtisanTable artisans={filteredArtisans} />
              <Pagination
                currentPage={currentPage}
                totalEntries={totalPages}
                entriesPerPage={entriesPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center text-center my-3 h-[70vh]">
              No filtered results found
            </div>
          )
        ) : shouldUseSearch ? (
          searchedArtisans?.length > 0 ? (
            <div>
              <ArtisanTable artisans={searchedArtisans} />
              <Pagination
                currentPage={currentPage}
                totalEntries={totalPages}
                entriesPerPage={entriesPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center text-center my-3 h-[70vh]">
              No results found
            </div>
          )
        ) : artisans?.length > 0 ? (
          <div>
            <ArtisanTable artisans={artisans} />
            <Pagination
              currentPage={currentPage}
              totalEntries={totalPages}
              entriesPerPage={entriesPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center text-center my-3 h-[70vh]">
            No artisans available
          </div>
        )}
      </Wrapper>
    </section>
  );
};

export default ManageArtisans;
