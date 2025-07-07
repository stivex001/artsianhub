"use client";

import { useAuth } from "@/api/crud/auth";
import { AuthUser } from "@/components/api/type";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { CustomButton } from "@/components/clickable/CustomButton";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Google } from "@/components/assets/icons/Google";
import { GoogleAuth } from "./GoogleAuth";

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
  {
    name: "confirmPassword",
    type: "text",
    errorMessage: "Password is required",
  },
];

const ClientSignUp = (props: Props) => {
  const router = useRouter();
  const { control, handleSubmit, formState, watch, setError, clearErrors } =
    useDynamicForm<AuthUser>(fields, {});

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const { isValid } = formState;

  const { registerUser } = useAuth();

  const { isPending, mutateAsync } = registerUser;

  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword !== password) {
        setError("confirmPassword", {
          type: "manual",
          message: "Passwords do not match",
        });
      } else {
        clearErrors("confirmPassword");
      }
    }
  }, [confirmPassword, password, setError, clearErrors]);

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }

    const payload = {
      ...data,
      isClient: true,
    };

    try {
      await mutateAsync(payload, {
        onSuccess: (response: any) => {
          console.log(response, "res_");
          toast.success(response?.message);
          router.push(`/auth/otp?email=${data.email}&&isClient=true`);
        },
        onError: (error: any) => {
          toast.error(error?.message);
        },
      });
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-5 w-full">
          <ControlledInput
            name="email"
            control={control}
            placeholder=""
            type="email"
            label="Email"
            variant="primary"
            rules={{ required: true }}
          />
          <ControlledInput
            name="password"
            control={control}
            placeholder=""
            type="password"
            label="Password"
            variant="primary"
            rules={{ required: true }}
          />
          <ControlledInput
            name="confirmPassword"
            control={control}
            placeholder=""
            type="password"
            label="Confirm New Password"
            variant="primary"
            rules={{ required: true }}
          />
        </div>
        <div className="flex items-center gap-3 my-1">
          <Checkbox />
          <p className="text-sm text-paragrah">
            I agree to the{" "}
            <Link href="#" className="font-medium text-btnprimary">
              Terms of service
            </Link>{" "}
            and{" "}
            <Link href="#" className="font-medium text-btnprimary">
              Privacy Policy
            </Link>{" "}
          </p>
        </div>

        <CustomButton
          type="submit"
          disabled={!isValid}
          isLoading={isPending}
          label="Create My Account"
          className="w-full rounded-[10px]"
          variant="primary"
        />

        <GoogleAuth />

        <Link
          href={"/auth/login"}
          className="text-sm  text-paragrah flex items-center justify-center mt-6 "
        >
          Already have an account?{" "}
          <span className="text-primary ml-1 font-medium">Log in</span>{" "}
        </Link>
      </div>
    </form>
  );
};

export default ClientSignUp;
