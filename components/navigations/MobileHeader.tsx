"use client";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import Link from "next/link";
import logo from "@/components/assets/images/logo.png";
import { useModalClose } from "@/contexts/SheetCloseModal";
import { HamburgerIcon } from "../assets/icons/NavigationIcons";
import UserDesc from "../UserDesc";
import { useAuthStore } from "@/store/authStore";
import { CustomButton } from "../clickable/CustomButton";

export const MobileHeader = () => {
  const { isOpen, openModal, closeModal } = useModalClose();

  const { currentUser } = useAuthStore();

  return (
    <div className="lg:hidden w-full flex items-center justify-between">
      <Sheet open={isOpen} onOpenChange={openModal}>
        <SheetTrigger asChild className="">
          <button onClick={openModal}>
            <HamburgerIcon />
          </button>
        </SheetTrigger>
        <SheetContent
          side="top"
          className="p-0 flex flex-col w-64 !bg-white pt-14 pb-8 h-[70vh] mt-24 rounded-[10px] overflow-y-scroll scrollbar-hidden"
        >
          <Link href="/" className="w-[106px] h-20 mx-auto">
            <Image
              src={logo}
              alt="logo"
              width={65}
              height={48}
              className="w-full h-full object-cover"
            />
          </Link>
          <div className="flex flex-col gap-8 text-center overflow-y-auto no-scrollbar pt-8">
            <Link
              href="/contact-us"
              className="text-primary font-light text-3xl"
              onClick={closeModal}
            >
              Contact Us
            </Link>
            <Link
              href="/about"
              onClick={closeModal}
              className="text-primary font-light text-3xl "
            >
              About Us
            </Link>
          </div>
        </SheetContent>
      </Sheet>
      {currentUser ? (
        <UserDesc />
      ) : (
        <div className="flex items-center gap-2 md:gap-6">
          <Link
            href="/auth/login"
            className="text-primary font-[300] text-xs md:text-xl"
            onClick={closeModal}
          >
            Login
          </Link>
          <CustomButton onClick={closeModal}>
            <Link href="/artisan/auth/login" className="font-[300]">
              Sign up as an Artisan
            </Link>
          </CustomButton>
        </div>
      )}
    </div>
  );
};
