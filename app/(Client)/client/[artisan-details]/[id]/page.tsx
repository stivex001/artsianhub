"use client"
import { artisans } from "@/components/Client/data";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";



type Props = {
  artisanId?: string;
};

const ArtisanDetails = ({ artisanId }: Props) => {
  const params = useParams();
  const id = params.id;
  const artisan = artisans.find((art) => String(art?.id) === String(id));

  const renderStars = (rating: any) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={index < rating ? "text-yellow-400" : "text-gray-300"}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen ">
      {/* Breadcrumbs */}
      <nav className="bg-white px-4 py-3">
        <div className="">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href='/client' className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <span>{`>`}</span>
            <button className="hover:text-blue-600 transition-colors capitalize">
              {artisan?.profession}s
            </button>
            <span>{`>`}</span>
            <span className="text-gray-900 font-medium">{artisan?.name}</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden sticky top-4">
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={artisan?.image}
                  alt={artisan?.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>

              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {artisan?.name}
                </h1>
                <p className="text-gray-600 mb-4">{artisan?.profession}</p>

                <div className="flex items-center mb-4">
                  <svg
                    className="w-4 h-4 text-gray-500 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-600">{artisan?.location}</span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-2">
                    {renderStars(artisan?.rating)}
                  </div>
                  <span className="text-sm text-gray-600">
                    {artisan?.rating}({artisan?.reviews})
                  </span>
                </div>

                <div className="text-2xl font-bold text-gray-900 mb-6">
                  ${artisan?.hourlyRate}/hr
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Contact Artisan
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
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
              </div>

              {/* Content */}
              <div className="p-6">
                {/* About Section */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    About This Artisan
                  </h2>
                  <div className="prose prose-gray max-w-none">
                    {artisan?.about?.split("\n\n").map((paragraph, index) => (
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
                    {artisan?.services.map((service, index) => (
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
    </div>
  );
};

export default ArtisanDetails;
