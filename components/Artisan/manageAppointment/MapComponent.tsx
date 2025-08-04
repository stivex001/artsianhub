import Image from "next/image";
import React from "react";
import mapUrl from "@/components/assets/images/map.png";

type Props = {};

export const MapComponent = (props: Props) => {
  return (
    <div className="w-full relative h-48 bg-gray-200 rounded-xl overflow-hidden">
      <Image src={mapUrl} alt="map" fill className="object-cover rounded-xl" />
    </div>
  );
};
