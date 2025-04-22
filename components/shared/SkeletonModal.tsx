import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

type SkeletonLoaderProps = {
  type: "card" | "list" | "image" | "text"; // Different skeleton types
  count?: number; // Number of skeleton items
  className?: string;
  bgColor?: string;
};

const SkeletonLoader = ({
  type,
  count = 4,
  className,
  bgColor,
}: SkeletonLoaderProps) => {
  return (
    <div className={`flex gap-4 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="">
          {type === "card" && (
            <Skeleton
              className={`w-64 h-28 rounded-lg bg-white ${bgColor}`}
            />
          )}
          {type === "list" && (
            <Skeleton
              className={`w-full h-10 rounded-lg bg-secondary/90 ${bgColor}`}
            />
          )}
          {type === "image" && (
            <Skeleton
              className={`w-64 h-[400px] rounded-[10px] bg-secondary/90 ${bgColor}`}
            />
          )}
          {type === "text" && (
            <Skeleton
              className={`w-60 h-5 rounded-md bg-secondary/90 ${bgColor}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
