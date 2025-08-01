"use client";
import { MapIcon } from "@/components/assets/icons/UsersIcon";
import Image from "next/image";
import React, { useState } from "react";
import { DeclineModal } from "./DeclineModal";
import { AcceptJobModal } from "./AcceptJobModal";
import { ClientInfoSkeleton } from "@/components/loader/ClientInfoSkeleton";

type Props = {
  appointment: any;
  isPending: boolean;
  refetch: any;
  id: any;
};

export const ClientInfo = ({ appointment, isPending, refetch, id }: Props) => {
  const [isModalDesclineOpen, setIsModalDeclineOpen] = useState(false);
  const [isModalAcceptOpen, setIsModalAcceptOpen] = useState(false);
  const closeModal = () => setIsModalDeclineOpen(false);

  if (isPending) return <ClientInfoSkeleton />;

  return (
    <div className="lg:w-80  flex flex-col">
      <div className="w-full h-[300px] rounded-2xl overflow-hidden mb-4">
        <Image
          src={appointment?.clientId?.profilePicture}
          alt={appointment?.clientId?.firstName}
          className="w-full h-full object-cover"
          width={320}
          height={300}
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {appointment?.clientId?.firstName} {appointment?.clientId?.lastName}
      </h2>

      <div className="flex text-gray-600 mb-4">
        <MapIcon />
        <span className="w-[90%] text-body text-sm leading-relaxed whitespace-pre-line">
          {appointment?.location}
        </span>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={() => setIsModalAcceptOpen(true)}
          className="flex-1 bg-primary text-white py-3 px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={() => setIsModalDeclineOpen(true)}
          className="flex-1 bg-white text-gray-700 py-3 px-6 rounded-xl font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
        >
          Decline
        </button>
      </div>
      <AcceptJobModal
        isOpen={isModalAcceptOpen}
        onClose={() => setIsModalAcceptOpen(false)}
        id={id}
        refetch={refetch}
      />
      <DeclineModal
        isOpen={isModalDesclineOpen}
        onClose={closeModal}
        id={id}
        refetch={refetch}
      />
    </div>
  );
};
