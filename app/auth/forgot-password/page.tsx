"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import Link from "next/link";
import React, { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/api/crud/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import loginAuth from "@/components/assets/images/Login.png";
import AuthLayout from "@/components/Artisan/auth/AuthLayout";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { BackNavigation } from "@/components/shared/BackNavigation";
import { ContactSupport } from "@/components/Artisan/auth/ContactSupport";

type Props = {};

const fields: Field[] = [
  {
    name: "email",
    type: "text",
    errorMessage: "Email is required",
    isRequired: true,
  },
];

const ForgotPassword = (props: Props) => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useDynamicForm(fields, {});

  const { forgotPassword } = useAuth();

  const { isValid } = formState;

  const { isPending, mutateAsync } = forgotPassword;

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data, {
        onSuccess: (response: any) => {
          toast.success(response?.message);
          router.push(
            `/auth/verify-email?email=${encodeURIComponent(data?.email)}`
          );
        },
        onError: (error: any) => {
          console.log(error, "error");
          toast.error(error?.data?.message);
        },
      });
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  return (
    <AuthLayout
      authImg={loginAuth}
      title="Where Great Work Meets Real Opportunities"
      desc="Whether you're booking help or offering your skills, Artisanshubis your trusted space to connect, work, and grow."
    >
      <div className="flex flex-col gap-10">
        <BackNavigation />
        <AuthTitle
          title="Recover your password"
          desc="Enter the email that you used when you signed up to recover your password. You will receive a 6 digit pin."
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 w-full">
              <ControlledInput
                name="email"
                control={control}
                placeholder="Enter Email"
                type="text"
                label="Email"
                variant="primary"
                rules={{ required: true }}
              />
            </div>
            <CustomButton
              type="submit"
              label="Send Code"
              className="w-full rounded-[10px]"
              disabled={!isValid}
              isLoading={isPending}
            />

            <ContactSupport />
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
