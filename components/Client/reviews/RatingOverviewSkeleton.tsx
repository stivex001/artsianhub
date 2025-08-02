import { Skeleton } from "@/components/ui/skeleton";

export const RatingOverviewSkeleton = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-paragrah mb-3">Ratings</h2>

      <div className="flex items-center gap-5 md:gap-8">
        {/* Average Rating */}
        <div className=" flex flex-col items-center">
          <Skeleton className="h-8 w-16 mb-2 " />
          <div className="mb-2 flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-5 rounded-sm" />
            ))}
          </div>
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-2 w-40 rounded-xl" />
              <Skeleton className="h-4 w-6" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
