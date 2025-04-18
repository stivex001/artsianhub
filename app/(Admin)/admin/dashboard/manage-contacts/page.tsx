"use client";

import { useContactUs } from "@/api/crud/contact";

import ContactUsTable from "@/components/contact-us/ContactUsTable";
import CustomDatePicker from "@/components/controlledInputs/CustomDatePicker";

import { Descriptions } from "@/components/shared/Headings";
import Pagination from "@/components/shared/Pagination";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";

import Wrapper from "@/components/shared/Wrapper";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

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

const ManageContacts = (props: Props) => {
  const router = useRouter();

  const { getAllContact } = useContactUs();
  const { data: contacts = [], isPending } = getAllContact();

  const [currentPage, setCurrentPage] = useState(3);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const totalPages = 5;
  const entriesPerPage = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFiterChange = () => {
    // Handle filter change
    console.log("Filter changed");
  };

  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Manage Contact Us " className="font-normal" />
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <div className="">
          <CustomDatePicker
            range
            date={date}
            setDate={setDate}
            className="h-10"
          />
        </div>
        {/* <CustomButton label="Add Artisan" className="rounded-[10px]" /> */}
      </div>
      <Wrapper className="overflow-hidden no-scrollbar scrollbar-hidden">
        {isPending ? (
          <SkeletonTableLoader />
        ) : contacts && contacts?.length > 0 ? (
          <div>
            <ContactUsTable contacts={contacts ?? []} />
            <Pagination
              currentPage={currentPage}
              totalEntries={totalPages}
              entriesPerPage={entriesPerPage}
              onPageChange={handlePageChange}
            />
          </div>
        ) : (
          <div className="text-center my-3">No Data Available</div>
        )}
      </Wrapper>
    </section>
  );
};

export default ManageContacts;
