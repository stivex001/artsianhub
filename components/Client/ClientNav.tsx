"use client";
import { LogoIcon } from "@/components/assets/icons/SvgIcons";
import Link from "next/link";
import { UserProfile } from "../auth/UserProfile";
import { BrandIcon } from "../assets/icons/Logo";
import { useState } from "react";
import { NotificationIcon } from "../assets/icons/NavIcons";
import { useNotification } from "@/api/crud/notification";
import { NotificationModal } from "../shared/NotificationModal";
import hub from "@/components/assets/images/nw.png";
import hubn from "@/components/assets/images/n.png";
import Image from "next/image";

type Props = {
  brandlogo?: boolean;
  className?: string;
};

export const ClientNav = ({ brandlogo, className }: Props) => {
  const [openNotification, setOpenNotification] = useState(false);

  const { getAllNotifications } = useNotification();

  const { data: notify, isPending } = getAllNotifications();
  const notificationData = notify?.data?.notifications || [];
  const total = notify?.data?.totalNotification;
  const unreadNotifications = notificationData?.filter((n) => !n?.read);
  const unreadCount = unreadNotifications?.length;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-transparent ${className}`}
    >
      <div className="max-w-7xl mx-auto px-5 py-5">
        <div className="flex items-center justify-between h-20">
          {brandlogo ? (
            <Link href="/client" className="w-36 ">
              <Image src={hubn} alt="hub" className="w-full h-full" />
            </Link>
          ) : (
            <Link href="/client" className="w-36 h-16">
              <Image src={hub} alt="hub" className="w-full h-full" />
            </Link>
          )}
          <div className="flex items-center gap-2.5">
            <div
              onClick={() => setOpenNotification((prev) => !prev)}
              className="relative cursor-pointer bg-white rounded-full"
            >
              <NotificationIcon />
              {unreadCount > 0 && (
                <span className="absolute -top-1 right-2 text-[#AE2525] font-semibold text-base">
                  {unreadCount}
                </span>
              )}

              {openNotification && (
                <NotificationModal
                  onClose={() => setOpenNotification(false)}
                  notifications={notificationData}
                  total={total}
                />
              )}
            </div>
            <UserProfile brandlogo={brandlogo} />
          </div>
        </div>
      </div>
    </header>
  );
};
