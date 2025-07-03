import { Fashion } from "@/components/pages/landingPage/Fashion";
import { FeaturesArtisan } from "@/components/pages/landingPage/FeaturesArtisan";
import { FindPerfectArtisan } from "@/components/pages/landingPage/FindPerfectArtisan";
import { Hero } from "@/components/pages/landingPage/Hero";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="">
      <Hero />
      <FindPerfectArtisan />
      <FeaturesArtisan />
      <Fashion />
    </div>
  );
};

export default Home;
