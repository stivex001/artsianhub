"use client";
import Image, { StaticImageData } from "next/image";
import React, { ReactNode } from "react";
import Link from "next/link";
import { LogoIcon } from "@/components/assets/icons/SvgIcons";
import logo from "@/components/assets/images/nw.png";

type Props = {
  children: ReactNode;
  authImg: StaticImageData;
  title: string;
  desc: string;
};

const AuthLayout = ({ children, authImg, title, desc }: Props) => {
  return (
    <div className="lg:px-6 py-6  flex h-screen overflow-hidden">
      <div className="hidden lg:flex flex-col justify-center  lg:w-1/2 relative rounded-3xl p-8 z-10">
        <Image
          src={authImg}
          alt="bg"
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          priority
        />
        <Link href="/" className="absolute top-8 left-8 w-36 h-20">
          {/* <LogoIcon /> */}
          <Image
            src={logo}
            alt="logo"
            className="w-full h-full object-cover "
          />
        </Link>
        <div className="max-w-xl text-white z-10">
          <h1 className=" font-[900] text-4xl mb-2">{title}</h1>
          <p className="font-medium text-xl">{desc}</p>
        </div>
      </div>
      <section className="w-full lg:w-1/2 flex flex-col">
        {/* Scrollable content container */}
        <div className="flex-1 overflow-y-auto flex items-center justify-center px-4 lg:px-0 lg:py-6 no-scrollbar">
          <div className="w-full max-w-[512px] my-auto">{children}</div>
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;
