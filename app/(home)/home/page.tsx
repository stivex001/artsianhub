import { Creative } from "@/components/pages/landingPage/Creative";
import { Digital } from "@/components/pages/landingPage/Digital";
import { Hero } from "@/components/pages/landingPage/Hero";
import HowItWorks from "@/components/pages/landingPage/HowItWorks";
import Review from "@/components/pages/landingPage/Review";
import { Skilled } from "@/components/pages/landingPage/Skilled";
import StartEarning from "@/components/pages/landingPage/StartEarning";
import { Descriptions } from "@/components/shared/Headings";
import React from "react";

const Home = () => {
  return (
    <div className="">
      <Hero />
      {/* <FindPerfectArtisan /> */}
      {/* <FeaturesArtisan /> */}
      {/* <Fashion /> */}
      {/* <Food /> */}
      {/* <Interior /> */}
      {/* <Beauty /> */}
      <section id="findArtisan">
        <div className="max-w-2xl mx-auto text-center pt-20">
          <Descriptions
            title="Find Your Perfect Artisan"
            desc="Whether you need a tailor, a tech expert, or a home repair specialist,
                  ArtisansHub has a skilled artisan ready for your project."
          />
        </div>
        <Creative />
        <Digital />
        <Skilled />
      </section>
      {/* <Visual /> */}
      <HowItWorks />
      <StartEarning />
      <Review />
    </div>
  );
};

export default Home;
