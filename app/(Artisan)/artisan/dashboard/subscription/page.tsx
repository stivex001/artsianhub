"use client";

import React, { useState, useRef } from "react";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import { useSubscriptions, SubscriptionStatus, SubscriptionStatusValue } from "@/apis/crud/subscriptions";
import { Check, Loader2, AlertCircle, Clock, XCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { SubscriptionPlanId } from "@/types/subscription";

function getStatusBorderColor(status: SubscriptionStatusValue): string {
  switch (status) {
    case "active":    return "border-l-green-500";
    case "trialing":  return "border-l-blue-500";
    case "past_due":  return "border-l-orange-500";
    case "incomplete": return "border-l-yellow-500";
    default:          return "border-l-red-500";
  }
}

function getStatusIcon(status: SubscriptionStatusValue) {
  switch (status) {
    case "active":
      return <Check className="text-green-600 mt-0.5 shrink-0" size={20} />;
    case "trialing":
      return <Clock className="text-blue-500 mt-0.5 shrink-0" size={20} />;
    case "past_due":
    case "incomplete":
      return <AlertCircle className="text-orange-500 mt-0.5 shrink-0" size={20} />;
    default:
      return <XCircle className="text-red-500 mt-0.5 shrink-0" size={20} />;
  }
}

function getStatusTitle(status: SubscriptionStatusValue): string {
  switch (status) {
    case "active":             return "Active Subscription";
    case "trialing":           return "Free Trial Active";
    case "past_due":           return "Payment Failed — Grace Period Active";
    case "incomplete":         return "Payment Pending";
    case "incomplete_expired": return "Payment Window Expired";
    case "unpaid":             return "Unpaid — Access Suspended";
    case "canceled":           return "Subscription Canceled";
    case "expired":            return "Subscription Expired";
    default:                   return "No Active Subscription";
  }
}

function getStatusDetail(s: SubscriptionStatus) {
  const fmt = (d: string) => new Date(d).toLocaleDateString();

  switch (s.status) {
    case "active":
      return (
        <>
          {s.currentPeriodEnd && (
            <p>{s.cancelAtPeriodEnd ? "Ends" : "Renews"}: <span className="font-medium">{fmt(s.currentPeriodEnd)}</span></p>
          )}
          {s.cancelAtPeriodEnd && (
            <p className="text-yellow-600 font-medium">Will cancel at period end</p>
          )}
        </>
      );
    case "trialing":
      return s.currentPeriodEnd ? (
        <p>Trial ends: <span className="font-medium">{fmt(s.currentPeriodEnd)}</span></p>
      ) : null;
    case "past_due":
      return (
        <>
          {s.gracePeriodEnd && (
            <p className="text-orange-600 font-medium flex items-center gap-1">
              <Clock size={13} /> Grace period ends: {fmt(s.gracePeriodEnd)}
            </p>
          )}
          <p className="text-gray-500">Update your payment method to avoid losing access.</p>
        </>
      );
    case "incomplete":
      return (
        <p className="text-gray-500">
          Complete your payment to activate your subscription. Check your bank for a pending approval.
        </p>
      );
    case "incomplete_expired":
      return (
        <p className="text-gray-500">
          The payment window has closed. Please start a new checkout session to subscribe.
        </p>
      );
    case "unpaid":
      return (
        <p className="text-gray-500">
          All payment retries have failed. Your profile is hidden. Start a new subscription to regain access.
        </p>
      );
    case "canceled":
    case "expired":
      return (
        <>
          {s.currentPeriodEnd && (
            <p className="text-red-600 font-medium flex items-center gap-1">
              <Clock size={13} /> Ended on {fmt(s.currentPeriodEnd)}
            </p>
          )}
          <p className="text-gray-500">Your profile is no longer visible. Subscribe below to reactivate.</p>
        </>
      );
    default:
      return (
        <p className="text-gray-500">Your profile is not visible to clients. Subscribe to start receiving requests.</p>
      );
  }
}

type Props = {};

const SubscriptionPage = (props: Props) => {
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);

  const { getPlans, getStatus, createCheckout, syncSubscription } =
    useSubscriptions();
  const { data: plansData, isLoading: plansLoading } = getPlans();
  const {
    data: statusData,
    isLoading: statusLoading,
    refetch: refetchStatus,
  } = getStatus();
  const { mutate: createCheckoutSession, isPending: isCheckoutPending } =
    createCheckout();
  const { mutateAsync: syncSubscriptionMutation } = syncSubscription();

  const plans = (plansData?.data || []).filter(
    (plan) =>
      plan.id === SubscriptionPlanId.FirstThreeMonthsMonthly ||
      plan.id === SubscriptionPlanId.FirstThreeMonthsAnnual,
  );
  const subscriptionStatus = statusData?.data;

  const handleSubscribe = (planId: SubscriptionPlanId) => {
    setProcessingPlanId(planId);
    const successUrl = `${window.location.origin}/artisan/dashboard/subscription?success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${window.location.origin}/artisan/dashboard/subscription`;

    createCheckoutSession(
      {
        planType: planId,
        successUrl,
        cancelUrl,
      },
      {
        onSuccess: (response) => {
          if (response?.data?.url) {
            window.location.href = response.data.url;
          }
        },
        onError: (error: any) => {
          toast.error(
            error?.data?.error || "Failed to create checkout session",
          );
          setProcessingPlanId(null);
        },
      },
    );
  };

  // On success redirect: sync subscription with backend, then refetch and clean URL
  const hasHandledSuccess = useRef(false);
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const sessionId = urlParams.get("session_id");

    if (success !== "true" || hasHandledSuccess.current) return;
    hasHandledSuccess.current = true;

    const run = async () => {
      if (sessionId) {
        try {
          await syncSubscriptionMutation();
          toast.success(
            "Subscription activated! Your profile is now visible to clients.",
          );
        } catch (err: any) {
          toast.error(
            err?.data?.error ||
              "Failed to sync subscription. Status may update shortly.",
          );
        }
      } else {
        toast.error(
          "Unable to verify subscription. Please check your subscription status.",
        );
      }
      await refetchStatus();
      router.replace("/artisan/dashboard/subscription");
    };

    run();
  }, [syncSubscriptionMutation, refetchStatus, router]);

  return (
    <section className="flex flex-col gap-5">
      <Descriptions
        title="Subscription Plans"
        desc="Subscribe to become visible in the marketplace and start receiving appointment requests"
      />

      {/* Current Subscription Status - clickable to open history */}
      {!statusLoading && subscriptionStatus && (
        <Link href="/artisan/dashboard/subscription/history" className="block">
          <Wrapper
            className={`border-l-4 cursor-pointer hover:bg-gray-50/50 transition-colors ${getStatusBorderColor(subscriptionStatus.status)}`}
          >
            <div className="flex items-start gap-3">
              {getStatusIcon(subscriptionStatus.status)}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {getStatusTitle(subscriptionStatus.status)}
                </h3>
                <div className="text-sm text-gray-700 space-y-1">
                  {subscriptionStatus.planType && (
                    <p>
                      Plan:{" "}
                      <span className="font-medium capitalize">
                        {subscriptionStatus.planType.replace(/_/g, " ")}
                      </span>
                    </p>
                  )}
                  {getStatusDetail(subscriptionStatus)}
                </div>
              </div>
            </div>
          </Wrapper>
        </Link>
      )}

      {/* Subscription Plans */}
      {plansLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Wrapper key={i}>
              <Skeleton className="h-64 w-full" />
            </Wrapper>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => {
            const isPopular = plan.id === SubscriptionPlanId.FirstThreeMonthsAnnual;
            const isCurrentPlan =
              subscriptionStatus?.isActive &&
              subscriptionStatus?.planType ===
                (plan.interval === "month" ? "monthly" : "annual");
            const isSelected = selectedPlanId === plan.id;
            const isProcessing = processingPlanId === plan.id;

            return (
              <Wrapper
                key={plan.id}
                className={`relative cursor-pointer transition-all ${
                  isPopular ? "ring-2 ring-primary" : ""
                } ${isCurrentPlan ? "bg-primary/5" : ""} ${
                  isSelected && !isCurrentPlan
                    ? "ring-2 ring-primary bg-primary/5"
                    : ""
                } ${isProcessing ? "ring-2 ring-primary ring-offset-2" : ""}`}
                onClick={() => !isCurrentPlan && setSelectedPlanId(plan.id)}
              >
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}
                {isCurrentPlan && (
                  <div className="absolute top-3 right-3">
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="flex flex-col h-full">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-paragrah mb-2">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-paragrah">
                        {plan.displayPrice}
                      </span>
                      <span className="text-sm text-body">
                        /{plan.interval === "month" ? "month" : "year"}
                      </span>
                    </div>
                    <p className="text-sm text-body mt-2">{plan.description}</p>
                  </div>

                  <ul className="flex-1 space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check
                          className="text-primary mt-0.5 flex-shrink-0"
                          size={18}
                        />
                        <span className="text-sm text-body">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <CustomButton
                    label={
                      isCurrentPlan
                        ? "Current Plan"
                        : isProcessing
                          ? "Processing..."
                          : "Subscribe Now"
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe(plan.id as SubscriptionPlanId);
                    }}
                    disabled={
                      isCurrentPlan ||
                      (isProcessing && processingPlanId !== plan.id) ||
                      (processingPlanId !== null &&
                        processingPlanId !== plan.id)
                    }
                    isLoading={isProcessing}
                    className="w-full"
                    variant={isPopular ? "primary" : "secondary"}
                  />
                </div>
              </Wrapper>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default SubscriptionPage;
