"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import loginAuth from "@/components/assets/images/Login.png";
import AuthLayout from "./AuthLayout";
import { BackNavigation } from "@/components/shared/BackNavigation";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { Field } from "@/schemas/dynamicSchema";
import useDynamicForm from "@/hooks/useDynamicForm";
import { useAuth } from "@/api/crud/auth";
import { toast } from "sonner";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { CustomButton } from "@/components/clickable/CustomButton";
import { ContactSupport } from "./ContactSupport";

type Props = {};

const fields: Field[] = [
  
  {
    name: "newPassword",
    type: "text",
    errorMessage: "Password is required",
    isRequired: true,
  },
];

const ResetPasswordContent = (props: Props) => {
  const params = useSearchParams();
  const email = params.get("email");
  const router = useRouter();

  const { control, handleSubmit, formState } = useDynamicForm(fields, {});

  const { resetPassword } = useAuth();

  const { isValid } = formState;

  const { isPending, mutateAsync } = resetPassword;

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      email,
    };
    try {
      await mutateAsync(payload, {
        onSuccess: (response: any) => {
          toast.success(response?.message);
          router.push(`/auth/login`);
        },
        onError: (error: any) => {
          console.log(error, "error");
          toast.error(error?.data?.error || "Login failed");
        },
      });
    } catch (error) {
      console.log("An error occurred: ", error);
      toast.error("An unexpected error occurred.");
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
          title="Reset your password"
          desc="Kindly Input the password sent to your email"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 w-full">
              <ControlledInput
                name="newPassword"
                control={control}
                placeholder="Password"
                type="password"
                label="Password"
                variant="primary"
                rules={{ required: true }}
              />
            </div>
            <CustomButton
              type="submit"
              label="Reset Password"
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

export default ResetPasswordContent;
