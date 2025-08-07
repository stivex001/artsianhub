import { FC, SVGProps } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // adjust path if different

export interface StatCardProps {
  label: string;
  value: number;
  change?: number;
  icon: FC<SVGProps<SVGSVGElement>>;
  className?: string;
  isLoading?: boolean; // 👈 add this
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
    <div className={`bg-white p-4 rounded-2xl flex flex-col gap-3 ${className}`}>
      {isLoading ? (
        <Skeleton className="h-6 w-6 rounded-full" />
      ) : (
        <Icon />
      )}

      <div className="flex flex-col gap-1">
        {isLoading ? (
          <>
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-4 w-32 rounded" />
          </>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-paragrah">
              {StatData.value.toLocaleString()}
            </h3>
            <p className="text-sm text-[#667185]">{StatData.label}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default StatCard;
