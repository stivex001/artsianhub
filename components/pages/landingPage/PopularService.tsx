"use client";
import { Headings } from "@/components/shared/Headings";
import React from "react";
import image1 from "@/components/assets/images/port.png";
import image2 from "@/components/assets/images/male.png";
import image3 from "@/components/assets/images/front.png";
import image4 from "@/components/assets/images/people.png";
import Image, { StaticImageData } from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

type Props = {};
interface PopularService {
  id: number | string;
  image: StaticImageData;
}

const serviceData: PopularService[] = [
  { id: 1, image: image1 },
  { id: 2, image: image2 },
  { id: 3, image: image3 },
  { id: 4, image: image4 },
];

export const PopularService = (props: Props) => {
  return (
    <div className="py-14 flex flex-col gap-16 relative">
      <Headings title="Popular Services" className="text-center text-5xl" />
      <Swiper
        spaceBetween={20}
        loop={true}
        centeredSlides={true} // Centers the active slide
        slidesPerView={1} // Default for mobile
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2, spaceBetween: 20 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
          1200: { slidesPerView: 3.5, spaceBetween: 50 },
        }}
        pagination={{
          clickable: true, // Enables dot navigation
        }}
        modules={[Pagination]} 
        className="max-w-[90%] mx-auto"
      >
        {serviceData?.map((service) => (
          <SwiperSlide key={service?.id} className="flex justify-center">
            <div className="w-[300px] h-[350px] shadow-lg rounded-lg overflow-hidden">
              <Image
                src={service.image}
                alt="service"
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
