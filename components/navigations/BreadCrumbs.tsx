"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useArtisans } from "@/api/crud/artisans";

type Props = {};

const BreadCrumbs = (props: Props) => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
 const { getArtisanById } = useArtisans();
   const { data, isPending } = getArtisanById(`${id}`);

   const artisan = data?.data

  return (
    <nav className="bg-white sticky top-20 z-10">
      <div className="">
        <div className="flex items-center space-x-2 text-sm text-[#667185]">
          <Link
            href="/client"
            className="text-[#667185] text-sm font-medium hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <span>{`>`}</span>
          <button
            onClick={() => router.back()}
            className="hover:text-blue-600 transition-colors capitalize"
          >
            {artisan?.professionalTitle}
          </button>
          <span>{`>`}</span>
          <span className="text-gray-900 font-medium">{artisan?.firstName} {artisan?.lastName}</span>
        </div>
      </div>
    </nav>
  );
};

export default BreadCrumbs;
