"use client";

import { UploadFileComponent } from "@/components/controlledInputs/UploadFileComponent";
import Image from "next/image";
import React, { useRef, useState } from "react";

type Props = {};

const ProfilePics = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState(null);

  console.log(selectedFile, "select");

  const handleFileChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDelete = () => {
    setSelectedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-[30%] flex flex-col gap-4 ">
      <div className="px-7">
        <h1 className="text-sm font-semibold">Profile Photo</h1>
        <p className="text-xs font-[300]">
          This image will be displayed on your profile
        </p>
      </div>
      <div className="w-[130px] h-[130px] rounded-full bg-[#D9D9D9] mx-auto">
        <Image src={selectedFile ?? ""} alt="" />
      </div>
      <button className="border border-primary rounded-[5px] text-primary text-sm font-semibold w-fit py-3 px-1.5 mx-auto">
        Change Photo
      </button>
      {/* <UploadFileComponent
        description="Upload a file"
        format="JPG, PNG, JPEG"
        maxSize={5}
        inputRef={inputRef}
        progress={0}
        isLoading={false}
        files={selectedFile ? [selectedFile] : []}
        fileName={selectedFile?.name}
        accept="image/png, image/jpeg, image/jpg"
        onChange={handleFileChange}
        buttonClick={handleDelete}
      /> */}
    </div>
  );
};

export default ProfilePics;
