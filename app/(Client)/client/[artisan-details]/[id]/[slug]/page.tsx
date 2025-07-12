"use client";
import { MapIcon } from "@/components/assets/icons/UsersIcon";
import { mockPortfolioItems } from "@/components/Client/data";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const PortfolioDetails = (props: Props) => {
  const params = useParams();
  const slug = params.slug;

  const portfolioItems = mockPortfolioItems?.find(
    (item) => String(item?.id) === String(slug)
  );

  const images = portfolioItems?.images || [];

  return (
    <section className="">
      <div>
        <h3 className="text-base font-bold text-paragrah mb-2 ">
          {portfolioItems?.title}
        </h3>

        <div className="flex items-center mb-5">
          <MapIcon />
          <span className="text-body text-sm font-medium ml-1">
            {portfolioItems?.location}
          </span>
        </div>

        <p className="text-[#667185] text-sm mb-5">
          {portfolioItems?.description}
        </p>

        <div className="flex flex-wrap gap-1">
          {portfolioItems?.services?.map((service, index) => (
            <span
              key={index}
              className="px-3 py-1.5 bg-[#1129A00D] text-body rounded-[20px] text-xs font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      <div className="my-6">
        <div className="grid gap-2">
          {images?.map((img) => (
            <div className="aspect-video bg-gray-100 rounded-2xl relative overflow-hidden">
              <Image
                src={img}
                alt={`${portfolioItems?.title} detail 1`}
                fill
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioDetails;
