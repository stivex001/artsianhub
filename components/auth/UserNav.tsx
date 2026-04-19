"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import ava from "@/components/assets/images/ava.svg";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUser } from "@/apis/crud/user";
import {
  Briefcase,
  Settings,
  LogOut,
  LifeBuoy,
  ChevronRight,
} from "lucide-react";

type UserNavProps = {
  handleMenuItemClick: (action: string) => void;
  onClose: () => void;
};

const MenuItem = ({
  icon: Icon,
  label,
  sublabel,
  iconBg,
  iconColor,
  onClick,
  danger,
}: {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  iconBg: string;
  iconColor: string;
  onClick: () => void;
  danger?: boolean;
}) => (
  <button
    onClick={onClick}
    className={`group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all
      ${danger
        ? "hover:bg-red-50 text-gray-700 hover:text-red-600"
        : "hover:bg-gray-50 text-gray-700"
      }`}
  >
    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${iconBg}`}>
      <Icon className={`w-4 h-4 ${iconColor}`} />
    </div>
    <div className="flex-1 text-left">
      <p className={`text-sm font-medium leading-tight ${danger ? "group-hover:text-red-600" : ""}`}>
        {label}
      </p>
      {sublabel && (
        <p className="text-[11px] text-gray-400 mt-0.5 leading-none">{sublabel}</p>
      )}
    </div>
    {!danger && (
      <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 transition-colors" />
    )}
  </button>
);

export const UserNav = ({ handleMenuItemClick, onClose }: UserNavProps) => {
  const router = useRouter();
  const { logout } = useAuthStore();
  const { getCurrentUser } = useUser();
  const { data: user } = getCurrentUser();

  const profilePhoto = user?.data?.profilePicture;
  const currentUser = user?.data;

  const initials =
    currentUser?.firstName && currentUser?.lastName
      ? `${currentUser.firstName[0]}${currentUser.lastName[0]}`.toUpperCase()
      : "U";

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
    onClose();
  };

  return (
    <div className="absolute right-0 top-full mt-2.5 w-[300px] bg-white rounded-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.04)] z-50 overflow-hidden">

      {/* ── User info card ─────────────────────────────────────────── */}
      <div className="relative px-4 pt-4 pb-3.5 bg-gradient-to-br from-[#02198B]/[0.04] to-[#02198B]/[0.02] border-b border-gray-100">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-xl ring-2 ring-white shadow-sm flex-shrink-0 overflow-hidden">
            {profilePhoto ? (
              <Image
                src={profilePhoto}
                alt="avatar"
                width={44}
                height={44}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#02198B] flex items-center justify-center">
                <span className="text-white text-sm font-bold">{initials}</span>
              </div>
            )}
          </div>

          {/* Name & email */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">
              {currentUser?.firstName} {currentUser?.lastName}
            </p>
            <p className="text-[11px] text-gray-500 truncate mt-0.5">
              {currentUser?.email}
            </p>
          </div>
        </div>

        {/* Active badge */}
        <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-0.5 bg-green-50 rounded-full border border-green-100">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-[10px] font-semibold text-green-600">Active</span>
        </div>
      </div>

      {/* ── Menu items ─────────────────────────────────────────────── */}
      <div className="p-2 flex flex-col gap-0.5">
        <MenuItem
          icon={Briefcase}
          label="Manage Jobs"
          sublabel="View and manage your job listings"
          iconBg="bg-blue-50"
          iconColor="text-blue-500"
          onClick={() => { handleMenuItemClick("manage-jobs"); }}
        />
        <MenuItem
          icon={Settings}
          label="Account Settings"
          sublabel="Privacy, security & preferences"
          iconBg="bg-gray-100"
          iconColor="text-gray-500"
          onClick={() => { handleMenuItemClick("settings"); }}
        />
        <Link
          href="/support"
          onClick={onClose}
          className="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all hover:bg-gray-50 text-gray-700"
        >
          <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-indigo-50">
            <LifeBuoy className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium leading-tight">Support Ticket</p>
            <p className="text-[11px] text-gray-400 mt-0.5 leading-none">Get help from our support team</p>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-gray-400 transition-colors" />
        </Link>
      </div>

      {/* ── Divider + logout ───────────────────────────────────────── */}
      <div className="px-2 pb-2">
        <div className="h-px bg-gray-100 mb-2 mx-1" />
        <MenuItem
          icon={LogOut}
          label="Log Out"
          iconBg="bg-red-50"
          iconColor="text-red-400"
          onClick={handleLogout}
          danger
        />
      </div>
    </div>
  );
};
