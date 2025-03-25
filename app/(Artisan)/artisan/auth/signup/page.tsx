"use client";

import { useAuth } from "@/api/crud/auth";
import { AuthUser } from "@/components/api/type";
import ArtisanAuthLayout from "@/components/Artisan/auth/ArtisanAuthLayout";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

type Props = {};

const fields: Field[] = [
  {
    name: "firstName",
    type: "text",
    errorMessage: "first Name is required",
    isRequired: true,
  },
  {
    name: "lastName",
    type: "text",
    errorMessage: "Last Name is required",
    isRequired: true,
  },
  {
    name: "email",
    type: "email",
    errorMessage: "Email is required",
    isRequired: true,
  },
  {
    name: "phoneNumber",
    type: "text",
    errorMessage: "phone Number is required",
    isRequired: true,
  },
  {
    name: "dateOfBirth",
    type: "date",
    errorMessage: "DOB is required",
    isRequired: true,
  },
  {
    name: "specialization",
    type: "text",
    errorMessage: "specialization is required",
    isRequired: true,
  },
  {
    name: "residentialAddress",
    type: "text",
    errorMessage: "Address is required",
    isRequired: true,
  },
  {
    name: "gender",
    type: "text",
    errorMessage: "Gender is required",
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

const gender = [
  {
    id: 1,
    label: "Male",
    value: "male",
  },
  {
    id: 2,
    label: "Female",
    value: "female",
  },
];

const ArtisanRegister = (props: Props) => {
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
      isArtisan: true,
    };

    try {
      await mutateAsync(payload, {
        onSuccess: (response: any) => {
          console.log(response, "res_");
          toast.success(response?.message);
          router.push(`/auth/otp?email=${data.email}&&isArtisan=true`);
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
    <ArtisanAuthLayout>
    <div className="w-11/12 lg:w-[600px] mx-auto px-3 lg:px-8 pt-3 pb-8 bg-white shadow-dropShadow rounded-[10px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-semibold text-xl text-center ">
          Create your Account as an Artisan
        </h1>
        <div className="mt-7 flex flex-col gap-5">
          <h1 className="font-semibold text-base">Get Started</h1>
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="w-full">
              <ControlledInput
                name="firstName"
                control={control}
                placeholder=""
                type="text"
                label="First Name"
                variant="primary"
                rules={{ required: true }}
                art
              />
            </div>
            <div className="w-full">
              <ControlledInput
                name="lastName"
                control={control}
                placeholder=""
                type="text"
                label="Last Name"
                variant="primary"
                rules={{ required: true }}
                art
              />
            </div>
          </div>
          <div className="w-full">
            <ControlledInput
              name="email"
              control={control}
              placeholder=""
              type="email"
              label="Email"
              variant="primary"
              rules={{ required: true }}
              art
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            <div className="w-full">
              <ControlledInput
                name="phoneNumber"
                control={control}
                placeholder=""
                type="number"
                label="Phone Number"
                variant="primary"
                rules={{ required: true }}
                art
              />
            </div>
            <div className="w-full">
              <ControlledInput
                name="dateOfBirth"
                control={control}
                placeholder="Enter"
                type="date"
                label="Date Of Birth"
                variant="primary"
                rules={{ required: true }}
                art
              />
            </div>
          </div>

          <div className="w-full">
            <ControlledInput
              name="specialization"
              control={control}
              placeholder="Specific skills or services offered"
              type="text"
              label="Trade or Specialization"
              variant="primary"
              rules={{ required: true }}
              art
            />
          </div>
          <div className="flex flex-col lg:flex-row gap-8 w-full">
            <div className="w-full">
              <ControlledInput
                name="residentialAddress"
                control={control}
                placeholder="Complete current address"
                type="text"
                label="Residential Address"
                variant="primary"
                rules={{ required: true }}
                art
              />
            </div>
            <div className="w-full">
              <ControlledSelect
                name="gender"
                label="Gender*(optional)"
                options={gender}
                control={control}
                variant="primary"
                art
              />
            </div>
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
              art
            />
          </div>
          <div className="w-full">
            <ControlledInput
              name="confirmPassword"
              control={control}
              placeholder=""
              type="password"
              label="Confirm New Password"
              variant="primary"
              rules={{ required: true }}
              art
            />
          </div>

          <div className="my-9 w-[200px] mx-auto">
            <CustomButton
              type="submit"
              disabled={!isValid}
              isLoading={isPending}
              label="Create My Account"
              className="w-full rounded-[10px]"
            />
          </div>
        </div>
      </form>
      <Link
        href={"/artisan/auth/login"}
        className="text-xs font-semibold flex items-center justify-end "
      >
        Already have an account? <span className="text-primary">Log in</span>{" "}
      </Link>
    </div>
  </ArtisanAuthLayout>
  );
};

export default ArtisanRegister;
