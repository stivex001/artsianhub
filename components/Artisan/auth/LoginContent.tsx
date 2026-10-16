"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/apis/crud/auth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import loginAuth from "@/components/assets/images/Login.png";
import AuthLayout from "@/components/Artisan/auth/AuthLayout";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { CustomModal } from "@/components/modals/CustomModal";
import { ConfirmIcon } from "@/components/assets/icons/ModalIcon";

type Props = {};

const fields: Field[] = [
  {
    name: "email",
    type: "text",
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

const LoginContent = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [openVerify, setOpenVerify] = useState(false);
  const [unverifiedRole, setUnverifiedRole] = useState<string | null>(null);

  const { control, handleSubmit, formState } = useDynamicForm(fields, {});
  const { isValid } = formState;

  const { setAccessToken, accessToken, setCurrentUser, currentUser } =
    useAuthStore();

  const { loginUser, resendOTP } = useAuth();
  const { isPending, mutateAsync} = loginUser;
  const { isPending: resendPending, mutateAsync: resendOtp } = resendOTP;

  // Role-based fallback redirect
  const redirectByRole = (role: string) => {
    if (role === "admin") {
      router.replace("/admin/dashboard");
    } else if (role === "artisan") {
      router.replace("/artisan/dashboard");
    } else if (role === "client") {
      router.replace("/");
    } else {
      console.log("Role not recognized. Please contact support.");
      router.replace("/auth/login");
    }
  };

  // If already logged in and no redirect param, send them to role dashboard
  useEffect(() => {
    if (accessToken && currentUser && !redirect) {
      redirectByRole(currentUser?.role);
    }
  }, [accessToken, currentUser, redirect]);

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data, {
        onSuccess: (response: any) => {
          const token = response?.token;
          const user = response?.user;

          if (token && user) {
            setAccessToken(token);
            setCurrentUser(user);
            toast.success(response?.message);

            if (redirect) {
              router.push(redirect); // Send back to original page
            } else {
              redirectByRole(user.role); // Fallback to role dashboard
            }
          } else {
            toast.error("Invalid login response.");
          }
        },
        onError: (error: any) => {
          console.log(error, "error_logging");
          if (
            error?.status === 403 ||
            error?.data?.error === "User account not verified yet"
          ) {
            const role = error?.data?.user?.role;
            if (role) setUnverifiedRole(role);
            setOpenVerify(true);
          }
          toast.error(error?.data?.error || "Login failed");
        },
      });
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  const handleVerifyAccount = async (data: any) => {
    const payload = new FormData();
    payload.append("email", data.email || "");

    try {
      await resendOtp(payload, {
        onSuccess: (response: any) => {
          toast.success(response?.message);
          router.push(`/auth/otp?email=${data.email}&&role=${data.role || ""}`);
        },
        onError: (error: any) => {
          toast.error(error?.data?.error);
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
      desc="Whether you're booking help or offering your skills, Artisanshub is your trusted space to connect, work, and grow."
    >
      <div className="flex flex-col gap-10">
        <AuthTitle title="Welcome Back!" desc="Enter your email and password" />
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
                href={"/auth/forgot-password"}
                className="flex items-center justify-end font-semibold text-primary text-sm"
              >
                forgot password?
              </Link>
            </div>
            <CustomButton
              type="submit"
              label="Login"
              className="w-full rounded-[10px]"
              disabled={!isValid}
              isLoading={isPending}
            />
            <Link
              href={"/auth/onboarding"}
              className="text-sm text-paragrah flex items-center justify-center mt-6"
            >
              Don’t have an account?
              <span className="text-primary ml-1 font-medium">Sign Up</span>
            </Link>
          </div>
        </form>
      </div>
      <CustomModal
        isOpen={openVerify}
        onClose={() => setOpenVerify(false)}
        icon={<ConfirmIcon />}
      >
        <div className="text-center">
          <h1 className="text-lg font-bold text-paragrah">
            Account Not Verified
          </h1>
          <p className="text-sm text-body mt-2">
            Your account has not been verified yet. Click the button below to
            receive a new verification code.
          </p>
        </div>
        <CustomButton
          type="button"
          label="Resend Verification Code"
          className="w-full rounded-xl mt-4"
          variant="primary"
          onClick={() =>
            handleVerifyAccount({
              email: control._formValues.email,
              role: unverifiedRole,
            })
          }
          isLoading={resendPending}
        />
      </CustomModal>
    </AuthLayout>
  );
};

export default LoginContent;
