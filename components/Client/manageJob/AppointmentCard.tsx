import { MapIcon } from "@/components/assets/icons/UsersIcon";
import { useState } from "react";
import { JobDetailModal } from "./JobDetailModal";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

type AppointmentProps = {
  appointment:any
  refetch:() => void
}

export const AppointmentCard = ({ appointment, refetch }:AppointmentProps) => {
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
        {appointment?.artisanId?.professionalTitle}
      </h3>

      {/* Date */}
      <p className="text-sm text-body mb-2">
        {formatDate(appointment?.preferredDate)} {appointment?.preferredTime}
      </p>

      {/* Location */}
      <div className="flex items-center gap-1 mb-3">
        <MapIcon />
        <span className="text-sm text-body font-medium">
          {appointment?.location}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-100 rounded-full object-cover flex items-center justify-center">
          <Image
            src={appointment?.artisanId?.profilePicture}
            alt="artisan"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-base text-paragrah font-medium">
          {appointment?.artisanId?.firstName} {appointment?.artisanId?.lastName}
        </span>
      </div>
      <JobDetailModal
        item={appointment}
        isOpen={isModalOpen}
        onClose={closeModal}
        refetch={refetch}
      />
    </div>
  );
};
