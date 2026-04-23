"use client";
import { useAuth } from "@/apis/crud/auth";
import { AuthUser } from "@/components/api/type";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { PasswordRequirements } from "@/components/controlledInputs/PasswordRequirements";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React, { useEffect } from "react";
import { toast } from "sonner";
import { KeyRound, ShieldAlert } from "lucide-react";

type Props = {};

const fields: Field[] = [
  { name: "oldPassword", type: "text", errorMessage: "Password is required", isRequired: true },
  { name: "newPassword", type: "text", errorMessage: "Password is required", isRequired: true },
  { name: "confirmNewPassword", type: "text", errorMessage: "Password is required", isRequired: true },
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
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    try {
      await mutateAsync(data, {
        onSuccess: (response: any) => {
          toast.success(response?.message);
          reset();
        },
        onError: (error: any) => {
          toast.error(error?.data?.error || "Failed to update password");
        },
      });
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      {/* ── Security notice banner ───────────────────────────────── */}
      <div className="flex items-start gap-3 px-4 py-4 rounded-xl bg-amber-50 border border-amber-100">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 leading-relaxed">
          Use a strong password with at least 8 characters — mix uppercase,
          numbers, and symbols. Never share your password with anyone.
        </p>
      </div>

      {/* ── Password fields ──────────────────────────────────────── */}
      <div className="flex flex-col gap-6 max-w-md">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-0.5 h-3.5 rounded-full bg-[#02198B]" />
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Change Password
          </p>
        </div>

        <ControlledInput
          name="oldPassword"
          control={control}
          placeholder="Enter your current password"
          type="password"
          label="Current Password"
          variant="primary"
          rules={{ required: true }}
        />

        <div className="flex flex-col gap-3">
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
          {/* Password strength indicators */}
          {password ? (
            <div className="px-3 py-3 rounded-xl bg-gray-50/80 border border-gray-100">
              <div className="flex items-center gap-1.5 mb-2">
                <KeyRound className="w-3 h-3 text-gray-400" />
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Password strength
                </p>
              </div>
              <PasswordRequirements password={password} />
            </div>
          ) : null}
        </div>

        <ControlledInput
          name="confirmNewPassword"
          control={control}
          placeholder="Re-enter new password"
          type="password"
          label="Confirm New Password"
          variant="primary"
          rules={{ required: true }}
        />
      </div>

      {/* ── Save footer ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Password changes take effect immediately
        </p>
        <CustomButton
          type="submit"
          label="Update Password"
          className="rounded-xl"
          variant="primary"
          isLoading={isPending}
          disabled={!isValid}
        />
      </div>
    </form>
  );
};

export default Security;
