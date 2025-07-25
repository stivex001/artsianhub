import { MapIcon } from "@/components/assets/icons/UsersIcon";
import { useState } from "react";
import { JobDetailModal } from "./JobDetailModal";

const getStatusConfig = (status: string) => {
  switch (status) {
    case "pending":
      return {
        label: "Pending",
        bgColor: "bg-orange-50",
        textColor: "text-orange-600",
        borderColor: "border-orange-200",
      };
    case "inprogress":
      return {
        label: "In Progress",
        bgColor: "bg-blue-50",
        textColor: "text-blue-600",
        borderColor: "border-blue-200",
      };
    case "cancelled":
      return {
        label: "Cancelled (Client)",
        bgColor: "bg-gray-50",
        textColor: "text-gray-600",
        borderColor: "border-gray-200",
      };
    case "declined":
      return {
        label: "Declined",
        bgColor: "bg-red-50",
        textColor: "text-red-600",
        borderColor: "border-red-200",
      };
    default:
      return {
        label: status,
        bgColor: "bg-gray-50",
        textColor: "text-gray-600",
        borderColor: "border-gray-200",
      };
  }
};

export const AppointmentCard = ({ appointment }: { appointment: any }) => {
  const statusConfig = getStatusConfig(appointment.status);
  const [isModalOpen, setIsModalOpen] = useState(false);

   const closeModal = () => setIsModalOpen(false);

  return (
    <div
      onClick={() => setIsModalOpen(true)}
      className="bg-white border border-gray-200 rounded-3xl p-5 hover:shadow-shadowHover transition-shadow cursor-pointer"
    >
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-3">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bgColor} ${statusConfig.textColor} ${statusConfig.borderColor} border`}
        >
          {statusConfig.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-paragrah mb-1">
        {appointment.title}
      </h3>

      {/* Date */}
      <p className="text-sm text-body mb-2">{appointment.date}</p>

      {/* Location */}
      <div className="flex items-center gap-1 mb-3">
        <MapIcon />
        <span className="text-sm text-body font-medium">
          {appointment.location}
        </span>
      </div>

      {/* Client */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {appointment.client.name
              .split(" ")
              .map((n: any) => n[0])
              .join("")}
          </span>
        </div>
        <span className="text-base text-paragrah font-medium">
          {appointment.client.name}
        </span>
      </div>
      <JobDetailModal
        item={appointment}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};
