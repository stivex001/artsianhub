"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import logo from "@/components/assets/images/n.png";
import { ProfileStageCheck } from "./ProfileStageCheck";
import Image from "next/image";

type Props = {
  children: ReactNode;
  title: string;
  desc: string;
  art?: boolean;
  role: string;
};

const ProfileSetupLayout = ({ children, title, desc, art, role }: Props) => {
  return (
    <div className="lg:px-6 py-6  flex h-screen overflow-hidden">
      <div className="hidden lg:flex flex-col justify-center bg-[#f9f9fb]  lg:w-1/2 relative rounded-3xl p-8 z-10">
        <Link
          href={role === "client" ? "/" : "/artisan/dashboard"}
          className="absolute top-8 left-8 w-36 h-20"
        >
          <Image
            src={logo}
            alt="logo"
            className="w-full h-full object-cover "
          />
        </Link>
        <div className="max-w-xl text-paragrah z-10">
          <h1 className=" font-[900] text-4xl mb-2">{title}</h1>
          <p className="text-sm text-body">{desc}</p>
          {art && <ProfileStageCheck />}
        </div>
      </div>
      <section className="w-full lg:w-1/2 flex flex-col">
        <div className="flex-1 overflow-y-auto flex items-center justify-center px-4 lg:px-0 lg:py-6 no-scrollbar">
          <div className="w-full max-w-[512px] my-auto">{children}</div>
        </div>
      </section>
    </div>
  );
};

export default ProfileSetupLayout;
