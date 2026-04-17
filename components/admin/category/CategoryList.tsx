"use client";

import React, { useState, useMemo } from "react";
import { Category } from "@/apis/crud/categories";
import { Search, ImageIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  categories: Category[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const CategoryList = ({ categories, selectedId, onSelect }: Props) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return categories;
    return categories.filter((c) => c.name.toLowerCase().includes(q));
  }, [categories, search]);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="relative mb-3 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories…"
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
        />
      </div>

      <div className="flex-1 overflow-y-auto flex flex-col gap-1">
        {filtered.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-6">No categories found</p>
        ) : (
          filtered.map((cat) => {
            const thumb = cat.images?.[0]?.url;
            const isActive = cat._id === selectedId;
            return (
              <button
                key={cat._id}
                onClick={() => onSelect(cat._id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors rounded-xl ${
                  isActive
                    ? "bg-primary/5 border border-primary/15"
                    : "hover:bg-gray-50 border border-transparent"
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-gray-100 shrink-0 overflow-hidden flex items-center justify-center">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={cat.name}
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? "text-primary" : "text-gray-800"}`}>
                    {cat.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {cat.images?.length ?? 0} image{cat.images?.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CategoryList;
