import { Beauty } from "@/components/pages/landingPage/Beauty";
import { Digital } from "@/components/pages/landingPage/Digital";
import { Fashion } from "@/components/pages/landingPage/Fashion";
import { FeaturesArtisan } from "@/components/pages/landingPage/FeaturesArtisan";
import { FindPerfectArtisan } from "@/components/pages/landingPage/FindPerfectArtisan";
import { Food } from "@/components/pages/landingPage/Food";
import { Hero } from "@/components/pages/landingPage/Hero";
import { Interior } from "@/components/pages/landingPage/Interior";
import { Skilled } from "@/components/pages/landingPage/Skilled";
import { Visual } from "@/components/pages/landingPage/Visual";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="">
      <Hero />
      <FindPerfectArtisan />
      <FeaturesArtisan />
      <Fashion />
      <Food />
      <Interior />
      <Beauty />
      <Visual />
      <Digital />
      <Skilled />
    </div>
  );
};

export default Home;
