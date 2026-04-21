"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ImageIcon, ChevronRight } from "lucide-react";
import { AdminCategory } from "@/apis/crud/adminCategories";

interface Props {
  categories: AdminCategory[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden:   { opacity: 0, x: -6 },
  visible:  { opacity: 1, x: 0, transition: { duration: 0.2 } },
};

const AdminCategoryList = ({ categories, selectedId, onSelect }: Props) => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return categories;
    return categories.filter((c) =>
      c.name.toLowerCase().includes(q) || c.description?.toLowerCase().includes(q)
    );
  }, [categories, search]);

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Search */}
      <div className="relative mb-3 shrink-0">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search categories…"
          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm
            focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition-all"
        />
      </div>

      {/* List */}
      <motion.div
        className="flex-1 overflow-y-auto flex flex-col gap-0.5 pr-0.5"
        variants={listVariants}
        initial="hidden"
        animate="visible"
      >
        {filtered.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-8">No categories match your search</p>
        ) : (
          filtered.map((cat) => {
            const isSelected = cat._id === selectedId;
            const subCount   = cat.subCategories?.length ?? 0;

            return (
              <motion.button
                key={cat._id}
                variants={itemVariants}
                onClick={() => onSelect(cat._id)}
                className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-xl transition-all group relative
                  ${isSelected
                    ? "bg-[#02198B]/[0.06] border border-[#02198B]/15"
                    : "hover:bg-gray-50 border border-transparent hover:border-gray-100"
                  }`}
              >
                {/* Selected accent bar */}
                {isSelected && (
                  <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-[#02198B]" />
                )}

                {/* Thumbnail */}
                <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden bg-gray-100 flex items-center justify-center">
                  {cat.image?.url ? (
                    <img
                      src={cat.image.url}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className={`text-sm font-semibold truncate leading-tight
                      ${isSelected ? "text-[#02198B]" : "text-gray-800"}`}>
                      {cat.name}
                    </p>
                    {/* Active dot */}
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0
                      ${cat.isActive ? "bg-emerald-400" : "bg-gray-300"}`}
                    />
                  </div>

                  {cat.description ? (
                    <p className="text-xs text-gray-400 mt-0.5 truncate leading-snug">
                      {cat.description}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-300 mt-0.5 italic">No description</p>
                  )}

                  {/* Sub count */}
                  {subCount > 0 && (
                    <p className={`text-[11px] font-medium mt-1
                      ${isSelected ? "text-[#02198B]/60" : "text-gray-400"}`}>
                      {subCount} sub{subCount !== 1 ? "categories" : "category"}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-all
                  ${isSelected ? "text-[#02198B]" : "text-gray-300 group-hover:text-gray-400"}`}
                />
              </motion.button>
            );
          })
        )}
      </motion.div>
    </div>
  );
};

export default AdminCategoryList;
