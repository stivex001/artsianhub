"use client";

import { CustomButton } from "../clickable/CustomButton";
import { BarMenuIcon } from "../assets/icons/SvgIcons";
import { navLinks } from "./Header";
import { UserProfile } from "../auth/UserProfile";
import { JSX, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CategoriesIcon, HowItWorksIcon } from "../assets/icons/NavIcons";
import { ShieldCloseIcon } from "lucide-react";

type Props = {
  handleScrollTo?: (id: string) => void;
  activeSection?: string;
  isLoggedIn?: boolean;
  brandlogo?: boolean;
};

export const MobileHeader = ({
  handleScrollTo,
  activeSection,
  isLoggedIn,
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
    setTimeout(() => router.push(`/auth/signup?role=client`), 100);
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

            <div className="flex flex-col gap-3">
              {isLoggedIn ? (
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                  <UserProfile
                    brandlogo={brandlogo}
                    onParentClose={closeDropdown}
                  />
                </div>
              ) : (
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
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
