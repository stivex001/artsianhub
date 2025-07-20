"use client";

import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
}

export const ResuablePagination = ({ pagination }: PaginationProps) => {
  if (!pagination) return null;

  const { currentPage, totalPages, onPageChange } = pagination;
  const pages = [];

  // Always show first page
  pages.push(1);

  // Add ellipsis if needed
  if (currentPage > 3) {
    pages.push("...");
  }

  // Add pages around current page
  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  // Add ellipsis if needed
  if (currentPage < totalPages - 2) {
    if (!pages.includes("...")) pages.push("...");
  }

  // Always show last page if more than 1 page
  if (totalPages > 1 && !pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return (
    <div className="flex items-center justify-between px-6 py-8 border-t  border-gray-200">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className=" border border-[#E4E5EA] w-9 h-9 rounded-full flex items-center justify-center bg-white text-paragrah hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <div className="flex items-center space-x-1 mx-4">
        {pages?.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
            className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-full transition-colors duration-200 ${
              page === currentPage
                ? "bg-[#F9F9FB] text-primary "
                : page === "..."
                ? "text-[#535862] cursor-default"
                : "text-[#535862] hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className=" border border-[#E4E5EA] w-9 h-9 rounded-full flex items-center justify-center bg-white text-paragrah hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
