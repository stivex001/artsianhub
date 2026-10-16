import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

export const FormSkeletonLoader = (props: Props) => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-24 w-24 rounded-full" />
      <div className="grid lg:grid-cols-2 gap-5">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-10 w-32" />
    </div>
  );
};
