"use client";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { AuthLayout } from "@/components/pages/auth/AuthLayout";
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

const Login = (props: Props) => {
  const { control, handleSubmit, formState } = useDynamicForm(fields, {});

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log("Form submitted", data);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(onSubmit)} className="w-8/12 mx-auto">
        <div className="flex flex-col  gap-3 mb-14">
          <h1 className="font-semibold text-2xl text-center font-[family-name:var(--font-josefin-sans)]">
            Sign In
          </h1>
          <span className="font-semibold text-sm text-center font-[family-name:var(--font-josefin-sans)]">
            Enter your email and Password
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <ControlledInput
            name="email"
            control={control}
            placeholder="Enter Email"
            type="email"
            label="email"
            variant="primary"
            rules={{ required: true }}
          />
          <div className="">
            <ControlledInput
              name="password"
              control={control}
              placeholder="Password"
              type="password"
              label="Password"
              variant="primary"
              rules={{ required: true }}
            />
            <Link
              href={"#"}
              className="flex items-center justify-end font-semibold font-[family-name:var(--font-josefin-sans)] my-2"
            >
              forgot password?
            </Link>
          </div>
        </div>
        <div className="mt-9">
          <CustomButton label="Login" className="w-full" />
        </div>
        {/* <h2 className="text-xs font-[family-name:var(--font-josefin-sans)]">
          Your membership signifies your agreement to the Mansayhub Terms of
          Service and Privacy Policy. You may occasionally receive emails from
          us. Please review our Privacy Policy to understand how we handle your
          personal data.
        </h2> */}
      </form>
    </AuthLayout>
  );
};

export default Login;
