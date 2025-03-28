"use client";
import React, { useState } from "react";
import logo from "@/components/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { CustomButton } from "@/components/clickable/CustomButton";
import {
  DownLargeArrowIcon,
  PolygonWhite,
} from "../assets/icons/NavIcons";
import { DropdownModal } from "../shared/DropdownModal";
import { ExploreContent } from "./ExploreContent";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import UserDesc from "../UserDesc";

type Props = {};

export const Navbar = (props: Props) => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { currentUser } = useAuthStore();



  // const isAuthPage = pathname.startsWith("/auth");
  const isArtisanPage = pathname.startsWith("/artisan");

  const hideNav = isArtisanPage;

  return (
    <nav
      className={`${
        hideNav && "hidden"
      } w-full bg-white fixed top-0 z-50 h-[96px] flex items-center justify-between px-3 sm:px-5 lg:px-10 shadow-dropShadow`}
    >
      <div className="flex items-center gap-2.5 sm:gap-8 lg:gap-14">
        <Link href="/" className="w-[65px] h-12">
          <Image
            src={logo}
            alt="logo"
            width={65}
            height={48}
            className="w-full h-full object-cover"
          />
        </Link>
        {/* <MenuCard /> */}
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <h3 className="font-[300] text-xs md:text-xl text-primary">
              {" "}
              Explore{" "}
            </h3>
            <div className="mt-3">
              <DownLargeArrowIcon />
            </div>
          </button>
          <DropdownModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            icon={PolygonWhite}
          >
            <ExploreContent onClose={() => setIsModalOpen(false)} />
          </DropdownModal>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 md:gap-16">
        <div className=" flex items-center gap-16">
          <Link
            href="/contact-us"
            className="text-primary font-[300] text-xs md:text-xl"
          >
            Contact Us
          </Link>
          <Link
            href="/about"
            className="text-primary font-[300] text-xs md:text-xl"
          >
            About Us
          </Link>
        </div>
        {currentUser ? (
          <div className="flex items-center gap-2.5 sm:gap-8 lg:gap-14">
            <UserDesc />
            
          </div>
        ) : (
          <div className="flex items-center gap-2 md:gap-6">
            <Link
              href="/auth/login"
              className="text-primary font-[300] text-xs md:text-xl"
            >
              Login /Sign up
            </Link>
            <CustomButton>
              <Link href="/artisan/auth/login" className="font-[300]">
                Sign up as an Artisan
              </Link>
            </CustomButton>
          </div>
        )}
      </div>
    </nav>
  );
};
