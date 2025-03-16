import React from "react";

type Props = {};

const ProfilePics = (props: Props) => {
  return (
    <div className="w-[30%] flex flex-col gap-4 ">
      <div className="px-7">
        <h1 className="text-sm font-semibold">Profile Photo</h1>
        <p className="text-xs font-[300]">
          This image will be displayed on your profile
        </p>
      </div>
      <div className="w-[130px] h-[130px] rounded-full bg-[#D9D9D9] mx-auto"></div>
      <button className="border border-primary rounded-[5px] text-primary text-sm font-semibold w-fit py-3 px-1.5 mx-auto">
        Change Photo
      </button>
    </div>
  );
};

export default ProfilePics;
