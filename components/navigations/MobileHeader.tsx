"use client";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Image from "next/image";
import Link from "next/link";
import logo from "@/components/assets/images/artilogo.svg";
import { useModalClose } from "@/contexts/SheetCloseModal";
import UserDesc from "../UserDesc";
import { useAuthStore } from "@/store/authStore";
import { CustomButton } from "../clickable/CustomButton";
import { BarMenuIcon } from "../assets/icons/SvgIcons";
import { navLinks } from "./Header";

type Props = {
  handleScrollTo?: any;
  activeSection?: any;
};

export const MobileHeader = ({ handleScrollTo, activeSection }: Props) => {
  const { isOpen, openModal, closeModal } = useModalClose();

  return (
    <Sheet open={isOpen} onOpenChange={openModal}>
      <SheetTrigger asChild className="lg:hidden">
        <button onClick={openModal}>
          <BarMenuIcon />
        </button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="flex flex-col  w-56 p-2.5 bg-white  max-h-fit mt-20 rounded-[10px] overflow-y-scroll scrollbar-hidden"
      >
        <div className="flex flex-col gap-3 mb-5 ">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                closeModal(), handleScrollTo(link.id);
              }}
              className={`transition text-lightp text-left font-medium text-base hover:text-primary ${
                activeSection === link.id && "text-primary"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <CustomButton
          variant="transparent"
          className="w-full border border-bordergrey rounded-[6px] text-sm text-lightp font-medium "
          onClick={() => closeModal()}
        >
          <Link href="/auth/login">Login</Link>
        </CustomButton>
        <CustomButton className="w-full" onClick={() => closeModal()}>
          <Link href="/auth/onboarding" className="font-light">
            Sign Up
          </Link>
        </CustomButton>
      </SheetContent>
    </Sheet>
  );
};
