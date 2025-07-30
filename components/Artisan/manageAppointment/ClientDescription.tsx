import { MapImage } from "@/components/assets/icons/MapIcon";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import React from "react";

type Props = {
  appointment: any;
};

export const ClientDescription = ({ appointment }: Props) => {
  return (
    <div className="flex-1  space-y-6">
      {/* Job Status */}
      <div>
        <h3 className="text-base font-bold text-body mb-2">Job Status</h3>
        <StatusBadge status={appointment?.status} />
      </div>

      {/* Job Description */}
      <div>
        <h3 className="text-base font-bold text-paragrah mb-2">
          Job Description
        </h3>
        <p className="text-body leading-relaxed text-sm">
          {appointment?.description}
        </p>
      </div>

      <div>
        <h3 className="text-base font-bold text-paragrah mb-2">
          Preferred Date and Time
        </h3>
        <p className="text-body text-sm">
          {formatDate(appointment?.preferredDate)}. {appointment?.preferredTime}
        </p>
      </div>

      {/* Location */}
      <div>
        <h3 className="text-base font-bold text-paragrah mb-2">Location</h3>
        <p className="text-body text-sm mb-4">{appointment?.location}</p>

        {/* Map */}
        <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
          {/* <img
                  src={appointment?.mapUrl}
                  alt="Location map"
                  className="w-full h-full object-cover"
                /> */}
          <MapImage />
        </div>
      </div>

      {/* Attached Images */}
      <div>
        <h3 className="text-base font-bold text-paragrah mb-2">
          Attached Images
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
          {appointment?.images?.map((image: any, index: number) => (
            <div
              key={image?._id}
              className="h-[150px] relative bg-gray-200 rounded-xl overflow-hidden"
            >
              <Image
                src={image?.url}
                alt={`Attachment ${index + 1}`}
                fill
                className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
