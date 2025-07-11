import React from "react";
import { MapPin, Star, Filter } from "lucide-react";
import Image from "next/image";

type Props = {};

// Mock data for artisans
const artisans = [
  {
    id: 1,
    name: "Funmilayo Saheed",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1494790108755-2616c6d32c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Available",
    availabilityColor: "bg-green-500"
  },
  {
    id: 2,
    name: "Adisa Osifa",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Unavailable",
    availabilityColor: "bg-gray-500"
  },
  {
    id: 3,
    name: "Keiko Sora",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Unavailable",
    availabilityColor: "bg-gray-500"
  },
  {
    id: 4,
    name: "Adebayo Osaze",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Available",
    availabilityColor: "bg-green-500"
  },
  {
    id: 5,
    name: "Ira Rishabh",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Unavailable",
    availabilityColor: "bg-gray-500"
  },
  {
    id: 6,
    name: "Harrison Patrick",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Available",
    availabilityColor: "bg-green-500"
  },
  {
    id: 7,
    name: "Serwaa Adoma",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Available",
    availabilityColor: "bg-green-500"
  },
  {
    id: 8,
    name: "Adisa Osifa",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Unavailable",
    availabilityColor: "bg-gray-500"
  },
  {
    id: 9,
    name: "Christophe Emile",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Available",
    availabilityColor: "bg-green-500"
  },
  {
    id: 10,
    name: "Serwaa Adoma",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Available",
    availabilityColor: "bg-green-500"
  },
  {
    id: 11,
    name: "Keiko Sora",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Unavailable",
    availabilityColor: "bg-gray-500"
  },
  {
    id: 12,
    name: "Alba Olga",
    profession: "Plumber",
    rating: 5.0,
    reviews: 91,
    location: "Chesterfield",
    hourlyRate: 30,
    image: "https://images.unsplash.com/photo-1494790108755-2616c6d32c1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80",
    availability: "Available",
    availabilityColor: "bg-green-500"
  }
];

export const ArtisanAroundYou = (props: Props) => {
  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Artisans Around You
            </h2>
            <p className="text-gray-600">Plumbers in London</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter size={18} className="text-gray-600" />
            <span className="text-gray-700 font-medium">Filter</span>
          </button>
        </div>

        {/* Artisan Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artisans.map((artisan) => (
            <div
              key={artisan.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative">
                <div className="aspect-square w-full overflow-hidden">
                  <img
                    src={artisan.image}
                    alt={artisan.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Availability Badge */}
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium text-white ${artisan.availabilityColor}`}
                  >
                    {artisan.availability}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Name and Rating */}
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                    {artisan.name}
                  </h3>
                  <div className="flex items-center gap-1 ml-2">
                    <Star size={14} className="text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-700">
                      {artisan.rating.toFixed(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({artisan.reviews})
                    </span>
                  </div>
                </div>

                {/* Profession */}
                <p className="text-gray-600 mb-3">{artisan.profession}</p>

                {/* Location */}
                <div className="flex items-center gap-1 mb-3">
                  <MapPin size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-600">{artisan.location}</span>
                </div>

                {/* Hourly Rate */}
                <div className="text-lg font-semibold text-gray-900">
                  £{artisan.hourlyRate}/hr
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {/* <div className="flex justify-center mt-10">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Load More Artisans
          </button>
        </div> */}
      </div>
    </section>
  );
};