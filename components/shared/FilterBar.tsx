"use client";
import React from "react";

type FilterBarProps = {
  sort: string;
  limit: number;
  onSortChange: (value: string) => void;
  onLimitChange: (value: number) => void;
};

export const FilterBar = ({
  sort,
  limit,
  onSortChange,
  onLimitChange,
}: FilterBarProps) => {
  return (
    <div className="flex items-center justify-between mb-5">
      {/* Sort */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort By:</span>
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value)}
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="alphabetical">Alphabetical</option>
        </select>
      </div>

      {/* Limit */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Show:</span>
        <select
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    </div>
  );
};
