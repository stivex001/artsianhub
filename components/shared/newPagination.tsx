"use client";
import React from "react";

type PaginationProps = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const NewPagination = ({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const generatePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      // Small page count → show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Show "..." before middle pages
      if (page > 3) pages.push("...");

      // Middle pages
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      // Show "..." after middle pages
      if (page < totalPages - 2) pages.push("...");

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pagesToShow = generatePages();

  return (
    <div className="flex items-center gap-2 mt-8 justify-center">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`px-3 py-1 rounded-md border text-sm ${
          page === 1
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        Prev
      </button>

      {/* Dynamic Pages */}
      {pagesToShow.map((p, idx) =>
        typeof p === "string" ? (
          <span key={idx} className="px-3 py-1 text-gray-500">
            {p}
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-md border text-sm ${
              p === page
                ? "bg-primary text-white border-primary"
                : "hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        )
      )}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`px-3 py-1 rounded-md border text-sm ${
          page === totalPages
            ? "opacity-40 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    </div>
  );
};
