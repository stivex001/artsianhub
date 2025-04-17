"use client";
import { useModalClose } from "@/contexts/SheetCloseModal";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
// import { useModalClose } from "@/context/SheetCloseModal";

interface Link {
  path: string;
  label: string;
  icon: StaticImageData;
  sub?: any[];
}

interface SidebarMenuProps {
  links: Link[];
  pathname?: string;
  mobile?: boolean;
}

const isRouteActive = (currentPath: string, linkPath: string) => {
  if (linkPath === "/artisan/dashboard") {
    return currentPath === "/artisan/dashboard";
  } else if (linkPath === "/admin/dashboard") {
    return currentPath === "/admin/dashboard";
  }
  return currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({ links, mobile }) => {
  const pathname = usePathname();
  const { closeModal } = useModalClose();

  return (
    <aside className={`pb-6 ${!mobile && "animated-appearance"}`}>
      <nav className="flex flex-col items-start justify-center space-y-1">
        {links?.map(({ path, label, icon }) => {
          const isActive = isRouteActive(pathname, path);

          return (
            <div key={path} className="w-full h-full">
              <Link
                href={path}
                className={`w-full gap-6 flex items-center font-semibold rounded transition-all `}
                onClick={closeModal}
              >
                <div
                  className={`${
                    isActive ? "bg-[#D8D8D9]" : ""
                  }  w-full h-20 flex items-center px-12 hover:bg-[#D8D8D9]/50`}
                >
                  <div
                    className={`flex items-center gap-3 text-sm whitespace-nowrap   group-hover:text-white  ${
                      isActive ? "text-black" : "text-darker"
                    }`}
                  >
                    <div className="w-5 h-5">
                      <Image
                        src={icon ?? ""}
                        alt=""
                        className="w-full h-full"
                      />
                    </div>
                    {label}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarMenu;
