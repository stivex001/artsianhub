import React from "react";
import { artisans } from "../Client/data";
import Image from "next/image";
import { MapPin, Star } from "lucide-react";
import { MapIcon } from "../assets/icons/UsersIcon";

type Props = {};

export const ArtisanCard = (props: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {artisans.map((artisan) => (
        <div
          key={artisan.id}
          className="bg-white rounded-3xl pt-2 px-2 pb-5 shadow-boxshadow hover:shadow-md transition overflow-hidden text-left cursor-pointer"
        >
    
          <div className="relative mb-3">
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={artisan.image}
                alt={artisan.name}
                className="w-full h-full object-cover rounded-xl"
                layout="fill"
              />
            </div>
            {/* Availability Badge */}
            <div className="absolute top-3 right-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium text-white ${artisan.availabilityColor}`}
              >
                {artisan.availability}
              </span>
            </div>
          </div>

 
          <div className="px-2">
            {/* Name and Rating */}
            <div className="flex items-start justify-between">
              <h3 className="font-bold text-paragrah text-xl leading-tight">
                {artisan?.name}
              </h3>
              <div className="flex items-center gap-1 ml-2">
                <Star size={14} className="text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-gray-700">
                  {artisan.rating.toFixed(1)}
                </span>
                <span className="text-sm text-gray-500">
                  ({artisan.reviews})
                </span>
              </div>
            </div>

            <p className="text-body text-sm mb-2">{artisan?.profession}</p>

            <div className="flex items-center gap-0.5 mb-3">
              <MapIcon/>
              <span className="text-sm text-body">{artisan.location}</span>
            </div>

            {/* Hourly Rate */}
            <div className="text-base font-bold text-body">
              £{artisan.hourlyRate}/hr
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
