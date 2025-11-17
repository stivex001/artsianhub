"use client";
import { useArtisans } from "@/api/crud/artisans";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  setSearchTerm: (value: string) => void;
};

export const RecentSearch = ({ setSearchTerm }: Props) => {
  const { getRecentSearchArtisan } = useArtisans();
  const { data, isPending } = getRecentSearchArtisan();
  const recentSearch = data?.data || [];

  // remove duplicates by query
  const uniqueSearches = Array.from(
    new Map(recentSearch.map((item: any) => [item.query, item])).values()
  );

  // limit to 8 only
  const limitedSearches = uniqueSearches.slice(0, 8);

  return (
    <div className="bg-transparent">
      {isPending &&
        Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded-full bg-[#ffffff22]" />
        ))}
      <div className="flex flex-wrap items-center gap-3">
        <p className="text-white font-bold mb-4 text-sm mt-2">Recent Search:</p>

        {/* actual recent search */}
        {!isPending &&
          limitedSearches.map((q: any) => (
            <button
              key={q._id}
              onClick={() => setSearchTerm(q.query)}
              className="px-4 py-2 border border-[#FFFFFF33] text-white rounded-full text-sm transition-colors duration-200 hover:border-slate-500 capitalize"
            >
              {q?.query}
            </button>
          ))}
      </div>
    </div>
  );
};
