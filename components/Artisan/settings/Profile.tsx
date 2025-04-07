"use client";

import Wrapper from "@/components/shared/Wrapper";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React, { useEffect, useState } from "react";
import ProfilePics from "./ProfilePics";
import EditProfile from "./EditProfile";
import { Pencil } from "lucide-react";
import { useUser } from "@/api/crud/user";
import { CustomButton } from "@/components/clickable/CustomButton";
import { toast } from "sonner";

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
  const { getCurrentArtisanUser, updateArtisanProfile } = useUser();
  const { data: user, refetch } = getCurrentArtisanUser();
  const userDetails: UserDetails | undefined =
    typeof user?.user === "object" ? (user?.user as UserDetails) : undefined;

  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate: updateProfile, isPending } = updateArtisanProfile;

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
    const formData = new FormData();

    if (preview) {
      formData.append("profilePhoto", preview);
    }

    try {
      updateProfile(formData, {
        onSuccess: (response: any) => {
          console.log(response);
          toast.success(response?.message);
          refetch();
          setIsEditing(false);
        },
        onError: (error: any) => {
          console.error("Errorcreatingprofile:", error);
          toast.error(error?.message);
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Wrapper className="py-6 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b border-[#5691D1] px-7">
          <h1 className="text-xl font-semibold pb-4">Profile</h1>
        </div>
        <div className="w-full flex justify-between pt-4 pb-24">
          <ProfilePics
            user={user}
            isEditing={isEditing}
            setSelectedFile={setSelectedFile}
            selectedFile={selectedFile}
            setPreview={setPreview}
            preview={preview}
          />
          <EditProfile control={control} isEditing={isEditing} />
          <div className=" w-[20%] text-end px-8">
            {isEditing ? (
              <CustomButton
                type="submit"
                label="Save Changes"
                className=""
                isLoading={isPending}
              />
            ) : (
              <button
                type="button"
                className="text-primary flex text-end justify-end"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="size-4" />
                Edit
              </button>
            )}
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
