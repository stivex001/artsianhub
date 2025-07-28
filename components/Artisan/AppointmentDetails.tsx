"use client";
import React, { useState } from "react";
import Wrapper from "../shared/Wrapper";
import ActionModal from "../shared/ActionModal";
import { useArtisans } from "@/api/crud/artisans";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { useAppointments } from "@/api/crud/appointments";

type Props = {};

const AppointmentDetails = (props: Props) => {
  const params = useParams();
  const id = params?.id as string;
  const [showModal, setShowModal] = useState<boolean>(false);

  const { getAllBookings, bookingResponse } = useAppointments();

  const { data: viewBookings, refetch } = getAllBookings();
  const { mutate, isPending } = bookingResponse(`${id}`);

  const bookings = viewBookings?.bookings;

  const details = bookings?.find((appointment) => appointment?._id === id);

  const handleAcceptOrDeclineAppointment = async (
    status: "accepted" | "declined" | "completed"
  ) => {
    const formData = new FormData();
    formData.append("status", status);

    try {
      await mutate(formData, {
        onSuccess: (response: any) => {
          toast.success(response?.message || `Successfully ${status}`);
          setShowModal(false);
          refetch();
        },
        onError: (error: any) => {
          toast.error(error?.message || `Failed to ${status}`);
        },
      });
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Wrapper className="py-6 px-2 flex justify-between ">
      <div className="w-9/12 space-y-6 ">
        <div className="flex">
          <h1 className="w-[30%] text-base">Status</h1>
          <p className="w-[30%] text-base text-[#9694A4] capitalize">{details?.status}</p>
        </div>
        <div className="flex">
          <h1 className="w-[30%] text-base">Name </h1>
          <p className="w-[30%] text-base text-[#9694A4]">
            {details?.clientName}
          </p>
        </div>
        <div className="flex">
          <h1 className="w-[30%] text-base">Email</h1>
          <p className="w-[30%] text-base text-[#9694A4]">
            {details?.clientEmail}
          </p>
        </div>
        <div className="flex">
          <h1 className="w-[30%] text-base">Phone Number</h1>
          <p className="w-[30%] text-base text-[#9694A4]">
            {details?.clientPhoneNumber}
          </p>
        </div>
        <div className="flex">
          <h1 className="w-[30%] text-base">Description</h1>
          <p className="w-[30%] text-base text-[#9694A4]">
            {details?.description}
          </p>
        </div>
        <div className="flex">
          <h1 className="w-[30%] text-base">Date</h1>
          <p className="w-[30%] text-base text-[#9694A4]">
            {new Date(details?.date).toLocaleDateString("en-GB")}
          </p>
        </div>
        <div className="flex">
          <h1 className="w-[30%] text-base">Price</h1>
          <p className="w-[30%] text-base text-[#9694A4]">${details?.price}</p>
        </div>
      </div>
      <div className="w-3/12">
        <button
          className="bg-primary rounded-[10px] h-9 px-2 flex items-center justify-center text-white font-bold relative"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Action
          {showModal && (
            <ActionModal
              onAccept={() => handleAcceptOrDeclineAppointment("accepted")}
              onDecline={() => handleAcceptOrDeclineAppointment("declined")}
              onCompleted={() => handleAcceptOrDeclineAppointment("completed")}
              onClose={() => setShowModal(false)}
              isLoading={isPending}
              showCompleted
            />
          )}
        </button>
        ,
      </div>
    </Wrapper>
  );
};

export default AppointmentDetails;
