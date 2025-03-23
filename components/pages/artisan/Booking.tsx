"use client";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import Image from "next/image";
import React from "react";
import cutting from "@/components/assets/images/cutting.png";

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

const Booking = (props: Props) => {
  const { control, handleSubmit, formState } = useDynamicForm(fields, {});

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log("Form submitted", data);
  };

  return (
    <section className="bg-white pt-20 pb-7 flex flex-col lg:flex-row justify-betweenx">
      <div className="flex-1 flex flex-col gap-6 px-32">
        <h1 className="text-5xl font-semibold">Book An Appointment</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#E5EFF9] py-10 px-14 rounded-[10px]"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col lg:flex-row gap-10">
              <div className="w-full">
                <ControlledInput
                  name="firstname"
                  control={control}
                  placeholder=""
                  type="text"
                  label="First Name"
                  variant="normal"
                  rules={{ required: true }}
                />
              </div>
              <div className="w-full">
                <ControlledInput
                  name="lastname"
                  control={control}
                  placeholder=""
                  type="text"
                  label="Last Name"
                  variant="normal"
                  rules={{ required: true }}
                />
              </div>
            </div>
            <ControlledInput
              name="email"
              control={control}
              placeholder=""
              type="email"
              label="Email"
              variant="normal"
              rules={{ required: true }}
            />
            <div className="w-full flex flex-col lg:flex-row gap-10">
              <div className="w-full">
                <ControlledInput
                  name="phone"
                  control={control}
                  placeholder=""
                  type="text"
                  label="Phone Number"
                  variant="normal"
                  rules={{ required: true }}
                />
              </div>
              <div className="w-full">
                <ControlledInput
                  name="appointment"
                  control={control}
                  placeholder=""
                  type="date"
                  label="Appointment Date"
                  variant="normal"
                  rules={{ required: true }}
                />
              </div>
            </div>
            <ControlledInput
              name="description"
              control={control}
              placeholder="Brief Description..."
              type="textarea"
              label="Brief Description"
              variant="normal"
              rules={{ required: true }}
              isTextArea
              rows={7}
            />
            <div className="my-9 flex items-center justify-end">
              <CustomButton
                type="submit"
                label="Book Appointment"
                className=" rounded-[10px] !h-14"
              />
            </div>
          </div>
        </form>
      </div>
      <div className="hidden lg:block flex-1">
        <div className="relative w-full h-full ml-24">
          <Image
            src={cutting}
            alt="img"
            layout="fill"
            objectFit="cover"
            className="rounded-[100px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Booking;
