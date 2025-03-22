"use client"

import React, { useState } from "react";
import { Benefits } from "./Benefits";
import Image from "next/image";
import image1 from "@/components/assets/images/port.png";
import { FaQuoteRight, FaStar } from "react-icons/fa";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Props = {};

type TestimonialType = {
  id: number;
  text: string;
  name: string;
  image: any;
  rating: number;
};

export const Testimonial = (props: Props) => {
  const [activeIndex, setActiveIndex] = useState(1);
  
  // Sample testimonial data
  const testimonials: TestimonialType[] = [
    {
      id: 1,
      text: "Hear what they have to say about our professional services.",
      name: "John Smith",
      image: image1,
      rating: 3,
    },
    {
      id: 2,
      text: "Exceptional quality and attention to detail. I would highly recommend their services to anyone.",
      name: "Emma Johnson",
      image: image1,
      rating: 5,
    },
    {
      id: 3,
      text: "Very responsive and professional. Got the job done quickly and efficiently.",
      name: "Michael Brown",
      image: image1,
      rating: 4,
    },
  ];

  return (
    <section className="bg-secondary pt-24 pb-10 relative">
      <div className="w-full absolute -top-28 left-0 z-40">
        <Benefits />
      </div>
      <div className="mt-14 px-4">
        <h1 className="text-white text-2xl md:text-3xl max-w-2xl mx-auto text-center mb-16 md:mb-24">
          Hear from our clients, their thoughts on our services
        </h1>
        
        {/* Testimonial Carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={true}
            initialSlide={1}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1.5 },
              768: { slidesPerView: 1.8 },
              1024: { slidesPerView: 2.5 },
            }}
            pagination={{
              clickable: true,
              el: ".testimonial-pagination",
              bulletClass: "inline-block w-2 h-2 rounded-full bg-white/50 mx-1 cursor-pointer transition-all",
              bulletActiveClass: "bg-white w-3 h-3",
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={testimonial.id}>
                {({ isActive }) => (
                  <div 
                    className={`relative rounded-[10px] p-8 transition-all duration-300 mx-2 ${
                      isActive ? "bg-white" : "bg-blue-400"
                    }`}
                  >
                    {/* Quote icon */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <div className="relative">
                        <FaQuoteRight className="text-blue-300 text-5xl" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-px bg-blue-200"></div>
                      </div>
                    </div>
                    
                    {/* Testimonial text */}
                    <p className={`text-center mb-8 ${isActive ? "text-primary" : "text-white"}`}>
                      {testimonial.text}
                    </p>
                    
                    {/* Author info */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            layout="fill"
                            objectFit="cover"
                          />
                        </div>
                        <span className={`font-medium ${isActive ? "text-primary" : "text-white"}`}>
                          {testimonial.name}
                        </span>
                      </div>
                      
                      {/* Star rating */}
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-lg ${
                              i < testimonial.rating
                                ? "text-blue-900"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom pagination */}
          <div className="testimonial-pagination flex justify-center mt-10"></div>
        </div>
      </div>
    </section>
  );
};