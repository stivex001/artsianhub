"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminTable from "@/components/admin/shared/AdminTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CustomButton } from "@/components/clickable/CustomButton";
import { useSubscriptions } from "@/apis/crud/subscriptions";
import { SubscriptionPlanId } from "@/types/subscription";
import type { PaymentHistory } from "@/apis/crud/subscriptions";
import { Descriptions } from "@/components/shared/Headings";
import { toast } from "sonner";
import { formatCurrency } from "@/utils/formatCurrency";

const PAGE_SIZE = 10;

const paymentColumns = [
  {
    key: "description",
    header: "Description",
    render: (row: PaymentHistory) => (
      <span className="text-sm text-gray-600 line-clamp-2">{row.description || "—"}</span>
    ),
  },
  {
    key: "amount",
    header: "Amount",
    render: (row: PaymentHistory) => (
      <span className="text-sm font-medium text-gray-900">
        {typeof row.amount === "number"
          ? formatCurrency(row.amount, row.currency ?? "gbp")
          : row.amount ?? "—"}
      </span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (row: PaymentHistory) => <StatusBadge status={row.status ?? "—"} />,
  },
  {
    key: "paidAt",
    header: "Date",
    render: (row: PaymentHistory) => (
      <span className="text-sm text-gray-600">
        {row.paidAt ? new Date(row.paidAt).toLocaleDateString(undefined, { dateStyle: "medium" }) : "—"}
      </span>
    ),
  },
];

export default function SubscriptionHistoryPage() {
  const [page, setPage] = useState(1);

  const { getPaymentHistory, getStatus, createCheckout } = useSubscriptions();
  const { data: historyData, isLoading } = getPaymentHistory(page, PAGE_SIZE);
  const { data: statusData } = getStatus();
  const { mutate: createCheckoutSession, isPending: isCheckoutPending } = createCheckout();

  const subscriptionStatus = statusData?.data;
  const payments = historyData?.data ?? [];
  const paginationMeta = historyData?.pagination;

  const currentPeriodEnd = subscriptionStatus?.currentPeriodEnd
    ? new Date(subscriptionStatus.currentPeriodEnd)
    : null;
  const today = useMemo(() => new Date(), []);
  today.setHours(0, 0, 0, 0);
  const expiryDate = currentPeriodEnd ? new Date(currentPeriodEnd) : null;
  if (expiryDate) expiryDate.setHours(0, 0, 0, 0);
  const canRenew =
    subscriptionStatus &&
    !subscriptionStatus.isActive &&
    currentPeriodEnd != null &&
    expiryDate != null &&
    today >= expiryDate;

  const handleRenew = () => {
    const successUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/artisan/dashboard/subscription?success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/artisan/dashboard/subscription`;

    createCheckoutSession(
      {
        planType: (subscriptionStatus?.planType ?? SubscriptionPlanId.FirstThreeMonthsMonthly) as SubscriptionPlanId,
        successUrl,
        cancelUrl,
      },
      {
        onSuccess: (response: any) => {
          if (response?.data?.url) window.location.href = response.data.url;
        },
        onError: (error: any) => {
          toast.error(error?.data?.error || "Failed to start checkout");
        },
      }
    );
  };

  const pagination =
    paginationMeta && paginationMeta.pages > 0
      ? {
          currentPage: paginationMeta.page,
          totalPages: paginationMeta.pages,
          onPageChange: setPage,
        }
      : undefined;

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Link
          href="/artisan/dashboard/subscription"
          className="inline-flex items-center gap-2 text-body hover:text-primary font-medium text-sm w-fit"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to subscription
        </Link>
      </div>

      <Descriptions
        title="Subscription history"
        desc="View your payment history and renew when your subscription has expired"
      />

      {canRenew && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-primary px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-gray-600">
            Your subscription has expired. Renew now to become visible to clients again.
          </p>
          <CustomButton
            label="Renew subscription"
            onClick={handleRenew}
            isLoading={isCheckoutPending}
            variant="primary"
            className="shrink-0"
          />
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <AdminTable
          columns={paymentColumns}
          data={payments}
          keyExtractor={(row: PaymentHistory) => row.paidAt ?? String(Math.random())}
          loading={isLoading}
          skeletonRows={6}
          emptyMessage="No payment history yet"
          emptySubMessage="Your subscription payments will appear here"
        />
      </div>
    </section>
  );
}
