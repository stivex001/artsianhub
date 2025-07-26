import { MapIcon } from "@/components/assets/icons/UsersIcon";
import { BaseModal } from "@/components/shared/BaseModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { MapPin, X } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  item: any;
  isOpen: boolean;
  onClose: () => void;
};

// Sample job data - replace with your actual data structure
const sampleJobData = {
  title: "Pipe Leak Repair",
  status: "Accepted",
  serviceDate: "Friday June 20, 2025 - 10am - 12pm",
  location: "Chesterfield",
  skills: ["Plumbing", "Piping"],
  description: `Hello. I have a leaking pipe under my kitchen sink that's causing water to spread across the cabinet floor. I'm not sure where the leak is coming from exactly, but it gets worse when I run the tap. I'd like someone to come take a look and fix it as soon as possible. The area is accessible, and I've already cleared the space under the sink. If replacement parts are needed, I'm happy to cover the cost — just let me know what's required after inspection.

I'm located in Chesterfield. I'm available tomorrow morning (June 25th) between 9 AM and 12 PM, or anytime on Wednesday.

Please contact me if you need more details. Thanks!`,
  attachments: [
    "/api/placeholder/150/100",
    "/api/placeholder/150/100",
    "/api/placeholder/150/100",
    "/api/placeholder/150/100",
  ],
  artisanInfo: {
    name: "John Smith",
    avatar: "/api/placeholder/40/40",
    rating: 4.8,
    completedJobs: 125,
  },
};

export const JobDetailModal = ({ isOpen, onClose, item }: Props) => {
  // Use item data if provided, otherwise use sample data
  const jobData = item || sampleJobData;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="p-5 bg-white !rounded-2xl overflow-y-auto no-scrollbar !max-h-[90vh] border-none shadow-none !max-w-[600px]"
      title="Job Details"
    >
      <section className="spce-y-6">
        <div className="flex flex-col gap-5">
          <div className="w-full flex items-center">
            <label className="w-[20%] text-sm font-medium text-paragrah ">
              Job Title
            </label>
            <p className="w-[75%] text-sm font-medium text-paragrah">
              {jobData.title}
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
              {jobData.serviceDate}
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
          {jobData.attachments && jobData.attachments.length > 0 && (
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
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">JS</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">John Smith</p>
                <p className="text-sm text-gray-600">
                  ★ 4.8 • 125 jobs completed
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel Request
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
            Reschedule Request
          </button>
        </div>
      </section>
    </BaseModal>
  );
};
