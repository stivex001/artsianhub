import React from "react";
import Image from "next/image";
import image1 from "@/components/assets/images/port.png";
import { FaComments } from "react-icons/fa";

type Props = {};

export const ArtisanProfile = (props: Props) => {
  const artisanInfo = {
    name: "Kate Adam",
    profession: "Tailor",
    yearsOfExperience: "10 Years",
    serviceArea: "Chesterfield",
    workDay: "Monday - Friday",
    workTime: "8am - 4pm",
    charges: "$15/hr",
    languages: "American English, Spanish, Indian",
    bio: "Always at your service",
  };

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
                src={image1}
                alt={artisanInfo.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Artisan Details */}
          <div className="w-full md:w-2/3">
            <h2 className="text-primary text-3xl md:text-4xl font-medium mb-6">
              {artisanInfo.name}
            </h2>

            <div className=" gap-y-4">
              <div className="flex gap-12">
                <span className="text-primary font-semibold w-48">
                  Profession:
                </span>
                <span className="font-light text-black text-2xl">
                  {artisanInfo.profession}
                </span>
              </div>
              <div className="flex gap-12">
                <span className="text-primary font-semibold w-48">
                  Years of Experience:
                </span>
                <span className="font-light text-black text-2xl">
                  {artisanInfo.yearsOfExperience}
                </span>
              </div>
              <div className="flex gap-12">
                <span className="text-primary font-semibold w-48">
                  Service Area:
                </span>
                <span className="font-light text-black text-2xl">
                  {artisanInfo.serviceArea}
                </span>
              </div>
              <div className="flex gap-12">
                <span className="text-primary font-semibold w-48">
                  Work Day:
                </span>
                <span className="font-light text-black text-2xl">
                  {artisanInfo.workDay}
                </span>
              </div>
              <div className="flex gap-12">
                <span className="text-primary font-semibold w-48">
                  Work Time:
                </span>
                <span className="font-light text-black text-2xl">
                  {artisanInfo.workTime}
                </span>
              </div>
              <div className="flex gap-12">
                <span className="text-primary font-semibold w-48">
                  Charges:
                </span>
                <span className="font-light text-black text-2xl">
                  {artisanInfo.charges}
                </span>
              </div>
              <div className="flex gap-12">
                <span className="text-primary font-semibold w-48">
                  Language:
                </span>
                <span className="font-light text-black text-2xl">
                  {artisanInfo.languages}
                </span>
              </div>
              <div className="flex gap-12">
                <span className="text-primary font-semibold w-48">
                  Brief about the Artisans:
                </span>
                <span className="font-light text-black text-2xl">
                  {artisanInfo.bio}
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
