"use client";
import React from "react";
import { ArtisanCard } from "../Artisan/ArtisanCard";
import { CardSkeletonLoader } from "../loader/CardSkeletonLoader";
import { FilterBar } from "../shared/FilterBar";
import { NewPagination } from "../shared/newPagination";

type Props = {
  artisans: any[];
  isPending: boolean;
  filters?: {
    q?: string;
    location?: string;
  };
  page: number;
  total: number | any;
  limit: number;
  sort: string; // updated to match parent
  onPageChange: (p: number) => void;
  onLimitChange: (l: number) => void;
  onSortChange: (s: string) => void;
};

export const ArtisanAroundYou = ({
  artisans,
  isPending,
  filters,
  page,
  total,
  limit,
  sort,
  onPageChange,
  onLimitChange,
  onSortChange,
}: Props) => {
  const hasFilters = filters?.q && filters?.location;
  const totalPages = Math.ceil(total / limit);
  const showEmptyState = !isPending && artisans.length === 0;

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-paragrah mb-1">
              Artisans Around You
            </h2>

            {hasFilters && (
              <p className="text-body text-sm font-medium capitalize">
                {`${filters?.q} in ${filters?.location}`}
              </p>
            )}
          </div>
        </div>

        {/* Sorting + Limit Bar */}
        <FilterBar
          sort={sort}
          limit={limit}
          onLimitChange={onLimitChange}
          onSortChange={onSortChange}
        />

        {/* Content */}
        <div>
          {/* Loading Skeletons */}
          {isPending && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: limit }).map((_, i) => (
                <CardSkeletonLoader key={i} />
              ))}
            </div>
          )}

          {/* Grid */}
          {!isPending && artisans.length > 0 && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {artisans.map((item) => (
                  <ArtisanCard key={item._id} artisan={item} showDate />
                ))}
              </div>

              {artisans.length > 10 && (
                <div className="mt-8">
                  <NewPagination
                    page={page}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                  />
                </div>
              )}
            </>
          )}

          {/* Empty State */}
          {showEmptyState && (
            <div className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-gray-300 mb-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No artisans found
              </h3>

              <p className="text-gray-500 mb-6">
                We couldn’t find any{" "}
                {hasFilters
                  ? `${filters?.q?.toUpperCase()} in ${filters?.location?.toUpperCase()}`
                  : "artisans around you"}
                . Try adjusting your search.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
