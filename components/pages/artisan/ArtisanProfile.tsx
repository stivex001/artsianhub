import React from "react";
import Image from "next/image";
import { FaComments } from "react-icons/fa";
import { ArtisanDetails } from "@/api/crud/artisans";

type Props = {
  selectedArtisan: any;
};

export const ArtisanProfile = ({ selectedArtisan }: Props) => {
  return (
    <section className="bg-white py-14 px-4">
      <h1 className="text-primary text-4xl md:text-5xl lg:text-6xl font-semibold text-center mb-10 md:mb-[70px]">
        Artisan Profile
      </h1>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-24 mb-10">
          {/* Artisan Image */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="relative w-64 h-72 rounded-lg overflow-hidden bg-gray-200">
              <Image
                src={selectedArtisan?.profilePhoto?.url}
                alt={selectedArtisan?.user?.firstName}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Artisan Details */}
          <div className="w-full md:w-2/3">
            <h2 className="text-primary text-3xl md:text-4xl font-medium mb-6">
              {selectedArtisan?.user?.firstName}{" "}
              {selectedArtisan?.user?.lastName}
            </h2>

            <div className=" gap-y-4">
              <div className="flex">
                <span className="w-1/2 text-primary font-semibold">
                  Profession:
                </span>
                <span className="w- 1/2 font-light text-black text-xl">
                  {selectedArtisan?.specialization}
                </span>
              </div>
              <div className="flex">
                <span className="w-1/2 text-primary font-semibold">
                  Years of Experience:
                </span>
                <span className="w-1/2 font-light text-black text-xl">
                  {selectedArtisan?.yearsOfExperience}
                </span>
              </div>
              <div className="flex">
                <span className="text-primary font-semibold w-1/2">
                  Service Area:
                </span>
                <span className="w-1/2 font-light text-black text-xl">
                  {selectedArtisan?.user?.residentialAddress}
                </span>
              </div>
              <div className="flex">
                <span className=" text-primary font-semibold w-1/2">
                  Work Day:
                </span>
                <span className="w-1/2 font-light text-black text-xl">
                  {selectedArtisan?.workAvailability?.days?.join(", ")}
                </span>
              </div>
              <div className="flex">
                <span className="text-primary font-semibold w-1/2">
                  Work Time:
                </span>
                <span className="w-1/2 font-light text-black text-xl">
                  {selectedArtisan?.workAvailability?.availableHours}
                </span>
              </div>
              <div className="flex">
                <span className="text-primary font-semibold w-1/2">
                  Charges:
                </span>
                <span className="w-1/2 font-light text-black text-xl">
                  ${selectedArtisan?.servicePricing}
                </span>
              </div>
              <div className="flex">
                <span className="text-primary font-semibold w-1/2">
                  Language:
                </span>
                <span className="w-1/2 font-light text-black text-xl">
                  {selectedArtisan?.languagesSpoken?.join(",")}
                </span>
              </div>
              <div className="flex">
                <span className="text-primary font-semibold w-1/2">
                  Brief about the Artisans:
                </span>
                <span className="w-1/2 font-light text-black text-xl">
                  {selectedArtisan?.skillDescription}
                </span>
              </div>
            </div>

            {/* Chat Button */}
            {/* <div className="flex justify-end mt-10">
              <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-[10px] hover:bg-primary-dark transition-colors">
                <FaComments />
                <span className="text-sm font-semibold">Chat with Artisan</span>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};
