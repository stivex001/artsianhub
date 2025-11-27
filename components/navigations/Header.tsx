"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import logo from "@/components/assets/images/n.png";
import { CustomButton } from "../clickable/CustomButton";
import { MobileHeader } from "./MobileHeader";

type Props = {};

type NavLink = {
  id: string;
  label: string;
  href?: string;
};

export const navLinks: NavLink[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "findArtisan", label: "Find Artisans" },
  { id: "about", label: "About", href: "/home/about" },
  // { id: "estore", label: "eStore" },
  { id: "learn", label: "Learn Skills", href: "/home/learn-skills" },
];

export const Header = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const handleScrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
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
        <Link
          href="/"
          onClick={() => handleScrollTo("home")}
          className="w-40 h-20 -mt-2"
        >
          <Image
            src={logo}
            alt="logo"
            className="w-full h-full object-cover "
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const baseClasses =
              "transition text-lightp font-medium text-base hover:text-primary";
            const activeClasses = isActive ? "text-primary" : "";

            if (link.href) {
              // handle url navigation
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`${baseClasses} ${activeClasses}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <button
                key={link.id}
                onClick={() => handleScrollTo(link.id)}
                className={`${baseClasses} ${activeClasses}`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
        <div className="hidden md:flex items-center gap-4">
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

        <MobileHeader
          handleScrollTo={handleScrollTo}
          activeSection={activeSection}
        />
      </div>
    </header>
  );
};
