"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const ProjectDetailsSkeleton = () => {
  return (
    <main className="flex flex-col gap-5">
      {/* Breadcrumbs Skeleton */}
      <Skeleton className="h-4 w-1/4 rounded" />

      <div className="flex flex-col gap-6">
        {/* Images Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Main Image */}
          <Skeleton className="aspect-video w-full rounded-2xl" />

          {/* Supporting Images */}
          <div className="grid grid-cols-1 gap-2 aspect-video">
            <Skeleton className="w-full h-full rounded-2xl aspect-video" />
            <div className="grid md:grid-cols-2 gap-2">
              <Skeleton className="w-full h-full rounded-2xl aspect-video" />
              <Skeleton className="w-full h-full rounded-2xl aspect-video" />
            </div>
          </div>
        </div>

        {/* Text and Buttons Skeleton */}
        <div className="space-y-4">
          {/* Title and Buttons */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-1/3 rounded" />
            <div className="flex gap-3">
              <Skeleton className="h-8 w-24 rounded-xl" />
              <Skeleton className="h-8 w-24 rounded-xl" />
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-24 rounded" />
          </div>

          {/* Description */}
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-3/4 rounded" />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </div>
      </div>
    </main>
  );
};
