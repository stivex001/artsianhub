"use client";
import { useModalClose } from "@/contexts/SheetCloseModal";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
// import { useModalClose } from "@/context/SheetCloseModal";

interface Link {
  path: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  sub?: any[];
}

interface SidebarMenuProps {
  links: Link[];
  pathname?: string;
  mobile?: boolean;
}

const isRouteActive = (currentPath: string, linkPath: string) => {
  const normalized = currentPath.replace(/\/$/, "") || "/";
  if (linkPath === "/artisan/dashboard") {
    return normalized === "/artisan/dashboard";
  } else if (linkPath === "/admin/dashboard") {
    return normalized === "/admin/dashboard";
  }
  return normalized === linkPath || normalized.startsWith(`${linkPath}/`);
};

const SidebarMenu: React.FC<SidebarMenuProps> = ({ links, mobile }) => {
  const pathname = usePathname();
  const { closeModal } = useModalClose();

  return (
    <aside className={`pb-6 ${!mobile && "animated-appearance"}`}>
      <nav className="flex flex-col items-start justify-center space-y-1">
        {links?.map(({ path, label, icon: Icon }) => {
          const isActive = isRouteActive(pathname, path);

          return (
            <div key={path} className="w-full h-full">
              <Link
                href={path}
                className={`w-full flex items-center rounded transition-all `}
                onClick={closeModal}
              >
                <div
                  className={`${
                    isActive ? "bg-primary text-white" : ""
                  }  w-full h-14 flex rounded-2xl px-5 items-center hover:bg-primary/40 hover:text-white`}
                >
                  <div
                    className={`flex items-center gap-3 text-sm whitespace-nowrap   group-hover:text-white  ${
                      isActive ? "text-white" : "text-body"
                    }`}
                  >
                    <Icon />
                    <span>{label}</span>
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
