"use client";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";
import { categories } from "../landingPage/FindPerfectArtisan";
import { useRouter } from "next/navigation";

type Props = {};

export const Speciality = (props: Props) => {
  const router = useRouter();

  return (
    <Wrapper className="lg:p-12  border cursor-pointer border-[#E5E7EB]">
      <div className="flex flex-col gap-6">
        <p className="text-[#4B5563] text-xl text-center  ">What we specialize in</p>
        <p className="text-[#374151] text-lg text-center lg:text-left ">
          ArtisansHub offers a range of services, including artisan connection,
          project management, quality assurance, and a seamless platform for
          finding and collaborating with skilled professionals.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-6 md:gap-y-8">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                onClick={() => router.push("/auth/login")}
                className=" cursor-pointer   p-6 flex flex-col  gap-4 items-center "
              >
                <Icon />
                <h3 className="text-sm font-medium text-textdeep text-center">
                  {category.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </Wrapper>
  );
};
