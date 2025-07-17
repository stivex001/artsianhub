import React from "react";
import { AppointmentReview } from "./AppointmentReview";
import RevenueDetails from "./RevenueDetails";

type Props = {};

const AppointmentDetailsStats = (props: Props) => {
  return (
    <section className="flex flex-col lg:flex-row gap-5">
      <AppointmentReview />
      <RevenueDetails />
    </section>
  );
};

export default AppointmentDetailsStats;
