"use client";

import React from "react";
import Container from "../ui/Container";
import { UKFlagIcon } from "../assets/icons/UKflag";
import { useNavigationLinks } from "../data/links";
import { FooterLinks } from "./FooterLinks";
import { usePathname } from "next/navigation";

type Props = {};

const Footer = (props: Props) => {
  const pathname = usePathname();
  const { customerLinks, artisansLinks, aboutLinks } = useNavigationLinks();

  const isAuthPage = pathname.startsWith("/auth");

  const hideFooter = isAuthPage;

  return (
    <div className={`${hideFooter && "hidden"} bg-white py-20`}>
      <Container className="flex flex-col lg:flex-row justify-between">
        <div className="lg:w-9/12  grid sm:grid-cols-2 lg:grid-cols-3">
          <FooterLinks links={customerLinks} title="For Customers" />
          <FooterLinks links={artisansLinks} title="For Artisans" />
          <FooterLinks links={aboutLinks} title="About" />
        </div>
        <div className="text-base font-[300px] font-[family-name:var(--font-josefin-sans)] text-primary">
          <div className="flex items-center justify-end gap-2 text-right">
            <UKFlagIcon />

            <h2 className="">
              MansayHUb <br /> 020 3678 1134{" "}
            </h2>
          </div>
          <h2>(open 24 hours a day, 7 days week)</h2>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
