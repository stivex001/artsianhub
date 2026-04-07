"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Header } from "./Header";

export const PublicHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const container = document.getElementById("public-scroll-container");
    if (!container || !isHome) return;

    const handleScroll = () => {
      setScrolled(container.scrollTop > 60);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isHome, pathname]);

  // Reset when navigating away
  useEffect(() => {
    if (!isHome) setScrolled(false);
  }, [isHome]);

  const headerClass =
    isHome && !scrolled
      ? "h-24 lg:h-20 w-full transition-all duration-500 bg-transparent"
      : "bg-white h-24 lg:h-20 w-full transition-all duration-500 shadow-sm";

  return <Header className={headerClass} />;
};
