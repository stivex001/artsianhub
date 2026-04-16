"use client";
import { ArtisanDetails, useArtisans } from "@/apis/crud/artisans";
import React from "react";
import SkeletonLoader from "../shared/SkeletonModal";
import { useAppointments } from "@/apis/crud/appointments";

type Props = {
  selectedArtisan: any;
};

type CountProps = {
  title: string;
  count: any;
};

type DetailsProps = {
  title: string;
  desc: string;
};
export const Count = ({ title, count }: CountProps) => {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <h1 className="text-base text-[#437AB4]">{title}</h1>
      <h1 className="text-4xl text-primary">{count}</h1>
    </div>
  );
};

export const Details = ({ title, desc }: DetailsProps) => {
  return (
    <div className="flex flex-col  items-start gap-1">
      <h1 className="text-base text-[#437AB4]">{title}</h1>
      <h1 className="text-xs text-[#5691D1]">{desc}</h1>
    </div>
  );
};

export const General = ({ selectedArtisan }: Props) => {
  const { getBookingCount } = useAppointments();

  const { data: total_appointments, isLoading } = getBookingCount();

  const counts = total_appointments?.counts;

  return (
    <section className="flex flex-col gap-6">
      <div className="">
        <div className="px-3">
          <h1 className="text-2xl text-primary ">Overview</h1>
          <div className="w-full border border-primary mt-3 mb-1 px-1" />
        </div>
        <div className="bg-[#E1E7EE] rounded-[10px] py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {isLoading ? (
              <SkeletonLoader type="card" count={4} bgColor="bg-secondary" />
            ) : (
              <>
                <Count title="Service Count" count={counts?.total} />
                <Count title="Service Accepted" count={counts?.accepted} />
                <Count title="Service Declined" count={counts?.declined} />
                <Count
                  title="Total Completed Service"
                  count={counts?.completed}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* profile */}
      <div className="">
        <div className="px-3">
          <h1 className="text-2xl text-primary ">Profile</h1>
          <div className="w-full border border-primary mt-3 mb-1 px-1" />
        </div>
        <div className="bg-[#E1E7EE] rounded-[10px] py-5">
          <div className="max-w-4xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            <Details title="Surname" desc={selectedArtisan?.user?.lastName} />
            <Details
              title="First Name"
              desc={selectedArtisan?.user?.firstName}
            />
            <Details title="Gender" desc={selectedArtisan?.user?.gender} />
            <Details
              title="Email Address"
              desc={selectedArtisan?.user?.email}
            />
            <Details
              title="Phone Number"
              desc={selectedArtisan?.user?.phoneNumber}
            />
            <Details
              title="Date of BIrth"
              desc={selectedArtisan?.user?.dateOfBirth}
            />
            <Details
              title="Region of Operation"
              desc={selectedArtisan?.user?.residentialAddress}
            />
            <Details
              title="Residential Address"
              desc={selectedArtisan?.user?.residentialAddress}
            />
            <Details
              title="Specification"
              desc={selectedArtisan?.user?.specialization}
            />
            <Details
              title="Language"
              desc={selectedArtisan?.languagesSpoken?.join(",")}
            />
            <Details
              title="Work Day/hours"
              desc={selectedArtisan?.workAvailability?.days?.join(", ")}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
