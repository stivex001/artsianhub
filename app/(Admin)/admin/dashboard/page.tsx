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
  DollarSign,
  Star,
} from "lucide-react";
import { useArtisans } from "@/apis/crud/artisans";
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
  const { getAllArtisanCount } = useArtisans();
  const { getOverview } = useAdminAnalytics();

  const { data: counts, isLoading: isCountsPending } = getAllArtisanCount();
  const { data: analytics, isLoading: isAnalyticsPending } = getOverview();

  const isPending = isCountsPending || isAnalyticsPending;
  const appointmentsCount = counts?.appointments;
  const usersCount = counts?.users;
  const overview = analytics?.data;

  const donutData = [
    { name: "Active", value: usersCount?.activeArtisans ?? 0, fill: "#22c55e" },
    { name: "Inactive", value: usersCount?.inactiveArtisans ?? 0, fill: "#f59e0b" },
    { name: "Deactivated", value: usersCount?.deactivatedArtisans ?? 0, fill: "#ef4444" },
  ].filter((d) => d.value > 0);

  const revenueData = [
    { name: "Total Revenue", value: overview?.totalRevenue ?? 0, color: "#02198B" },
    { name: "Subscriptions", value: overview?.totalActiveSubscriptions ?? 0, color: "#F0C422" },
  ];

  return (
    <section className="flex flex-col gap-8">
      {/* ── Platform Overview ─────────────────────────────────── */}
      {overview && (
        <div>
          <SectionHeading label="Platform Overview" sub="High-level platform metrics" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatCard
              icon={DollarSign}
              label="Total Revenue"
              value={overview.totalRevenue ? `$${overview.totalRevenue.toLocaleString()}` : 0}
              loading={isAnalyticsPending}
              bg="bg-[#02198B]"
              href="/admin/dashboard/bookings"
            />
            <StatCard
              icon={CalendarDays}
              label="Total Bookings"
              value={overview.totalBookings}
              loading={isAnalyticsPending}
              bg="bg-sky-500"
              href="/admin/dashboard/bookings"
            />
            <StatCard
              icon={Users}
              label="Total Clients"
              value={overview.totalClients}
              loading={isAnalyticsPending}
              bg="bg-teal-500"
              href="/admin/dashboard/manage-clients"
            />
            <StatCard
              icon={Star}
              label="Active Subscriptions"
              value={overview.totalActiveSubscriptions}
              loading={isAnalyticsPending}
              bg="bg-violet-500"
            />
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
            value={usersCount?.totalArtisans}
            loading={isPending}
            bg="bg-[#02198B]"
            href="/admin/dashboard/manage-artisans"
          />
          <StatCard
            icon={UserCheck}
            label="Active Artisans"
            value={usersCount?.activeArtisans}
            loading={isPending}
            bg="bg-emerald-500"
          />
          <StatCard
            icon={UserX}
            label="Inactive Artisans"
            value={usersCount?.inactiveArtisans}
            loading={isPending}
            bg="bg-amber-500"
          />
          <StatCard
            icon={ShieldOff}
            label="Deactivated"
            value={usersCount?.deactivatedArtisans}
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
            value={appointmentsCount?.totalAppointments}
            loading={isPending}
            bg="bg-blue-600"
            href="/admin/dashboard/bookings"
          />
          <StatCard
            icon={CheckCircle2}
            label="Accepted"
            value={appointmentsCount?.acceptedAppointments}
            loading={isPending}
            bg="bg-emerald-600"
          />
          <StatCard
            icon={XCircle}
            label="Declined"
            value={appointmentsCount?.declinedAppointments}
            loading={isPending}
            bg="bg-rose-500"
          />
          <StatCard
            icon={Trophy}
            label="Completed"
            value={appointmentsCount?.completedAppointments}
            loading={isPending}
            bg="bg-violet-600"
          />
        </div>
      </div>

      {/* ── Analytics Charts ──────────────────────────────────── */}
      <div>
        <SectionHeading label="Analytics" sub="Revenue and artisan distribution at a glance" />
        <DashboardCharts
          revenueData={revenueData}
          donutData={donutData}
          isPending={isPending}
        />
      </div>

      {/* ── Quick Actions ─────────────────────────────────────── */}
      <QuickLinks />
    </section>
  );
};

export default AdminDashboard;
