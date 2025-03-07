"use client";
import { Headings } from "@/components/shared/Headings";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import image1 from "@/components/assets/images/people.png";
import Image, { StaticImageData } from "next/image";
import { BackIcon, ForwardIcon } from "@/components/assets/icons/ArtsIcons";

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
        spaceBetween={20}
        navigation={{ prevEl: ".prev-button", nextEl: ".next-button" }}
        loop={true}
        className="mySwiper relative"
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
        }}
        centeredSlides={true}
        pagination={true}
        modules={[Pagination, Navigation]}
      >
        {serviceData?.map((service) => (
          <SwiperSlide key={service?.id}>
            <section className="w-[300px] h-[350px] ">
              <Image
                src={service?.image}
                alt="service"
                width={300}
                height={350}
                className="w-full h-full object-cover rounded-[10px]"
              />
            </section>
          </SwiperSlide>
        ))}
        <div className="prev-button cursor-pointer absolute bottom-[0%] lg:left-[40%] left-[20%] z-[1000]">
            <BackIcon />
          </div>
          <div className="next-button cursor-pointer absolute bottom-[0%] lg:right-[40%] right-[20%] z-[1000]">
            <ForwardIcon />
          </div>
      </Swiper>
    </div>
  );
};
