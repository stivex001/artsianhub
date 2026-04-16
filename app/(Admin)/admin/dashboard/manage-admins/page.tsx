"use client";

import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { UserPlus, ShieldCheck, Clock, KeyRound } from "lucide-react";

import { useAdminManagement, AdminMember } from "@/apis/crud/admin";
import { useAuthStore } from "@/store/authStore";
import AdminTable, { TableColumn } from "@/components/admin/shared/AdminTable";
import { AdminRoleBadge, AdminStatusBadge } from "@/components/admin/shared/badges";
import CreateAdminModal from "@/components/admin/admins/CreateAdminModal";

// ─────────────────────────────────────────────────────────────────────────────
// Column definitions
// ─────────────────────────────────────────────────────────────────────────────

const buildColumns = (): TableColumn<AdminMember>[] => [
  {
    key: "name",
    header: "Admin",
    width: "min-w-[200px]",
    render: (row) => {
      const initials = row.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
      return (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#02198B] to-[#1e3a8a] flex items-center justify-center shrink-0 ring-2 ring-white shadow-sm">
            <span className="text-[11px] font-bold text-white">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{row.name}</p>
            {row.roleLabel && (
              <p className="text-xs text-gray-400 truncate">{row.roleLabel}</p>
            )}
          </div>
        </div>
      );
    },
  },
  {
    key: "email",
    header: "Email",
    width: "min-w-[200px]",
    render: (row) => <span className="text-xs text-gray-600">{row.email}</span>,
  },
  {
    key: "role",
    header: "Role",
    width: "min-w-[130px]",
    render: (row) => <AdminRoleBadge role={row.role} />,
  },
  {
    key: "status",
    header: "Status",
    width: "min-w-[110px]",
    render: (row) => <AdminStatusBadge status={row.status} />,
  },
  {
    key: "twoFactorEnabled",
    header: "2FA",
    width: "min-w-[80px]",
    render: (row) =>
      row.twoFactorEnabled ? (
        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
          <KeyRound className="w-3.5 h-3.5" /> On
        </span>
      ) : (
        <span className="text-[11px] text-gray-400">Off</span>
      ),
  },
  {
    key: "lastLogin",
    header: "Last Login",
    width: "min-w-[130px]",
    render: (row) => (
      <div className="flex items-center gap-1 text-xs text-gray-500">
        <Clock className="w-3 h-3 shrink-0 text-gray-400" />
        {row.lastLogin ? format(new Date(row.lastLogin), "MMM d, yyyy") : "—"}
      </div>
    ),
  },
  {
    key: "createdAt",
    header: "Created",
    width: "min-w-[110px]",
    render: (row) => (
      <span className="text-xs text-gray-500 tabular-nums">
        {row.createdAt ? format(new Date(row.createdAt), "MMM d, yyyy") : "—"}
      </span>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

const ManageAdmins = () => {
  const { currentUser } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();
  const [showCreate, setShowCreate] = useState(false);

  const { getAllAdmins } = useAdminManagement();
  const { data, isLoading } = getAllAdmins();

  const admins = data?.data ?? [];
  const superAdminCount = admins.filter((a) => a.role === "SUPER_ADMIN").length;
  const adminCount = admins.filter((a) => a.role === "ADMIN").length;

  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin_members"] });

  const columns = buildColumns();

  // Gate — only super admin should ever reach this page, but double-check client-side
  if (!isSuperAdmin) {
    return (
      <section className="flex flex-col items-center justify-center gap-4 py-24">
        <ShieldCheck className="w-10 h-10 text-gray-300" />
        <p className="text-base font-semibold text-gray-500">Super Admin access required</p>
        <p className="text-sm text-gray-400">This page is only visible to Super Admins.</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      {/* ── Page header ─────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Manage Admins</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Create and manage admin accounts for the platform
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#02198B] text-white text-sm font-medium
            hover:bg-[#011571] transition-colors shadow-sm shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          Add Admin
        </button>
      </div>

      {/* ── Stats row ───────────────────────────────────────────── */}
      {!isLoading && admins.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total Admins</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{admins.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Super Admins</p>
            <p className="text-2xl font-bold text-[#02198B] mt-1">{superAdminCount}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Admins</p>
            <p className="text-2xl font-bold text-gray-700 mt-1">{adminCount}</p>
          </div>
        </div>
      )}

      {/* ── Table ───────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {!isLoading && (
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-50">
            <span className="text-xs text-gray-400">
              {admins.length > 0 ? (
                <>
                  <span className="font-semibold text-gray-700">{admins.length}</span> admin
                  {admins.length !== 1 ? "s" : ""} total
                </>
              ) : (
                "No admins found"
              )}
            </span>
          </div>
        )}

        <AdminTable<AdminMember>
          columns={columns}
          data={admins}
          keyExtractor={(row) => row._id}
          onRowClick={(row) => router.push(`/admin/dashboard/manage-admins/${row._id}`)}
          loading={isLoading}
          skeletonRows={5}
          emptyMessage="No admins yet"
          emptySubMessage='Click "Add Admin" to create the first admin account.'
        />
      </div>

      {/* ── Create modal ────────────────────────────────────────── */}
      {showCreate && (
        <CreateAdminModal
          onClose={() => setShowCreate(false)}
          onCreated={invalidate}
        />
      )}
    </section>
  );
};

export default ManageAdmins;
