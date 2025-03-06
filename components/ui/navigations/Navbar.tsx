"use client";
import React from "react";
import logo from "@/components/assets/images/logo.png";
import Image from "next/image";
import Link from "next/link";

type Props = {};

export const Navbar = (props: Props) => {
  return (
    <nav className="w-full bg-white fixed z-50 h-[96px] flex items-center justify-between px-10 shadow-dropShadow">
      <div className="flex items-center gap-14">
        <Link href='/' className="w-[65px] h-12">
          <Image
            src={logo}
            alt="logo"
            width={65}
            height={48}
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
      <div>2</div>
    </nav>
  );
};
