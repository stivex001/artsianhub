"use client";

import React from "react";
import { CustomButton } from "@/components/clickable/CustomButton";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Wrapper from "@/components/shared/Wrapper";

type Props = {
  isSubscribed: boolean;
};

const SubscriptionBanner = ({ isSubscribed }: Props) => {
  const router = useRouter();

  if (isSubscribed) {
    return null;
  }

  return (
    <Wrapper className="border-l-4 border-l-yellow-500 bg-yellow-50">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <AlertCircle className="text-yellow-600 mt-0.5 flex-shrink-0" size={20} />
          <div className="flex-1">
            <h3 className="text-base font-semibold text-gray-900 mb-1">
              Subscription Required
            </h3>
            <p className="text-sm text-gray-700">
              Your profile is not visible to clients. Subscribe now to become visible in the
              marketplace and start receiving appointment requests.
            </p>
          </div>
        </div>
        <CustomButton
          label="Subscribe Now"
          onClick={() => router.push("/artisan/dashboard/subscription")}
          className="w-full md:w-auto"
          variant="primary"
        />
      </div>
    </Wrapper>
  );
};

export default SubscriptionBanner;
