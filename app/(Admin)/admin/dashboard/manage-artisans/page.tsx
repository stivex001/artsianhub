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
import { PageTypes } from "@/utils";
import { addDays } from "date-fns";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

type Props = {};

const filterTabs = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Deactivated", value: "deactivated" },
  { label: "Suspended", value: "suspended" },
  { label: "KYC Uploaded (YES)", value: "kyc_yes" },
  { label: "KYC Uploaded (NO)", value: "kyc_no" },
];

const ManageArtisans = (props: Props) => {
  const { search, startDate, endDate, filterTab, setFilterTab } =
    useFilterState();

  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const totalPages = 5;
  const entriesPerPage = 10;

  const params: Record<string, string | boolean> = {
    ...(filterTab && filterTab !== "all" ? mapFilterTabToQuery(filterTab) : {}),
  };

  if (search) params.searchTerm = search;
  if (startDate) params.startDate = startDate.toISOString();
  if (endDate) params.endDate = endDate.toISOString();

  const shouldFilter =
    !!search || !!startDate || !!endDate || (filterTab && filterTab !== "all");

  const { getAllArtisan, getFilteredByArtisan } = useArtisans();
  const { data: artisans = [], isPending } = getAllArtisan();
  const { data: filteredArtisans = [], isPending: filterPending } =
    getFilteredByArtisan(shouldFilter ? params : undefined);

  console.log(filteredArtisans, "filtred_art");

  const handlePageChange = (page: number) => {
    console.log(`Changing to page ${page}`);
    setCurrentPage(page);
  };

  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Manage Artisans" className="font-normal" />
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="">
          <CustomDatePicker
            range
            date={date}
            setDate={setDate}
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
        {isPending  ? (
          <SkeletonTableLoader />
        ) : shouldFilter ? (
          filteredArtisans && filteredArtisans.length > 0 ? (
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
            <div className="flex justify-center items-center text-center my-3 h-[70vh]">No filtered results found</div>
          )
        ) : artisans && artisans.length > 0 ? (
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
          <div className="flex justify-center items-center text-center my-3 h-[70vh]">No artisans available</div>
        )}
      </Wrapper>
    </section>
  );
};

export default ManageArtisans;
