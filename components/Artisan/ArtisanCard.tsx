import React from "react";
import Image from "next/image";
import {  Star } from "lucide-react";
import { MapIcon } from "../assets/icons/UsersIcon";
import { useRouter } from "next/navigation";

type Props = {
  artisan: any;
  showDate?: boolean;
};

export const ArtisanCard = ({ artisan }: Props) => {
  const router = useRouter();
  return (
    <div
      key={artisan?._id}
      onClick={() => router.push(`/client/artisan-details/${artisan?._id}`)}
      className="bg-white rounded-3xl pt-2 px-2 pb-5 hover:shadow-shadowHover transition overflow-hidden text-left cursor-pointer"
    >
      <div className="relative mb-3">
        <div className="relative h-60 w-full overflow-hidden">
          <Image
            src={artisan?.profilePicture}
            alt={artisan?.firstName}
            className="w-full h-full object-cover rounded-xl"
            fill
          />
        </div>
        {/* Availability Badge */}
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${artisan.availabilityColor}`}
          >
            {artisan?.availability}
          </span>
        </div>
      </div>

      <div className="px-2">
        {/* Name and Rating */}
        <div className="flex items-start justify-between">
          <h3 className="font-bold text-paragrah text-xl leading-tight">
            {artisan?.firstName} {artisan?.lastName}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <Star size={14} className="text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">
              {artisan?.averageRating}
            </span>
            <span className="text-sm text-gray-500">({artisan?.totalReviews})</span>
          </div>
        </div>

        <p className="text-body text-sm mb-2">{artisan?.professionalTitle}</p>

        <div className="flex items-center gap-0.5 mb-3">
          <MapIcon />
          <span className="text-sm text-body">{artisan?.primaryLocation}</span>
        </div>

        {/* Hourly Rate */}
        <div className="text-base font-bold text-body">
          ${artisan?.pricePerHour}/hr
        </div>
      </div>
    </div>
  );
};
