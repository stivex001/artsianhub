"use client";

import { useAuth } from "@/api/crud/auth";
import { AuthUser } from "@/components/api/type";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { CustomButton } from "@/components/clickable/CustomButton";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { GoogleAuth } from "./GoogleAuth";
import { useAuthStore } from "@/store/authStore";
import { PasswordRequirements } from "@/components/controlledInputs/PasswordRequirements";
import { BaseModal } from "@/components/shared/BaseModal";
import { PrivacyContent } from "./PrivacyContent";
import { TermsContent } from "./TermsContent";

type Props = {
  role: any;
};

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

const ClientSignUp = ({ role }: Props) => {
  const router = useRouter();
  const { setAccessToken } = useAuthStore();
  const { control, handleSubmit, formState, watch, setError, clearErrors } =
    useDynamicForm<AuthUser>(fields, {});
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

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
    if (!termsAccepted) {
      toast.error("You must accept the Terms and Privacy Policy.");
      return;
    }
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", { message: "Passwords do not match" });
      return;
    }

    const payload = { ...data, role };
    try {
      await mutateAsync(payload, {
        onSuccess: (response: any) => {
          toast.success(response?.message);
          const token = response?.user?.token;
          if (token) setAccessToken(token);
          router.push(`/auth/otp?email=${data.email}&&role=${role}`);
        },
        onError: (error: any) => {
          toast.error(error?.data?.error);
        },
      });
    } catch (error: any) {
      console.log("An error occurred ", error?.data?.error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-5 w-full">
            <ControlledInput
              name="email"
              control={control}
              type="email"
              label="Email"
              variant="primary"
              rules={{ required: true }}
            />
            <ControlledInput
              name="password"
              control={control}
              type="password"
              label="Password"
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
              name="confirmPassword"
              control={control}
              type="password"
              label="Confirm New Password"
              variant="primary"
              rules={{ required: true }}
            />
          </div>

          <div className="flex items-center gap-3 my-1">
            <Checkbox
              checked={termsAccepted}
              onCheckedChange={(val) => setTermsAccepted(Boolean(val))}
            />
            <p className="text-sm text-paragrah">
              I agree to the{" "}
              <button
                type="button"
                onClick={() => setIsTermsOpen(true)}
                className="font-medium text-btnprimary mr-1"
              >
                Terms of Service
              </button>
              and {" "}

              <button
                type="button"
                onClick={() => setIsPrivacyOpen(true)}
                className="font-medium text-btnprimary"
              >
                Privacy Policy
              </button>
            </p>
          </div>

          <CustomButton
            type="submit"
            disabled={!isValid || !termsAccepted}
            isLoading={isPending}
            label="Create My Account"
            className="w-full rounded-[10px]"
            variant="primary"
          />

          <Link
            href={"/auth/login"}
            className="text-sm text-paragrah flex items-center justify-center mt-6"
          >
            Already have an account?{" "}
            <span className="text-primary ml-1 font-medium">Log in</span>
          </Link>
        </div>
      </form>

      <BaseModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        className="p-8 bg-white !rounded-2xl overflow-y-auto no-scrollbar !max-h-[90vh] border-none shadow-none !max-w-[600px] "
      >
        <div className="">
          <PrivacyContent />
        </div>
      </BaseModal>
      <BaseModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
        className="p-8 bg-white !rounded-2xl overflow-y-auto no-scrollbar !max-h-[90vh] border-none shadow-none !max-w-[600px] "
      >
        <div className="">
          <TermsContent />
        </div>
      </BaseModal>
    </>
  );
};

export default ClientSignUp;
