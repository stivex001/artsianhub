"use client";
import CustomPagination from "@/components/shared/CustomPagination";
import { Descriptions } from "@/components/shared/Headings";
import StatusButton from "@/components/shared/StatusButton";
import TablesComponent from "@/components/shared/TablesComponent";
import Wrapper from "@/components/shared/Wrapper";
import React, { useState } from "react";

type DateProps = {
  date: string;
  time?: string;
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
  const totalPages = 5;

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
    accountName: "Smith Jane",
    email: "jane@gmail.com",
    phoneNumber: "+1234567890",
    description: "Sports running shoes",
    price: "$40",
    dateCreated: "2/05/2025",
  }));

  const getFormattedValue = (row: any, i: number) => [
    <StatusButton status={row.status} />,
    row.accountName, // Name
    row.email, // Email
    row.phoneNumber, // Phone number
    row.description, // Description
    <DateTimeDisplay date={row.dateCreated} />,
    row.price, // Pricing
    <button
      className="bg-primary rounded-[10px] h-9 px-2 flex items-center justify-center text-white font-bold"
      onClick={() => console.log(row)}
    >
      Action
    </button>,
  ];

  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Manage Appointment" />
      <Wrapper>
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
              }
            }}
            showCheckBox={false}
            headerClassName="py-5 px-4 text-left text-white text-base font-bold"
            headerBackgroundColor="#5691D1"
            options={["Accept", "Decline"]}
            hideActionButton
          />
        </div>
        <div className="flex justify-between items-center px-4">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </Wrapper>
    </section>
  );
};

export default ManageAppointment;
