import { LogoIcon } from "@/components/assets/icons/SvgIcons";
import Link from "next/link";
import { UserProfile } from "../auth/UserProfile";
import { BrandIcon } from "../assets/icons/Logo";

type Props = {
  brandlogo?: boolean;
};

export const ClientNav = ({ brandlogo }: Props) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        brandlogo ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/client" className="">
            {brandlogo ? <BrandIcon /> : <LogoIcon />}
          </Link>

          <UserProfile brandlogo={brandlogo} />
        </div>
      </div>
    </header>
  );
};
