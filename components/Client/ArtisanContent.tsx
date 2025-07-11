import React from "react";
import { MapIcon } from "../assets/icons/UsersIcon";
import { CustomButton } from "../clickable/CustomButton";

type Props = {
  artisan: any;
};

const renderStars = (rating: any) => {
  return Array.from({ length: 1 }, (_, index) => (
    <span
      key={index}
      className={index < rating ? "text-yellow-400" : "text-gray-300"}
    >
      ★
    </span>
  ));
};

export const ArtisanContent = ({ artisan }: Props) => {
  return (
    <div className="my-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="aspect-square bg-gray-100 relative mb-4">
              <img
                src={artisan?.image}
                alt={artisan?.name}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="">
              <h1 className="text-3xl font-bold text-gray-900">
                {artisan?.name}
              </h1>
              <p className="text-bodt text-sm mb-2">{artisan?.profession}</p>

              <div className="flex items-center gap-0.5 mb-2">
                <MapIcon />
                <span className="text-body text-sm font-medium">
                  {artisan?.location}
                </span>
              </div>

              <div className="flex items-center mb-2">
                <div className="flex items-center mr-1">
                  {renderStars(artisan?.rating)}
                </div>
                <span className="text-sm text-body font-medium">
                  {artisan?.rating}({artisan?.reviews})
                </span>
              </div>

              <div className="text-base font-bold text-paragrah mb-5">
                ${artisan?.hourlyRate}/hr
              </div>
              <CustomButton
                label="Contact Artisan"
                type="button"
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm">
            {/* Tabs */}
            <nav className="flex space-x-4 px-6">
              <button className="py-4 px-1 border-b-2 border-blue-600 text-blue-600 font-medium">
                About
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Portfolio
              </button>
              <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Ratings & Review
              </button>
            </nav>

            {/* Content */}
            <div className="p-6">
              {/* About Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  About This Artisan
                </h2>
                <div className="prose prose-gray max-w-none">
                  {artisan?.about
                    ?.split("\n\n")
                    .map((paragraph: any, index: number) => (
                      <p
                        key={index}
                        className="mb-4 text-gray-700 leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                </div>
              </div>

              {/* Services Section */}
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Services Offered
                </h2>
                <div className="flex flex-wrap gap-2">
                  {artisan?.services.map((service: any, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
