import type { Metadata } from "next";
import { TermsContent } from "@/components/Artisan/auth/TermsContent";
import React from "react";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the ArtisansHub terms and conditions governing your use of the platform as an artisan or client.",
  alternates: { canonical: "/terms" },
};

type Props = {};

const TermsOfService = (props: Props) => {
  return (
    <main>
      <TermsContent />
    </main>
  );
};

export default TermsOfService;
