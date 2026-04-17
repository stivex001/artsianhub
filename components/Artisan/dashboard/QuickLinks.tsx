"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, CalendarDays, Briefcase, CreditCard } from "lucide-react";

interface QuickLinkItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  iconColor: string;
  iconBg: string;
  accentColor: string;
}

const quickLinks: QuickLinkItem[] = [
  {
    href: "/artisan/dashboard/settings?tab=kyc",
    icon: ShieldCheck,
    title: "Verify Your Identity",
    desc: "Verified profiles get more jobs",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    accentColor: "group-hover:border-blue-200",
  },
  {
    href: "/artisan/dashboard/settings?tab=working",
    icon: CalendarDays,
    title: "Working Days & Hours",
    desc: "Let clients know your schedule",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    accentColor: "group-hover:border-amber-200",
  },
  {
    href: "/artisan/dashboard/portfolio",
    icon: Briefcase,
    title: "Portfolio / Work Proof",
    desc: "Show proof of your great work",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    accentColor: "group-hover:border-violet-200",
  },
  {
    href: "/artisan/dashboard/subscription",
    icon: CreditCard,
    title: "Payment Info",
    desc: "Receive payments straight to bank",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    accentColor: "group-hover:border-emerald-200",
  },
];

const QuickLinks = () => (
  <div>
    {/* Section heading */}
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-4 bg-primary rounded-full" />
      <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">Quick Links</h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {quickLinks.map(({ href, icon: Icon, title, desc, iconColor, iconBg, accentColor }) => (
        <Link
          key={href}
          href={href}
          className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md ${accentColor} transition-all group flex items-start gap-4`}
        >
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg} transition-colors`}>
            <Icon className={`w-5 h-5 ${iconColor}`} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm group-hover:text-gray-700 transition-colors leading-snug">
              {title}
            </p>
            <p className="text-xs text-gray-400 mt-0.5 leading-snug">{desc}</p>
          </div>

          {/* Arrow */}
          <span className="w-7 h-7 rounded-lg border border-gray-100 bg-gray-50 flex items-center justify-center shrink-0 group-hover:bg-primary/5 group-hover:border-primary/20 transition-all mt-0.5">
            <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary transition-colors" />
          </span>
        </Link>
      ))}
    </div>
  </div>
);

export default QuickLinks;
