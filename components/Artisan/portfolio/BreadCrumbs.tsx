"use client";
import { GoBackIcon } from "@/components/assets/icons/ModalIcon";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const ArtisanBreadCrumbs = (props: Props) => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <button onClick={() => router.back()} className="flex items-center gap-3">
        <GoBackIcon />
        <p className="font-medium text-sm text-body">Go Back</p>
      </button>
      <p className="text-[#667185] text-sm font-medium">
        Projects / <span className="text-primary">Project Details</span>
      </p>
    </div>
  );
};

export default ArtisanBreadCrumbs;
