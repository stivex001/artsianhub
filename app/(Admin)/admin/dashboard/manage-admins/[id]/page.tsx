"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { toast } from "sonner";
import {
  ArrowLeft,
  ShieldCheck,
  Clock,
  KeyRound,
  Mail,
  Calendar,
  Activity,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";

import {
  useAdminManagement,
  AdminMember,
  AdminStatus,
  UpdateAdminBody,
  ActivityLog,
} from "@/apis/crud/admin";
import { AdminRoleBadge, AdminStatusBadge } from "@/components/admin/shared/badges";

import { initials, extractErrorMessage } from "@/components/admin/admins/detail-helpers";
import { STATUS_OPTIONS, ACTIVITY_PAGE_SIZE } from "@/components/admin/admins/detail-constants";
import {
  InfoRow,
  PageSkeleton,
  ActivityItem,
  ActivityLogSkeleton,
  ActivityEmptyState,
} from "@/components/admin/admins/AdminDetailComponents";

// ─────────────────────────────────────────────────────────────────────────────
// Pagination controls
// ─────────────────────────────────────────────────────────────────────────────
interface PaginationProps {
  page: number;
  total: number;
  onChange: (p: number) => void;
}

const Pagination = ({ page, total, onChange }: PaginationProps) => {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === total || Math.abs(p - page) <= 1)
    .reduce<(number | "…")[]>((acc, p, idx, arr) => {
      if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("…");
      acc.push(p);
      return acc;
    }, []);

  return (
    <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-50">
      <span className="text-xs text-gray-400">
        Page {page} of {total}
      </span>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-600
            hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Prev
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className="px-2 text-xs text-gray-400">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className={`w-7 h-7 rounded-lg text-xs font-medium transition-colors
                ${page === p
                  ? "bg-[#02198B] text-white"
                  : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onChange(Math.min(total, page + 1))}
          disabled={page === total}
          className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 text-gray-600
            hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────
export default function AdminDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { getAllAdmins, updateAdmin, getAdminActivity } = useAdminManagement();
  const { data: adminsData, isLoading: loadingAdmins } = getAllAdmins();
  const { data: activityData, isLoading: loadingActivity } = getAdminActivity(id);

  const admin: AdminMember | undefined = adminsData?.data?.find((a) => a._id === id);
  const activities: ActivityLog[] = activityData?.data ?? [];

  // ── Activity pagination ────────────────────────────────────────────────────
  const [activityPage, setActivityPage] = useState(1);
  const totalActivityPages = Math.ceil(activities.length / ACTIVITY_PAGE_SIZE);
  const pagedActivities = activities.slice(
    (activityPage - 1) * ACTIVITY_PAGE_SIZE,
    activityPage * ACTIVITY_PAGE_SIZE,
  );

  // ── Edit state ─────────────────────────────────────────────────────────────
  const [roleLabel, setRoleLabel] = useState("");
  const [status, setStatus] = useState<AdminStatus>("active");
  const [formReady, setFormReady] = useState(false);

  // Initialise form once admin data lands (avoids useEffect)
  if (admin && !formReady) {
    setRoleLabel(admin.roleLabel ?? "");
    setStatus(admin.status);
    setFormReady(true);
  }

  const { mutateAsync: doUpdate, isPending: saving } = updateAdmin(id);

  const handleSave = async () => {
    const body: UpdateAdminBody = {};
    if (roleLabel.trim() !== (admin?.roleLabel ?? "")) body.roleLabel = roleLabel.trim() || undefined;
    if (status !== admin?.status) body.status = status;

    if (!Object.keys(body).length) {
      toast.info("No changes to save.");
      return;
    }

    try {
      await doUpdate(body);
      toast.success("Admin updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["admin_members"] });
    } catch (err) {
      toast.error(extractErrorMessage(err, "Failed to update admin."));
    }
  };

  // ── Loading / not-found guards ─────────────────────────────────────────────
  if (loadingAdmins) return <section className="flex flex-col gap-6"><PageSkeleton /></section>;

  if (!admin) return (
    <section className="flex flex-col items-center justify-center gap-4 py-24">
      <AlertTriangle className="w-10 h-10 text-gray-300" />
      <p className="text-base font-semibold text-gray-500">Admin not found</p>
      <Link href="/admin/dashboard/manage-admins" className="text-sm text-[#02198B] hover:underline font-medium">
        Back to Manage Admins
      </Link>
    </section>
  );

  const avatarInitials = initials(admin.name);

  return (
    <section className="flex flex-col gap-6">
      {/* ── Back link ─────────────────────────────────────────────── */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors w-fit"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Admins
      </button>

      {/* ── Hero card ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="h-1 w-full rounded-t-2xl bg-gradient-to-r from-[#02198B] via-[#1e3a8a] to-[#F0C422]" />
        <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#02198B] to-[#1e3a8a] flex items-center justify-center ring-4 ring-white shadow-md shrink-0">
            <span className="text-xl font-bold text-white">{avatarInitials}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-lg font-bold text-gray-900">{admin.name}</h1>
              <AdminRoleBadge role={admin.role} />
              <AdminStatusBadge status={admin.status} />
            </div>
            <p className="text-sm text-gray-400 mt-0.5">{admin.email}</p>
            {admin.roleLabel && (
              <p className="text-xs text-gray-400 mt-0.5 italic">{admin.roleLabel}</p>
            )}
          </div>
          <div className="flex flex-wrap gap-3 sm:flex-col sm:items-end shrink-0">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <KeyRound className="w-3.5 h-3.5 shrink-0" />
              2FA:{" "}
              <span className={admin.twoFactorEnabled ? "text-emerald-600 font-semibold" : "text-gray-400"}>
                {admin.twoFactorEnabled ? "Enabled" : "Off"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              Joined {admin.createdAt ? format(new Date(admin.createdAt), "MMM d, yyyy") : "—"}
            </div>
            {admin.lastLogin && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                Last login {format(new Date(admin.lastLogin), "MMM d, yyyy")}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left: account details + activity ─────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Account details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
            <h2 className="text-sm font-bold text-gray-800 mb-4">Account Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <InfoRow icon={<Mail className="w-4 h-4 text-gray-400" />} label="Email" value={<span className="text-sm text-gray-700">{admin.email}</span>} />
              <InfoRow icon={<ShieldCheck className="w-4 h-4 text-gray-400" />} label="Role" value={<AdminRoleBadge role={admin.role} />} />
              <InfoRow icon={<Activity className="w-4 h-4 text-gray-400" />} label="Status" value={<AdminStatusBadge status={admin.status} />} />
              <InfoRow
                icon={<KeyRound className="w-4 h-4 text-gray-400" />}
                label="Two-Factor Auth"
                value={
                  <span className={`text-sm font-medium ${admin.twoFactorEnabled ? "text-emerald-600" : "text-gray-400"}`}>
                    {admin.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </span>
                }
              />
              <InfoRow
                icon={<Calendar className="w-4 h-4 text-gray-400" />}
                label="Created"
                value={<span className="text-sm text-gray-700">{admin.createdAt ? format(new Date(admin.createdAt), "MMMM d, yyyy") : "—"}</span>}
              />
              <InfoRow
                icon={<Clock className="w-4 h-4 text-gray-400" />}
                label="Last Login"
                value={<span className="text-sm text-gray-700">{admin.lastLogin ? format(new Date(admin.lastLogin), "MMMM d, yyyy · h:mm a") : "Never"}</span>}
              />
            </div>

            {admin.emailNotificationPreferences && (
              <div className="mt-5 pt-5 border-t border-gray-50">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Email Notification Preferences
                </p>
                <div className="flex flex-wrap gap-2">
                  {(["high", "medium", "low"] as const).map((level) => (
                    <span
                      key={level}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${
                        admin.emailNotificationPreferences[level]
                          ? "bg-[#02198B]/10 text-[#02198B] ring-1 ring-[#02198B]/20"
                          : "bg-gray-100 text-gray-400 ring-1 ring-gray-200"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${admin.emailNotificationPreferences[level] ? "bg-[#02198B]" : "bg-gray-300"}`} />
                      {level}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Activity log */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-gray-800">Activity Log</h2>
              {!loadingActivity && activities.length > 0 && (
                <span className="text-xs text-gray-400">
                  {activities.length} event{activities.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {loadingActivity ? (
              <ActivityLogSkeleton />
            ) : activities.length === 0 ? (
              <ActivityEmptyState />
            ) : (
              <>
                <div className="max-h-[480px] overflow-y-auto pr-1 scrollbar-hidden">
                  <div className="flex flex-col">
                    {pagedActivities.map((log) => (
                      <ActivityItem key={log._id} log={log} />
                    ))}
                  </div>
                </div>
                <Pagination
                  page={activityPage}
                  total={totalActivityPages}
                  onChange={setActivityPage}
                />
              </>
            )}
          </div>
        </div>

        {/* ── Right: edit form ─────────────────────────────────────── */}
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 sticky top-24">
            <h2 className="text-sm font-bold text-gray-800 mb-4">Edit Admin</h2>

            {/* Role Label */}
            <div className="flex flex-col gap-1.5 mb-5">
              <label className="text-xs font-semibold text-gray-600">
                Role Label <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={roleLabel}
                onChange={(e) => setRoleLabel(e.target.value)}
                placeholder="e.g. Senior Moderator"
                className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition"
              />
              <p className="text-[11px] text-gray-400">A descriptive label shown alongside the role</p>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-2 mb-6">
              <label className="text-xs font-semibold text-gray-600">Account Status</label>
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setStatus(opt.value)}
                  className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition
                    ${status === opt.value ? opt.cls : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center
                      ${status === opt.value ? "border-[#02198B]" : "border-gray-300"}`}
                  >
                    {status === opt.value && <div className="w-2 h-2 rounded-full bg-[#02198B]" />}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${status === opt.value ? "text-gray-900" : "text-gray-600"}`}>
                      {opt.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{opt.description}</p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleSave}
              disabled={saving || !formReady}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#02198B] text-white text-sm font-medium
                hover:bg-[#011571] disabled:opacity-60 transition-colors shadow-sm"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
