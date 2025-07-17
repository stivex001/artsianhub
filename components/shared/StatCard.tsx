import { FC, SVGProps } from "react";

export interface StatCardProps {
  label: string;
  value: number;
  change?: number;
  icon: FC<SVGProps<SVGSVGElement>>;
}

const StatCard = ({ StatData }: { StatData: StatCardProps }) => {
  const Icon = StatData.icon;

  return (
    <div className="bg-white text-grey border border-borderColor p-4 rounded-2xl flex flex-col gap-3">
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
