"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/components/assets/images/artilogo.svg";
import { useAuthStore } from "@/store/authStore";
import UserDesc from "../UserDesc";
import { CustomButton } from "../clickable/CustomButton";

type Props = {};

export const Header = (props: Props) => {
  const { currentUser } = useAuthStore();

  return (
    <header className="bg-white h-24 w-full">
      <div className="max-w-[1152px] mx-auto flex items-center justify-between py-8">
        <Link href="/home" className="">
          <Image src={logo} alt="logo" className="w-full h-full object-cover" />
        </Link>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-8">
            <Link
              href="/contact-us"
              className="text-lightp font-medium text-base"
            >
              Categories
            </Link>
            <Link href="/about" className="text-lightp font-medium text-base ">
              How It Works
            </Link>
          </div>
          {currentUser ? (
            <div className="flex items-center gap-2.5 sm:gap-8 lg:gap-14">
              <UserDesc />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <CustomButton
                variant="transparent"
                className="border border-bordergrey rounded-[6px] text-sm text-lightp font-medium "
              >
                <Link href="/auth/login">Login</Link>
              </CustomButton>
              <CustomButton>
                <Link href="/auth/signup?artisan=true" className="font-light">
                  Sign Up
                </Link>
              </CustomButton>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
