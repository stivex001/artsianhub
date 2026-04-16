"use client";

import React, { useState } from "react";
import { useAdminClients, UserStatus } from "@/apis/crud/admin";
import Wrapper from "@/components/shared/Wrapper";
import Pagination from "@/components/shared/Pagination";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import { useRouter } from "next/navigation";
import { Search, X, Users, ChevronRight, SlidersHorizontal, UserCheck, UserX, ShieldOff } from "lucide-react";

// ── Status helpers ─────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<UserStatus, string> = {
  active: "bg-green-50 text-green-600",
  suspended: "bg-orange-50 text-orange-600",
  banned: "bg-red-50 text-red-600",
};

const filterTabs: { label: string; value: UserStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Suspended", value: "suspended" },
  { label: "Banned", value: "banned" },
];

// ── Page ───────────────────────────────────────────────────────────────────────
const ManageClientsPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<UserStatus | "all">("all");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT = 10;

  const { getAllClients } = useAdminClients();
  const { data, isPending } = getAllClients({
    page: currentPage,
    limit: LIMIT,
    ...(search ? { search } : {}),
  });

  const clients = data?.data ?? [];
  const total = data?.total ?? 0;

  const filtered =
    activeTab === "all"
      ? clients
      : clients.filter((c) => c.status === activeTab);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

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

        {/* Quick stats */}
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { icon: UserCheck, label: `${clients.filter((c) => c.status === "active").length} Active`, cls: "text-green-600 bg-green-50" },
            { icon: UserX, label: `${clients.filter((c) => c.status === "suspended").length} Suspended`, cls: "text-orange-600 bg-orange-50" },
            { icon: ShieldOff, label: `${clients.filter((c) => c.status === "banned").length} Banned`, cls: "text-red-600 bg-red-50" },
          ].map(({ icon: Icon, label, cls }) => (
            <div key={label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium ${cls}`}>
              <Icon className="w-3.5 h-3.5" />
              {label}
            </div>
          ))}
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
          <div className="p-5"><SkeletonTableLoader /></div>
        ) : filtered.length === 0 ? (
          <EmptyClients />
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
                  {filtered.map((client) => (
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
                      <td className="px-4 py-4 text-gray-600">{client.email}</td>
                      <td className="px-4 py-4 text-gray-600">{client.phoneNumber || "—"}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[client.status] ?? "bg-gray-100 text-gray-500"}`}>
                          {client.status}
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
              {filtered.map((client) => (
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
                      <p className="text-xs text-gray-500 mt-0.5">{client.email}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${STATUS_STYLES[client.status] ?? ""}`}>
                          {client.status}
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
                totalEntries={total}
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

const EmptyClients = () => (
  <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
      <Users className="w-6 h-6" />
    </div>
    <p className="text-sm">No clients registered yet</p>
  </div>
);

export default ManageClientsPage;
