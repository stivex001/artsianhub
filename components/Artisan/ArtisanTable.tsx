"use client";

import React from "react";
import GenericTable from "../shared/GenericTable";
import { useRouter } from "next/navigation";
import { ArtisanDetails } from "@/api/crud/artisans";
import StatusButton from "../shared/StatusButton";
import { DateTimeDisplay } from "@/utils/DateTimeDisplay";
import { format } from "date-fns";

type Props = {
  artisans: ArtisanDetails[];
};

const headers = [
  { content: <>Artisan ID</> },
  { content: <>Date Created</> },
  { content: <>Artisan Name </> },
  { content: <> Phone Number</> },
  { content: <>Email Address</> },
  { content: <>Status</> },
  { content: <>KYC Status</> },
];

const ArtisanTable = ({ artisans }: Props) => {
  const router = useRouter();

  const renderRow = (item: ArtisanDetails) => {
    const handleRowClick = (id: string) => {
      router.push(`/admin/dashboard/manage-artisans/${id}`);
    };

    return (
      <tr
        onClick={() => handleRowClick(item?._id)}
        key={item?._id}
        className=" w-full text-base h-20 text-left cursor-pointer hover:bg-[#D8D8D9] transition"
      >
        <td className="py-1 px-4 whitespace-nowrap">{item?.artisanId}</td>

        <td className="py-1 px-4 whitespace-nowrap">
          {format(new Date(item?.createdAt), "MMM dd, yyyy")}
        </td>
        <td className="py-1 px-4">
          {" "}
          {item?.user?.firstName} {item?.user?.lastName}
        </td>
        <td className="py-1 px-4">{item?.user?.phoneNumber}</td>
        <td className="py-1 px-4">{item?.user?.email}</td>
        <td className="py-1 px-4 capitalize text-center">
         
          <StatusButton
            status={
              item?.isApproved === true ? "Active" : "inactive"
            }
            className="w-24"
          />{" "}
        </td>
        <td className="py-1 px-4 capitalize text-center">
          <StatusButton
            status={
              item?.user?.isVerifiedArtisan === true ? "Completed" : "Pending"
            }
            className="w-24"
          />
        </td>
      </tr>
    );
  };

  return (
    <div>
      <GenericTable
        headers={headers}
        data={artisans}
        renderRow={renderRow}
        className="h-[70vh]"
      />
    </div>
  );
};

export default ArtisanTable;
