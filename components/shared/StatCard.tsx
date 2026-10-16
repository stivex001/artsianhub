import { FC, SVGProps } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export interface StatCardProps {
  label: string;
  value: number;
  change?: number;
  icon: FC<SVGProps<SVGSVGElement>>;
  className?: string;
  isLoading?: boolean;
}

const StatCard = ({
  StatData,
  className,
}: {
  StatData: StatCardProps;
  className?: string;
}) => {
  const Icon = StatData.icon;
  const isLoading = StatData.isLoading;

  return (
    <div
      className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex flex-col gap-4 ${className ?? ""}`}
    >
      {/* Icon */}
      {isLoading ? (
        <Skeleton className="h-8 w-8 rounded-xl" />
      ) : (
        <Icon />
      )}

      {/* Value + label */}
      <div className="flex flex-col gap-1">
        {isLoading ? (
          <>
            <Skeleton className="h-7 w-20 rounded-lg" />
            <Skeleton className="h-3.5 w-28 rounded" />
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-gray-900 tabular-nums leading-tight">
              {StatData.value.toLocaleString()}
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-snug">
              {StatData.label}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default StatCard;
