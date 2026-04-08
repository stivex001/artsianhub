"use client";

import { useArtisans } from "@/api/crud/artisans";
import ArtisanTable from "@/components/Artisan/ArtisanTable";
import { CustomButton } from "@/components/clickable/CustomButton";
import CustomDatePicker from "@/components/controlledInputs/CustomDatePicker";
import SearchInputComp from "@/components/controlledInputs/SearchInputComp";
import Pagination from "@/components/shared/Pagination";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import Wrapper from "@/components/shared/Wrapper";
import { mapFilterTabToQuery } from "@/hooks/useMapFilterTabQuery";
import { useFilterState } from "@/store/filterStore";
import { format } from "date-fns";
import { SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

const filterTabs = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Suspended", value: "suspended" },
  { label: "KYC ✓", value: "kyc_yes" },
  { label: "KYC ✗", value: "kyc_no" },
];

const ManageArtisans = () => {
  const {
    search,
    startDate,
    endDate,
    filterTab,
    setFilterTab,
    setStartDate,
    setEndDate,
  } = useFilterState();

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

  const shouldUseFilter = ["pending", "kyc_yes", "kyc_no"].includes(filterTab);
  const hasSearchInputOrDate = !!search || !!startDate || !!endDate;
  const shouldUseSearch = hasSearchInputOrDate && !shouldUseFilter;

  const { getAllArtisan, getSearchByArtisan, getFilteredByArtisan } = useArtisans();

  const { data, isPending: isAllPending } = getAllArtisan();
  const { data: searchedArtisans = [], isPending: isSearchPending } =
    getSearchByArtisan(shouldUseSearch ? params : undefined);
  const { data: filteredArtisans = [], isPending: isFilterPending } =
    getFilteredByArtisan(shouldUseFilter ? params : undefined);

  const artisans = data?.data ?? [];

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleDateChange = (range: DateRange | undefined) => {
    setStartDate(range?.from ?? null);
    setEndDate(range?.to ?? null);
  };

  const isLoading = isAllPending || isSearchPending || isFilterPending;

  return (
    <section className="flex flex-col gap-6">
      {/* ── Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manage Artisans</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            View, filter and manage all registered artisans
          </p>
        </div>
        <CustomButton label="+ Add Artisan" className="rounded-xl shrink-0" />
      </div>

      {/* ── Filters ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="shrink-0">
            <CustomDatePicker
              range
              date={date}
              setDate={handleDateChange}
              className="h-10"
            />
          </div>
          <div className="w-full">
            <SearchInputComp
              value={search}
              placeholder="Search by ID, name, email, phone…"
            />
          </div>
        </div>

        {/* Pill filter tabs */}
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setFilterTab(tab.value)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  filterTab === tab.value
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────── */}
      <Wrapper className="overflow-hidden no-scrollbar scrollbar-hidden shadow-sm border border-gray-100 !p-0">
        {isLoading ? (
          <div className="p-5">
            <SkeletonTableLoader />
          </div>
        ) : shouldUseFilter ? (
          filteredArtisans?.length > 0 ? (
            <div>
              <ArtisanTable artisans={filteredArtisans} />
              <div className="px-5 pb-4">
                <Pagination
                  currentPage={currentPage}
                  totalEntries={totalPages}
                  entriesPerPage={entriesPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          ) : (
            <EmptyState message="No filtered results found" />
          )
        ) : shouldUseSearch ? (
          searchedArtisans?.length > 0 ? (
            <div>
              <ArtisanTable artisans={searchedArtisans} />
              <div className="px-5 pb-4">
                <Pagination
                  currentPage={currentPage}
                  totalEntries={totalPages}
                  entriesPerPage={entriesPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          ) : (
            <EmptyState message="No results match your search" />
          )
        ) : artisans?.length > 0 ? (
          <div>
            <ArtisanTable artisans={artisans} />
            <div className="px-5 pb-4">
              <Pagination
                currentPage={currentPage}
                totalEntries={totalPages}
                entriesPerPage={entriesPerPage}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        ) : (
          <EmptyState message="No artisans registered yet" />
        )}
      </Wrapper>
    </section>
  );
};

const EmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center justify-center h-64 gap-2 text-gray-400">
    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
    <p className="text-sm">{message}</p>
  </div>
);

export default ManageArtisans;
