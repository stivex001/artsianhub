"use client";

import ArtisanAuthLayout from "@/components/Artisan/auth/ArtisanAuthLayout";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import logo from "@/components/assets/images/logo.png";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useAuth } from "@/api/crud/auth";
import { toast } from "sonner";

type Props = {};

const fields: Field[] = [
  {
    name: "email",
    type: "text",
    errorMessage: "Email or Phone number is required",
    isRequired: true,
  },
  {
    name: "password",
    type: "text",
    errorMessage: "Password is required",
    isRequired: true,
  },
];

const ArtisanLogin = (props: Props) => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useDynamicForm(fields, {});

  const { setAccessToken, accessToken, setCurrentUser } = useAuthStore();

   useEffect(() => {
      if (accessToken) {
        router.replace("/artisan/dashboard");
      }
    }, [router, accessToken]);

  const { isValid } = formState;

  const { loginUser } = useAuth();

  const { isPending, mutateAsync } = loginUser;


  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data, {
        onSuccess: (response: any) => {
          const token = response?.token;
          const user = response?.user;
          if (token) {
            setAccessToken(token);
            setCurrentUser(user);
          }
          toast.success(response?.message);
          router.push("/artisan/dashboard");
        },
        onError: (error: any) => {
          console.log(error, "wrror");
          toast.error(error?.data?.error);
        },
      });
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  return (
    <ArtisanAuthLayout>
      <div className="w-[600px] mx-auto px-8 py-8 flex flex-col items-center justify-center bg-white shadow-dropShadow rounded-[10px]">
        <Link href="/" className="w-[106px] mb-10">
          <Image
            src={logo}
            alt="logo"
            width={106}
            height={83}
            className="w-full h-full object-cover"
          />
        </Link>
        <div>
          <h1 className="font-semibold text-2xl text-center mb-6">
            Welcome Back!
          </h1>
          <p className="text-sm font-semibold">
            Enter your Phone number and Password
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-14 w-full max-w-[260px]"
        >
          <div className="w-full">
            <ControlledInput
              name="email"
              control={control}
              placeholder=""
              type="text"
              label="Email / Phone Number"
              variant="primary"
              rules={{ required: true }}
            />
          </div>
          <div className="w-full">
            <ControlledInput
              name="password"
              control={control}
              placeholder=""
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
          <div className="my-7">
            <CustomButton
              type="submit"
              label="Login"
              className="w-full rounded-[10px]"
              disabled={!isValid}
              isLoading={isPending}
            />
            <Link
              href={"/artisan/auth/signup"}
              className="text-xs font-semibold flex items-center justify-center my-4 "
            >
              Are you new here?{" "}
              <span className="text-primary">Create an Account</span>{" "}
            </Link>
          </div>
        </form>
      </div>
    </ArtisanAuthLayout>
  );
};

export default ArtisanLogin;
