"use client";
import React from "react";
import { ArtisanCard } from "../Artisan/ArtisanCard";
import { FilterIcon } from "../assets/icons/UsersIcon";
import { CardSkeletonLoader } from "../loader/CardSkeletonLoader";

type Props = {
  artisans: any;
  isPending: boolean;
};

export const ArtisanAroundYou = ({ artisans, isPending }: Props) => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-paragrah mb-1">
              Artisans Around You
            </h2>
            {/* <p className="text-body text-sm font-medium">Plumbers in London</p> */}
            <p className="text-body text-sm font-medium">
              {artisans.length > 0
                ? `${artisans.length} results found`
                : "No results"}
            </p>
          </div>
          {/* <button className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <FilterIcon />
            <span className="text-gray-700 font-medium">Filter</span>
          </button> */}
        </div>

        <div>
          {isPending && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <CardSkeletonLoader key={i} />
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {artisans?.map((item: any) => (
              <ArtisanCard key={item?._id} artisan={item} showDate />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
