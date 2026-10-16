"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import logo from "@/components/assets/images/n.png";
import hub from "@/components/assets/images/newA.png";
import hubn from "@/components/assets/images/n.png";
import { CustomButton } from "../clickable/CustomButton";
import { MobileHeader } from "./MobileHeader";
import { UserProfile } from "../auth/UserProfile";
import { NotificationIcon } from "../assets/icons/NavIcons";
import { NotificationModal } from "../shared/NotificationModal";
import { useAuthStore } from "@/store/authStore";
import { useNotification } from "@/apis/crud/notification";
import { InlineAuthLoader } from "../auth/AuthLoader";

export type NavLink = {
  id: string;
  label: string;
  href?: string;
};

export const navLinks: NavLink[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "findArtisan", label: "Find Artisans", href: "/#findArtisan" },
  { id: "about", label: "About", href: "/about" },
  { id: "learn", label: "Learn Skills", href: "/learn-skills" },
  { id: "events", label: "Events", href: "/events" },
];

type Props = {
  /** Use alternate logo (e.g. on client dashboard) */
  brandlogo?: boolean;
  /** Override header container class (e.g. fixed top, transparent bg) */
  className?: string;
  /** Logo link (e.g. "/client" when on client dashboard) */
  logoHref?: string;
  /** When true, renders nav links in white for use over dark backgrounds */
  isTransparent?: boolean;
};

export const Header = ({ brandlogo, className, logoHref = "/", isTransparent }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [openNotification, setOpenNotification] = useState(false);
  const [pendingMarkId, setPendingMarkId] = useState<string | null>(null);

  const { accessToken, isHydrated } = useAuthStore();
  const isLoggedIn = !!accessToken;
  const queryClient = useQueryClient();

  const { getAllNotifications, markAllNotification, markAllSingleNotification } = useNotification({
    notificationsEnabled: isLoggedIn && isHydrated,
  });
  const { data: notify, refetch } = getAllNotifications();
  const notificationData = notify?.data?.notifications || [];
  const total = notify?.data?.totalNotification ?? 0;
  const unreadCount = notificationData.filter((n) => !n?.read).length;

  const { mutate: markAll, isPending: isMarkingAll } = markAllNotification;
  // Hook is called with pendingMarkId so it has the right URL on the effect trigger
  const { mutate: markSingle } = markAllSingleNotification(pendingMarkId ?? "");

  // Fire mark-single AFTER re-render so the mutation URL carries the new ID
  useEffect(() => {
    if (!pendingMarkId) return;
    markSingle({}, {
      onSuccess: () => { refetch(); setPendingMarkId(null); },
      onError: (e: any) => { toast.error(e?.message ?? "Failed to mark as read"); setPendingMarkId(null); },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingMarkId]);

  const handleMarkAll = () => {
    markAll({}, {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: ["notification"] }),
      onError: (e: any) => toast.error(e?.message ?? "Failed to mark all as read"),
    });
  };

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

  const logoSrc = brandlogo === true ? hubn : brandlogo === false ? hub : logo;
  const headerClassName = className ?? "bg-white h-24 lg:h-20 w-full";

  // Render auth buttons/profile based on hydration state
  const renderAuthSection = () => {
    // Show loading spinner while hydrating to prevent flicker
    if (!isHydrated) {
      return <InlineAuthLoader height="h-10" />;
    }

    if (isLoggedIn) {
      return (
        <>
          <div className="relative">
            <button
              onClick={() => setOpenNotification((prev) => !prev)}
              className="relative cursor-pointer bg-white rounded-full"
            >
              <NotificationIcon />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center
                  justify-center rounded-full bg-red-500 text-white text-[10px] font-bold px-1">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>
            <AnimatePresence>
              {openNotification && (
                <NotificationModal
                  onClose={() => setOpenNotification(false)}
                  notifications={notificationData}
                  total={total}
                  onMarkSingle={(id) => setPendingMarkId(id)}
                  onMarkAll={handleMarkAll}
                  isMarkingAll={isMarkingAll}
                  pendingId={pendingMarkId}
                />
              )}
            </AnimatePresence>
          </div>
          <UserProfile brandlogo={brandlogo} />
        </>
      );
    }

    return (
      <>
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
      </>
    );
  };

  return (
    <header className={headerClassName}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-5 px-4">
        <Link
          href={logoHref}
          onClick={() => logoHref === "/" && handleScrollTo("home")}
          className="w-40 h-20 -mt-2 md:w-36 md:h-16"
        >
          <Image
            src={logoSrc}
            alt="logo"
            className="w-full h-full object-cover"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            const baseClasses = isTransparent
              ? "transition text-white/80 font-medium text-base hover:text-white"
              : "transition text-lightp font-medium text-base hover:text-primary";
            const activeClasses = isActive
              ? isTransparent ? "text-white" : "text-primary"
              : "";

            const handleClick = (e: React.MouseEvent) => {
              setIsMenuOpen(false);
              if (link.href?.startsWith("/#")) {
                const id = link.href.split("#")[1];
                const element = document.getElementById(id);
                if (element) {
                  e.preventDefault();
                  handleScrollTo(id);
                }
              } else if (
                link.href === "/" &&
                window.location.pathname === "/"
              ) {
                const element = document.getElementById("home");
                if (element) {
                  e.preventDefault();
                  handleScrollTo("home");
                }
              }
            };

            if (link.href) {
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`${baseClasses} ${activeClasses}`}
                  onClick={handleClick}
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
          {renderAuthSection()}
        </div>

        <MobileHeader
          handleScrollTo={handleScrollTo}
          activeSection={activeSection}
          isLoggedIn={isHydrated ? isLoggedIn : undefined}
          isHydrated={isHydrated}
          brandlogo={brandlogo}
        />
      </div>
    </header>
  );
};
