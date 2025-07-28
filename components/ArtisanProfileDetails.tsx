"use client";

import { getUserInitials } from "@/utils/getUserInitials";
import Image from "next/image";
import { ArtisanDetails } from "@/api/crud/artisans";
import { format } from "date-fns";

type ArtisanProfileProps = {
  selectedArtisan: any;
};

const ArtisanProfileDetails = ({ selectedArtisan }: ArtisanProfileProps) => {
  const profilePhoto = selectedArtisan?.profilePhoto?.url;

  const initials = getUserInitials(
    selectedArtisan?.user?.firstName,
    selectedArtisan?.user?.lastName
  );

  return (
    <div className="flex gap-2 cursor-pointer">
      {profilePhoto ? (
        <div className="w-16 h-16 cursor-pointer">
          <Image
            src={profilePhoto}
            alt={`${selectedArtisan?.user?.firstName}`}
            width={64}
            height={64}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      ) : (
        <div className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-full text-base font-semibold cursor-pointer">
          {initials}
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-white font-bold text-xl md:text-4xl">
          {selectedArtisan?.user?.firstName} {selectedArtisan?.user?.lastName}
        </p>
        {selectedArtisan?.artisanId && (
          <span className="text-base text-white">
            {selectedArtisan?.artisanId}
          </span>
        )}
        <span className="text-base text-white">
          Date Joined:{" "}
          {format(new Date(selectedArtisan?.createdAt), "MMM dd, yyyy")}
        </span>
      </div>
    </div>
  );
};

export default ArtisanProfileDetails;
