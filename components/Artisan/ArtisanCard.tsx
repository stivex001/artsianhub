import React from "react";
import Image from "next/image";
import { Star, Check } from "lucide-react";
import { MapIcon } from "../assets/icons/UsersIcon";
import { useRouter } from "next/navigation";

type Props = {
  artisan: any;
  showDate?: boolean;
};

const isVerified = (artisan: any) =>
  artisan?.verificationStatus === "verified" || artisan?.isVerified === true;

export const ArtisanCard = ({ artisan }: Props) => {
  const router = useRouter();
  const verified = isVerified(artisan);

  return (
    <div
      key={artisan?._id}
      onClick={() => router.push(`/artisan-details/${artisan?._id}`)}
      className="bg-white rounded-3xl pt-2 px-2 pb-5 hover:shadow-shadowHover transition overflow-hidden text-left cursor-pointer"
    >
      <div className="relative mb-3">
        {/*
          Sub-wrapper with `relative` but NO overflow-hidden so the verification
          badge circle can bleed past the image corner — same as X.com / Facebook.
          The overflow-hidden + rounded corners are applied one level deeper.
        */}
        <div className="relative">
          <div className="aspect-square w-full overflow-hidden rounded-xl relative">
            {artisan?.profilePicture ? (
              <Image
                src={artisan.profilePicture}
                alt={artisan?.firstName || "Artisan"}
                className="w-full h-full object-cover"
                fill
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-600">
                {artisan?.firstName?.charAt(0)?.toUpperCase()}
                {artisan?.lastName?.charAt(0)?.toUpperCase()}
              </div>
            )}
          </div>

          {/* Verification badge — top-right corner, overlaps the image edge */}
          {verified && (
            <div
              className="absolute -top-1.5 -right-1.5 w-7 h-7 bg-[#02198B] rounded-full
                flex items-center justify-center ring-[2.5px] ring-white shadow-md z-10"
              title="Verified Artisan"
            >
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </div>
          )}
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
            <span className="text-sm text-gray-500">
              ({artisan?.totalReviews})
            </span>
          </div>
        </div>

        <p className="text-body text-sm mb-2">{artisan?.professionalTitle}</p>

        <div className="flex items-center gap-0.5 mb-3">
          <MapIcon />
          <span className="text-sm text-body">{artisan?.primaryLocation}</span>
        </div>
      </div>
    </div>
  );
};
