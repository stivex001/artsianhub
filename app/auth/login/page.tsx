"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import Link from "next/link";
import React, { useEffect } from "react";
import google from "@/components/assets/images/google.svg";
import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/api/crud/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import custauth from "@/components/assets/images/SignCustomers.png";
import AuthLayout from "@/components/Artisan/auth/AuthLayout";
import { AuthTitle } from "@/components/auth/AuthTitle";
import { GoogleAuth } from "@/components/Artisan/auth/GoogleAuth";

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

const Login = (props: Props) => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useDynamicForm(fields, {});

  const { setAccessToken, accessToken, setCurrentUser, currentUser } =
    useAuthStore();

  useEffect(() => {
    if (accessToken && currentUser) {
      if (currentUser?.isAdmin) {
        router.replace("/admin/dashboard");
      } else if (currentUser?.isArtisan) {
        router.replace("/artisan/dashboard");
      } else if (currentUser?.isClient) {
        router.replace("/");
      }
    }
  }, [accessToken, currentUser, router]);

  const { isValid } = formState;

  const { loginUser } = useAuth();

  const { isPending, mutateAsync } = loginUser;

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data, {
        onSuccess: (response: any) => {
          const token = response?.token;
          const user = response?.user;

          console.log(user, "user");

          if (token && user) {
            setAccessToken(token);
            setCurrentUser(user);

            toast.success(response?.message);

            // Redirect based on role
            if (user?.isAdmin === true) {
              router.push("/admin/dashboard");
            } else if (user?.isArtisan === true) {
              router.push("/artisan/dashboard");
            } else if (user?.isClient === true) {
              router.push("/");
            } else {
              toast.error("Role not recognized. Please contact support.");
              router.push("/auth/login");
            }
          } else {
            toast.error("Invalid login response.");
          }
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
      authImg={custauth}
      title="Where Great Work Meets Real Opportunities"
      desc="Whether you're booking help or offering your skills, MensayHub is your trusted space to connect, work, and grow."
    >
      <div className="flex flex-col gap-10">
        <AuthTitle title="Welcome Back!" desc="Enter your email and password" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-5 w-full">
              <ControlledInput
                name="email"
                control={control}
                placeholder="Enter Email / Phone Number"
                type="text"
                label="Email / Phone Number"
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
                href={"#"}
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

            <GoogleAuth />

            <Link
              href={"/auth/onboarding"}
              className="text-sm  text-paragrah flex items-center justify-center mt-6 "
            >
              Don’t have an account?{" "}
              <span className="text-primary ml-1 font-medium">Sign Up</span>{" "}
            </Link>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
