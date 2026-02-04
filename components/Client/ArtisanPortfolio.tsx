"use client";

import React from "react";
import { PortfolioCard } from "./PortfolioCard";
import { useServices } from "@/api/crud/services";
import { CardSkeletonLoader } from "../loader/CardSkeletonLoader";

type Props = {
  id: any;
};

export const ArtisanPortfolio = ({ id }: Props) => {
  const { getArtisanServices } = useServices();
  const { data, isPending } = getArtisanServices(id as string);

  const portfolioItems = data?.data || [];

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-900 mb-2">Portfolio</h2>

      <div>
        {isPending && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 2 }).map((_, i) => (
              <CardSkeletonLoader key={i} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioItems?.map((item) => (
            <PortfolioCard key={item?._id} item={item} artisanId={id} />
          ))}
        </div>
      </div>

      {/* Empty State */}
      {portfolioItems?.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No portfolio items yet
          </h3>
          <p className="text-gray-600">
            This artisan hasn't uploaded any work samples yet.
          </p>
        </div>
      )}
    </div>
  );
};
