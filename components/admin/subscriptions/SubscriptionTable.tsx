"use client";

import React, { useState } from "react";
import { CalendarPlus, Flag } from "lucide-react";
import { format } from "date-fns";
import { Subscription, SubscriptionStatus } from "@/apis/crud/admin";
import AdminTable, { TableColumn } from "@/components/admin/shared/AdminTable";
import ExtendModal from "./ExtendModal";
import RefundFlagModal from "./RefundFlagModal";
import { useAuthStore } from "@/store/authStore";

interface Props {
  subscriptions: Subscription[];
  loading?: boolean;
}

const STATUS_STYLES: Record<string, string> = {
  active: "bg-green-50 text-green-700 border border-green-200",
  expired: "bg-gray-100 text-gray-500 border border-gray-200",
  cancelled: "bg-red-50 text-red-600 border border-red-200",
  past_due: "bg-orange-50 text-orange-600 border border-orange-200",
};

const PLAN_LABEL: Record<string, string> = {
  monthly: "Monthly",
  annual: "Annual",
  first_3_months_annual: "3-Mo Annual",
};

function formatDate(iso: string) {
  try {
    return format(new Date(iso), "dd MMM yyyy");
  } catch {
    return "—";
  }
}

const SubscriptionTable = ({ subscriptions, loading }: Props) => {
  const { currentUser } = useAuthStore();
  const isSuperAdmin = currentUser?.role === "SUPER_ADMIN";

  const [extendTarget, setExtendTarget] = useState<Subscription | null>(null);
  const [refundTarget, setRefundTarget] = useState<Subscription | null>(null);

  const columns: TableColumn<Subscription>[] = [
    {
      key: "email",
      header: "Artisan Email",
      width: "min-w-[200px]",
      render: (row) => (
        <span className="font-medium text-gray-800">{row.userId.email}</span>
      ),
    },
    {
      key: "planType",
      header: "Plan",
      width: "min-w-[110px]",
      render: (row) => (
        <span className="text-xs font-medium text-primary bg-primary/5 border border-primary/10 px-2 py-1 rounded-lg">
          {PLAN_LABEL[row.planType] ?? row.planType}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "min-w-[100px]",
      render: (row) => (
        <span
          className={`text-xs font-medium px-2 py-1 rounded-lg capitalize ${
            STATUS_STYLES[row.status] ?? STATUS_STYLES.expired
          }`}
        >
          {row.status.replace("_", " ")}
        </span>
      ),
    },
    {
      key: "currentPeriodEnd",
      header: "Period End",
      width: "min-w-[120px]",
      render: (row) => (
        <span className="text-gray-600">{formatDate(row.currentPeriodEnd)}</span>
      ),
    },
    {
      key: "autoRenew",
      header: "Auto-Renew",
      width: "min-w-[100px]",
      render: (row) => (
        <span
          className={`text-xs font-medium px-2 py-1 rounded-lg ${
            row.autoRenew
              ? "bg-blue-50 text-blue-600 border border-blue-200"
              : "bg-gray-100 text-gray-400 border border-gray-200"
          }`}
        >
          {row.autoRenew ? "On" : "Off"}
        </span>
      ),
    },
    ...(isSuperAdmin ? [{
      key: "actions",
      header: "Actions",
      width: "min-w-[180px]",
      render: (row: Subscription) => (
        <div className="flex items-center justify-start gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); setExtendTarget(row); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-primary/5 text-primary border border-primary/10 hover:bg-primary hover:text-white transition-all"
          >
            <CalendarPlus className="w-3.5 h-3.5" />
            Extend
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setRefundTarget(row); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-orange-50 text-orange-600 border border-orange-200 hover:bg-orange-500 hover:text-white transition-all"
          >
            <Flag className="w-3.5 h-3.5" />
            Refund
          </button>
        </div>
      ),
    }] : []),
  ];

  return (
    <>
      <AdminTable<Subscription>
        columns={columns}
        data={subscriptions}
        keyExtractor={(row) => row._id}
        loading={loading}
        skeletonRows={8}
        emptyMessage="No subscriptions found"
        emptySubMessage="Try adjusting the filter or search term."
      />

      {extendTarget && (
        <ExtendModal
          subscription={extendTarget}
          onClose={() => setExtendTarget(null)}
        />
      )}
      {refundTarget && (
        <RefundFlagModal
          subscription={refundTarget}
          onClose={() => setRefundTarget(null)}
        />
      )}
    </>
  );
};

export default SubscriptionTable;
