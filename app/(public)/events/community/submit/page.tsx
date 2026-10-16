import type { Metadata } from "next";
import { CommunitySubmitForm } from "@/components/events/CommunitySubmitForm";

export const metadata: Metadata = {
  title: "Submit a Community Event",
  alternates: { canonical: "/events/community/submit/" },
  robots: { index: false },
};

const SubmitCommunityEventPage = () => (
  <main className="bg-[#F9FAFB]">
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-10 md:py-14">
      <h1 className="text-3xl font-bold">Submit your event</h1>
      <CommunitySubmitForm />
    </div>
  </main>
);

export default SubmitCommunityEventPage;
