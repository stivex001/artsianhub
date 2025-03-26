"use client";

import { useAuthStore } from "@/store/authStore";
import Image from "next/image";
import React from "react";

type Props = {};

const UserDesc = (props: Props) => {
  const { currentUser } = useAuthStore();

  const getInitials = () => {
    if (!currentUser?.firstName || !currentUser?.lastName) return "CN";
    return `${currentUser.firstName[0]}${currentUser.lastName[0]}`.toUpperCase();
  };

  return (
    <div className="flex items-center gap-5">
      <h2 className="text-primary font-[300] text-xs md:text-xl">
        {currentUser?.firstName} {currentUser?.lastName}
      </h2>
      {currentUser?.profile ? (
        <div className="w-12 h-12 cursor-pointer">
          <Image
            src={currentUser?.profile}
            alt={currentUser?.firstName}
            width={48}
            height={48}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      ) : (
        <div className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-full text-base font-semibold cursor-pointer">
          {getInitials()}
        </div>
      )}
    </div>
  );
};

export default UserDesc;
