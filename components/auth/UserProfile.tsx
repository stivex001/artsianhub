"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  User,
  Settings,
  CreditCard,
  LogOut,
  Briefcase,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useUser } from "@/api/crud/user";
import { getUserInitials } from "@/utils/getUserInitials";
import Image from "next/image";
import ava from "@/components/assets/images/ava.svg";
import { UserNav } from "./UserNav";

type Props = {
  brandlogo?: boolean;
};

export const UserProfile = ({ brandlogo }: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { currentUser } = useAuthStore();
  //   const { getCurrentArtisanUser } = useUser();
  //   const { data: user } = getCurrentArtisanUser();

  //   const profilePhoto = user?.profilePhoto?.url;

  //   const initials = getUserInitials(
  //     currentUser?.firstName,
  //     currentUser?.lastName
  //   );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleMenuItemClick = (action: string) => {
    console.log(`Clicked: ${action}`);
    closeDropdown();
    // Handle navigation or actions here
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close dropdown on escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="bg-transparent flex items-center gap-2 relative hover:opacity-80 transition-opacity"
      >
        <div className="w-10 h-10">
        
          <Image
            src={currentUser?.profilePicture ||ava}
            alt={`avatar`}
            width={40}
            height={40}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <ChevronDown
          size={20}
          className={`${
            brandlogo ? "text-[#98A2B3]" : "text-white"
          }  transition-transform duration-200 ${
            isDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <UserNav
          handleMenuItemClick={handleMenuItemClick}
          onClose={() => setIsDropdownOpen(false)}
        />
      )}
    </div>
  );
};
