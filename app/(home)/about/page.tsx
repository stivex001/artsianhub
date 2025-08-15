import Footer from "@/components/navigations/Footer";
import { AboutDetails } from "@/components/pages/about/AboutDetails";
import { AboutHero } from "@/components/pages/about/AboutHero";
import { OtherDetails } from "@/components/pages/about/OtherDetails";
import { Speciality } from "@/components/pages/about/Speciality";
import React from "react";

type Props = {};

const AboutUs = (props: Props) => {
  return (
    <main className=" bg-[#F9FAFB]">
      <div className="max-w-5xl mx-auto py-20 space-y-16">
        <AboutHero />
        <AboutDetails />
        <Speciality />
        <OtherDetails />
      </div>
      <Footer />
    </main>
  );
};

export default AboutUs;
