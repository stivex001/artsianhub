"use client";
import Image from "next/image";
import React, { useState } from "react";
import ava from "@/components/assets/images/ava.svg";
import {
  BillingIcon,
  BriefcaseIcon,
  LogoutIcon,
  ProfileIcon,
  SettingsIcon,
} from "../assets/icons/UsersIcon";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/api/crud/user";
import AccountSettingsModal from "../Client/AccountSettingsModal";

type UserNavProps = {
  handleMenuItemClick: any;
  onClose: any;
};

export const UserNav = ({ handleMenuItemClick, onClose }: UserNavProps) => {
  const router = useRouter();
  const { currentUser, logout } = useAuthStore();
  const { getCurrentUser } = useUser();
  const { data: user } = getCurrentUser();
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);

  const profilePhoto = user?.data?.profilePicture;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
    onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-2 min-w-[300px] bg-white rounded-[14px] shadow-usershadow p-2.5 z-50">
      <div className="bg-[#F9F9FB] h-[70px] rounded-2xl p-2.5 flex items-center gap-2">
        <div className="w-12 h-12 flex-shrink-0">
          <Image
            src={profilePhoto || ava}
            alt={`avatar`}
            width={48}
            height={48}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-paragrah text-sm">
            {currentUser?.firstName} {currentUser?.lastName}
          </h3>
          <p className="text-xs text-[#667185]">{currentUser?.email}</p>
        </div>
      </div>

      <div className="my-2">
        <button
          onClick={() => handleMenuItemClick("profile")}
          className="w-full h-[44px] py-3 px-2.5 flex items-center gap-2.5  text-left hover:bg-gray-50 transition-colors"
        >
          <ProfileIcon />
          <span className="text-sm text-body">Profile</span>
        </button>

        <button
          onClick={() => handleMenuItemClick("manage-jobs")}
          className="w-full h-[44px] py-3 px-2.5 flex items-center gap-2.5  text-left hover:bg-gray-50 transition-colors"
        >
          <BriefcaseIcon />
          <span className="text-sm text-body">Manage Jobs</span>
        </button>

        <button
          onClick={() => setIsSettingModalOpen(true)}
          className="w-full h-[44px] py-3 px-2.5 flex items-center gap-2.5  text-left hover:bg-gray-50 transition-colors"
        >
          <SettingsIcon />
          <span className="text-sm text-body">Account Settings</span>
        </button>

        <button
          onClick={() => handleMenuItemClick("billing-payments")}
          className="w-full h-[44px] py-3 px-2.5 flex items-center gap-2.5  text-left hover:bg-gray-50 transition-colors"
        >
          <BillingIcon />
          <span className="text-sm text-body">Billing & Payments</span>
        </button>

        {/* Divider */}
        <div className="my-2 border-t border-gray-100"></div>

        <button
          onClick={handleLogout}
          className="w-full h-[44px] py-3 px-2.5 flex items-center gap-2.5  text-left hover:bg-gray-50 transition-colors"
        >
          <LogoutIcon />
          <span className="text-sm text-body">Log Out</span>
        </button>
      </div>
      <AccountSettingsModal isOpen={isSettingModalOpen} onClose={() => setIsSettingModalOpen(false)} />
    </div>
  );
};
