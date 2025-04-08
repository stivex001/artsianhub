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
  const isArisanPage = pathname.startsWith("/artisan");
  const isAboutPage = pathname.startsWith("/about");
  const isContactPage = pathname.startsWith("/contact-us");
  const artisanDetails = pathname.startsWith("/available-artisan");
  const isAdminPage = pathname.startsWith("/admin");

  const hideFooter = isAuthPage || isArisanPage || isAdminPage;
  const changeFooterBg = isAboutPage || isContactPage || artisanDetails;

  return (
    <div
      className={`${hideFooter && "hidden"} ${
        changeFooterBg ? "bg-primary text-white" : "bg-white"
      }  py-20`}
    >
      <Container className="flex  justify-between">
        <div className="lg:w-9/12  grid grid-cols-3 gap-5">
          <FooterLinks links={customerLinks} title="Customer Support" />
          <FooterLinks links={artisansLinks} title="Artisan Support" />
          <FooterLinks links={aboutLinks} title="About Us" />
        </div>
        <div
          className={`text-[7px] lg:text-base font-[300] ${
            changeFooterBg ? "text-white" : "text-primary"
          }`}
        >
          <div className="flex items-center justify-end gap-2 text-right">
            <UKFlagIcon />

            <h2 className={``}>
              MansayHUb <br /> 020 3678 1134{" "}
            </h2>
          </div>
          <h2 className="text-right">(Always Ready, non stop service 24/7)</h2>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
