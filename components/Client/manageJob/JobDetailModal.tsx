import { BaseModal } from "@/components/shared/BaseModal";
import { MapPin, X } from "lucide-react";
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
    "/api/placeholder/150/100"
  ],
  artisanInfo: {
    name: "John Smith",
    avatar: "/api/placeholder/40/40",
    rating: 4.8,
    completedJobs: 125
  }
};

export const JobDetailModal = ({ isOpen, onClose, item }: Props) => {
  // Use item data if provided, otherwise use sample data
  const jobData = item || sampleJobData;

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "bg-green-50 text-green-700 border-green-200";
      case "pending":
        return "bg-orange-50 text-orange-700 border-orange-200";
      case "in progress":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "completed":
        return "bg-gray-50 text-gray-700 border-gray-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="p-0 bg-white !rounded-2xl overflow-hidden no-scrollbar !max-h-[90vh] border-none shadow-none !max-w-[600px]"
    >
      <div className="max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Job Details</h2>
          {/* <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button> */}
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Job Title */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Job Title
            </label>
            <p className="text-gray-900">{jobData.title}</p>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Status
            </label>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(jobData.status)}`}>
              {jobData.status}
            </span>
          </div>

          {/* Service Date */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Service Date
            </label>
            <p className="text-gray-900">{jobData.serviceDate}</p>
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Location
            </label>
            <div className="flex items-center gap-1 text-gray-900">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>{jobData.location}</span>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Skills
            </label>
            <div className="flex flex-wrap gap-2">
              {jobData.skills?.map((skill: string, index: number) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Job Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Job Description
            </label>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {jobData.description}
            </div>
          </div>

          {/* Attachments */}
          {jobData.attachments && jobData.attachments.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-2">
                Attachments
              </label>
              <div className="grid grid-cols-4 gap-3">
                {jobData.attachments.map((attachment: string, index: number) => (
                  <div
                    key={index}
                    className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={attachment}
                      alt={`Attachment ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artisan Info */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Artisan Info
            </label>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  JS
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">John Smith</p>
                <p className="text-sm text-gray-600">★ 4.8 • 125 jobs completed</p>
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
      </div>
    </BaseModal>
  );
};