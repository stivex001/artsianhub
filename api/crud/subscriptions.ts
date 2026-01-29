import { useApiMutation } from "@/hooks/useApiMutation";
import { useApiQuery } from "@/hooks/useApiQuery";

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  displayPrice: string;
  interval: "month" | "year";
  description: string;
  features: string[];
}

export interface SubscriptionStatus {
  hasSubscription: boolean;
  isActive: boolean;
  status: "active" | "past_due" | "canceled" | "expired" | null;
  planType: "monthly" | "annual" | null;
  currentPeriodStart: string | null;
  currentPeriodEnd: string | null;
  cancelAtPeriodEnd: boolean;
  gracePeriodEnd: string | null;
}

export interface CheckoutSession {
  sessionId: string;
  url: string;
}

export interface PaymentHistory {
  _id: string;
  amount: number;
  currency: string;
  status: string;
  description: string;
  receiptUrl: string | null;
  paidAt: string;
  createdAt: string;
}

export interface CheckoutRequest {
  planType: "monthly" | "annual";
  successUrl: string;
  cancelUrl: string;
}

export interface CancelRequest {
  immediate?: boolean;
}

export const useSubscriptions = () => {
  const getPlans = () => {
    return useApiQuery<{ message: string; data: SubscriptionPlan[] }>(
      ["subscriptions", "plans"],
      {
        url: "/subscriptions/plans",
        method: "GET",
      }
    );
  };

  const getStatus = () => {
    return useApiQuery<{ message: string; data: SubscriptionStatus }>(
      ["subscriptions", "status"],
      {
        url: "/subscriptions/status",
        method: "GET",
      }
    );
  };

  const getPaymentHistory = (page: number = 1, limit: number = 10) => {
    return useApiQuery<{
      message: string;
      data: PaymentHistory[];
      pagination: {
        page: number;
        limit: number;
        total: number;
        pages: number;
      };
    }>(
      ["subscriptions", "payments", page, limit],
      {
        url: `/subscriptions/payments?page=${page}&limit=${limit}`,
        method: "GET",
      }
    );
  };

  const createCheckout = () => {
    return useApiMutation<
      { message: string; data: CheckoutSession },
      CheckoutRequest
    >({
      url: "/subscriptions/checkout",
      method: "POST",
    });
  };

  const cancelSubscription = () => {
    return useApiMutation<
      { message: string; data: Partial<SubscriptionStatus> },
      CancelRequest
    >({
      url: "/subscriptions/cancel",
      method: "POST",
    });
  };

  const reactivateSubscription = () => {
    return useApiMutation<{ message: string; data: Partial<SubscriptionStatus> }, void>({
      url: "/subscriptions/reactivate",
      method: "POST",
    });
  };

  /** Sync subscription from Stripe after successful payment redirect. Call on success callback page. */
  const syncSubscription = () => {
    return useApiMutation<{ message: string; data: SubscriptionStatus }, void>({
      url: "/subscriptions/sync",
      method: "POST",
    });
  };

  return {
    getPlans,
    getStatus,
    getPaymentHistory,
    createCheckout,
    cancelSubscription,
    reactivateSubscription,
    syncSubscription,
  };
};
