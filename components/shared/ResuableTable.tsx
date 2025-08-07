import React from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton"; // shadcn
import { ResuablePagination } from "./ResuablePagination";

interface TableColumn<T = any> {
  key: string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface TableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  setSearchQuery?: (query: string) => void;
  searchQuery?: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  className?: string;
  emptyMessage?: string;
  url?: string;
}

export const ReusableTable: React.FC<TableProps> = ({
  columns,
  data,
  loading = false,
  searchable = false,
  searchPlaceholder = "Search...",
  setSearchQuery = () => {},
  searchQuery,
  pagination,
  className = "",
  emptyMessage = "No data available",
  url,
}) => {
  const router = useRouter();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={`${className}`}>
      {searchable && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2 py-2 px-3 lg:w-[320px] border border-gray-300 rounded-xl focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full leading-5 placeholder-gray-500 focus:outline-none"
              placeholder={searchPlaceholder}
            />
          </div>
        </div>
      )}

      <div className="overflow-x-auto no-scrollbar">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`p-3 text-left text-xs font-bold text-[#667185] uppercase tracking-wider bg-gray-50 ${
                    column.className || ""
                  }`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col, colIndex) => {
                    const key = col.key.toLowerCase();
                    const isAvatar =
                      key.includes("avatar") ||
                      key.includes("image") ||
                      key.includes("photo");
                    return (
                      <td key={colIndex} className="px-3 py-4">
                        {isAvatar ? (
                          <Skeleton className="h-10 w-10 rounded-full" />
                        ) : (
                          <Skeleton className="h-4 w-full rounded" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : data?.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row: any, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={`px-3 py-4 whitespace-nowrap text-sm text-body ${
                        column.className || ""
                      }`}
                      onClick={() => router.push(`${url}/${row?._id}`)}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && data?.length > 10 && (
        <ResuablePagination pagination={pagination} />
      )}
    </div>
  );
};
