"use client";
import { Skeleton } from "@/components/ui/skeleton";

export const CardSkeletonLoader = () => {
  return (
    <div className="bg-white rounded-2xl py-4 px-2.5 overflow-hidden flex flex-col gap-3">
      {/* Image placeholder */}
      <Skeleton className="aspect-video w-full rounded-xl" />

      <div className="space-y-2">
        {/* Title */}
        <Skeleton className="h-4 w-3/4 rounded" />

        {/* Location */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-1/2 rounded" />
        </div>

        {/* Description */}
        <Skeleton className="h-3 w-full rounded" />
        <Skeleton className="h-3 w-5/6 rounded" />

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>

        {/* Date (optional) */}
        <div className="flex justify-end">
          <Skeleton className="h-4 w-20 rounded" />
        </div>
      </div>
    </div>
  );
};
