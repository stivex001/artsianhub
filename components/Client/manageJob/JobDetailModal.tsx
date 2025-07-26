import { MapIcon } from "@/components/assets/icons/UsersIcon";
import { CustomButton } from "@/components/clickable/CustomButton";
import { BaseModal } from "@/components/shared/BaseModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { renderStars } from "@/utils/RenderRatings";
import Image from "next/image";
import React from "react";

type Props = {
  item: any;
  isOpen: boolean;
  onClose: () => void;
};

export const JobDetailModal = ({ isOpen, onClose, item }: Props) => {
  const jobData = item;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className=" bg-white !rounded-2xl overflow-y-auto no-scrollbar !max-h-[90vh] border-none shadow-none !max-w-[600px]"
      title="Job Details"
      footer={
        <div className=" flex items-center justify-end gap-5">
          <CustomButton
            label="Cancel Request"
            type="button"
            className="w-fit"
            onClick={onClose}
            variant="transparent"
          />
          <CustomButton
            label="Reschedule Request"
            type="button"
            className="w-fit"
            // onClick={() => setIsModalContactOpen(true)}
          />
        </div>
      }
    >
      <section className="px-5 space-y-6">
        <div className="flex flex-col gap-5">
          <div className="w-full flex items-center">
            <label className="w-[20%] text-sm font-medium text-paragrah ">
              Job Title
            </label>
            <p className="w-[75%] text-sm font-medium text-paragrah">
              {jobData?.title}
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
              {jobData?.date}
            </p>
          </div>
          <div className="w-full flex items-center">
            <label className="w-[20%] text-sm font-medium text-paragrah ">
              Location
            </label>
            <div className="w-[75%] flex items-center gap-1 text-sm font-medium text-paragrah">
              <MapIcon />
              <p>{jobData.location}</p>
            </div>
          </div>
          <div className="w-full flex items-center">
            <label className="w-[20%] text-sm font-medium text-paragrah ">
              Service
            </label>
            <p className="w-[75%] text-sm font-medium text-paragrah">
              {jobData.serviceDate}
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
          {jobData?.attachments && jobData?.attachments.length > 0 && (
            <div>
              <label className="text-sm font-medium text-paragrah  mb-2">
                Attachments
              </label>
              <div className="grid grid-cols-4 gap-2.5">
                {jobData?.attachments?.map(
                  (attachment: string, index: number) => (
                    <div
                      key={index}
                      className="aspect-video relative rounded-xl overflow-hidden bg-[#F9F9FB] cursor-pointer hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={attachment}
                        alt={`Attachment ${index + 1}`}
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Artisan Info */}
          <div>
            <label className="text-sm font-medium text-paragrah mb-2">
              Artisan Info
            </label>
            <div className="flex items-center gap-4 p-0.5 max-h-[126px]">
              <div className="w-[120px] h-[120px] bg-[#D9D9D9] rounded-2xl">
                <Image
                  src={jobData?.artisanInfo?.avatar}
                  alt=""
                  width={100}
                  height={100}
                  className="w-full h-full rounded-2xl object-cover"
                />
              </div>
              <div className="">
                <p className="text-base font-bold text-paragrah">
                  {jobData?.artisanInfo?.name}
                </p>
                <span className="text-body text-sm ">
                  {jobData?.artisanInfo?.professionalTitle}
                </span>

                <div className="flex items-center gap-0.5">
                  <MapIcon />
                  <span className="text-body text-sm font-medium">
                    {jobData?.artisanInfo?.primaryLocation}
                  </span>
                </div>

                <div className="flex items-center ">
                  <div className="flex items-center mr-1">
                    {renderStars(jobData?.rating)}
                  </div>
                  <span className="text-sm text-body font-medium">
                    {jobData?.artisanInfo?.rating}({jobData?.completedJobs})
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
    </BaseModal>
  );
};
