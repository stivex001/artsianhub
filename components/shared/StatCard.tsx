import { FC, SVGProps } from "react";

export interface StatCardProps {
  label: string;
  value: number;
  change?: number;
  icon: FC<SVGProps<SVGSVGElement>>;
  className?: string;
}

const StatCard = ({
  StatData,
  className,
}: {
  StatData: StatCardProps;
  className?: string;
}) => {
  const Icon = StatData.icon;

  return (
    <div
      className={`bg-white p-4 rounded-2xl flex flex-col gap-3 ${className}`}
    >
      <Icon />
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold text-paragrah">
          {StatData?.value?.toLocaleString()}
        </h3>
        <p className="text-sm text-[#667185]">{StatData?.label}</p>
      </div>
    </div>
  );
};

export default StatCard;
