import { ArtisanHero } from "@/components/pages/artisan/ArtisanHero";
import { ServiceReview } from "@/components/pages/artisan/ServiceReview";
import React from "react";

type Props = {};

const ArtisanDetails = (props: Props) => {
  return (
    <main className="mt-24 pt-4 pb-20">
      <ArtisanHero />
      <ServiceReview />
    </main>
  );
};

export default ArtisanDetails;
