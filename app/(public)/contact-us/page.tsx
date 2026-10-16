import type { Metadata } from "next";
import React from "react";
import { LeftContent } from "@/components/contact-us/LeftContent";
import { RightContent } from "@/components/contact-us/RightContent";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the ArtisansHub team. We're here to help with any questions about our platform, artisan services, or partnerships.",
  alternates: { canonical: "/contact-us" },
};

const ContactUs = () => {
  return (
    <main className="bg-[#F9FAFB]">
      <div className="max-w-5xl px-4 lg:px-0 mx-auto py-10  space-y-14">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
            Contact Us
          </h1>
          <p className="text-[#4B5563] text-lg">
            We&apos;d love to hear from you. Get in touch with us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <LeftContent />
          <RightContent />
        </div>
      </div>
    </main>
  );
};

export default ContactUs;
