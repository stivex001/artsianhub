"use client";

import Wrapper from "@/components/shared/Wrapper";
import { FC, SVGProps } from "react";
import {
  CalenderIcon,
  GreenWallet,
  ProofIcon,
  RedCase,
} from "@/components/assets/icons/StatsIcon";
import { useRouter } from "next/navigation";

type Props = {};

export interface ListProps {
  label: string;
  subText: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  bgColor: string;
  url: string;
}

const statsData: ListProps[] = [
  {
    label: "Verify Your Identity",
    subText: "Verified profiles get more jobs",
    icon: ProofIcon,
    bgColor: "bg-[#3174F10D]",
    url: "/artisan/dashboard/settings?tab=kyc"
  },
  {
    label: "Set Working Days and Hours",
    subText: "Let users know your schedule.",
    icon: CalenderIcon,
    bgColor: "bg-[#473DD30D]",
    url: "/artisan/dashboard/settings?tab=working"
  },
  {
    label: "Portfolio / Work Proof",
    subText: "Show proof of your great work.",
    icon: RedCase,
    bgColor: "bg-[#E433330D]",
    url: "/artisan/dashboard/portfolio"
  },
  {
    label: "Payment Info",
    subText: "Receive payments straight to bank.",
    icon: GreenWallet,
    bgColor: "bg-[#1BB4530D]",
    url: "artisan/dashboard/subscription"
  },
];

const ToDoList = (props: Props) => {
  const router = useRouter();
  return (
    <Wrapper className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold text-paragrah">To-Do List</h1>
        <button className="text-sm text-paragrah font-medium">Hide List</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {statsData.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              className={`${item?.bgColor} p-4 rounded-2xl flex flex-col items-start gap-3`}
              key={index}
              onClick={() => router.push(`${item?.url}`)}
            >
              <Icon />
              <div className="flex flex-col gap-1 items-start">
                <h3 className="text-base font-bold text-paragrah">
                  {item?.label}
                </h3>
                <p className="text-sm text-[#667185]">{item?.subText}</p>
              </div>
            </button>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default ToDoList;
