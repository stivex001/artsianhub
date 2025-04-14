"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { ArtisanDetails } from "@/api/crud/artisans";

type Props = {
  selectedArtisan: ArtisanDetails;
};

export const ServiceReview = ({ selectedArtisan }: Props) => {
  return (
    <section className="bg-secondary py-16 px-4">
      <h1 className="font-semibold text-2xl md:text-4xl lg:text-5xl text-white text-center max-w-2xl mx-auto mb-6">
        Discover our wide range of professional services reviews
      </h1>

      <div className="">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          className="service-review-swiper "
        >
          {selectedArtisan?.portfolio?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="mb-14 rounded-[10px] overflow-hidden w-80 h-[400px]">
                <div className="relative w-full h-full">
                  <Image
                    src={item?.media?.url}
                    alt="Service professional"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-[10px]"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Rating and review counter */}
        <div className="flex justify-end items-center mt-6 px-2">
          <a
            href="#"
            className="text-white hover:underline text-sm font-semibold"
          >
            View more...
          </a>
        </div>
      </div>
    </section>
  );
};
