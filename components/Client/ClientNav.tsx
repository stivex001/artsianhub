import { LogoIcon } from "@/components/assets/icons/SvgIcons";
import { ChevronDown, User } from "lucide-react";
import Link from "next/link";

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

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-2 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <ChevronDown size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
