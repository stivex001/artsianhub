"use client";

import React from "react";
import { BarChart3, TrendingUp } from "lucide-react";
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

const DashboardCharts = ({ revenueData, donutData, isPending }: DashboardChartsProps) => (
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
          <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
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
);

export default DashboardCharts;
