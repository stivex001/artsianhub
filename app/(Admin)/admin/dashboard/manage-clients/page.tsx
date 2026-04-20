"use client";

import React, { useState } from "react";
import { useAdminClients, UserStatus, downloadReport } from "@/apis/crud/admin";
import { useAuthStore } from "@/store/authStore";
import Wrapper from "@/components/shared/Wrapper";
import Pagination from "@/components/shared/Pagination";
import { useRouter } from "next/navigation";
import { Search, X, Users, ChevronRight, SlidersHorizontal, UserCheck, UserX, ShieldOff, Download } from "lucide-react";

// ── Helpers ────────────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<UserStatus, string> = {
  active:    "bg-green-50 text-green-600",
  suspended: "bg-orange-50 text-orange-600",
  banned:    "bg-red-50 text-red-600",
};

const filterTabs: { label: string; value: UserStatus | "all" }[] = [
  { label: "All",       value: "all"       },
  { label: "Active",    value: "active"    },
  { label: "Suspended", value: "suspended" },
  { label: "Banned",    value: "banned"    },
];

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });

// ── Skeleton ───────────────────────────────────────────────────────────────────
const TableSkeleton = () => (
  <div className="animate-pulse">
    {/* Header row */}
    <div className="grid grid-cols-[2fr_2fr_1.2fr_1fr_1fr_40px] gap-4 px-5 py-3.5 bg-gray-50 border-b border-gray-100">
      {["w-16", "w-12", "w-16", "w-14", "w-12", "w-4"].map((w, i) => (
        <div key={i} className={`h-3 ${w} rounded-full bg-gray-200`} />
      ))}
    </div>
    {/* Data rows */}
    {Array.from({ length: 6 }).map((_, i) => (
      <div
        key={i}
        className="grid grid-cols-[2fr_2fr_1.2fr_1fr_1fr_40px] gap-4 items-center px-5 py-4 border-b border-gray-50"
      >
        {/* Avatar + name */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
          <div className="flex flex-col gap-1.5">
            <div className={`h-3 rounded-full bg-gray-200 ${i % 3 === 0 ? "w-28" : i % 3 === 1 ? "w-24" : "w-32"}`} />
            <div className="h-2.5 w-14 rounded-full bg-gray-100" />
          </div>
        </div>
        {/* Email */}
        <div className={`h-3 rounded-full bg-gray-200 ${i % 2 === 0 ? "w-40" : "w-36"}`} />
        {/* Phone */}
        <div className="h-3 w-24 rounded-full bg-gray-200" />
        {/* Status badge */}
        <div className="h-6 w-20 rounded-full bg-gray-200" />
        {/* Date */}
        <div className="h-3 w-20 rounded-full bg-gray-200" />
        {/* Arrow */}
        <div className="h-4 w-4 rounded bg-gray-100" />
      </div>
    ))}
  </div>
);

// ── Mobile skeleton ────────────────────────────────────────────────────────────
const MobileTableSkeleton = () => (
  <div className="animate-pulse divide-y divide-gray-50">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-start gap-3 p-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0" />
        <div className="flex-1 flex flex-col gap-2">
          <div className={`h-3.5 rounded-full bg-gray-200 ${i % 2 === 0 ? "w-32" : "w-28"}`} />
          <div className="h-2.5 w-40 rounded-full bg-gray-100" />
          <div className="flex gap-2 mt-1">
            <div className="h-5 w-18 rounded-full bg-gray-200" />
            <div className="h-5 w-20 rounded-full bg-gray-100" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

// ── Page ───────────────────────────────────────────────────────────────────────
const ManageClientsPage = () => {
  const { currentUser } = useAuthStore();
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const router = useRouter();
  const [activeTab, setActiveTab]     = useState<UserStatus | "all">("all");
  const [search, setSearch]           = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;

  const { getAllClients } = useAdminClients();
  // Fetch all clients once — search and filter handled client-side
  const { data, isPending } = getAllClients({ page: 1, limit: 500 });

  const allClients = data?.data ?? [];

  // 1. Search filter — match full name or email
  const afterSearch = search.trim()
    ? allClients.filter((c) => {
        const q     = search.trim().toLowerCase();
        const name  = `${c.firstName ?? ""} ${c.lastName ?? ""}`.toLowerCase();
        const email = (c.userId?.email ?? "").toLowerCase();
        return name.includes(q) || email.includes(q);
      })
    : allClients;

  // 2. Status tab filter
  const filtered =
    activeTab === "all"
      ? afterSearch
      : afterSearch.filter((c) => c.accountStatus === activeTab);

  // 3. Client-side pagination
  const totalFiltered = filtered.length;
  const paged = filtered.slice((currentPage - 1) * LIMIT, currentPage * LIMIT);

  return (
    <section className="flex flex-col gap-6">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manage Clients</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            View, filter, and moderate all registered clients
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { icon: UserCheck, label: `${allClients.filter((c) => c.accountStatus === "active").length} Active`,    cls: "text-green-600 bg-green-50"  },
            { icon: UserX,     label: `${allClients.filter((c) => c.accountStatus === "suspended").length} Suspended`, cls: "text-orange-600 bg-orange-50" },
            { icon: ShieldOff, label: `${allClients.filter((c) => c.accountStatus === "banned").length} Banned`,    cls: "text-red-600 bg-red-50"      },
          ].map(({ icon: Icon, label, cls }) => (
            <div key={label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium ${cls}`}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </div>
          ))}
          {isSuperAdmin && (
            <button
              onClick={() => downloadReport("clients")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#02198B] text-white text-sm font-medium
                hover:bg-[#011571] transition-colors shadow-sm shrink-0"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          )}
        </div>
      </div>

      {/* ── Filters ─────────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            placeholder="Search by name or email…"
            className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
          {search && (
            <button
              onClick={() => { setSearch(""); setCurrentPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => { setActiveTab(tab.value); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.value
                    ? "bg-primary text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Table ───────────────────────────────────────────────────── */}
      <Wrapper className="overflow-hidden !p-0 shadow-sm border border-gray-100">
        {isPending ? (
          <>
            <div className="hidden md:block"><TableSkeleton /></div>
            <div className="md:hidden"><MobileTableSkeleton /></div>
          </>
        ) : filtered.length === 0 ? (
          <EmptyClients search={search} />
        ) : (
          <>
            {/* Desktop */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-5 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Client</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="text-left px-4 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined</th>
                    <th className="px-4 py-3.5" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {paged.map((client) => (
                    <tr
                      key={client._id}
                      className="hover:bg-gray-50/50 cursor-pointer transition-colors"
                      onClick={() => router.push(`/admin/dashboard/manage-clients/${client._id}`)}
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold text-sm">
                            {client.firstName?.[0]}{client.lastName?.[0]}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{client.firstName} {client.lastName}</p>
                            {client.gender && <p className="text-xs text-gray-400 mt-0.5 capitalize">{client.gender}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-gray-600 text-sm">{client.userId?.email ?? "—"}</td>
                      <td className="px-4 py-4 text-gray-600">{client.phoneNumber || "—"}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[client.accountStatus] ?? "bg-gray-100 text-gray-500"}`}>
                          {client.accountStatus}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-500 whitespace-nowrap">
                        {client.createdAt ? formatDate(client.createdAt) : "—"}
                      </td>
                      <td className="px-4 py-4">
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden divide-y divide-gray-50">
              {paged.map((client) => (
                <div
                  key={client._id}
                  className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/admin/dashboard/manage-clients/${client._id}`)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-semibold text-sm">
                      {client.firstName?.[0]}{client.lastName?.[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-gray-900 text-sm">{client.firstName} {client.lastName}</p>
                        <ChevronRight className="w-4 h-4 text-gray-400 shrink-0" />
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{client.userId?.email ?? "—"}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[client.accountStatus] ?? ""}`}>
                          {client.accountStatus}
                        </span>
                        {client.createdAt && (
                          <span className="text-xs text-gray-400">{formatDate(client.createdAt)}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-5 pb-4 pt-2">
              <Pagination
                currentPage={currentPage}
                totalEntries={totalFiltered}
                entriesPerPage={LIMIT}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}
      </Wrapper>
    </section>
  );
};

const EmptyClients = ({ search }: { search?: string }) => (
  <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
      <Users className="w-6 h-6" />
    </div>
    <p className="text-sm">
      {search ? `No clients match "${search}"` : "No clients registered yet"}
    </p>
  </div>
);

export default ManageClientsPage;
