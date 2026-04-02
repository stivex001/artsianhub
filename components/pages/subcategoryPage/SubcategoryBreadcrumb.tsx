"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface SubcategoryBreadcrumbProps {
  categoryName: string;
  categorySlug: string;
  subCategoryName: string;
}

export const SubcategoryBreadcrumb = ({
  categoryName,
  categorySlug,
  subCategoryName,
}: SubcategoryBreadcrumbProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 text-base text-white/70 flex-wrap"
    >
      <Link
        href="/"
        className="flex items-center gap-1.5 hover:text-white transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </Link>
      <ChevronRight className="w-4 h-4 text-white/40 flex-shrink-0" />
      <Link
        href={categorySlug}
        className="hover:text-white transition-colors truncate max-w-[140px] sm:max-w-none"
      >
        {categoryName}
      </Link>
      <ChevronRight className="w-4 h-4 text-white/40 flex-shrink-0" />
      <span className="text-white font-semibold truncate max-w-[140px] sm:max-w-xs">
        {subCategoryName}
      </span>
    </nav>
  );
};
