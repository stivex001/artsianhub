"use client";
import { Headings } from "@/components/shared/Headings";
import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useServices } from "@/api/crud/services";
import SkeletonLoader from "@/components/shared/SkeletonModal";

type Props = {};

export const PopularService = (props: Props) => {
  const { getTopRatedService } = useServices();

  const { data: services, isLoading } = getTopRatedService();
  const topServices = services?.topServices;

  return (
    <div className="py-14 flex flex-col gap-16 relative">
      <Headings
        title="Popular Services"
        className="text-center text-4xl lg:text-5xl"
      />
      <div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          pagination={{ clickable: true, dynamicBullets: true }}
          className="service-review-swiper "
        >
          {isLoading ? (
            <div className="flex justify-center w-full h-full">
              <SkeletonLoader type="image" count={4} />
            </div>
          ) : (
            topServices?.map((item) => (
              <SwiperSlide key={item?._id}>
                <div className="mb-14 rounded-[10px] overflow-hidden w-80 h-[400px]">
                  <div className="relative w-full h-full">
                    <Image
                      src={item?.media?.[0]?.url}
                      alt="Service professional"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[10px]"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
      {/* <div>
        <Swiper
          spaceBetween={20}
          loop={true}
          centeredSlides={true} // Centers the active slide
          slidesPerView={1} // Default for mobile
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          pagination={{
            clickable: true, // Enables dot navigation
          }}
          modules={[Pagination]}
          className="w-full"
        >
          {topServices?.map((service) => (
            <SwiperSlide
              key={service?._id}
              // className="flex min-w-[300px] justify-center"
            >
              <div className="mb-14 rounded-[10px] overflow-hidden w-80 h-[400px]">
                <div className="relative w-full h-full">
                  <Image
                    src={service?.media?.[0]?.url}
                    alt="service"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[10px]"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </div>
  );
};
