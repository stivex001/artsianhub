"use client";
import { useArtisans } from "@/api/crud/artisans";
import ArtisanTable from "@/components/Artisan/ArtisanTable";
import { CustomButton } from "@/components/clickable/CustomButton";
import CustomDatePicker from "@/components/controlledInputs/CustomDatePicker";

import { Descriptions } from "@/components/shared/Headings";
import Pagination from "@/components/shared/Pagination";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import StatusButton from "@/components/shared/StatusButton";
import TablesComponent from "@/components/shared/TablesComponent";
import Wrapper from "@/components/shared/Wrapper";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";



type Props = {};

const ManageArtisans = (props: Props) => {
  const router = useRouter();

  const { getAllArtisan } = useArtisans();
  const { data: artisans = [], isPending } = getAllArtisan();

  console.log(artisans, "artsyududu");

  const [currentPage, setCurrentPage] = useState(3);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const totalPages = 5;
  const entriesPerPage = 10;

  const handlePageChange = (page: number) => {
    console.log(`Changing to page ${page}`);
    setCurrentPage(page);
  };

  const handleFiterChange = () => {
    // Handle filter change
    console.log("Filter changed");
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
        {/* <CustomButton label="Add Artisan" className="rounded-[10px]" /> */}
      </div>

      <Wrapper className="overflow-hidden no-scrollbar scrollbar-hidden shadow-dropShadow border-none">
        {isPending ? (
          <SkeletonTableLoader />
        ) : artisans && artisans?.length > 0 ? (
          <div>
            <ArtisanTable artisans={artisans ?? []} />
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

export default ManageArtisans;
