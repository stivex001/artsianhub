import type { Metadata } from "next";
import { AddonGrid } from "@/components/membership/AddonGrid";
import { MembershipPlan } from "@/components/membership/MembershipPlan";
import { MEMBERSHIP_FEE } from "@/lib/membership/constants";
import { getPlatformSettings } from "@/lib/membership/serverSettings";

export const metadata: Metadata = {
  title: "Membership",
  description: `Join ArtisansHub for £${MEMBERSHIP_FEE} a year. Get a business profile, search visibility, customer enquiries and access to every Business Growth Series event.`,
  alternates: { canonical: "/membership/" },
};

const MembershipPage = async () => {
  const settings = await getPlatformSettings();
  return (
    <main className="bg-[#F9FAFB]">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 md:py-14">
        <header className="max-w-2xl space-y-2">
          <h1 className="text-3xl font-bold md:text-4xl">Membership</h1>
          <p className="text-gray-600">One plan, kept simple. Everything else is an optional add-on you choose when you need it.</p>
        </header>
        <MembershipPlan settings={settings} />
        <AddonGrid />
      </div>
    </main>
  );
};

export default MembershipPage;
