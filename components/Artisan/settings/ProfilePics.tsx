"use client";

import { CustomButton } from "@/components/clickable/CustomButton";
import { CustomFileUpload } from "@/components/controlledInputs/CustomFileUpload";
import { getUserInitials } from "@/utils/getUserInitials";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

type Props = {
  user: any;
  isEditing: boolean;
  setSelectedFile: any;
  setPreview:any
  selectedFile: File | null;
  preview: string | null;
};

const ProfilePics = ({
  user,
  isEditing,
  setSelectedFile,
  selectedFile,
  setPreview,
  preview
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDelete = () => {
    setSelectedFile(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const profilePhoto = user?.profilePhoto?.url;

  useEffect(() => {
    if (profilePhoto) {
      setPreview(profilePhoto);
    }
  }, [profilePhoto]);

  const initials = getUserInitials(user?.firstName, user?.lastName);


  return (
    <div className="w-[30%] flex flex-col gap-4">
      <div className="px-7">
        <h1 className="text-sm font-semibold">Profile Photo</h1>
        <p className="text-xs font-light">
          This image will be displayed on your profile
        </p>
      </div>

      <div className="w-[130px] h-[130px] rounded-full bg-[#D9D9D9] mx-auto overflow-hidden flex items-center justify-center">
        {preview ? (
          <Image
            src={preview}
            alt="Profile Preview"
            width={130}
            height={130}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-500">{initials}</span>
        )}
      </div>

      {isEditing && (
        <CustomFileUpload
          files={selectedFile ? [selectedFile] : []}
          multiple={false}
          accept="image/*"
          onChange={handleFileChange}
          onRemove={handleDelete}
          render={({ files, openFileDialog, removeFiles, isLoading }) => (
            <div className="flex items-center justify-center">
              <div className="flex gap-2 items-center">
                {/* {files.length > 0 ? <Upload /> : <span>📁</span>} */}
                {/* <p>{files.length > 0 ? `${files.length} file selected` : "No file selected"}</p> */}
              </div>
              <div className="flex gap-2">
                {files.length > 0 ? (
                  <Trash2
                    onClick={removeFiles}
                    className="cursor-pointer text-red-500"
                  />
                ) : (
                  <CustomButton
                    label="Change Photo"
                    onClick={openFileDialog}
                    isLoading={isLoading}
                    className="border border-primary rounded-[5px] bg-transparent text-primary w-fit"
                  />
                )}
              </div>
            </div>
          )}
        />
      )}
    </div>
  );
};

export default ProfilePics;
