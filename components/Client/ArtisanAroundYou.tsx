"use client";
import React from "react";
import { ArtisanCard } from "../Artisan/ArtisanCard";
import { CardSkeletonLoader } from "../loader/CardSkeletonLoader";

type Props = {
  artisans: any;
  isPending: boolean;
  filters?: {
    category?: string;
    location?: string;
  };
};

export const ArtisanAroundYou = ({ artisans, isPending, filters }: Props) => {
  const hasFilters = filters?.category && filters?.location;

  const showEmptyState = !isPending && artisans.length === 0;

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-paragrah mb-1">
              Artisans Around You
            </h2>

            {hasFilters && (
              <p className="text-body text-sm font-medium">
                {`${filters?.category} in ${filters?.location}`}
              </p>
            )}

            <p className="text-body text-sm font-medium">
              {artisans.length > 0
                ? `${artisans.length} results found`
                : "No results"}
            </p>
          </div>
        </div>

        <div>
          {isPending && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeletonLoader key={i} />
              ))}
            </div>
          )}

          {!isPending && artisans.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {artisans?.map((item: any) => (
                <ArtisanCard key={item?._id} artisan={item} showDate />
              ))}
            </div>
          )}

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
                  ? `${filters?.category?.toUpperCase()} in ${filters?.location?.toUpperCase()}`
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
