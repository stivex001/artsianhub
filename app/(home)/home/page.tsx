import { FindPerfectArtisan } from "@/components/pages/landingPage/FindPerfectArtisan";
import { Hero } from "@/components/pages/landingPage/Hero";
import React from "react";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="">
      <Hero />
      <FindPerfectArtisan />
    </div>
  );
};

export default Home;
