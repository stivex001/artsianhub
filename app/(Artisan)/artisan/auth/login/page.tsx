"use client";

import ArtisanAuthLayout from "@/components/Artisan/auth/ArtisanAuthLayout";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import Link from "next/link";
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

const ArtisanLogin = (props: Props) => {
  const { control, handleSubmit, formState } = useDynamicForm(fields, {});

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log("Form submitted", data);
  };

  return (
    <ArtisanAuthLayout>
      <div className="w-[600px] mx-auto px-8 pt-3 pb-8 bg-white shadow-dropShadow rounded-[10px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="font-semibold text-xl ">
            Create your account as an Artisan
          </h1>
          <div className="mt-7 flex flex-col gap-5">
            <h1 className="font-semibold text-base">Get Started</h1>
            <div className="flex felx-col lg:flex-row gap-8 w-full">
              <div className="w-full">
                <ControlledInput
                  name="firsname"
                  control={control}
                  placeholder=""
                  type="text"
                  label="First Name"
                  variant="primary"
                  rules={{ required: true }}
                  art
                />
              </div>
              <div className="w-full">
                <ControlledInput
                  name="lastname"
                  control={control}
                  placeholder=""
                  type="text"
                  label="Last Name"
                  variant="primary"
                  rules={{ required: true }}
                  art
                />
              </div>
            </div>
            <div className="w-full">
              <ControlledInput
                name="email"
                control={control}
                placeholder=""
                type="email"
                label="Email"
                variant="primary"
                rules={{ required: true }}
                art
              />
            </div>
            <div className="flex felx-col lg:flex-row gap-8 w-full">
              <div className="w-full">
                <ControlledInput
                  name="phone"
                  control={control}
                  placeholder=""
                  type="number"
                  label="Phone Number"
                  variant="primary"
                  rules={{ required: true }}
                  art
                />
              </div>
              <div className="w-full">
                <ControlledInput
                  name="dob"
                  control={control}
                  placeholder="Enter"
                  type="date"
                  label="Date Of Birth"
                  variant="primary"
                  rules={{ required: true }}
                  art
                />
              </div>
            </div>

            <div className="w-full">
              <ControlledInput
                name="trade"
                control={control}
                placeholder="Specific skills or services offered"
                type="text"
                label="Trade or Specialization"
                variant="primary"
                rules={{ required: true }}
                art
              />
            </div>
            <div className="flex felx-col lg:flex-row gap-8 w-full">
              <div className="w-full">
                <ControlledInput
                  name="address"
                  control={control}
                  placeholder="Complete current address"
                  type="text"
                  label="Residential Address"
                  variant="primary"
                  rules={{ required: true }}
                  art
                />
              </div>
              <div className="w-full">
                <ControlledInput
                  name="gender"
                  control={control}
                  placeholder=""
                  type="text"
                  label="Gender*(optional)"
                  variant="primary"
                  rules={{ required: true }}
                  art
                />
              </div>
            </div>

            <div className="w-full">
              <ControlledInput
                name="password"
                control={control}
                placeholder=""
                type="password"
                label="Password"
                variant="primary"
                rules={{ required: true }}
                art
              />
            </div>
            <div className="w-full">
              <ControlledInput
                name="confirmPassword"
                control={control}
                placeholder=""
                type="password"
                label="Confirm New Password"
                variant="primary"
                rules={{ required: true }}
                art
              />
            </div>

            <div className="my-9 w-[200px] mx-auto">
              <CustomButton
                type="submit"
                label="Create My Account"
                className="w-full rounded-[10px]"
              />
            </div>
          </div>
        </form>
        <Link
          href={"/artisan/auth/login"}
          className="text-xs font-semibold flex items-center justify-end "
        >
          Already have an account? <span className="text-primary">Log in</span>{" "}
        </Link>
      </div>
    </ArtisanAuthLayout>
  );
};

export default ArtisanLogin;
