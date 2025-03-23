import { ArtisanHero } from "@/components/pages/artisan/ArtisanHero";
import { ArtisanProfile } from "@/components/pages/artisan/ArtisanProfile";
import Booking from "@/components/pages/artisan/Booking";
import { CTA } from "@/components/pages/artisan/CTA";
import { ServiceReview } from "@/components/pages/artisan/ServiceReview";
import { Testimonial } from "@/components/pages/artisan/Testimonial";
import React from "react";

type Props = {};

const ArtisanDetails = (props: Props) => {
  return (
    <main className="mt-24 pt-4">
      <ArtisanHero />
      <ServiceReview />
      <ArtisanProfile />
      <Testimonial />
      <CTA />
      <Booking />
    </main>
  );
};

export default ArtisanDetails;
