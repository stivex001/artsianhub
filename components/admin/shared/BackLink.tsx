"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BackLinkProps {
  href: string;
  label: string;
}

/**
 * Branded back-navigation link with arrow icon.
 * Used at the top of admin detail pages.
 */
const BackLink = ({ href, label }: BackLinkProps) => (
  <Link
    href={href}
    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#02198B] transition-colors w-fit"
  >
    <ArrowLeft className="w-4 h-4" />
    {label}
  </Link>
);

export default BackLink;
