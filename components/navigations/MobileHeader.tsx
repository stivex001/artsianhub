"use client";

import { CustomButton } from "../clickable/CustomButton";
import { BarMenuIcon } from "../assets/icons/SvgIcons";
import { navLinks } from "./Header";
import { JSX, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CategoriesIcon, HowItWorksIcon } from "../assets/icons/NavIcons";
import { ShieldCloseIcon } from "lucide-react";

type Props = {
  handleScrollTo?: (id: string) => void;
  activeSection?: string;
};

export const MobileHeader = ({ handleScrollTo, activeSection }: Props) => {
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
            className="absolute right-0 top-full mt-2 min-w-[300px] bg-white rounded-[14px] shadow-usershadow p-4 z-50"
          >
            <div className="flex justify-end mb-4">
              <button onClick={closeDropdown}>
                <ShieldCloseIcon />
              </button>
            </div>

            <div className="flex flex-col gap-2 mb-5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    handleScrollTo?.(link.id);
                    closeDropdown();
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-base font-medium transition-colors 
                    ${
                      activeSection === link.id
                        ? "text-primary bg-gray-100"
                        : "text-lightp hover:bg-gray-50"
                    }`}
                >
                  {linkIcons[link.id] && <span>{linkIcons[link.id]}</span>}
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <CustomButton
                variant="transparent"
                className="w-full border border-bordergrey rounded-[6px] text-sm text-lightp font-medium"
                onClick={() => {
                  router.push(`/auth/login`);
                  closeDropdown();
                }}
                label="Login"
              />

              <CustomButton
                className="w-full"
                onClick={() => {
                  router.push(`/auth/onboarding`);
                  closeDropdown();
                }}
                label="Sign Up"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
