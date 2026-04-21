"use client";

import React from "react";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  isSubscribed: boolean;
};

const SubscriptionBanner = ({ isSubscribed }: Props) => {
  const router = useRouter();

  if (isSubscribed) return null;

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Subscription Required</h3>
          <p className="text-xs text-gray-600 mt-0.5 leading-relaxed max-w-xl">
            Your profile is not visible to clients. Subscribe now to appear in the marketplace
            and start receiving appointment requests.
          </p>
        </div>
      </div>
      <button
        onClick={() => router.push("/artisan/dashboard/subscription")}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors shrink-0 shadow-sm"
      >
        Subscribe Now
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SubscriptionBanner;
