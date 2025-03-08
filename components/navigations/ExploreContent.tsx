"use client";
import React, { useState } from "react";
import { Headings } from "../shared/Headings";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { Product, services } from "../data/dummy";
import { motion } from "framer-motion";
import Link from "next/link";
import { SubNavContents } from "./SubNavContents";

type Props = {};

export const ExploreContent = (props: Props) => {
  const [openService, setOpenService] = useState<number | null>(null);

  const toggleService = (index: number) => {
    setOpenService(openService === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-col gap-3">
        <Headings
          title="Services"
          className="font-semibold text-xl !text-black"
        />
        {services?.map((service, index) => {
          return (
            <div
              onClick={() => toggleService(index)}
              key={index}
              className="relative flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5">
                  <Image
                    src={service?.icon}
                    alt="icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-black font-[family-name:var(--font-josefin-sans)] ">
                  {service?.title}
                </span>
              </div>
              {openService === index ? (
                <ChevronDownIcon className="text-[#8A8692]" />
              ) : (
                <ChevronRightIcon className="text-[#8A8692]" />
              )}

              {openService === index && (
                // service?.subNav?.map((sub, idx) => (

                // ))}
                <SubNavContents
                  sub={service?.subNav}
                  title={service?.title}
                  icon={service?.icon}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        <Headings
          title="Products"
          className="font-semibold text-xl !text-black"
        />
        {Product?.map((product) => (
          <Link
            key={product?.id}
            href={product?.url}
            className="text-secondary text-sm font-[family-name:var(--font-josefin-sans)] ml-5"
          >
            {product?.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
