"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  testimonial: string;
}

interface ReviewProps {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
  backgroundColor?: string;
  autoplay?: boolean;
  slidesPerView?: number;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Hope Motunrayo",
    role: "Content Creator",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=64&h=64&fit=crop&crop=face",
    testimonial:
      "My experience with ArtisansHub has been incredible. As a content creator, I've gained access to genuine clients and consistent projects through the platform. It's a brilliant initiative helping creatives like me showcase our skills and build sustainable careers.",
  },
  {
    id: "2",
    name: "Stephen Adeyemo",
    role: "Software Engineer",
    avatar:
      "https://artisanshub.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdk6wshewb%2Fimage%2Fupload%2Fv1756226320%2Fmenseyhub_profile_pictures%2Fflnlhnyulh2rkjkba9gz.jpg&w=1920&q=75",
    testimonial:
      "I've found several jobs through ArtisansHub, and the experience has been smooth every time. The clients are genuine, communication is easy, and payments are fair. I'm glad I joined!",
  },
  {
    id: "5",
    name: "SAMUEL FOLASAYO",
    role: "Technical Product Manager",
    avatar:
      "https://artisanshub.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdk6wshewb%2Fimage%2Fupload%2Fv1756617528%2Fmenseyhub_profile_pictures%2Fht5yk1cnbsjf2e0eijfs.jpg&w=1920&q=75",
    testimonial:
      "ArtisansHub really helped me find a trustworthy artisan when I needed one urgently. Great service, fast response, and excellent work. Highly recommend.",
  },
];

const Review: React.FC<ReviewProps> = ({
  title = "What Our Community Is Saying",
  subtitle = "Hear from happy customers and artisans who are part of our growing community.",
  testimonials = defaultTestimonials,
  backgroundColor = "bg-gray-50",
  autoplay = true,
  slidesPerView = 3,
}) => {
  return (
    <section className={`${backgroundColor} py-20 px-4 text-center overflow-hidden`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">{subtitle}</p>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.15 }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              prevEl: ".swiper-button-prev-custom",
              nextEl: ".swiper-button-next-custom",
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet-custom",
              bulletActiveClass: "swiper-pagination-bullet-active-custom",
            }}
            autoplay={
              autoplay
                ? { delay: 5000, disableOnInteraction: false }
                : false
            }
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: slidesPerView, spaceBetween: 24 },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-left h-full border border-gray-100">
                  {/* Quote + Stars */}
                  <div className="flex items-center justify-between mb-5">
                    <Quote className="w-7 h-7 text-blue-500 opacity-70" />
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.testimonial}&rdquo;
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center pt-4 border-t border-gray-100">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover mr-3 ring-2 ring-blue-100"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=3b82f6&color=fff&size=48`;
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors duration-200 z-10 border border-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors duration-200 z-10 border border-gray-100">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </motion.div>
      </div>

      <style jsx>{`
        .testimonials-swiper .swiper-pagination {
          bottom: -50px;
        }
        .swiper-pagination-bullet-custom {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          margin: 0 5px;
          border-radius: 9999px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active-custom {
          background: #3b82f6;
          width: 24px;
          transform: none;
        }
        .testimonials-swiper {
          padding-bottom: 60px;
        }
      `}</style>
    </section>
  );
};

export default Review;
