import Link from "next/link";
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
  return (
    <div className="flex flex-col gap-2 lg:gap-6">
      <h6 className="text-primary text-[7px] lg:text-base font-[300px] font-[family-name:var(--font-josefin-sans)]">
        {title}
      </h6>
      <div className="flex flex-col space-y-2 lg:space-y-5 text-primary text-[7px] lg:text-sm font-[300px] font-[family-name:var(--font-josefin-sans)]">
        {links.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};
