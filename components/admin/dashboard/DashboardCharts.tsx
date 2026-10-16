"use client";

import React from "react";
import { BarChart3, PieChart as PieIcon } from "lucide-react";
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

interface RevenueEntry {
  name: string;
  value: number;
  color: string;
}

interface DonutEntry {
  name: string;
  value: number;
  fill: string;
}

interface DashboardChartsProps {
  revenueData: RevenueEntry[];
  donutData: DonutEntry[];
  isPending: boolean;
}

const ChartSkeleton = () => (
  <div className="h-56 sm:h-64 flex flex-col justify-end gap-3 px-4 pt-4">
    <div className="flex items-end gap-6 h-full">
      {[60, 80, 45, 70].map((h, i) => (
        <div
          key={i}
          className="flex-1 bg-gray-100 rounded-t-lg animate-pulse"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  </div>
);

const DonutSkeleton = () => (
  <div className="h-56 sm:h-64 flex items-center justify-center">
    <div className="w-32 h-32 rounded-full border-[12px] border-gray-100 animate-pulse relative">
      <div className="absolute inset-0 rounded-full border-[12px] border-gray-50" />
    </div>
  </div>
);

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #f1f5f9",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  fontSize: 12,
  padding: "8px 12px",
};

const DashboardCharts = ({ revenueData, donutData, isPending }: DashboardChartsProps) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
    {/* ── Revenue Bar Chart ────────────────────────────────────── */}
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Accent strip */}
      <div className="h-1 bg-gradient-to-r from-[#02198B] to-sky-400" />

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Revenue Breakdown</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Platform financial summary</p>
            </div>
          </div>
        </div>

        <div className="h-56 sm:h-64">
          {isPending ? (
            <ChartSkeleton />
          ) : revenueData.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-2">
              <BarChart3 className="w-8 h-8 text-gray-200" />
              <p className="text-sm text-gray-400">No revenue data yet</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 8, left: -14, bottom: 0 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: "rgba(2,25,139,0.03)", radius: 8 }}
                  contentStyle={tooltipStyle}
                />
                <Bar dataKey="value" barSize={48} radius={[8, 8, 0, 0]}>
                  {revenueData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>

    {/* ── Artisan Distribution Donut ──────────────────────────── */}
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Accent strip */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 to-amber-400" />

      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <PieIcon className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Artisan Distribution</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">By account status</p>
            </div>
          </div>
        </div>

        <div className="h-56 sm:h-64">
          {isPending ? (
            <DonutSkeleton />
          ) : donutData.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-2">
              <PieIcon className="w-8 h-8 text-gray-200" />
              <p className="text-sm text-gray-400">No artisan data yet</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="42%"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {donutData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: 12, paddingTop: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardCharts;
