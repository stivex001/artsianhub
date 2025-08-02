"use client";
import React, { useState } from "react";
import { MapIcon } from "../assets/icons/UsersIcon";
import { CustomButton } from "../clickable/CustomButton";
import { ArtisanDetailsTab } from "./ArtisanDetailsTab";
import { ContactArtisanModal } from "./ContactArtisanModal";
import { useParams } from "next/navigation";
import { useArtisans } from "@/api/crud/artisans";
import Image from "next/image";
import { Star } from "lucide-react";
import { ClientInfoSkeleton } from "../loader/ClientInfoSkeleton";

type Props = {};

export const ArtisanContent = ({}: Props) => {
  const params = useParams();
  const id = params.id;
  const [isModalContactOpen, setIsModalContactOpen] = useState(false);

  const closeModal = () => setIsModalContactOpen(false);

  const { getArtisanById } = useArtisans();
  const { data, isPending } = getArtisanById(`${id}`);
  const artisan = data?.data;

  return (
    <div className="my-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column - Profile Card */}
        {isPending ? (
          <ClientInfoSkeleton />
        ) : (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="aspect-square bg-gray-100 relative mb-4">
                {artisan?.profilePicture && (
                  <Image
                    src={artisan?.profilePicture}
                    alt={"Artisan Profile"}
                    className="w-full h-full object-cover rounded-2xl"
                    fill
                  />
                )}
              </div>

              <div className="">
                <h1 className="text-3xl font-bold text-gray-900">
                  {artisan?.firstName} {artisan?.lastName}
                </h1>
                <p className="text-body text-sm mb-2">
                  {artisan?.professionalTitle}
                </p>

                <div className="flex items-center gap-0.5 mb-2">
                  <MapIcon />
                  <span className="text-body text-sm font-medium">
                    {artisan?.primaryLocation}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <Star size={14} className="text-yellow-400 fill-current" />
                  <span className="text-sm text-body font-medium">
                    {artisan?.averageRating}({artisan?.totalReviews})
                  </span>
                </div>

                <div className="text-base font-bold text-paragrah mb-5">
                  ${artisan?.pricePerHour}/hr
                </div>
                <CustomButton
                  label="Contact Artisan"
                  type="button"
                  className="w-full"
                  onClick={() => setIsModalContactOpen(true)}
                />
              </div>
            </div>
            {data && (
              <ContactArtisanModal
                item={data}
                isOpen={isModalContactOpen}
                onClose={closeModal}
              />
            )}
          </div>
        )}
        <div className="lg:col-span-2">
          <ArtisanDetailsTab />
        </div>
      </div>
    </div>
  );
};
