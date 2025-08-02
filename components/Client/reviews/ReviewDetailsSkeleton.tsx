import { Skeleton } from "@/components/ui/skeleton";

export const ReviewDetailsSkeleton = () => {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">Review</h2>

      <div className="space-y-5">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Skeleton className="w-10 h-10 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="h-4 w-6" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
};
