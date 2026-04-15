"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  Users,
  CheckCircle2,
  XCircle,
  ShieldOff,
  Star,
  MapPin,
  X,
  Download,
} from "lucide-react";
import { format } from "date-fns";

import { useAdminArtisans, AdminArtisan, ArtisanAccountStatus, downloadReport } from "@/api/crud/admin";
import AdminTable, { TableColumn } from "@/components/admin/shared/AdminTable";
import { AccountStatusBadge, VerificationBadge } from "@/components/admin/shared/badges";
import Pagination from "@/components/shared/Pagination";

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_TABS: { label: string; value: string; icon: React.ReactNode }[] = [
  { label: "All", value: "all", icon: <Users className="w-3.5 h-3.5" /> },
  { label: "Active", value: "active", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  { label: "Suspended", value: "suspended", icon: <ShieldOff className="w-3.5 h-3.5" /> },
  { label: "Banned", value: "banned", icon: <XCircle className="w-3.5 h-3.5" /> },
  { label: "Verified", value: "verified", icon: <Star className="w-3.5 h-3.5" /> },
];

const LIMIT = 10;

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

/** Avatar with fallback initials */
const ArtisanAvatar = ({
  src,
  firstName,
  lastName,
}: {
  src?: string;
  firstName: string;
  lastName: string;
}) => {
  const initials = `${firstName?.[0] ?? ""}${lastName?.[0] ?? ""}`.toUpperCase();
  return src ? (
    <Image
      src={src}
      alt={`${firstName} ${lastName}`}
      width={36}
      height={36}
      className="w-9 h-9 rounded-full object-cover ring-2 ring-white shadow-sm shrink-0"
    />
  ) : (
    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#02198B] to-[#1e3a8a] flex items-center justify-center shrink-0 ring-2 ring-white shadow-sm">
      <span className="text-[11px] font-bold text-white">{initials}</span>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Table column definitions
// ─────────────────────────────────────────────────────────────────────────────

const buildColumns = (): TableColumn<AdminArtisan>[] => [
  {
    key: "name",
    header: "Artisan",
    width: "min-w-[200px]",
    render: (row) => (
      <div className="flex items-center gap-3">
        <ArtisanAvatar
          src={row.profilePicture}
          firstName={row.firstName}
          lastName={row.lastName}
        />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900 truncate">
            {row.firstName} {row.lastName}
          </p>
          <p className="text-xs text-gray-400 truncate">{row.professionalTitle}</p>
        </div>
      </div>
    ),
  },
  {
    key: "email",
    header: "Email",
    width: "min-w-[180px]",
    render: (row) => (
      <span className="text-gray-600 text-xs">{row.userId?.email ?? "—"}</span>
    ),
  },
  {
    key: "serviceCategories",
    header: "Category",
    width: "min-w-[140px]",
    render: (row) => {
      const cats = row.serviceCategories ?? [];
      if (!cats.length) return <span className="text-gray-400 text-xs">—</span>;
      return (
        <span className="text-xs text-gray-700 font-medium">
          {cats[0].name}
          {cats.length > 1 && (
            <span className="ml-1 text-[10px] text-gray-400">+{cats.length - 1}</span>
          )}
        </span>
      );
    },
  },
  {
    key: "primaryLocation",
    header: "Location",
    width: "min-w-[130px]",
    render: (row) => (
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <MapPin className="w-3 h-3 shrink-0 text-gray-400" />
        <span className="truncate max-w-[110px]">{row.primaryLocation || "—"}</span>
      </div>
    ),
  },
  {
    key: "accountStatus",
    header: "Status",
    width: "min-w-[110px]",
    render: (row) => <AccountStatusBadge status={row.accountStatus} />,
  },
  {
    key: "verificationStatus",
    header: "Verification",
    width: "min-w-[110px]",
    render: (row) => <VerificationBadge verified={row.verificationStatus === "verified"} />,
  },
  {
    key: "createdAt",
    header: "Joined",
    width: "min-w-[100px]",
    render: (row) => (
      <span className="text-xs text-gray-500 tabular-nums">
        {row.createdAt ? format(new Date(row.createdAt), "MMM d, yyyy") : "—"}
      </span>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

const ManageArtisans = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { getAdminArtisans } = useAdminArtisans();

  const queryParams = {
    page: currentPage,
    limit: LIMIT,
    ...(activeTab === "verified"
      ? { verificationStatus: "verified" as const }
      : activeTab !== "all"
      ? { status: activeTab as ArtisanAccountStatus }
      : {}),
  };

  const { data, isLoading } = getAdminArtisans(queryParams);

  // Client-side search — backend does not support a search param
  const term = searchInput.trim().toLowerCase();
  const allArtisans = data?.data ?? [];
  const artisans = term
    ? allArtisans.filter(
        (a) =>
          `${a.firstName} ${a.lastName}`.toLowerCase().includes(term) ||
          (a.userId?.email ?? "").toLowerCase().includes(term) ||
          (a.primaryLocation ?? "").toLowerCase().includes(term) ||
          (a.professionalTitle ?? "").toLowerCase().includes(term)
      )
    : allArtisans;

  const totalEntries = data?.total ?? 0;

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setCurrentPage(1);
  };

  const handleRowClick = (row: AdminArtisan) => {
    router.push(`/admin/dashboard/manage-artisans/${row._id}`);
  };

  const columns = buildColumns();

  return (
    <section className="flex flex-col gap-6">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manage Artisans</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            View, filter, verify and moderate registered artisans
          </p>
        </div>
        <button
          onClick={() => downloadReport("artisans")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#02198B] text-white text-sm font-medium
            hover:bg-[#011571] transition-colors shadow-sm shrink-0"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* ── Filter bar ──────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Search row */}
        <div className="p-4 border-b border-gray-50">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by name, email, title, location…"
              className="w-full pl-9 pr-9 py-2.5 rounded-xl border border-gray-200 bg-gray-50
                text-sm text-gray-800 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40
                transition"
            />
            {searchInput && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Status filter tabs */}
        <div className="flex items-center gap-2 px-4 py-3 overflow-x-auto scrollbar-hidden">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <div className="flex items-center gap-2 flex-wrap">
            {STATUS_TABS.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium
                    transition-all duration-150 whitespace-nowrap
                    ${
                      isActive
                        ? "bg-[#02198B] text-white shadow-sm"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }
                  `}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Table card ──────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Table meta row */}
        {!isLoading && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
            <span className="text-xs text-gray-400">
              {totalEntries > 0 ? (
                <>
                  Showing{" "}
                  <span className="font-semibold text-gray-700">
                    {(currentPage - 1) * LIMIT + 1}–
                    {Math.min(currentPage * LIMIT, totalEntries)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-700">{totalEntries}</span> artisans
                </>
              ) : (
                "No artisans found"
              )}
            </span>
            {term && (
              <span className="text-xs text-[#02198B] font-medium">
                Results for &quot;{searchInput.trim()}&quot;
              </span>
            )}
          </div>
        )}

        <AdminTable<AdminArtisan>
          columns={columns}
          data={artisans}
          keyExtractor={(row) => row._id}
          onRowClick={handleRowClick}
          loading={isLoading}
          skeletonRows={LIMIT}
          emptyMessage="No artisans found"
          emptySubMessage={
            term
              ? `No results for "${searchInput.trim()}". Try a different search term.`
              : "Adjust filters or check back later."
          }
        />

        {/* Pagination */}
        {!isLoading && totalEntries > LIMIT && (
          <div className="border-t border-gray-50 px-2 py-1">
            <Pagination
              currentPage={currentPage}
              totalEntries={totalEntries}
              entriesPerPage={LIMIT}
              onPageChange={(p) => setCurrentPage(p)}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageArtisans;
