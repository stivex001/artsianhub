"use client";

import { FC, SVGProps } from "react";
import {
  CalenderIcon,
  GreenWallet,
  ProofIcon,
  RedCase,
} from "@/components/assets/icons/StatsIcon";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export interface ListProps {
  label: string;
  subText: string;
  icon: FC<SVGProps<SVGSVGElement>>;
  url: string;
}

const statsData: ListProps[] = [
  {
    label: "Verify Your Identity",
    subText: "Verified profiles get more jobs",
    icon: ProofIcon,
    url: "/artisan/dashboard/settings?tab=kyc",
  },
  {
    label: "Set Working Days & Hours",
    subText: "Let clients know your schedule",
    icon: CalenderIcon,
    url: "/artisan/dashboard/settings?tab=working",
  },
  {
    label: "Portfolio / Work Proof",
    subText: "Show proof of your great work",
    icon: RedCase,
    url: "/artisan/dashboard/portfolio",
  },
  {
    label: "Payment Info",
    subText: "Receive payments straight to bank",
    icon: GreenWallet,
    url: "/artisan/dashboard/subscription",
  },
];

const ToDoList = () => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-primary rounded-full" />
          <h2 className="text-sm font-bold text-gray-900">To-Do List</h2>
        </div>
        <button className="text-xs text-gray-400 hover:text-gray-600 transition-colors font-medium">
          Hide List
        </button>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {statsData.map((item, index) => {
          const Icon = item.icon;
          return (
            <button
              key={index}
              onClick={() => router.push(item.url)}
              className="group bg-gray-50 hover:bg-white border border-gray-100 hover:border-primary/20 hover:shadow-md rounded-2xl p-4 flex flex-col gap-3 text-left transition-all duration-200"
            >
              {/* Icon */}
              <div className="flex items-start justify-between">
                <Icon />
                <span className="w-6 h-6 rounded-lg border border-gray-200 bg-white flex items-center justify-center group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                  <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover:text-primary transition-colors" />
                </span>
              </div>

              {/* Text */}
              <div className="flex flex-col gap-0.5">
                <h3 className="text-sm font-semibold text-gray-900 leading-snug group-hover:text-primary transition-colors">
                  {item.label}
                </h3>
                <p className="text-xs text-gray-400 leading-snug">{item.subText}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ToDoList;
