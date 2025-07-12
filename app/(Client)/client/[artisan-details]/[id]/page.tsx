"use client";
import { ArtisanContent } from "@/components/Client/ArtisanContent";
import { artisans } from "@/components/Client/data";
import { useParams } from "next/navigation";
import React from "react";

const ArtisanDetails = () => {
  const params = useParams();
  const id = params.id;
  const artisan = artisans?.find((art) => String(art?.id) === String(id));

  return (
    <>
      <ArtisanContent artisan={artisan} />
    </>
  );
};

export default ArtisanDetails;
