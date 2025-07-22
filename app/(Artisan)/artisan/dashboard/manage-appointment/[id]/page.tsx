"use client";
import React from "react";
import ArtisanBreadCrumbs from "@/components/Artisan/portfolio/BreadCrumbs";
import Wrapper from "@/components/shared/Wrapper";
import Image from "next/image";
import { useParams } from "next/navigation";
import { sampleData } from "@/components/Artisan/manageAppointment/data";
import { MapIcon } from "@/components/assets/icons/UsersIcon";

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-orange-100 text-orange-600";
    case "accepted":
      return "bg-green-100 text-green-600";
    case "declined":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

type Props = {
  appointment?: {
    artisan: {
      name: string;
      profileImage: string;
      location: string;
    };
    status: string;
    description: string;
    preferredDateTime: string;
    location: string;
    attachedImages: string[];
    mapUrl?: string;
  };
};

const AppointmentDetails = ({}: Props) => {
  const params = useParams();
  const id = params.id;
  const appointment = sampleData?.find((art) => String(art?.id) === String(id));

  return (
    <main className="flex flex-col gap-5">
      <ArtisanBreadCrumbs
        title="Appointment"
        url="/artisan/dashboard/manage-appointment"
        desc="Appointment Detail"
      />
      <Wrapper className=" ">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section - Artisan Profile */}
          <div className="lg:w-80  flex flex-col">
            <div className="w-full h-[300px] rounded-2xl overflow-hidden mb-4">
              <Image
                src={appointment?.photo ?? ""}
                alt={appointment?.clientName ?? ""}
                className="w-full h-full object-cover"
                width={320}
                height={300}
              />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {appointment?.clientName}
            </h2>

            <div className="flex items-center text-gray-600 mb-4">
              <MapIcon />
              <span className="text-sm">{appointment?.location}</span>
            </div>

            <div className="flex gap-3 w-full">
              <button className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                Accept
              </button>
              <button className="flex-1 bg-white text-gray-700 py-3 px-6 rounded-xl font-medium border border-gray-300 hover:bg-gray-50 transition-colors">
                Decline
              </button>
            </div>
          </div>

          {/* Right Section - Job Details */}
          <div className="flex-1  space-y-6">
            {/* Job Status */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Job Status
              </h3>
              <span
                className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  appointment?.status ?? ""
                )}`}
              >
                {appointment?.status}
              </span>
            </div>

            {/* Job Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Job Description
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                {appointment?.description}
              </p>
            </div>

            {/* Preferred Date and Time */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Preferred Date and Time
              </h3>
              <p className="text-gray-700 text-sm">
                {appointment?.preferredDateTime}
              </p>
            </div>

            {/* Location */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Location
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                {appointment?.location}
              </p>

              {/* Map */}
              <div className="w-full h-48 bg-gray-200 rounded-xl overflow-hidden">
                <img
                  src={appointment?.mapUrl}
                  alt="Location map"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Attached Images */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Attached Images
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {appointment?.attachedImages.map((image, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-gray-200 rounded-xl overflow-hidden"
                  >
                    <img
                      src={image}
                      alt={`Attachment ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default AppointmentDetails;
