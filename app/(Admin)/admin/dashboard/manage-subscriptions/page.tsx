"use client";

import React, { useState, useMemo } from "react";
import {
  useAdminSubscriptions,
  SubscriptionStatus,
} from "@/apis/crud/admin";
import {
  RefreshCw,
  CreditCard,
  Search,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import SubscriptionTable from "@/components/admin/subscriptions/SubscriptionTable";
import Pagination from "@/components/shared/Pagination";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const LIMIT = 10;

type StatusFilter = "all" | SubscriptionStatus;

const STATUS_TABS: { label: string; value: StatusFilter; icon: React.ReactNode }[] = [
  { label: "All",      value: "all",       icon: <Users        className="w-3.5 h-3.5" /> },
  { label: "Active",   value: "active",    icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  { label: "Expired",  value: "expired",   icon: <Clock        className="w-3.5 h-3.5" /> },
  { label: "Past Due", value: "past_due",  icon: <AlertCircle  className="w-3.5 h-3.5" /> },
  { label: "Cancelled",value: "cancelled", icon: <XCircle      className="w-3.5 h-3.5" /> },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

const ManageSubscriptions = () => {
  const { getAllSubscriptions } = useAdminSubscriptions();
  const { data, isPending, refetch } = getAllSubscriptions();

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const all = data?.data ?? [];

  // Status counts for tab badges
  const counts = useMemo(
    () => ({
      all: all.length,
      active:    all.filter((s) => s.status === "active").length,
      expired:   all.filter((s) => s.status === "expired").length,
      past_due:  all.filter((s) => s.status === "past_due").length,
      cancelled: all.filter((s) => s.status === "cancelled").length,
    }),
    [all]
  );

  // Filter by status + search, reset page on change
  const filtered = useMemo(() => {
    let result = statusFilter === "all" ? all : all.filter((s) => s.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.userId.email.toLowerCase().includes(q) ||
          s.planType.toLowerCase().includes(q)
      );
    }
    return result;
  }, [all, statusFilter, search]);

  const handleTabChange = (tab: StatusFilter) => {
    setStatusFilter(tab);
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // Paginate
  const paginated = filtered.slice((page - 1) * LIMIT, page * LIMIT);

  return (
    <section className="flex flex-col gap-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Manage Subscriptions
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            View, extend and manage artisan subscriptions
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-1.5 px-3 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* ── Stats row ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total",   value: counts.all,     color: "text-gray-900" },
          { label: "Active",  value: counts.active,  color: "text-green-600" },
          { label: "Expired", value: counts.expired, color: "text-gray-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <p className="text-xs text-gray-500 font-medium">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* ── Filter tabs + Search ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 bg-white rounded-2xl p-1.5 border border-gray-100 shadow-sm flex-wrap">
          {STATUS_TABS.map(({ label, value, icon }) => (
            <button
              key={value}
              onClick={() => handleTabChange(value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                statusFilter === value
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {icon}
              {label}
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                  statusFilter === value
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {counts[value]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            value={search}
            onChange={handleSearch}
            placeholder="Search by email or plan…"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>
      </div>

      {/* ── Table + Pagination ───────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <SubscriptionTable subscriptions={paginated} loading={isPending} />

        {filtered.length > LIMIT && (
          <div className="border-t border-gray-100">
            <Pagination
              currentPage={page}
              totalEntries={filtered.length}
              entriesPerPage={LIMIT}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageSubscriptions;
