"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface LinksData {
  label: string;
  href: string;
}

type LinksProps = {
  links: LinksData[];
  title: string;
};

export const FooterLinks = ({ links, title }: LinksProps) => {
  const pathname = usePathname();

  const isAboutPage = pathname.startsWith("/about");
  const isContactPage = pathname.startsWith("/contact-us");
  const artisanDetails = pathname.startsWith("/available-artisan");
  const changeFooterBg = isAboutPage || isContactPage || artisanDetails;

  return (
    <div className="flex flex-col gap-2 lg:gap-6">
      <h6
        className={`${
          changeFooterBg ? "text-white" : "text-primary"
        }  text-[7px] lg:text-base font-[300]`}
      >
        {title}
      </h6>
      <div
        className={`flex flex-col space-y-2 lg:space-y-5 ${
          changeFooterBg ? "text-white" : "text-primary"
        } text-[7px] lg:text-sm font-[300]`}
      >
        {links.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
