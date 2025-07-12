"use client";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AboutArtisan } from "./AboutArtisan";
import { useParams } from "next/navigation";
import { artisans } from "./data";
import { ArtisanPortfolio } from "./ArtisanPortfolio";
import { ArtisanRating } from "./ArtisanRating";

type Props = {};

export const ArtisanDetailsTab = (props: Props) => {
  const [activeTab, setActiveTab] = useState<"about" | "portfolio" | "rating">(
    "about"
  );

  const params = useParams();
  const id = params.id;
  const artisan = artisans?.find((art) => String(art?.id) === String(id));

  return (
    <Tabs defaultValue={activeTab} className="flex flex-col gap-6">
      <TabsList className="flex items-center justify-start">
        <TabsTrigger
          value="about"
          className="w-full flex items-start justify-start text-sm font-bold data-[state=active]:bg-[#F9F9FB] text-paragrah rounded-2xl px-4 py-2 h-9 "
        >
          About
        </TabsTrigger>
        <TabsTrigger
          value="portfolio"
          className="w-full flex items-start justify-start text-sm font-bold data-[state=active]:bg-[#F9F9FB] text-paragrah rounded-2xl px-4 py-2 h-9 "
        >
          Portfolio
        </TabsTrigger>
        <TabsTrigger
          value="rating"
          className="w-full flex items-start justify-start text-sm font-bold data-[state=active]:bg-[#F9F9FB] text-paragrah rounded-2xl px-4 py-2 h-9 "
        >
          Ratings & Review
        </TabsTrigger>
      </TabsList>

      <TabsContent value="about" className="w-full">
        <AboutArtisan artisan={artisan} />
      </TabsContent>
      <TabsContent value="portfolio" className="w-full">
        <ArtisanPortfolio />
      </TabsContent>
      <TabsContent value="rating" className="w-full">
        <ArtisanRating />
      </TabsContent>
    </Tabs>
  );
};
