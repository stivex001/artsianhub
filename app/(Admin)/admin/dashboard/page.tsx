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
import { useArtisans } from "@/api/crud/artisans";
import { useAdminAnalytics } from "@/api/crud/admin";
import StatCard from "@/components/admin/dashboard/StatCard";
import DashboardCharts from "@/components/admin/dashboard/DashboardCharts";
import QuickLinks from "@/components/admin/dashboard/QuickLinks";

const SectionHeading = ({ label }: { label: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="w-1 h-4 bg-primary rounded-full" />
    <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">{label}</h2>
  </div>
);

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
    { name: "Inactive", value: usersCount?.inactiveArtisans ?? 0, fill: "#f97316" },
    { name: "Deactivated", value: usersCount?.deactivatedArtisans ?? 0, fill: "#ef4444" },
  ].filter((d) => d.value > 0);

  const revenueData = [
    { name: "Total Revenue", value: overview?.totalRevenue ?? 0, color: "#02198B" },
    { name: "Subscriptions", value: overview?.totalActiveSubscriptions ?? 0, color: "#F0C422" },
  ];

  return (
    <section className="flex flex-col gap-8">
      {/* ── Platform Overview (analytics) ─────────────────────────── */}
      {overview && (
        <div>
          <SectionHeading label="Platform Overview" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatCard
              icon={DollarSign}
              label="Total Revenue"
              value={overview.totalRevenue ? `$${overview.totalRevenue.toLocaleString()}` : 0}
              loading={isAnalyticsPending}
              bg="bg-[#02198B]"
            />
            <StatCard
              icon={CalendarDays}
              label="Total Bookings"
              value={overview.totalBookings}
              loading={isAnalyticsPending}
              bg="bg-[#1e3a8a]"
              href="/admin/dashboard/bookings"
            />
            <StatCard
              icon={Users}
              label="Total Clients"
              value={overview.totalClients}
              loading={isAnalyticsPending}
              bg="bg-[#0f766e]"
              href="/admin/dashboard/manage-clients"
            />
            <StatCard
              icon={Star}
              label="Active Subscriptions"
              value={overview.totalActiveSubscriptions}
              loading={isAnalyticsPending}
              bg="bg-[#4338ca]"
            />
          </div>
        </div>
      )}

      {/* ── Artisan Overview ──────────────────────────────────────── */}
      <div>
        <SectionHeading label="Artisan Overview" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={Users}
            label="Total Artisans"
            value={usersCount?.totalArtisans}
            loading={isPending}
            bg="bg-primary"
            href="/admin/dashboard/manage-artisans"
          />
          <StatCard
            icon={UserCheck}
            label="Active Artisans"
            value={usersCount?.activeArtisans}
            loading={isPending}
            bg="bg-[#166534]"
          />
          <StatCard
            icon={UserX}
            label="Inactive Artisans"
            value={usersCount?.inactiveArtisans}
            loading={isPending}
            bg="bg-[#b45309]"
          />
          <StatCard
            icon={ShieldOff}
            label="Deactivated"
            value={usersCount?.deactivatedArtisans}
            loading={isPending}
            bg="bg-[#991b1b]"
          />
        </div>
      </div>

      {/* ── Appointment Activity ──────────────────────────────────── */}
      <div>
        <SectionHeading label="Appointment Activity" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={CalendarDays}
            label="Total Appointments"
            value={appointmentsCount?.totalAppointments}
            loading={isPending}
            bg="bg-[#1e3a8a]"
            href="/admin/dashboard/bookings"
          />
          <StatCard
            icon={CheckCircle2}
            label="Accepted"
            value={appointmentsCount?.acceptedAppointments}
            loading={isPending}
            bg="bg-[#0f766e]"
          />
          <StatCard
            icon={XCircle}
            label="Declined"
            value={appointmentsCount?.declinedAppointments}
            loading={isPending}
            bg="bg-[#9f1239]"
          />
          <StatCard
            icon={Trophy}
            label="Completed"
            value={appointmentsCount?.completedAppointments}
            loading={isPending}
            bg="bg-[#4338ca]"
          />
        </div>
      </div>

      {/* ── Charts ────────────────────────────────────────────────── */}
      <DashboardCharts
        revenueData={revenueData}
        donutData={donutData}
        isPending={isPending}
      />

      {/* ── Quick Actions ─────────────────────────────────────────── */}
      <QuickLinks />
    </section>
  );
};

export default AdminDashboard;
