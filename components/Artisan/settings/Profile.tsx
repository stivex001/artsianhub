"use client";

import Wrapper from "@/components/shared/Wrapper";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React, { useEffect } from "react";
import ProfilePics from "./ProfilePics";
import EditProfile from "./EditProfile";
import { Pencil } from "lucide-react";
import { useUser } from "@/api/crud/user";

type Props = {};

const fields: Field[] = [
  {
    name: "firstName",
    type: "text",
  },
  {
    name: "lastName",
    type: "text",
  },
  {
    name: "email",
    type: "email",
  },
  {
    name: "phoneNumber",
    type: "text",
  },
  {
    name: "dateOfBirth",
    type: "date",
  },
  {
    name: "specialization",
    type: "text",
  },
  {
    name: "residentialAddress",
    type: "text",
  },
  {
    name: "gender",
    type: "text",
  },
];

type UserDetails = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  specialization?: string;
  residentialAddress?: string;
  dateOfBirth?: string;
  gender?: string;
};

const Profile = (props: Props) => {
  const { getCurrentArtisanUser } = useUser();
  const { data: user } = getCurrentArtisanUser();
  const userDetails: UserDetails | undefined =
    typeof user?.user === "object" ? (user?.user as UserDetails) : undefined;

  console.log(userDetails, "userdetails__");

  const { control, handleSubmit, formState, setValue } = useDynamicForm(
    fields,
    {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: "",
      specialization: "",
      residentialAddress: "",
      gender: "",
    }
  );

  useEffect(() => {
    if (userDetails) {
      fields.forEach((field) => {
        const key = field.name as keyof UserDetails;
        if (userDetails[key] !== undefined) {
          setValue(key, userDetails[key] as string);
        }
      });
    }
  }, [userDetails, setValue]);

  const onSubmit = (data: any) => {
    // Handle form submission
    console.log("Form submitted", data);
  };

  return (
    <Wrapper className="py-6 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b border-[#5691D1] px-7">
          <h1 className="text-xl font-semibold pb-4">Profile</h1>
        </div>
        <div className="w-full flex justify-between pt-4 pb-24">
          <ProfilePics user={user} />
          <EditProfile control={control} />
          <div className=" w-[20%] text-end px-8">
            <button
              type="submit"
              className="text-primary flex text-end justify-end"
            >
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
