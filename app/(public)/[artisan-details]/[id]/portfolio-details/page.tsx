"use client";
import { useServices } from "@/apis/crud/services";
import { MapIcon } from "@/components/assets/icons/UsersIcon";
import { ProjectDetailsSkeleton } from "@/components/loader/ProjectDetailsSkeleton";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

type Props = {};

const ArtisanPortfolioDetails = (props: Props) => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const artisanId = searchParams.get("artisanId");

  const { getArtisanServices } = useServices();
  const { data: project, isPending } = getArtisanServices(artisanId as string);
  const portfolioItems = project?.data?.find(
    (item) => String(item?._id) === String(id)
  );

  console.log(project, "PortfolioItems");
  

  const item = portfolioItems;
  const images = item?.photos || [];

  return (
    <>
      {isPending ? (
        <ProjectDetailsSkeleton />
      ) : (
        <section className="">
          <div>
            <h3 className="text-base font-bold text-paragrah mb-2 ">
              {item?.title}
            </h3>

            <div className="flex items-center mb-5">
              <MapIcon />
              <span className="text-body text-sm font-medium ml-1">
                {item?.location}
              </span>
            </div>

            <p className="text-[#667185] text-sm mb-5">{item?.description}</p>

            <div className="flex flex-wrap gap-1">
              {item?.serviceType?.map((service: any, index: number) => (
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
              {images?.map((img, index) => (
                <div
                  key={index}
                  className="aspect-video bg-gray-100 rounded-2xl relative overflow-hidden"
                >
                  <Image
                    src={img?.url}
                    alt={`${item?.title} detail 1`}
                    fill
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ArtisanPortfolioDetails;
