"use client";
import { ArtisanContent } from "@/components/Client/ArtisanContent";
import { artisans } from "@/components/Client/data";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

type Props = {
  artisanId?: string;
};

const ArtisanDetails = ({ artisanId }: Props) => {
  const params = useParams();
  const id = params.id;
  const artisan = artisans?.find((art) => String(art?.id) === String(id));

  return (
    <div className="min-h-screen ">
      {/* Breadcrumbs */}
      <nav className="bg-white px-4 py-3 sticky top-20 z-50">
        <div className="">
          <div className="flex items-center space-x-2 text-sm text-[#667185]">
            <Link
              href="/client"
              className="text-[#667185] text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
            <span>{`>`}</span>
            <button className="hover:text-blue-600 transition-colors capitalize">
              {artisan?.profession}s
            </button>
            <span>{`>`}</span>
            <span className="text-gray-900 font-medium">{artisan?.name}</span>
          </div>
        </div>
      </nav>

      <ArtisanContent artisan={artisan} />
    </div>
  );
};

export default ArtisanDetails;
