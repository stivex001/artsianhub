import { MapIcon } from "@/components/assets/icons/UsersIcon";
import { useState } from "react";
import { JobDetailModal } from "./JobDetailModal";
import { StatusBadge } from "@/components/shared/StatusBadge";

export const AppointmentCard = ({ appointment }: { appointment: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      onClick={() => setIsModalOpen(true)}
      className="bg-white border border-gray-200 rounded-3xl p-5 hover:shadow-shadowHover transition-shadow cursor-pointer"
    >
      <StatusBadge status={appointment?.status} />

      {/* Title */}
      <h3 className="text-xl font-bold text-paragrah mt-3 mb-1">
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
