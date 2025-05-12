import React, { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsDown } from "lucide-react";

type CustomPaginationProps = {
  currentPage: any;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
  visiblePages?: number;
  showGoToPage?: boolean;
};

const CustomPagination = ({
  currentPage ,
  totalPages,
  onPageChange,
  visiblePages = 3,
  showGoToPage = true,
}: CustomPaginationProps) => {
  const [inputValue, setInputValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Generate an array of page numbers to display
  const getPageNumbers = () => {
    let pages = [];

    // Always include page 1
    pages.push(1);

    // Middle pages
    const startPage = Math.max(2, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

    // Add dots after page 1 if needed
    if (startPage > 2) {
      pages.push("...");
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add dots before last page if needed
    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    // Always include last page if not already included
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const handleInputChange = (e: any) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleGoToPage();
    }
  };

  const handleGoToPage = () => {
    const pageNumber = parseInt(inputValue, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
      setInputValue("");
      setDropdownOpen(false);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-end py-2 px-4 text-sm text-gray-700 rounded-md">
      <div className="text-black text-sm mr-8">
        Page {currentPage} of {totalPages}
      </div>

      <div className="flex items-center space-x-2 mx-8">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {pageNumbers.map((page: any, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span className="px-2">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 rounded ${
                  currentPage === page
                    ? "border-2 border-secondary text-primary font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-1 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {showGoToPage && (
        <div className="hidden lg:block ml-8 relative">
          <div className="flex items-center">
            <span className="text-black text-sm mr-2">Go to page</span>
            <div className="relative inline-block">
              <button
                className="flex items-center border rounded px-2 py-1 w-20 justify-between"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="text-gray-700">{inputValue || "00"}</span>
                <ChevronsDown size={14} />
              </button>

              {dropdownOpen && (
                <div className="absolute bottom-full mb-2 w-24 bg-white border rounded shadow-lg z-10 max-h-40 overflow-y-auto">
                  {Array.from({ length: Math.min(30, totalPages) }, (_, i) => (
                    <button
                      key={i}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100"
                      onClick={() => {
                        onPageChange(i + 1);
                        setDropdownOpen(false);
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPagination;
