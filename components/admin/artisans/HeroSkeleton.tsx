"use client";

/**
 * Skeleton placeholder for the artisan detail hero card while data is loading.
 */
const HeroSkeleton = () => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 animate-pulse">
    <div className="flex items-start gap-5">
      <div className="w-20 h-20 rounded-2xl bg-gray-100 shrink-0" />
      <div className="flex-1 flex flex-col gap-3">
        <div className="h-6 bg-gray-100 rounded-lg w-48" />
        <div className="h-4 bg-gray-100 rounded-lg w-32" />
        <div className="flex gap-2 mt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-20 bg-gray-100 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default HeroSkeleton;
