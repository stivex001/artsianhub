"use client";
import React, { useState } from "react";
import logo from "@/components/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";
import { CustomButton } from "@/components/clickable/CustomButton";
import { DownLargeArrowIcon, PolygonWhite } from "../assets/icons/NavIcons";
import { DropdownModal } from "../shared/DropdownModal";
import { ExploreContent } from "./ExploreContent";

type Props = {};

export const Navbar = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="w-full bg-white fixed top-0 z-50 h-[96px] flex items-center justify-between px-3 sm:px-5 lg:px-10 shadow-dropShadow">
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
            <h3 className="font-[300px] text-xs md:text-xl font-[family-name:var(--font-josefin-sans)] text-primary">
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
            <ExploreContent />
          </DropdownModal>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-6">
        <div className="text-primary text-xs md:text-xl font-[family-name:var(--font-josefin-sans)] ">
          Login /Sign up
        </div>
        <CustomButton>
          <Link href="/auth/login">Join as an Artisan</Link>
        </CustomButton>
      </div>
    </nav>
  );
};
