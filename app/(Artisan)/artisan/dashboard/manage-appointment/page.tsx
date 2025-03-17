"use client";
import { Descriptions } from "@/components/shared/Headings";
import StatusButton from "@/components/shared/StatusButton";
import TablesComponent from "@/components/shared/TablesComponent";
import React, { useState } from "react";

type DateProps = {
  date: string;
  time: string;
};

const DateTimeDisplay = ({ date, time }: DateProps) => {
  return (
    <div>
      <p className="text-sm">{date}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  );
};

type Props = {};

const ManageAppointment = (props: Props) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 30;

  const handlePageChange = (page: number) => {
    console.log(`Changing to page ${page}`);
    setCurrentPage(page);
  };

  const headers = [
    "Status",
    "Name",
    "Email",
    "Phone number",
    "Description",
    "Date",
    "Pricing",
    "Action",
  ];

  const tableData = Array.from({ length: 11 }).map(() => ({
    status: "pending",
    accountName: "Nike Pegasus Trail 5 GORE-TEX",
    accountType: "", // Empty since there's no sub-text in the screenshot
    price: "N22,000",
    quantity: "23",
    business: "Nike",
    dateCreated: "27 Oct, 2023",
    timeCreated: "11:20pm",
  }));

  const getFormattedValue = (row: any, i: number) => [
    // <UserProfile
    //   profilePicture={GlobalVariables.defaultProfilePicture}
    //   accountName={row.accountName}
    //   accountType={row.accountType}
    // />,
    row.accountName,
    row.accountType,
    row.price,
    row.quantity,
    row.business,
    <StatusButton status={row.status} />,
    <DateTimeDisplay date={row.dateCreated} time={row.timeCreated} />,
  ];

  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Manage Appointment" />
      <div className="w-full h-[68vh] overflow-y-auto no-scrollbar scrollbar-hidden">
        <TablesComponent
          data={tableData}
          isLoading={false}
          headers={headers}
          getFormattedValue={getFormattedValue}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          popUpFunction={(option: any, inx: number, val: any) => {
            if (inx === 0) {
              console.log(val);
              console.log(option);
              // router.push(`/admin/products/123`);
            }
          }}
          showCheckBox={false}
          // options={["Options 1", "Options 2"]}
          headerClassName="py-5 px-4 text-left  text-white text-base font-bold"
          headerBackgroundColor="#5691D1"
        />
      </div>
    </section>
  );
};

export default ManageAppointment;
