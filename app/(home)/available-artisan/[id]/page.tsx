import { ArtisanHero } from "@/components/pages/artisan/ArtisanHero";
import React from "react";

type Props = {};

const ArtisanDetails = (props: Props) => {
  return (
    <main className="mt-24 pt-4 pb-20">
      <ArtisanHero />
    </main>
  );
};

export default ArtisanDetails;
