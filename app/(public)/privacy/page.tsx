import type { Metadata } from "next";
import { PrivacyContent } from "@/components/Artisan/auth/PrivacyContent";
import React from "react";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read ArtisansHub's privacy policy to understand how we collect, use, and protect your personal data.",
  alternates: { canonical: "/privacy" },
};

const PrivacyPolicy = () => {
  return <PrivacyContent />;
};

export default PrivacyPolicy;
