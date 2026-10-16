"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useUser } from "@/apis/crud/user";
import Image from "next/image";
import ava from "@/components/assets/images/ava.svg";
import { UserNav } from "./UserNav";
import { useRouter } from "next/navigation";

type Props = {
  brandlogo?: boolean;
  /** Called when profile dropdown closes (e.g. so parent mobile menu can close) */
  onParentClose?: () => void;
};

export const UserProfile = ({ brandlogo, onParentClose }: Props) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { getCurrentUser } = useUser();
  const { data: user } = getCurrentUser();
  const profilePhoto = user?.data?.profilePicture;

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    onParentClose?.();
  };

  const handleMenuItemClick = (action: string) => {
    router.push(`/${action}`);
    closeDropdown();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownOpen]);

  // Close dropdown on Escape
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleEscape = (e: KeyboardEvent) => { if (e.key === "Escape") closeDropdown(); };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-transparent flex items-center gap-2 relative hover:opacity-80 transition-opacity"
      >
        <div className="w-10 h-10">
          <Image
            src={profilePhoto || ava}
            alt="avatar"
            width={40}
            height={40}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <ChevronDown
          size={20}
          className={`${
            brandlogo ? "text-[#98A2B3]" : "text-white"
          } transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isDropdownOpen && (
        <UserNav
          handleMenuItemClick={handleMenuItemClick}
          onClose={closeDropdown}
        />
      )}
    </div>
  );
};
