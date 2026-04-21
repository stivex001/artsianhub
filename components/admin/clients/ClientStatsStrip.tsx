"use client";

export const STAT_CONFIG = [
  { key: "total",      label: "Total Bookings", color: "text-blue-600",   bg: "bg-blue-50"   },
  { key: "completed",  label: "Completed",      color: "text-green-600",  bg: "bg-green-50"  },
  { key: "inProgress", label: "In Progress",    color: "text-purple-600", bg: "bg-purple-50" },
] as const;

interface ClientStatsStripProps {
  total: number;
  completed: number;
  inProgress: number;
}

const ClientStatsStrip = ({ total, completed, inProgress }: ClientStatsStripProps) => {
  const values: Record<typeof STAT_CONFIG[number]["key"], number> = {
    total,
    completed,
    inProgress,
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {STAT_CONFIG.map(({ key, label, color, bg }) => (
        <div key={key} className={`${bg} rounded-2xl p-4 flex flex-col gap-1`}>
          <p className={`text-2xl font-bold ${color}`}>{values[key]}</p>
          <p className="text-xs text-gray-500 font-medium">{label}</p>
        </div>
      ))}
    </div>
  );
};

export default ClientStatsStrip;
