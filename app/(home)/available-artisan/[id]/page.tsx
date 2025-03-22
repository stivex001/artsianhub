import { ArtisanHero } from "@/components/pages/artisan/ArtisanHero";
import { ArtisanProfile } from "@/components/pages/artisan/ArtisanProfile";
import { Benefits } from "@/components/pages/artisan/Benefits";
import { ServiceReview } from "@/components/pages/artisan/ServiceReview";
import { Testimonial } from "@/components/pages/artisan/Testimonial";
import React from "react";

type Props = {};

const ArtisanDetails = (props: Props) => {
  return (
    <main className="mt-24 pt-4 pb-20">
      <ArtisanHero />
      <ServiceReview />
      <ArtisanProfile />
     
      <Testimonial />
    </main>
  );
};

export default ArtisanDetails;
