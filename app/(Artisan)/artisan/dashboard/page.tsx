"use client";

import { AppointmentReview } from "@/components/Artisan/dashboard/AppointmentReview";
import CustomDatePicker from "@/components/controlledInputs/CustomDatePicker";
import Barchart from "@/components/shared/Barchart";
import Charts from "@/components/shared/Charts";
import { Descriptions } from "@/components/shared/Headings";
import Wrapper from "@/components/shared/Wrapper";
import React from "react";

type Props = {};

const ArtisanDashboard = (props: Props) => {
  const [date, setDate] = React.useState<Date>();

  return (
    <section className="flex flex-col gap-[30px]">
      <div className="flex flex-col gap-6">
        <Descriptions
          title="Welcome Albert Bannor"
          desc="What’s starting point?"
        />
        <div className="border-2 border-primary w-full" />
      </div>
      <div className="flex flex-col gap-1.5">
        <AppointmentReview />
        <div className="flex flex-col lg:flex-row gap-0.5">
          <Wrapper className="flex-1 px-2 py-5">
            <div className="w-11/12 mx-auto flex items-center justify-between gap-7 mb-8">
              <div className="flex items-center gap-2">
                <button className="px-2 py-2.5 bg-blue-500 text-white rounded">
                  Daily
                </button>
                <button className="px-2 py-2.5 bg-white text-primary rounded">
                  Weekly
                </button>
                <button className="px-2 py-2.5 bg-white text-primary rounded">
                  Monthly
                </button>
              </div>
              <div className="flex items-center gap-4">
                <CustomDatePicker date={date} setDate={setDate} />
                <CustomDatePicker date={date} setDate={setDate} />
              </div>
            </div>
            <Barchart />
          </Wrapper>
          <Wrapper className="flex-1 px-2 py-5">
            <div className="flex items-center justify-between">
              <h1 className="text-xl">Revenue In Dollars $</h1>
              <div>filter</div>
            </div>
            <Barchart />
          </Wrapper>
        </div>
      </div>
    </section>
  );
};

export default ArtisanDashboard;
