"use client";
import { MapIcon } from "@/components/assets/icons/UsersIcon";
import Image from "next/image";
import React, { useState } from "react";
import { DeclineModal } from "./DeclineModal";

type Props = {
  appointment: any;
};

export const ClientInfo = ({ appointment }: Props) => {
  const [isModalDesclineOpen, setIsModalDeclineOpen] = useState(false);
  const closeModal = () => setIsModalDeclineOpen(false);

  return (
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
        <button
          onClick={() => setIsModalDeclineOpen(true)}
          className="flex-1 bg-white text-gray-700 py-3 px-6 rounded-xl font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Decline
        </button>
      </div>
      <DeclineModal
        isOpen={isModalDesclineOpen}
        onClose={closeModal}
        // id={item?._id}
        // refetch={refetch}
      />
    </div>
  );
};
