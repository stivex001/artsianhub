import type { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "Learn Skills",
  description:
    "Discover training and skill-building resources on ArtisansHub. Level up your craft and grow your business.",
  alternates: { canonical: "/learn-skills" },
};

import learnskill from "@/components/assets/images/learnskill.jpg";

type Props = {};

const LearnSkills = (props: Props) => {
  return (
    <div className="w-full bg-white text-gray-900">
      <div className="">
        <Image
          src={learnskill}
          alt="Fashion Coming Soon"
          className="w-full h-full object-cover object-center"
          // fill
          // priority
        />
      </div>
    </div>
  );
};

export default LearnSkills;
