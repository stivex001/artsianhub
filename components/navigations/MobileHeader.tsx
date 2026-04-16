"use client";

import { CustomButton } from "../clickable/CustomButton";
import { BarMenuIcon } from "../assets/icons/SvgIcons";
import { navLinks } from "./Header";
import { JSX, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CategoriesIcon, HowItWorksIcon } from "../assets/icons/NavIcons";
import { ShieldCloseIcon } from "lucide-react";
import { InlineAuthLoader } from "../auth/AuthLoader";
import { useUser } from "@/apis/crud/user";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";
import {
  BriefcaseIcon,
  LogoutIcon,
  SettingsIcon,
} from "../assets/icons/UsersIcon";
import Image from "next/image";
import ava from "@/components/assets/images/ava.svg";

type Props = {
  handleScrollTo?: (id: string) => void;
  activeSection?: string;
  isLoggedIn?: boolean;
  isHydrated?: boolean;
  brandlogo?: boolean;
};

export const MobileHeader = ({
  handleScrollTo,
  activeSection,
  isLoggedIn,
  isHydrated = true,
  brandlogo,
}: Props) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);
  const closeDropdown = () => setIsDropdownOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDropdown();
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isDropdownOpen]);

  // Optional icons mapped by nav ID
  const linkIcons: Record<string, JSX.Element> = {
    categories: <CategoriesIcon />,
    howitworks: <HowItWorksIcon />,
  };

  const handleNavClick = (linkId: string) => {
    if (handleScrollTo) {
      handleScrollTo(linkId);
    }
    // Close dropdown after a small delay to ensure scroll completes
    setTimeout(() => closeDropdown(), 100);
  };

  const handleLoginClick = () => {
    closeDropdown();
    // Use setTimeout to ensure dropdown closes before navigation
    setTimeout(() => router.push(`/auth/login`), 100);
  };

  const handleSignupClick = () => {
    closeDropdown();
    setTimeout(() => router.push(`/auth/onboarding`), 100);
  };

  const { logout } = useAuthStore();
  const { getCurrentUser } = useUser({ enabled: !!isLoggedIn && isHydrated });
  const { data: userData } = getCurrentUser();
  const user = userData?.data;

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/");
    closeDropdown();
  };

  const profilePhoto = user?.profilePicture;

  // Render auth section based on hydration state
  const renderAuthSection = () => {
    // Show loading spinner while hydrating
    if (!isHydrated) {
      return (
        <div className="py-2">
          <InlineAuthLoader height="h-10" />
        </div>
      );
    }

    if (isLoggedIn) {
      return (
        <div className="flex flex-col gap-1 w-full">
          <div className="bg-[#F9F9FB] rounded-2xl p-3 flex items-center gap-3 mb-2">
            <div className="w-10 h-10 flex-shrink-0">
              <Image
                src={profilePhoto || ava}
                alt="avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-paragrah text-sm truncate">
                {user?.firstName} {user?.lastName}
              </h3>
              <p className="text-xs text-[#667185] truncate">{user?.email}</p>
            </div>
          </div>

          <button
            onClick={() => {
              router.push("/manage-jobs");
              closeDropdown();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-lightp hover:bg-gray-50 transition-colors"
          >
            <BriefcaseIcon />
            <span>Manage Jobs</span>
          </button>

          <button
            onClick={() => {
              router.push("/settings");
              closeDropdown();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-lightp hover:bg-gray-50 transition-colors"
          >
            <SettingsIcon />
            <span>Account Settings</span>
          </button>

          <div className="my-1 border-t border-gray-100"></div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-lightp hover:bg-gray-50 transition-colors"
          >
            <LogoutIcon />
            <span>Log Out</span>
          </button>
        </div>
      );
    }

    return (
      <>
        <CustomButton
          variant="transparent"
          className="w-full border border-bordergrey rounded-[6px] text-sm text-lightp font-medium"
          onClick={handleLoginClick}
          label="Login"
        />
        <CustomButton
          className="w-full"
          onClick={handleSignupClick}
          label="Sign Up"
        />
      </>
    );
  };

  return (
    <div className="relative md:hidden" ref={dropdownRef}>
      <button onClick={toggleDropdown}>
        <BarMenuIcon />
      </button>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 min-w-[300px] bg-white rounded-[14px] shadow-usershadow p-4 z-50 overflow-visible"
          >
            <div className="flex justify-end mb-4">
              <button onClick={closeDropdown}>
                <ShieldCloseIcon />
              </button>
            </div>

            <div className="flex flex-col gap-2 mb-5">
              {navLinks.map((link) => {
                const icon = linkIcons[link.id];

                const handleClick = () => {
                  closeDropdown();

                  if (link.href?.startsWith("/#")) {
                    const id = link.href.split("#")[1];
                    const element = document.getElementById(id);
                    if (element) {
                      handleScrollTo?.(id);
                      return;
                    }
                  }

                  if (link.href === "/" && window.location.pathname === "/") {
                    handleScrollTo?.("home");
                    return;
                  }

                  if (link.href) {
                    setTimeout(() => router.push(link.href!), 100);
                    return;
                  }

                  if (handleScrollTo && link.id) {
                    setTimeout(() => handleScrollTo(link.id), 50);
                  }
                };

                return (
                  <button
                    key={link.id}
                    onClick={handleClick}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors 
      ${
        activeSection === link.id
          ? "text-primary bg-gray-100"
          : "text-lightp hover:bg-gray-50"
      }`}
                  >
                    {icon && <span>{icon}</span>}
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3">{renderAuthSection()}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
