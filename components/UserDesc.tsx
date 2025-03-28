"use client";

import { useAuthStore } from "@/store/authStore";
import { getUserInitials } from "@/utils/getUserInitials";
import Image from "next/image";
import React, { useState } from "react";
import { DropdownModal } from "./shared/DropdownModal";
import { PolygonWhite } from "./assets/icons/NavIcons";
import { UserDropdownContent } from "./shared/UserDropdownContent";
import { useUser } from "@/api/crud/user";

type Props = {};

const UserDesc = (props: Props) => {
  const { currentUser } = useAuthStore();
  const { getCurrentArtisanUser } = useUser();
  const { data: user } = getCurrentArtisanUser();

  const profilePhoto = user?.profilePhoto?.url;

  const initials = getUserInitials(
    currentUser?.firstName,
    currentUser?.lastName
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      onClick={() => setIsModalOpen(!isModalOpen)}
      className="flex items-center gap-3 cursor-pointer relative"
    >
      {profilePhoto ? (
        <div className="w-12 h-12 cursor-pointer">
          <Image
            src={profilePhoto}
            alt={`${currentUser?.firstName}`}
            width={48}
            height={48}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      ) : (
        <div className="bg-primary text-white w-12 h-12 flex items-center justify-center rounded-full text-base font-semibold cursor-pointer">
          {initials}
        </div>
      )}
      <div className="flex flex-col">
        <p className="text-primary font-[300] text-xs md:text-xl">
          {currentUser?.firstName} {currentUser?.lastName}
        </p>
        {user?.artisanId && (
          <span className="text-xs text-grayish">
            Artisan ID:{user?.artisanId}
          </span>
        )}
      </div>

      <DropdownModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        icon={PolygonWhite}
        className="!-left-36 !top-20 !w-[300px]"
      >
        <UserDropdownContent onClose={() => setIsModalOpen(false)} />
      </DropdownModal>
    </div>
  );
};

export default UserDesc;
