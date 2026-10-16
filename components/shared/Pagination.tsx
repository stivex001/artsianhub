
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
  currentPage?: number;
  totalEntries?: number;
  entriesPerPage?: number;
  onPageChange?: (page: number) => void;
}

const Pagination = ({
  currentPage = 1,
  totalEntries = 40,
  entriesPerPage = 10,
  onPageChange = () => {},
}: PaginationProps) => {
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const getPaginationRange = () => {
    let range = [];

    // If the total pages are less than or equal to 5, show all pages
    if (totalPages <= 5) {
      range = Array.from({ length: totalPages }, (_, index) => index + 1);
    } else {
      if (currentPage <= 3) {
        range = [1, 2, 3, 4, "..."];
      } else if (currentPage >= totalPages - 2) {
        range = [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
      } else {
        range = [
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages,
        ];
      }
    }

    return range;
  };
  return (
    <section className="bg-transparent w-full py-2 text-xs">
      <div className="flex items-center justify-between px-4 space-x-3 ">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-black cursor-pointer bg-transparent border  hover:text-grey border-borderColor rounded-[8px]"
        >
          <ChevronLeft /> <span className="hidden sm:block"> Previous </span>
        </Button>
        <div className="flex items-center justify-center space-x-3">
          {getPaginationRange().map((page, index) =>
            page === "..." ? (
              <span key={index} className="px-2">
                ...
              </span>
            ) : (
              <button
                key={index}
                onClick={() => onPageChange(Number(page))}
                className={`h-[31px] w-[31px] flex items-center justify-center rounded-[8px] font-medium transition-colors ${
                  currentPage === page
                    ? "bg-[#02198B] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}
        </div>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-black cursor-pointer bg-transparent border  hover:text-white border-borderColor rounded-[8px]"
        >
          <span className="hidden sm:block"> Next</span> <ChevronRight />
        </Button>
      </div>
    </section>
  );
};

export default Pagination;
