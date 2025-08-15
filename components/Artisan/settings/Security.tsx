"use client";
import { useAuth } from "@/api/crud/auth";
import { AuthUser } from "@/components/api/type";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { PasswordRequirements } from "@/components/controlledInputs/PasswordRequirements";
import { Descriptions } from "@/components/shared/Headings";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {};

const fields: Field[] = [
  {
    name: "oldPassword",
    type: "text",
    errorMessage: "Password is required",
    isRequired: true,
  },
  {
    name: "newPassword",
    type: "text",
    errorMessage: "Password is required",
    isRequired: true,
  },
  {
    name: "confirmNewPassword",
    type: "text",
    errorMessage: "Password is required",
    isRequired: true,
  },
];

const Security = (props: Props) => {
  const { control, handleSubmit, formState, setError, watch, clearErrors, reset } =
    useDynamicForm<AuthUser>(fields, {});

  const { changePassword } = useAuth();

  const password = watch("newPassword");
  const confirmPassword = watch("confirmPassword");

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

  const { isValid } = formState;

  const { isPending, mutateAsync } = changePassword;

  const onSubmit = async (data: any) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        message: "Passwords do not match",
      });
      return;
    }

    const payload = {
      ...data,
    };
    try {
      await mutateAsync(payload, {
        onSuccess: (response: any) => {
          toast.success(response?.message);
          reset()
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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <Descriptions
        title="Account Settings"
        desc="Manage your personal details, services, documents, and preferences. You can update them anytime."
      />
      <div className="space-y-6 w-1/2">
        <div className="flex flex-col gap-5">
          <ControlledInput
            name="oldPassword"
            control={control}
            placeholder="Enter old password"
            type="password"
            label="Old Password"
            variant="primary"
            rules={{ required: true }}
          />
          <ControlledInput
            name="newPassword"
            control={control}
            placeholder="Enter new password"
            type="password"
            label="New Password"
            variant="primary"
            rules={{
              required: { value: true, message: "Password is required" },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{6,}$/,
                message: "Password must meet all requirements",
              },
            }}
          />
          <PasswordRequirements password={password} />
          <ControlledInput
            name="confirmNewPassword"
            control={control}
            placeholder="Confirm password"
            type="password"
            label="Confirm Password"
            variant="primary"
            rules={{ required: true }}
          />
        </div>
        <div className="w-fit">
          <CustomButton
            type="submit"
            label="Save Password"
            className="w-full rounded-xl"
            variant="primary"
            isLoading={isPending}
            disabled={!isValid}
          />
        </div>
      </div>
    </form>
  );
};

export default Security;
