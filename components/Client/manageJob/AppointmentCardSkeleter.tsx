import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export const AppointmentCardSkeleter = (props: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-5 space-y-4">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-40" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4 rounded-full" />
        <Skeleton className="h-4 w-36" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
};
