"use client";
import { Headings } from "@/components/shared/Headings";
import React from "react";
import image1 from "@/components/assets/images/people.png";
import Image, { StaticImageData } from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Navigation } from "swiper/modules";

type Props = {};
interface PopularService {
  id: number | string;
  image: StaticImageData;
}

const serviceData: PopularService[] = [
  {
    id: 1,
    image: image1,
  },
  {
    id: 2,
    image: image1,
  },
  {
    id: 3,
    image: image1,
  },
];

export const PopularService = (props: Props) => {
  return (
    <div className="py-14 flex flex-col gap-16">
      <Headings title="Popular Services" className="text-center text-5xl" />
      <Swiper
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="flex flex-col gap-5 w-full h-full"
        pagination={true}
        modules={[Pagination]}
      
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  );
};
