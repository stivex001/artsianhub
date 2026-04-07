"use client";

import { useArtisans } from "@/api/crud/artisans";
import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  ShieldOff,
  CalendarDays,
  CheckCircle2,
  XCircle,
  Trophy,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";

// ── Stat Card ──────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number | string | undefined;
  loading: boolean;
  bg: string;
}

const StatCard = ({ icon: Icon, label, value, loading, bg }: StatCardProps) => (
  <div className={`${bg} rounded-2xl p-5 flex items-start gap-4`}>
    <div className="bg-white/20 rounded-xl p-2.5 shrink-0">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div className="min-w-0">
      {loading ? (
        <div className="h-7 w-12 bg-white/30 rounded-lg animate-pulse mb-1" />
      ) : (
        <p className="text-2xl font-bold text-white leading-tight">
          {value ?? "—"}
        </p>
      )}
      <p className="text-xs text-white/75 mt-1 leading-snug">{label}</p>
    </div>
  </div>
);

// ── Revenue Data ───────────────────────────────────────────────────────────────
const revenueData = [
  { name: "Artisan Revenue", value: 60, color: "#02198B" },
  { name: "Subscription Revenue", value: 30, color: "#F0C422" },
];

// ── Page ───────────────────────────────────────────────────────────────────────
const AdminDashboard = () => {
  const { getAllArtisanCount } = useArtisans();
  const { data: counts, isLoading: isPending } = getAllArtisanCount();

  const appointmentsCount = counts?.appointments;
  const usersCount = counts?.users;

  const donutData = [
    { name: "Active", value: usersCount?.activeArtisans ?? 0, fill: "#22c55e" },
    { name: "Inactive", value: usersCount?.inactiveArtisans ?? 0, fill: "#f97316" },
    {
      name: "Deactivated",
      value: usersCount?.deactivatedArtisans ?? 0,
      fill: "#ef4444",
    },
  ].filter((d) => d.value > 0);

  return (
    <section className="flex flex-col gap-8">
      {/* ── User Overview ─────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 bg-primary rounded-full" />
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
            User Overview
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={Users}
            label="Total Artisans"
            value={usersCount?.totalArtisans}
            loading={isPending}
            bg="bg-primary"
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
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 bg-primary rounded-full" />
          <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
            Appointment Activity
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <StatCard
            icon={CalendarDays}
            label="Total Appointments"
            value={appointmentsCount?.totalAppointments}
            loading={isPending}
            bg="bg-[#1e3a8a]"
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Revenue Bar Chart */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
              Revenue Breakdown
            </h3>
          </div>
          <div className="h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(2,25,139,0.04)" }}
                  contentStyle={{
                    borderRadius: 10,
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" barSize={52} radius={[6, 6, 0, 0]}>
                  {revenueData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Artisan Distribution Donut */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-semibold text-gray-600 uppercase tracking-widest">
              Artisan Distribution
            </h3>
          </div>
          <div className="h-56 sm:h-64">
            {isPending ? (
              <div className="h-full flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border-8 border-gray-100 animate-pulse" />
              </div>
            ) : donutData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-gray-400">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="45%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {donutData.map((entry, i) => (
                      <Cell key={i} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 10,
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                      fontSize: 12,
                    }}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
