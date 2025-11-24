import { ExploreCategiries } from "@/components/pages/landingPage/ExploreCategiries";
import { Hero } from "@/components/pages/landingPage/Hero";
import HowItWorks from "@/components/pages/landingPage/HowItWorks";
import Review from "@/components/pages/landingPage/Review";
import StartEarning from "@/components/pages/landingPage/StartEarning";
import React from "react";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <ExploreCategiries />
      <HowItWorks />
      <StartEarning />
      <Review />
    </div>
  );
};

export default Home;
