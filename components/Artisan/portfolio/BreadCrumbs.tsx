"use client";
import { GoBackIcon } from "@/components/assets/icons/ModalIcon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  desc: string;
  url: string;
  title: string;
};

const ArtisanBreadCrumbs = ({ desc, url,title }: Props) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <button onClick={() => router.back()} className="flex items-center gap-3">
        <GoBackIcon />
        <p className="font-medium text-sm text-body">Go Back</p>
      </button>
      <p className="text-[#667185] text-sm font-medium">
        <Link href={url}>{title}</Link> /{" "}
        <span className="text-primary">{desc}</span>
      </p>
    </div>
  );
};

export default ArtisanBreadCrumbs;
