"use client";
import { useArtisans } from "@/api/crud/artisans";
import CustomDatePicker from "@/components/controlledInputs/CustomDatePicker";
import FilterComponent from "@/components/controlledInputs/FilterComponent";
import ActionModal from "@/components/shared/ActionModal";
import CustomPagination from "@/components/shared/CustomPagination";
import { Descriptions } from "@/components/shared/Headings";
import SkeletonTableLoader from "@/components/shared/SkeletonTableLoader";
import StatusButton from "@/components/shared/StatusButton";
import TablesComponent from "@/components/shared/TablesComponent";
import Wrapper from "@/components/shared/Wrapper";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

type DateProps = {
  date: string;
  time?: string;
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

const filterOptions = [
  { id: 1, label: "All" },
  { id: 2, label: "Pending" },
  { id: 3, label: "Accept" },
  { id: 5, label: "Decline" },
  // { id: 6, label: "Expire" },
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

const ManageAppointment = (props: Props) => {
  const router = useRouter();
  const { getAllBookings, bookingResponse } = useArtisans();
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const { mutate, isPending } = bookingResponse(`${selectedRow?._id}`);

  const { data: viewBookings, isLoading, refetch } = getAllBookings();
  const bookings = viewBookings?.bookings;
  const pagination = viewBookings?.pagination;

  console.log(bookings, "view_bookings");

  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(pagination?.currentPage);
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [showModal, setShowModal] = useState<number | null>(null);

  const totalPages = pagination?.totalPages || 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFiterChange = () => {
    // Handle filter change
    console.log("Filter changed");
  };

  const handleRowClick = (row: any) => {
    router.push(`/artisan/dashboard/manage-appointment/${row?._id}`);
  };

  const handleAcceptOrDeclineAppointment = async (
    row: any,
    status: "accepted" | "declined"
  ) => {
    const formData = new FormData();
    formData.append("status", status);

    setSelectedRow(row);

    try {
      await mutate(formData, {
        onSuccess: (response: any) => {
          toast.success(response?.message || `Successfully ${status}`);
          setShowModal(null);
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

  const tableData =
    bookings?.map((booking: any) => ({
      _id: booking?._id,
      status: booking?.status,
      accountName: booking?.clientName,
      email: booking?.clientEmail,
      phoneNumber: booking?.clientPhoneNumber,
      description: booking?.description,
      price: `$${booking?.price}`,
      dateCreated: new Date(booking.date).toLocaleDateString("en-GB"),
    })) || [];

  const getFormattedValue = (row: any, i: number) => {
    const actualRow = bookings?.[i];

    return [
      <StatusButton status={row?.status} />,
      row?.accountName,
      row?.email,
      row?.phoneNumber,
      row?.description,
      <DateTimeDisplay date={row?.dateCreated} />,
      row?.price,
      <button
        className="bg-primary rounded-[10px] h-9 px-2 flex items-center justify-center text-white font-bold relative"
        onClick={(e) => {
          e.stopPropagation();
          setSelectedRow(actualRow); // set current row
          setShowModal(i);
        }}
      >
        Action
        {showModal === i && (
          <ActionModal
            onAccept={() =>
              handleAcceptOrDeclineAppointment(actualRow, "accepted")
            }
            onDecline={() =>
              handleAcceptOrDeclineAppointment(actualRow, "declined")
            }
            onClose={() => setShowModal(null)}
            isLoading={isPending}
          />
        )}
      </button>,
    ];
  };

  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Manage Appointment" />
      <div className="flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="">
          <CustomDatePicker range date={date} setDate={setDate} />
        </div>
        <FilterComponent
          onFilterChange={handleFiterChange}
          options={filterOptions}
        />
      </div>
      <Wrapper className="overflow-hidden no-scrollbar scrollbar-hidden">
        {isLoading ? (
          <SkeletonTableLoader />
        ) : (
          <>
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
                headerBackgroundColor="#5691D1"
                options={["Accept", "Decline"]}
                hideActionButton
                onRowClick={handleRowClick}
              />
            </div>
            {(bookings?.length ?? 0) > 0 && (
              <div className="flex justify-between items-center px-4 ">
                <div className="hidden lg:block text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </div>
                <CustomPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  // visiblePages={currentPage}
                />
              </div>
            )}
          </>
        )}
      </Wrapper>
    </section>
  );
};

export default ManageAppointment;
