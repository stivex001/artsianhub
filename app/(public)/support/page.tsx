import type { Metadata } from "next";
import { SupportTicketView } from "@/components/shared/SupportTicketView";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Need help? Submit a support ticket and the ArtisansHub team will get back to you as quickly as possible.",
  alternates: { canonical: "/support" },
};

const SupportPage = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <SupportTicketView />
    </div>
  </div>
);

export default SupportPage;
