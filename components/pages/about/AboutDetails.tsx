import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {};

export const AboutDetails = (props: Props) => {
  return (
    <Wrapper className="py-12  border cursor-pointer border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-600 text-lg mb-4 font-medium">
          Get to know a little bit about
        </p>

        <h2 className="text-2xl md:text-4xl font-bold text-primary mb-8">
          ARTISANSHUB
        </h2>

        <p className="text-body text-lg leading-relaxed max-w-3xl mx-auto">
          ArtisansHub connects customers with reliable, skilled artisans,
          promoting local craftsmanship and supporting small businesses. We vet
          artisans for quality and excellence, providing a seamless experience
          for customers. Our goal is to build lasting relationships based on
          trust, transparency, and quality, helping bring your vision to life.
        </p>
      </div>
    </Wrapper>
  );
};
