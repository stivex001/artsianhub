"use client";

import Wrapper from "@/components/shared/Wrapper";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React from "react";
import ProfilePics from "./ProfilePics";
import EditProfile from "./EditProfile";
import { Pencil } from "lucide-react";

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
];

const Profile = (props: Props) => {
  const { control, handleSubmit, formState } = useDynamicForm(fields, {});

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log("Form submitted", data);
  };

  return (
    <Wrapper className="py-6 ">
      <form action="">
        <div className="border-b border-[#5691D1] px-7">
          <h1 className="text-xl font-semibold pb-4">Profile</h1>
        </div>
        <div className="w-full flex justify-between pt-4 pb-24">
          <ProfilePics />
          <EditProfile control={control} />
          <div className=" w-[20%] text-end px-8">
            <button className="text-primary flex text-end justify-end">
              <Pencil className="size-4" />
              Edit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
