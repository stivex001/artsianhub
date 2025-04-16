import { Descriptions } from "@/components/shared/Headings";
import React from "react";

type Props = {};

const AppintmentDetails = (props: Props) => {
  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Manage Appointment" />
    </section>
  );
};

export default AppintmentDetails;
