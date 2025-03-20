"use client";

import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { AuthLayout } from "@/components/pages/auth/AuthLayout";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React from "react";

type Props = {};

const fields: Field[] = [
  {
    name: "email",
    type: "email",
    errorMessage: "Email is required",
    isRequired: true,
  },
  {
    name: "password",
    type: "text",
    errorMessage: "Password is required",
    isRequired: true,
  },
];

const ContactUs = (props: Props) => {
  const { control, handleSubmit, formState } = useDynamicForm(fields, {});

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log("Form submitted", data);
  };

  return (
    <div className="">
      <h1 className="text-8xl text-primary font-semibold flex items-center justify-center py-8 mt-24">
        Contact Us
      </h1>
      <AuthLayout
        className="-mt-7"
        title="Get in Touch"
        desc="Feel free to contact us on your queries and we will get back to you as soon as possible."
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-8/12 mx-auto pt-16"
        >
          <div className="flex flex-col  gap-3 mb-14">
            <h1 className="font-semibold text-primary text-2xl text-center ">
              Send us a Message
            </h1>
          </div>
          <div className="flex flex-col gap-8">
            <ControlledInput
              name="name"
              control={control}
              placeholder="Enter Email"
              type="text"
              label="Name"
              variant="primary"
              rules={{ required: true }}
              className="shadow-dropShadow bg-white border-none"
              labelClassName="text-[#D8D8D9] font-semibold"
              art
            />
            <ControlledInput
              name="email"
              control={control}
              placeholder=""
              type="email"
              label="Email"
              variant="primary"
              rules={{ required: true }}
              className="shadow-dropShadow bg-white border-none"
              labelClassName="text-[#D8D8D9] font-semibold"
              art
            />
            <div className="">
              <ControlledInput
                name="phone"
                control={control}
                placeholder=""
                type="text"
                label="Mobile"
                variant="primary"
                rules={{ required: true }}
                className="shadow-dropShadow bg-white border-none"
                labelClassName="text-[#D8D8D9] font-semibold"
                art
              />
            </div>
            <ControlledInput
              name="message"
              control={control}
              placeholder=""
              type="text"
              label="Message"
              variant="primary"
              rules={{ required: true }}
              className="shadow-dropShadow bg-white border-none"
              labelClassName="text-[#D8D8D9] font-semibold"
              art
            />
          </div>
          <div className="my-9">
            <CustomButton
              type="submit"
              label="Submit"
              className="w-full rounded-[10px] h-10 font-[300]"
            />
          </div>
        </form>
      </AuthLayout>
    </div>
  );
};

export default ContactUs;
