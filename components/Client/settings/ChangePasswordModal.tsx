"use client";
import { useAuth } from "@/apis/crud/auth";
import { AuthUser } from "@/components/api/type";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { PasswordRequirements } from "@/components/controlledInputs/PasswordRequirements";
import { BaseModal } from "@/components/shared/BaseModal";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

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

const ChangePasswordModal = ({ isOpen, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    formState,
    setError,
    watch,
    clearErrors,
    reset,
  } = useDynamicForm<AuthUser>(fields, {});

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
          reset();
          onClose();
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
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="lg:p-8 bg-white border-none shadow-none !max-w-xl !rounded-2xl overflow-hidden "
      title="Change Password"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 px-4 pb-4 min-h-[50vh]">
        <div className="space-y-6 ">
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
    </BaseModal>
  );
};

export default ChangePasswordModal;
