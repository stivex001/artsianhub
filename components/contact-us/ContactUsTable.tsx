"use client";
import { ContactUsData } from "@/apis/crud/contact";
import { format } from "date-fns";
import React from "react";
import GenericTable from "../shared/GenericTable";
import { useRouter } from "next/navigation";

type Props = {
  contacts: ContactUsData[];
};

const headers = [
  { content: <>Full Name</> },
  { content: <>Date & Time</> },
  { content: <>Email Address </> },
  { content: <> Mobile</> },
  { content: <>Message</> },
  { content: <>Mode of Communication</> },
];

const ContactUsTable = ({ contacts }: Props) => {
  const router = useRouter();

  const renderRow = (item: ContactUsData) => {
    const handleRowClick = (id: string) => {
      router.push(`/admin/dashboard/manage-contacts/${id}`);
    };

    return (
      <tr
        onClick={() => handleRowClick(item?._id)}
        key={item?._id}
        className=" w-full text-base h-20 text-left cursor-pointer hover:bg-[#D8D8D9] transition"
      >
        <td className="py-1 px-4 whitespace-nowrap">{item?.name}</td>

        <td className="py-1 px-4 whitespace-nowrap">
          {format(new Date(item?.createdAt), "MMM dd, yyyy")}
        </td>
        <td className="py-1 px-4"> {item?.email}</td>
        <td className="py-1 px-4"> {item?.phone}</td>
        <td className="py-1 px-4"> {item?.message}</td>
        <td className="py-1 px-4 capitalize text-center"> {item?.mode}</td>
      </tr>
    );
  };

  return (
    <div>
      <GenericTable
        headers={headers}
        data={contacts}
        renderRow={renderRow}
        className="h-[70vh]"
      />
    </div>
  );
};

export default ContactUsTable;
