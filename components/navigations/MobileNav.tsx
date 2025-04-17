"use client";
import SidebarMenu from "./SidebarMenu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import Link from "next/link";
import settings from "@/components/assets/images/Settings.png";
import { usePathname } from "next/navigation";
import { adminLinks, artisanLinks } from "./data";
import logo from "@/components/assets/images/logo.png";
import { useModalClose } from "@/contexts/SheetCloseModal";
import { HamburgerIcon } from "../assets/icons/NavigationIcons";

export const MobileNav = () => {
  const pathname = usePathname();

  const { isOpen, openModal, closeModal } = useModalClose();

  const isArtisanPage = pathname.startsWith("/artisan");
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <Sheet open={isOpen} onOpenChange={openModal}>
      <SheetTrigger asChild className="lg:hidden">
        <button onClick={openModal}>
          <HamburgerIcon />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="p-0 flex flex-col w-64 !bg-white pt-14 pb-8 h-screen rounded-[10px] overflow-y-scroll scrollbar-hidden"
      >
        <div className="w-[106px] h-20 mx-auto">
          <Image
            src={logo}
            alt="logo"
            className="w-full h-full object-cover rounded-[5px]"
          />
        </div>
        <div className="flex-grow overflow-y-auto no-scrollbar  pt-20">
        <div>
          {isArtisanPage && (
            <SidebarMenu links={artisanLinks} pathname={pathname} />
          )}
          {isAdminPage && (
            <SidebarMenu links={adminLinks} pathname={pathname} />
          )}
        </div>
        </div>
        <Link
          href="/artisan/dashboard/settings"
          className="bg-secondary w-[172px] mx-auto rounded-[10px] flex items-center justify-center  py-4 gap-5 text-sm text-white"
          onClick={closeModal}
        >
          <Image
            src={settings}
            alt="settings"
            className="w-5 h-5 object-cover"
          />
          Settings
        </Link>
      </SheetContent>
    </Sheet>
  );
};
