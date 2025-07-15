"use client";
import React, { useEffect, useState } from "react";
import { LocationType } from "../Artisan/settings/AdditionalInformation";

type Props = {
  defaultValues?: LocationType;
};

const Location = ({ defaultValues }: Props) => {
  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    if (defaultValues) {
      setLocationName(defaultValues.name || "");
      setLocationAddress(defaultValues.geometry?.address || "");
      setCoordinates(
        defaultValues.geometry
          ? {
              lat: Number(defaultValues.geometry.lat),
              lng: Number(defaultValues.geometry.long),
            }
          : null
      );
    }
  }, [defaultValues]);

  const handleAddressSelect = (address: string, lat: number, lng: number) => {
    setLocationAddress(address);
    setCoordinates({ lat, lng });
  };

  return (
    <div className="my-3">
      <input
        type="text"
        placeholder="Search location..."
        className="w-full h-12 p-4 border rounded-[10px] outline-none"
        value={locationName}
        onChange={(e) => setLocationName(e.target.value)}
      />
    </div>
  );
};

export default Location;
