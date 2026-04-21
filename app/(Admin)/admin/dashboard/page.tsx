"use client";

import {
  Users,
  UserCheck,
  UserX,
  ShieldOff,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Trophy,
  PoundSterling,
  Star,
  Clock,
  Flag,
  Trash2,
  Ticket,
} from "lucide-react";
import { useAdminAnalytics } from "@/apis/crud/admin";
import StatCard from "@/components/admin/dashboard/StatCard";
import DashboardCharts from "@/components/admin/dashboard/DashboardCharts";
import QuickLinks from "@/components/admin/dashboard/QuickLinks";

// ── Section heading ───────────────────────────────────────────────────────────
const SectionHeading = ({ label, sub }: { label: string; sub?: string }) => (
  <div className="flex items-center gap-2.5 mb-4">
    <div className="w-1 h-5 bg-primary rounded-full" />
    <div>
      <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">{label}</h2>
      {sub && <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>}
    </div>
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { getOverview } = useAdminAnalytics();
  const { data: analytics, isLoading: isPending } = getOverview();

  const overview = analytics?.data;
  const platform = overview?.platformOverview;
  const artisans = overview?.artisanOverview;
  const clients = overview?.clientOverview;
  const appointments = overview?.appointmentActivity;
  const reviews = overview?.reviewSummary;

  const donutData = [
    { name: "Active", value: artisans?.activeArtisans ?? 0, fill: "#22c55e" },
    { name: "Suspended", value: artisans?.suspendedArtisans ?? 0, fill: "#f59e0b" },
    { name: "Banned", value: artisans?.bannedArtisans ?? 0, fill: "#ef4444" },
  ].filter((d) => d.value > 0);

  const revenueData = [
    { name: "Total Revenue", value: overview?.analytics?.revenueBreakdown?.totalRevenue ?? 0, color: "#02198B" },
    { name: "Subscriptions", value: overview?.analytics?.revenueBreakdown?.totalSubscriptions ?? 0, color: "#F0C422" },
  ];

  return (
    <section className="flex flex-col gap-8">
      {/* ── Platform Overview ─────────────────────────────────── */}
      {platform && (
        <div>
          <SectionHeading label="Platform Overview" sub="High-level platform metrics" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {platform.totalRevenue !== null && (
              <StatCard
                icon={PoundSterling}
                label="Total Revenue"
                value={platform.totalRevenue ? `£${platform.totalRevenue.toLocaleString()}` : 0}
                loading={isPending}
                bg="bg-[#02198B]"
              />
            )}
            <StatCard
              icon={CalendarDays}
              label="Total Bookings"
              value={platform.totalBookings}
              loading={isPending}
              bg="bg-sky-500"
              href="/admin/dashboard/bookings"
            />
            <StatCard
              icon={Users}
              label="Total Clients"
              value={platform.totalClients}
              loading={isPending}
              bg="bg-teal-500"
              href="/admin/dashboard/manage-clients"
            />
            {platform.activeSubscriptions !== null && (
              <StatCard
                icon={Star}
                label="Active Subscriptions"
                value={platform.activeSubscriptions}
                loading={isPending}
                bg="bg-violet-500"
              />
            )}
          </div>
        </div>
      )}

      {/* ── Artisan Overview ──────────────────────────────────── */}
      <div>
        <SectionHeading label="Artisan Overview" sub="Registered artisan accounts by status" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={Users}
            label="Total Artisans"
            value={artisans?.totalArtisans}
            loading={isPending}
            bg="bg-[#02198B]"
            href="/admin/dashboard/manage-artisans"
          />
          <StatCard
            icon={UserCheck}
            label="Active Artisans"
            value={artisans?.activeArtisans}
            loading={isPending}
            bg="bg-emerald-500"
          />
          <StatCard
            icon={UserX}
            label="Suspended"
            value={artisans?.suspendedArtisans}
            loading={isPending}
            bg="bg-amber-500"
          />
          <StatCard
            icon={ShieldOff}
            label="Banned"
            value={artisans?.bannedArtisans}
            loading={isPending}
            bg="bg-red-500"
          />
        </div>
      </div>

      {/* ── Client Overview ──────────────────────────────────── */}
      <div>
        <SectionHeading label="Client Overview" sub="Registered client accounts by status" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={Users}
            label="Total Clients"
            value={clients?.totalClients}
            loading={isPending}
            bg="bg-[#02198B]"
            href="/admin/dashboard/manage-clients"
          />
          <StatCard
            icon={UserCheck}
            label="Active Clients"
            value={clients?.activeClients}
            loading={isPending}
            bg="bg-emerald-500"
          />
          <StatCard
            icon={UserX}
            label="Suspended"
            value={clients?.suspendedClients}
            loading={isPending}
            bg="bg-amber-500"
          />
          <StatCard
            icon={ShieldOff}
            label="Banned"
            value={clients?.bannedClients}
            loading={isPending}
            bg="bg-red-500"
          />
        </div>
      </div>

      {/* ── Appointment Activity ──────────────────────────────── */}
      <div>
        <SectionHeading label="Appointment Activity" sub="Booking outcomes across all artisans" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={CalendarDays}
            label="Total Appointments"
            value={appointments?.totalAppointments}
            loading={isPending}
            bg="bg-blue-600"
            href="/admin/dashboard/bookings"
          />
          <StatCard
            icon={CheckCircle2}
            label="Accepted"
            value={appointments?.accepted}
            loading={isPending}
            bg="bg-emerald-600"
          />
          <StatCard
            icon={XCircle}
            label="Declined"
            value={appointments?.declined}
            loading={isPending}
            bg="bg-rose-500"
          />
          <StatCard
            icon={Trophy}
            label="Completed"
            value={appointments?.completed}
            loading={isPending}
            bg="bg-violet-600"
          />
        </div>
      
      </div>


      {/* ── Review Summary ────────────────────────────────────── */}
      <div>
        <SectionHeading label="Review Summary" sub="Platform review moderation status" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          <StatCard
            icon={Star}
            label="Total Reviews"
            value={reviews?.totalReviews}
            loading={isPending}
            bg="bg-[#02198B]"
            href="/admin/dashboard/reviews"
          />
          <StatCard
            icon={Clock}
            label="Pending"
            value={reviews?.pending}
            loading={isPending}
            bg="bg-amber-500"
          />
          <StatCard
            icon={CheckCircle2}
            label="Approved"
            value={reviews?.approved}
            loading={isPending}
            bg="bg-emerald-500"
          />
          <StatCard
            icon={Flag}
            label="Flagged"
            value={reviews?.flagged}
            loading={isPending}
            bg="bg-orange-500"
          />
          <StatCard
            icon={Trash2}
            label="Removed"
            value={reviews?.removed}
            loading={isPending}
            bg="bg-rose-500"
          />
        </div>
      </div>

      {/* ── Open Tickets ──────────────────────────────────────── */}
      <div>
        <SectionHeading label="Support" sub="Open support tickets awaiting attention" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={Ticket}
            label="Open Tickets"
            value={overview?.openTickets ?? 0}
            loading={isPending}
            bg="bg-sky-600"
            href="/admin/dashboard/support-tickets"
          />
        </div>
      </div>

      {/* ── Analytics Charts — SUPER_ADMIN only (analytics is null for regular admins) */}
      {overview?.analytics !== null && overview?.analytics !== undefined && (
        <div>
          <SectionHeading label="Analytics" sub="Revenue and artisan distribution at a glance" />
          <DashboardCharts
            revenueData={revenueData}
            donutData={donutData}
            isPending={isPending}
          />
        </div>
      )}

      {/* ── Quick Actions ─────────────────────────────────────── */}
      <QuickLinks />
    </section>
  );
};

export default AdminDashboard;
