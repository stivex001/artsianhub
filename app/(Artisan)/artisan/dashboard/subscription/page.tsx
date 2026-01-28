"use client";

import React, { useState } from "react";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import { useSubscriptions } from "@/api/crud/subscriptions";
import { Check, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const SubscriptionPage = (props: Props) => {
  const router = useRouter();
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
  
  const { getPlans, getStatus, createCheckout } = useSubscriptions();
  const { data: plansData, isLoading: plansLoading } = getPlans();
  const { data: statusData, isLoading: statusLoading, refetch: refetchStatus } = getStatus();
  const { mutate: createCheckoutSession, isPending: isCheckoutPending } = createCheckout();

  const plans = plansData?.data || [];
  const subscriptionStatus = statusData?.data;

  const handleSubscribe = (planType: "monthly" | "annual", planId: string) => {
    setProcessingPlanId(planId);
    const successUrl = `${window.location.origin}/artisan/dashboard/subscription?success=true&session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${window.location.origin}/artisan/dashboard/subscription`;

    createCheckoutSession(
      {
        planType,
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
          toast.error(error?.data?.error || "Failed to create checkout session");
          setProcessingPlanId(null);
        },
      }
    );
  };

  // Check for success parameter and session_id
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get("success");
    const sessionId = urlParams.get("session_id");
    
    if (success === "true" && sessionId) {
      // toast.success("Subscription activated! Your profile is now visible to clients.");
      refetchStatus();
      // Clean up URL - remove query params
      router.replace("/artisan/dashboard/subscription");
    } else if (success === "true" && !sessionId) {
      // If success but no session_id, something went wrong
      toast.error("Unable to verify subscription. Please check your subscription status.");
      refetchStatus();
      router.replace("/artisan/dashboard/subscription");
    }
  }, [refetchStatus, router]);

  return (
    <section className="flex flex-col gap-5">
      <Descriptions
        title="Subscription Plans"
        desc="Subscribe to become visible in the marketplace and start receiving appointment requests"
      />

      {/* Current Subscription Status */}
      {!statusLoading && subscriptionStatus && (
        <Wrapper className="border-l-4 border-l-primary">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              {subscriptionStatus.isActive ? (
                <Check className="text-green-600 mt-0.5" size={20} />
              ) : (
                <AlertCircle className="text-yellow-600 mt-0.5" size={20} />
              )}
              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-1">
                  {subscriptionStatus.isActive
                    ? "Active Subscription"
                    : "No Active Subscription"}
                </h3>
                {subscriptionStatus.isActive ? (
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>
                      Plan: <span className="font-medium capitalize">{subscriptionStatus.planType}</span>
                    </p>
                    {subscriptionStatus.currentPeriodEnd && (
                      <p>
                        Renews:{" "}
                        <span className="font-medium">
                          {new Date(subscriptionStatus.currentPeriodEnd).toLocaleDateString()}
                        </span>
                      </p>
                    )}
                    {subscriptionStatus.cancelAtPeriodEnd && (
                      <p className="text-yellow-600 font-medium">
                        Will cancel at period end
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-700">
                    Your profile is not visible to clients. Subscribe to start receiving requests.
                  </p>
                )}
              </div>
            </div>
          </div>
        </Wrapper>
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
            const isPopular = plan.id === "annual";
            const isCurrentPlan =
              subscriptionStatus?.isActive &&
              subscriptionStatus?.planType === plan.id;
            const isSelected = selectedPlanId === plan.id;
            const isProcessing = processingPlanId === plan.id;

            return (
              <Wrapper
                key={plan.id}
                className={`relative cursor-pointer transition-all ${
                  isPopular ? "ring-2 ring-primary" : ""
                } ${
                  isCurrentPlan ? "bg-primary/5" : ""
                } ${
                  isSelected && !isCurrentPlan ? "ring-2 ring-primary bg-primary/5" : ""
                } ${
                  isProcessing ? "ring-2 ring-primary ring-offset-2" : ""
                }`}
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
                      handleSubscribe(plan.id as "monthly" | "annual", plan.id);
                    }}
                    disabled={isCurrentPlan || (isProcessing && processingPlanId !== plan.id) || (processingPlanId !== null && processingPlanId !== plan.id)}
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
