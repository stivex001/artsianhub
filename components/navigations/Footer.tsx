"use client";

import React from "react";
import Container from "../ui/Container";
import { useNavigationLinks } from "../data/links";
import { FooterLinks } from "./FooterLinks";
import { usePathname } from "next/navigation";
import Image from "next/image";
import footerbg from "@/components/assets/images/footerbg.svg";
import Link from "next/link";

type Props = {};

const Footer = (props: Props) => {
  const pathname = usePathname();
  const {
    customerLinks,
    artisansLinks,
    aboutLinks,
    supportLinks,
    socialLinks,
  } = useNavigationLinks();

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
      <Container className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 mb-12">
        <div className="space-y-6">
          <div>
            <Image src={footerbg} alt="" />
          </div>
          <h3 className="text-base text-placeholderText">
            Connecting skilled artisans with customers worldwide. Discover,
            hire, and collaborate with the best in the craft industry.
          </h3>
          <div className="flex items-center gap-4">
            {socialLinks?.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.href}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
        <FooterLinks links={customerLinks} title="For Clients" />
        <FooterLinks links={artisansLinks} title="For Artisans" />
        <FooterLinks links={aboutLinks} title="About" />
        <FooterLinks links={supportLinks} title="Support" />
      </Container>
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row lg:items-center justify-between gap-5 border-t border-[#1F2937] pt-8">
        <p className="text-sm text-[#9CA3AF]">
          © 2025 ArtisansHub.org. All rights reserved.
        </p>
        <div className="flex flex-col md:flex-row lg:items-center gap-x-6 gap-y-5">
          <Link href="#" className="text-sm text-[#9CA3AF]">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-[#9CA3AF]">
            Terms of Service
          </Link>
          <Link href="#" className="text-sm text-[#9CA3AF]">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
