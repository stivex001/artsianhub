import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type SkeletonLoaderProps = {
  type: "card" | "list" | "image" | "text"; // Different skeleton types
  count?: number; // Number of skeleton items
  className?: string; // Extra styling
};

const SkeletonLoader = ({
  type,
  count = 4,
  className,
}: SkeletonLoaderProps) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          {type === "card" && (
            <Skeleton className="w-80 h-[400px] rounded-lg bg-secondary/90" />
          )}
          {type === "list" && (
            <Skeleton className="w-full h-10 rounded-lg bg-secondary/90" />
          )}
          {type === "image" && (
            <Skeleton className="w-80 h-[400px] rounded-[10px] bg-secondary/90" />
          )}
          {type === "text" && (
            <Skeleton className="w-60 h-5 rounded-md bg-secondary/90" />
          )}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
