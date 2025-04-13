"use client";

import { useArtisans } from "@/api/crud/artisans";
import { ArtisanHero } from "@/components/pages/artisan/ArtisanHero";
import { ArtisanProfile } from "@/components/pages/artisan/ArtisanProfile";
import Booking from "@/components/pages/artisan/Booking";
import { CTA } from "@/components/pages/artisan/CTA";
import { ServiceReview } from "@/components/pages/artisan/ServiceReview";
import { Testimonial } from "@/components/pages/artisan/Testimonial";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const ArtisanDetails = (props: Props) => {
  const params = useParams();
  const artisanId = params?.id as string;

  const { getAllArtisan } = useArtisans();
  const { data: artisans = [], isLoading } = getAllArtisan();

  const selectedArtisan = artisans?.find(
    (artisan) => artisan?.artisanId === artisanId
  );

  if (isLoading)
    return <p className="text-white text-center mt-20 ">Loading...</p>;
  if (!selectedArtisan)
    return <p className="text-white text-center mt-20">Artisan not found</p>;

  console.log(selectedArtisan, "selected");
  

  return (
    <main className="mt-24 pt-4">
      <ArtisanHero selectedArtisan={selectedArtisan} />
      <ServiceReview selectedArtisan={selectedArtisan} />
      <ArtisanProfile selectedArtisan={selectedArtisan} />
      <Testimonial selectedArtisan={selectedArtisan} />
      <CTA />
      <Booking selectedArtisan={selectedArtisan} />
    </main>
  );
};

export default ArtisanDetails;
