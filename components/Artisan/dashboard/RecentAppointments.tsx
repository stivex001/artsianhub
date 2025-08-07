"use client";
import { CustomButton } from "@/components/clickable/CustomButton";
import { ReusableTable } from "@/components/shared/ResuableTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import Wrapper from "@/components/shared/Wrapper";
import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  appointments: any;
  isLoading: boolean;
};

const columns = [
  {
    key: "clientName",
    header: "Client Name",
    render: (value: any, row: any) => (
      <div className="flex items-center gap-3">
        <div className="">
          {row?.clientId?.profilePicture ? (
            <div className="w-10 h-10 relative overflow-hidden">
              <Image
                src={row?.clientId?.profilePicture}
                alt={row?.clientId?.firstName}
                fill
                className="object-cover rounded-full"
              />
            </div>
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-700">
              {row?.clientId?.firstName?.charAt(0)}{row?.clientId?.lastName?.charAt(0)}
            </div>
          )}
        </div>
        <div className="">
          <div className="text-sm  text-body">
            {row?.clientId?.firstName} {row?.clientId?.lastName}
          </div>
        </div>
      </div>
    ),
  },
  
  {
    key: "services",
    header: "Job Description",
    render: (value: any, row: any) => (
      <span className="text-sm text-gray-900 line-clamp-1">
        {row?.description}
      </span>
    ),
  },
  {
    key: "location",
    header: "Location",
    render: (value: any) => (
      <span className="text-sm text-gray-900 line-clamp-1">{value}</span>
    ),
  },
  {
    key: "status",
    header: "Status",
    render: (value: any) => <StatusBadge status={value} />,
  },
  {
    key: "date",
    header: "Date",
    render: (value: any, row: any) => (
      <div>
        <div className="text-sm text-gray-900">
          {formatDate(row?.preferredDate)}
        </div>
        <div className="text-sm text-gray-500">{row?.preferredTime}</div>
      </div>
    ),
  },
];

export const RecentAppointments = ({ appointments, isLoading }: Props) => {
  const router = useRouter();
  return (
    <Wrapper className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-bold text-paragrah mb-4">
          Recent Appointments
        </h1>
        <CustomButton
          label="See All"
          variant="transparent"
          onClick={() => router.push("/artisan/dashboard/manage-appointment")}
        />
      </div>

      <ReusableTable
        columns={columns}
        data={appointments ?? []}
        url="/artisan/dashboard/manage-appointment"
        loading={isLoading}
      />
    </Wrapper>
  );
};
