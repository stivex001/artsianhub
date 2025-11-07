"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Quote } from "lucide-react";

// Import Swiper styles
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
      "My experience with ArtisansHub has been incredible. As a content creator, I’ve gained access to genuine clients and consistent projects through the platform. It’s a brilliant initiative helping creatives like me showcase our skills and build sustainable careers.",
  },
  {
    id: "2",
    name: "Stephen Adeyemo",
    role: "Software Engineer",
    avatar:
      "https://artisanshub.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdk6wshewb%2Fimage%2Fupload%2Fv1756226320%2Fmenseyhub_profile_pictures%2Fflnlhnyulh2rkjkba9gz.jpg&w=1920&q=75",
    testimonial:
      " I’ve found several jobs through ArtisansHub, and the experience has been smooth every time. The clients are genuine, communication is easy, and payments are fair. I’m glad I joined!",
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    role: "Heritage Home Owner",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    testimonial:
      " Shoutout to ArtisansHub for making my life easier!  I got connected to a really skilled artisan who did an amazing job. Love how easy it was to use the platform definitely recommending it to everyone I know.",
  },
  {
    id: "4",
    name: "David Park",
    role: "Leather Craftsman",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    testimonial:
      "ArtisansHub gave me the exposure I needed to take my leather crafting business to the next level. The platform is intuitive and the community is supportive.",
  },
  {
    id: "5",
    name: "SAMUEL FOLASAYO",
    role: "𝐓𝐞𝐜𝐡𝐧𝐢𝐜𝐚𝐥 𝐏𝐫𝐨𝐝𝐮𝐜𝐭 𝐌𝐚𝐧𝐚𝐠𝐞𝐫",
    avatar:
      "https://artisanshub.org/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdk6wshewb%2Fimage%2Fupload%2Fv1756617528%2Fmenseyhub_profile_pictures%2Fht5yk1cnbsjf2e0eijfs.jpg&w=1920&q=75",
    testimonial:
      " ArtisansHub really helped me find a trustworthy artisan when I needed one urgently. Great service, fast response, and excellent work. Highly recommend",
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
    <section className={`${backgroundColor} py-20 px-4 text-center`}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">{subtitle}</p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
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
                ? {
                    delay: 5000,
                    disableOnInteraction: false,
                  }
                : false
            }
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: slidesPerView,
                spaceBetween: 24,
              },
            }}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 text-left h-full">
                  {/* Quote Icon */}
                  <div className="mb-6">
                    <Quote className="w-8 h-8 text-blue-600 opacity-60" />
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-base leading-relaxed mb-8 italic">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                      onError={(e) => {
                        e.currentTarget.src = `https://ui-avatars.com/api/?name=${testimonial.name}&background=3b82f6&color=fff&size=48`;
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors duration-200 z-10">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-blue-600 transition-colors duration-200 z-10">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Custom Pagination Styles */}
      <style jsx>{`
        .testimonials-swiper .swiper-pagination {
          bottom: -50px;
        }

        .swiper-pagination-bullet-custom {
          width: 12px;
          height: 12px;
          background: #d1d5db;
          opacity: 1;
          margin: 0 6px;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active-custom {
          background: #3b82f6;
          transform: scale(1.2);
        }

        .testimonials-swiper {
          padding-bottom: 60px;
        }
      `}</style>
    </section>
  );
};

export default Review;
