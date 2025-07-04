"use client";

import React from "react";
import Container from "../ui/Container";
import { UKFlagIcon } from "../assets/icons/UKflag";
import { useNavigationLinks } from "../data/links";
import { FooterLinks } from "./FooterLinks";
import { usePathname } from "next/navigation";
import Image from "next/image";
import footerbg from "@/components/assets/images/footerbg.svg";

type Props = {};

const Footer = (props: Props) => {
  const pathname = usePathname();
  const { customerLinks, artisansLinks, aboutLinks, supportLinks } =
    useNavigationLinks();

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
        changeFooterBg ? "bg-primary text-white" : "bg-[#111827] text-white"
      }  py-20`}
    >
      <Container className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
        <div className="space-y-6">
          <div>
            <Image src={footerbg} alt="" />
          </div>
          <h3 className="text-base text-placeholderText">
            Connecting skilled artisans with customers worldwide. Discover,
            hire, and collaborate with the best in the craft industry.
          </h3>
        </div>
        <FooterLinks links={customerLinks} title="For Clients" />
        <FooterLinks links={artisansLinks} title="For Artisans" />
        <FooterLinks links={aboutLinks} title="About" />
        <FooterLinks links={supportLinks} title="Support" />
      </Container>
    </div>
  );
};

export default Footer;
