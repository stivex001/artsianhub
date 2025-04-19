"use client";
import React, { useState } from "react";
import Wrapper from "../shared/Wrapper";
import { useParams } from "next/navigation";
import { useContactUs } from "@/api/crud/contact";
import { format } from "date-fns";

type Props = {};

const ContactDetails = (props: Props) => {
  const params = useParams();
  const id = params?.id as string;

  const { getAllContact } = useContactUs();

  const { data: contact } = getAllContact();

  const viewContact = contact?.find((appointment) => appointment?._id === id);

  console.log(viewContact, "gsdgysd");

  return (
    <Wrapper className="py-6 px-2 flex justify-between ">
      <div className="w-9/12 space-y-6 ">
        <div className="flex">
          <h1 className="w-[30%] text-base">Full Name</h1>
          <p className="w-[30%] text-base text-[#9694A4] capitalize">
            {viewContact?.name}
          </p>
        </div>

        <div className="flex">
          <h1 className="w-[30%] text-base">Email</h1>
          <p className="w-[30%] text-base text-[#9694A4]">
            {viewContact?.email}
          </p>
        </div>

        <div className="flex">
          <h1 className="w-[30%] text-base">Mobile</h1>
          <p className="w-[30%] text-base text-[#9694A4]">
            {viewContact?.phone}
          </p>
        </div>

        <div className="flex">
          <h1 className="w-[30%] text-base">Date</h1>
          {/* <p className="w-[30%] text-base text-[#9694A4]">
            {format(new Date(viewContact?.createdAt), "MMM dd, yyyy")}
          </p> */}
        </div>
        <div className="flex">
          <h1 className="w-[30%] text-base">Mode Of Communication</h1>
          <p className="w-[30%] text-base text-[#9694A4]">
            {viewContact?.mode}
          </p>
        </div>
      </div>
    </Wrapper>
  );
};

export default ContactDetails;
