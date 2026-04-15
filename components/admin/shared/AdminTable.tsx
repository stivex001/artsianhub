"use client";

import React from "react";
import { ArrowUpDown } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface TableColumn<T = any> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  /** Extra class applied to every <td> in this column */
  className?: string;
  /** Extra class applied to the <th> */
  headerClassName?: string;
  /** Tailwind min-w-* or w-* to size the column */
  width?: string;
  sortable?: boolean;
}

export interface AdminTableProps<T = any> {
  columns: TableColumn<T>[];
  data: T[];
  /** Extracts a unique key from a row — used as React key */
  keyExtractor: (row: T) => string;
  /** Called when a row is clicked */
  onRowClick?: (row: T) => void;
  loading?: boolean;
  /** Number of skeleton rows shown while loading */
  skeletonRows?: number;
  /** Primary empty-state message */
  emptyMessage?: string;
  /** Secondary empty-state description */
  emptySubMessage?: string;
  /** Extra class on the outer wrapper */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Skeleton row
// ─────────────────────────────────────────────────────────────────────────────

const SkeletonRow = ({ columns }: { columns: number }) => (
  <tr className="border-b border-gray-50">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-5 py-4">
        <div
          className={`h-4 rounded-md bg-gray-100 animate-pulse ${
            i === 0 ? "w-40" : i === columns - 1 ? "w-16" : "w-28"
          }`}
        />
      </td>
    ))}
  </tr>
);

// ─────────────────────────────────────────────────────────────────────────────
// Empty state
// ─────────────────────────────────────────────────────────────────────────────

const EmptyState = ({
  message = "No records found",
  subMessage,
}: {
  message?: string;
  subMessage?: string;
}) => (
  <tr>
    <td colSpan={100}>
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <p className="text-sm font-medium text-gray-500">{message}</p>
        {subMessage && <p className="text-xs text-gray-400 max-w-xs text-center">{subMessage}</p>}
      </div>
    </td>
  </tr>
);

// ─────────────────────────────────────────────────────────────────────────────
// AdminTable
// ─────────────────────────────────────────────────────────────────────────────

function AdminTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  loading = false,
  skeletonRows = 8,
  emptyMessage,
  emptySubMessage,
  className,
}: AdminTableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto scrollbar-hidden ${className ?? ""}`}>
      <table className="w-full min-w-[640px] table-auto">
        {/* ── Header ─────────────────────────────────────────────── */}
        <thead>
          <tr className="bg-[#f4f6fb] border-b border-gray-100">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`
                  px-5 py-3.5 text-left text-[11px] font-semibold text-gray-500
                  uppercase tracking-wider whitespace-nowrap select-none
                  first:pl-5 last:pr-5
                  ${col.width ?? ""}
                  ${col.headerClassName ?? ""}
                `}
              >
                <span className="flex items-center gap-1.5">
                  {col.header}
                  {col.sortable && (
                    <ArrowUpDown className="w-3 h-3 text-gray-400 shrink-0" />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Body ───────────────────────────────────────────────── */}
        <tbody className="bg-white divide-y divide-gray-50">
          {loading ? (
            Array.from({ length: skeletonRows }).map((_, i) => (
              <SkeletonRow key={i} columns={columns.length} />
            ))
          ) : !data || data.length === 0 ? (
            <EmptyState message={emptyMessage} subMessage={emptySubMessage} />
          ) : (
            data.map((row) => (
              <tr
                key={keyExtractor(row)}
                onClick={() => onRowClick?.(row)}
                className={`
                  border-b border-gray-50 transition-colors duration-150
                  hover:bg-blue-50/40
                  ${onRowClick ? "cursor-pointer" : ""}
                `}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`
                      px-5 py-3.5 text-sm text-gray-700 whitespace-nowrap
                      first:pl-5 last:pr-5
                      ${col.className ?? ""}
                    `}
                  >
                    {col.render
                      ? col.render(row)
                      : String((row as any)[col.key] ?? "—")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminTable;
