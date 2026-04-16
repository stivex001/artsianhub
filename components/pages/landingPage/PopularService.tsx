"use client";
import React from "react";
import { useArtisans } from "@/apis/crud/artisans";
import { useCategories } from "@/apis/crud/categories";

type Props = {
  setSearchTerm: (value: string) => void;
};

export const PopularService = ({ setSearchTerm }: Props) => {
  const { getRecentSearchArtisan } = useArtisans();
  const { data: recentData, isPending: recentPending } = getRecentSearchArtisan();
  const recentSearches: { _id: string; query: string }[] = recentData?.data || [];

  const { getAllSubCategories } = useCategories();
  const { data: subCatData, isPending: subCatPending } = getAllSubCategories();

  const subCategories: { _id: string; name: string }[] = Array.isArray(subCatData)
    ? subCatData
    : (subCatData as any)?.data || [];

  const isPending = recentPending || subCatPending;
  const showRecent = recentSearches.length > 0;
  const label = showRecent ? "Recent:" : "Popular:";
  const items = showRecent
    ? recentSearches.slice(0, 6).map((r) => ({ id: r._id, label: r.query }))
    : subCategories.slice(0, 6).map((s) => ({ id: s._id, label: s.name }));

  if (isPending) {
    return (
      <div className="w-full max-w-2xl mb-16">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-textgray text-sm shrink-0">Popular:</p>
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="px-4 py-2 border border-[#FFFFFF33] rounded-full bg-white/10 animate-pulse w-24 h-8"
            />
          ))}
        </div>
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mb-16">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-textgray text-sm shrink-0">{label}</p>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSearchTerm(item.label)}
            className="px-3 py-1.5 border border-[#FFFFFF33] text-white rounded-full text-sm transition-colors duration-200 hover:border-slate-400 hover:bg-white/5 capitalize whitespace-nowrap"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};
