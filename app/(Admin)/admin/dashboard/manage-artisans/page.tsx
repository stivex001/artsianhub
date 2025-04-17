"use client";
import { ArtisanDetails, useArtisans } from "@/api/crud/artisans";
import { CustomButton } from "@/components/clickable/CustomButton";
import CustomDatePicker from "@/components/controlledInputs/CustomDatePicker";
import FilterComponent from "@/components/controlledInputs/FilterComponent";
import CustomPagination from "@/components/shared/CustomPagination";
import { Descriptions } from "@/components/shared/Headings";
import StatusButton from "@/components/shared/StatusButton";
import TablesComponent from "@/components/shared/TablesComponent";
import Wrapper from "@/components/shared/Wrapper";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

type DateProps = {
  date: string;
  time?: string;
};

const headers = [
  "Artisan ID ",
  "Date Created",
  "Artisan Name ",
  "Phone Number ",
  "Email Address",
  "Status",
  "KYC Status",
];

const DateTimeDisplay = ({ date, time }: DateProps) => {
  return (
    <div>
      <p className="text-sm">{date}</p>
      <p className="text-xs text-gray-500">{time}</p>
    </div>
  );
};

type Props = {};

const ManageArtisans = (props: Props) => {
  const router = useRouter();

  const { getAllArtisan } = useArtisans();
  const { data: artisans = [], isLoading } = getAllArtisan();

  console.log(artisans, "artsyududu");

  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(3);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const totalPages = 5;

  const handlePageChange = (page: number) => {
    console.log(`Changing to page ${page}`);
    setCurrentPage(page);
  };

  const handleFiterChange = () => {
    // Handle filter change
    console.log("Filter changed");
  };

  const handleRowClick = (row: any) => {
    router.push(`/artisan/dashboard/manage-appointment/${row?._id}`);
  };

  const tableData = artisans?.map((art: any) => ({
    _id: art?._id,
    artisanId: art?.artisanId,
    accountName: `${art?.user?.firstName} ${art?.user?.firstName}`,
    email: art?.user?.email,
    phoneNumber: art?.user?.phoneNumber,
    status: art?.isApproved,
    kycStatus: art?.user?.isVerifiedArtisan,
    dateCreated: new Date(art?.createdAt).toLocaleDateString("en-GB"),
  }));

  const getFormattedValue = (row: any, i: number) => {
    return [
      row?.artisanId,
      row?.accountName, // Name
      row?.email, // Email
      row?.phoneNumber, // Phone number
      <StatusButton
        status={row?.status}
        className="w-20 !py-2 rounded-[5px]"
      />,
      <StatusButton
        status={row?.kycStatus}
        className="w-20 !py-2 rounded-[5px]"
      />,
      <DateTimeDisplay date={row?.dateCreated} />,
    ];
  };

  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Manage Artisans" className="font-normal" />
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="">
          <CustomDatePicker
            range
            date={date}
            setDate={setDate}
            className="h-10"
          />
        </div>
        <CustomButton label="Add Artisan" className="rounded-[10px]" />
      </div>
      <Wrapper className="overflow-hidden no-scrollbar scrollbar-hidden">
        <div className="w-full h-[68vh] overflow-y-auto no-scrollbar scrollbar-hidden pb-5">
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
            headerBackgroundColor="#E1E7EE"
            options={["Accept", "Decline"]}
            hideActionButton
            onRowClick={handleRowClick}
          />
        </div>
        {/* <div className="flex justify-between items-center px-4 ">
          <div className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div> */}
      </Wrapper>
    </section>
  );
};

export default ManageArtisans;
