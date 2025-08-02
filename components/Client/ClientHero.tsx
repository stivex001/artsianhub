import React from "react";
import hero from "@/components/assets/images/clienthero.jpg";
import Image from "next/image";
import { SearchArtisan } from "./SearchArtisan";

type Props = {};

export const ClientHero = (props: Props) => {
  return (
    <section className=" lg:h-[60vh] px-5 py-24 sm:py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 ">
        <div className="w-full h-full  bg-gradient-to-r from-black/70 to-black/50">
          <Image
            src={hero}
            alt="Construction worker"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="absolute inset-0 bg-[#0000004D]"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto ">
        <div className="text-center">
          <h1 className="text-3xl lg:text-[40px] font-[900] text-white">
            Find Trusted Artisans Near You
          </h1>
          <p className="text-base lg:text-xl text-white font-medium mb-5">
            Get access to skilled professionals for your home or office needs.
          </p>

          <SearchArtisan />
        </div>
      </div>
    </section>
  );
};
