import { LogoIcon } from "@/components/assets/icons/SvgIcons";
import Link from "next/link";
import { UserProfile } from "../auth/UserProfile";

type Props = {};

export const ClientNav = (props: Props) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent ">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/client" className="">
            <LogoIcon />
          </Link>

          <UserProfile />
        </div>
      </div>
    </header>
  );
};
