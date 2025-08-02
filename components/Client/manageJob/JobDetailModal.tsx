"use client";
import { MapIcon } from "@/components/assets/icons/UsersIcon";
import { BaseModal } from "@/components/shared/BaseModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Image from "next/image";
import React, { useState } from "react";
import { JobActionButtons } from "./JobActionButtons";
import { formatDate } from "@/utils/formatDate";
import { CancelModal } from "@/components/Artisan/manageAppointment/CancelModal";

type Props = {
  item: any;
  isOpen: boolean;
  onClose: () => void;
  refetch: () => void;
};

export const JobDetailModal = ({ isOpen, onClose, item, refetch }: Props) => {
  const jobData = item;
  const [isModalCancelOpen, setIsModalCanceleOpen] = useState(false);

  const handleCancelAppointment = () => {
    setIsModalCanceleOpen(true);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className=" bg-white !rounded-2xl overflow-y-auto no-scrollbar !max-h-[90vh] border-none shadow-none !max-w-[600px]"
      title="Job Details"
      footer={
        <JobActionButtons
          status={jobData?.status}
          onCancel={handleCancelAppointment}
          onReschedule={() => console.log("Reschedule clicked")}
          onMarkNoShow={() => console.log("No show clicked")}
          onMarkCompleted={() => console.log("Completed clicked")}
        />
      }
    >
      <section className="px-5 space-y-6">
        <div className="flex flex-col gap-5">
          <div className="w-full flex items-center">
            <label className="w-[20%] text-sm font-medium text-paragrah ">
              Job Title
            </label>
            <p className="w-[75%] text-sm font-medium text-paragrah">
              {jobData?.artisanId?.professionalTitle}
            </p>
          </div>
          <div className="w-full flex items-center">
            <label className="w-[20%] text-sm font-medium text-paragrah ">
              Status
            </label>

            <StatusBadge status={jobData?.status} />
          </div>
          <div className="w-full flex items-center">
            <label className="w-[20%] text-sm font-medium text-paragrah ">
              Service Date
            </label>
            <p className="w-[75%] text-sm font-medium text-paragrah">
              {formatDate(jobData?.preferredDate)} {jobData?.preferredTime}
            </p>
          </div>
          <div className="w-full flex items-center">
            <label className="w-[20%] text-sm font-medium text-paragrah ">
              Location
            </label>
            <div className="w-[75%] flex items-center gap-1 text-sm font-medium text-paragrah">
              <MapIcon />
              <p>{jobData?.location}</p>
            </div>
          </div>
          <div className="w-full flex items-center">
            <label className="w-[20%] text-sm font-medium text-paragrah ">
              Service
            </label>
            <p className="w-[75%] text-sm font-medium text-paragrah">
              {jobData?.serviceCategories?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {jobData?.serviceCategories?.map((service: any) => (
                    <span
                      key={service?._id}
                      className="px-3 py-2 bg-[#1129A00D] text-body rounded-[20px] text-xs font-medium"
                    >
                      {service?.name}
                    </span>
                  ))}
                </div>
              )}
            </p>
          </div>

          {/* Job Description */}
          <div>
            <label className="text-sm font-medium text-paragrah  mb-2">
              Job Description
            </label>
            <div className="text-body text-sm leading-relaxed whitespace-pre-line">
              {jobData?.description}
            </div>
          </div>

          {/* Attachments */}
          {jobData?.images && jobData?.images?.length > 0 ? (
            <div>
              <label className="text-sm font-medium text-paragrah  mb-2">
                Attachments
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {jobData?.images?.map((attachment: any, index: number) => (
                  <div
                    key={attachment?._id}
                    className="w-full h-[150px] relative rounded-xl overflow-hidden bg-[#F9F9FB] cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={attachment?.url}
                      alt={`Attachment ${index + 1}`}
                      fill
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center mt-5">
              {" "}
              There are no images Attched
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-paragrah mb-2">
              Artisan Info
            </label>
            <div className="flex items-center gap-4 p-0.5 max-h-[126px]">
              <div className="w-[120px] h-[120px] bg-[#D9D9D9] rounded-2xl">
                {jobData?.artisanId?.profilePicture ? (
                  <Image
                    src={jobData?.artisanId?.profilePicture}
                    alt=""
                    width={100}
                    height={100}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-base font-bold text-gray-600">
                    {jobData?.artisanId?.firstName?.charAt(0)?.toUpperCase()}
                    {jobData?.artisanId?.lastName?.charAt(0)?.toUpperCase()}
                  </div>
                )}
              </div>
              <div className="">
                <p className="text-base font-bold text-paragrah">
                  {jobData?.artisanId?.firstName} {jobData?.artisanId?.lastName}
                </p>
                <span className="text-body text-sm ">
                  {jobData?.artisanId?.professionalTitle}
                </span>

                <div className="flex items-center gap-0.5">
                  <MapIcon />
                  <span className="text-body text-sm font-medium">
                    {jobData?.artisanInfo?.primaryLocation}
                  </span>
                </div>

                <div className="flex items-center ">
                  <div className="flex items-center gap-1">
                    <svg
                      className="w-4 h-4 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">
                      {jobData?.artisanInfo?.rating || 1}
                    </span>
                  </div>
                  <span className="text-sm text-body font-medium">
                    ({jobData?.completedJobs || 0})
                  </span>
                </div>

                <div className="text-base font-bold text-paragrah ">
                  ${jobData?.artisanInfo?.pricePerHour}/hr
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CancelModal
        isOpen={isModalCancelOpen}
        onClose={() => {
          setIsModalCanceleOpen(false);
          onClose();
        }}
        id={item?._id}
        refetch={refetch}
        user="Client"
      />
    </BaseModal>
  );
};
