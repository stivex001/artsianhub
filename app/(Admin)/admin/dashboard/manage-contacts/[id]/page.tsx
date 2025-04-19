import { Descriptions } from "@/components/shared/Headings";
import React from "react";

import Wrapper from "@/components/shared/Wrapper";

type Props = {};

const ContactDetails = (props: Props) => {
  return (
    <section className="flex flex-col gap-5">
      <Descriptions title="Contact Us" />
      <p className="text-2xl">
        <span className="font-[200]">Manage Contact Us</span> / Contact Us
        Details
      </p>

      {/* <ContactDetails /> */}
    </section>
  );
};

export default ContactDetails;
