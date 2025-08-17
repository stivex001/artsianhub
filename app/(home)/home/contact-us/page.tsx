"use client";

import React, { useState } from "react";
import { LeftContent } from "@/components/contact-us/LeftContent";
import { RightContent } from "@/components/contact-us/RightContent";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    communicationMode: "Email",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      communicationMode: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsLoading(false);
      // Reset form or show success message
    }, 2000);
  };

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
