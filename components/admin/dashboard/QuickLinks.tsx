"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MessageSquare, Star, Bell } from "lucide-react";

export interface QuickLinkItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
}

export const quickLinks: QuickLinkItem[] = [
  {
    href: "/admin/dashboard/support-tickets",
    icon: MessageSquare,
    title: "Support Tickets",
    desc: "Manage user complaints and inquiries",
    color: "text-blue-600 bg-blue-50",
  },
  {
    href: "/admin/dashboard/reviews",
    icon: Star,
    title: "Review Moderation",
    desc: "Flag toxic reviews and post responses",
    color: "text-yellow-600 bg-yellow-50",
  },
  {
    href: "/admin/dashboard/notifications",
    icon: Bell,
    title: "Notifications",
    desc: "View all platform alerts",
    color: "text-purple-600 bg-purple-50",
  },
];

const QuickLinks = () => (
  <div>
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-4 bg-primary rounded-full" />
      <h2 className="text-xs font-semibold text-primary uppercase tracking-widest">
        Quick Actions
      </h2>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {quickLinks.map(({ href, icon: Icon, title, desc, color }) => (
        <Link
          key={href}
          href={href}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:border-primary/30 hover:shadow-md transition-all group flex items-start gap-4"
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-sm group-hover:text-primary transition-colors">
              {title}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 leading-snug">{desc}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
        </Link>
      ))}
    </div>
  </div>
);

export default QuickLinks;
