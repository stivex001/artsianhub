import { Skeleton } from "@/components/ui/skeleton";

export const ClientInfoSkeleton = () => {
  return (
    <div className=" lg:w-80 flex flex-col">
      <Skeleton className="w-full h-[300px] rounded-2xl mb-4" />

      <Skeleton className="h-6 w-2/3 mb-2 rounded" />

      <div className="flex items-start text-gray-600 mb-4 gap-2">
        <Skeleton className="h-5 w-5 rounded-full mt-1" />
        <Skeleton className="h-4 w-full rounded" />
      </div>

      <div className="flex gap-3 w-full">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
    </div>
  );
};

export const ClientDescriptionSkeleton = () => {
  return (
    <div className="flex-1 space-y-6">
      {/* Job Status */}
      <div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>

      {/* Job Description */}
      <div>
        <Skeleton className="h-4 w-40 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-4/5" />
      </div>

      {/* Preferred Date and Time */}
      <div>
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-4 w-1/2" />
      </div>

      {/* Location */}
      <div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-4 w-3/4 mb-4" />
        <Skeleton className="w-full h-48 rounded-xl" />
      </div>

      {/* Attached Images */}
      <div>
        <Skeleton className="h-4 w-40 mb-2" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[150px] w-full rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
};
