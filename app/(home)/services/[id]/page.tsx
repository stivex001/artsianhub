"use client";

import { ServiceCategory } from "@/components/pages/landingPage/services/ServiceCategory";
import { Headings } from "@/components/shared/Headings";
import React from "react";
import Design from "@/components/assets/images/bro.png";
import { Category } from "@/types/category";
import { CategoryCard } from "@/components/shared/CategoryCard";
import { useParams, useRouter } from "next/navigation";
import { useServices } from "@/api/crud/services";
import LoadingScreen from "@/components/shared/LoadingScreen";
import { RenderRatings } from "@/utils/RenderRatings";

type Props = {};



const ServiceDetails = (props: Props) => {
  const router = useRouter();
  const params = useParams();
  const serviceId = params?.id as string;

  const { getServicesById } = useServices();

  const { data, isLoading } = getServicesById(`${serviceId}`);

  if (isLoading) {
    return <LoadingScreen />;
  }

  console.log(data, "service_id");

  return (
    <div className="bg-service bg-cover bg-top  w-full min-h-screen mt-24 pt-4 pb-20">
      {/* <ServiceCategory /> */}
      <div className="mt-14 flex flex-col gap-14">
        <Headings
          title={data?.categoryId?.name as string}
          className="text-center font-[300] text-5xl"
        />
        <div className="flex flex-col gap-7">
          <h2 className="text-2xl font-[300] text-center">
            {data?.description}
          </h2>
          <div className="w-full px-5 lg:w-9/12 mx-auto grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-6 lg:gap-8">
            {data?.media?.map((item, index: number) => (
              <CategoryCard
                key={index}
                item={{
                  id: data?._id,
                  desc: "",
                  image: item?.url,
                }}
              />
            ))}
          </div>
          <div className="flex justify-center items-center gap-3">
            <p
              onClick={() =>
                router.push(`/available-artisan/${data?.artisanId?._id}`)
              }
              className="font-[300] text-xl cursor-pointer"
            >
              {data?.artisanId?.firstName} {data?.artisanId?.lastName}
            </p>
            <RenderRatings rating={data?.ratings?.length} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
