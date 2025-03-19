"use client";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { AuthLayout } from "@/components/pages/auth/AuthLayout";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import Link from "next/link";
import React from "react";
import google from "@/components/assets/images/google.svg";
import Image from "next/image";
import { GoogleIcon } from "@/components/assets/icons/NavIcons";
import { GoogleLogoIcon } from "@/components/assets/icons/ArtsIcons";

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
      <form onSubmit={handleSubmit(onSubmit)} className="w-8/12 mx-auto pt-16">
        <div className="flex flex-col  gap-3 mb-14">
          <h1 className="font-semibold text-2xl text-center ">Sign In</h1>
          <span className="font-semibold text-sm text-center ">
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
              className="flex items-center justify-end font-semibold  my-2"
            >
              forgot password?
            </Link>
          </div>
        </div>
        <div className="my-9">
          <CustomButton
            type="submit"
            label="Login"
            className="w-full rounded-[10px]"
          />
        </div>
        <div className="flex flex-col gap-5 justify-center">
          <span className="text-center font-[200] text-[10px]">
            Or sign in with google
          </span>
          <button
            type="button"
            className="flex items-center justify-center gap-2 h-9 border border-[#878E96] rounded-[10px] text-sm font-bold text-[#6C6F73]"
          >
            <Image src={google} alt="google" />
            <span className="mt-0.5">Continue with Google</span>
          </button>
        </div>
        <h2 className=" max-w-xs mx-auto text-xs font-[300] absolute left-10 bottom-6 ">
          Your membership signifies your agreement to the Mansayhub Terms of
          Service and Privacy Policy. You may occasionally receive emails from
          us. Please review our Privacy Policy to understand how we handle your
          personal data.
        </h2>
      </form>
    </AuthLayout>
  );
};

export default Login;
