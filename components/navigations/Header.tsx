"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "@/components/assets/images/artilogo.svg";
import { useAuthStore } from "@/store/authStore";
import UserDesc from "../UserDesc";
import { CustomButton } from "../clickable/CustomButton";
import { BarMenuIcon } from "../assets/icons/SvgIcons";
import { X } from "lucide-react";

type Props = {};

type NavLink = {
  id: string;
  label: string;
};

const navLinks: NavLink[] = [
  { id: "categories", label: "Categories" },
  { id: "howitworks", label: "How It Works" },
];

export const Header = (props: Props) => {
  const { currentUser } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const handleScrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // close mobile menu
  };

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "home";
      navLinks.forEach((link) => {
        const section = document.getElementById(link.id);
        if (section) {
          const { top } = section.getBoundingClientRect();
          if (top <= 80) {
            currentSection = link.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="bg-white h-24 w-full">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-5 px-4">
        <Link href="home" onClick={() => handleScrollTo("home")} className="">
          <Image src={logo} alt="logo" className="w-full h-full object-cover" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleScrollTo(link.id)}
              className={`transition text-lightp font-medium text-base hover:text-primary ${
                activeSection === link.id && "text-primary"
              }`}
            >
              {link.label}
            </button>
          ))}

          {currentUser ? (
            <div className="flex items-center gap-2.5 sm:gap-8 lg:gap-14">
              <UserDesc />
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <CustomButton
                variant="transparent"
                className="border border-bordergrey rounded-[6px] text-sm text-lightp font-medium "
              >
                <Link href="/auth/login">Login</Link>
              </CustomButton>
              <CustomButton>
                <Link href="/auth/onboarding" className="font-light">
                  Sign Up
                </Link>
              </CustomButton>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <BarMenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};
