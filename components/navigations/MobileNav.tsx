"use client";
import SidebarMenu from "./SidebarMenu";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminLinks, artisanLinks } from "./data";
import { useModalClose } from "@/contexts/SheetCloseModal";
import { HamburgerIcon, LogoutIcon } from "../assets/icons/NavigationIcons";
import { BrandIcon } from "../assets/icons/Logo";
import { useAuthStore } from "@/store/authStore";
import { toast } from "sonner";

export const MobileNav = () => {
  const pathname = usePathname();

  const { isOpen, openModal, closeModal } = useModalClose();
     const { logout } = useAuthStore();

  const isArtisanPage = pathname.startsWith("/artisan");
  const isAdminPage = pathname.startsWith("/admin");

   const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

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
        <Link href="#" className="mb-5 px-4">
          <BrandIcon />
        </Link>
        <div className="flex-grow overflow-y-auto no-scrollbar">
          <div>
            {isArtisanPage && (
              <SidebarMenu links={artisanLinks} pathname={pathname} />
            )}
            {isAdminPage && (
              <SidebarMenu links={adminLinks} pathname={pathname} />
            )}
          </div>
        </div>
        <div
          className="cursor-pointer  w-full h-14 rounded-2xl px-5 flex items-center gap-3"
          onClick={handleLogout}
        >
          <LogoutIcon />
          <span className="text-sm text-body">Log Out</span>
        </div>
      </SheetContent>
    </Sheet>
  );
};
