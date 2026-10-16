"use client";

import React from "react";
import { motion } from "framer-motion";
import { BadgeCheck, Clock, ShieldAlert, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useArtisans } from "@/apis/crud/artisans";

// ─── Verified ─────────────────────────────────────────────────────────────────
const VerifiedState = ({ firstName }: { firstName?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="relative overflow-hidden rounded-2xl bg-[#02198B] px-6 py-5"
  >
    {/* Diagonal glimmer stripe */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />

    {/* Subtle dot-grid texture */}
    <div
      className="absolute inset-0 opacity-[0.06] pointer-events-none"
      style={{
        backgroundImage:
          "radial-gradient(circle, #fff 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    />

    {/* Soft glow blobs */}
    <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-white/[0.06] blur-3xl pointer-events-none" />
    <div className="absolute -bottom-6 right-20 w-28 h-28 rounded-full bg-white/[0.04] blur-2xl pointer-events-none" />

    <div className="relative z-10 flex items-center justify-between gap-4">

      {/* Left: icon ring + text */}
      <div className="flex items-center gap-4">
        {/* Badge icon with glow ring */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-white/20 blur-md scale-125" />
          <div className="relative w-12 h-12 rounded-full bg-white/[0.12] border border-white/20 flex items-center justify-center">
            <BadgeCheck className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Text */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-white/50 uppercase tracking-[0.15em]">
              Account Status
            </span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-400/20 border border-emerald-400/30 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                Verified
              </span>
            </div>
          </div>
          <h3 className="text-white font-bold text-base leading-tight">
            {firstName ? `${firstName}, you're a` : "You're a"}{" "}
            <span className="text-white/90">Verified Professional</span>
          </h3>
          <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
            Clients can trust your profile — your identity has been confirmed.
          </p>
        </div>
      </div>

      {/* Right: large decorative badge */}
      <div className="hidden sm:flex shrink-0 w-16 h-16 rounded-2xl bg-white/[0.07] border border-white/10 items-center justify-center">
        <BadgeCheck className="w-8 h-8 text-white/40" />
      </div>
    </div>
  </motion.div>
);

// ─── Pending ──────────────────────────────────────────────────────────────────
const PendingState = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  >
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center shrink-0 mt-0.5">
        <Clock className="w-4 h-4 text-amber-600" />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-0.5">
          <h3 className="text-sm font-semibold text-gray-900">Verification Under Review</h3>
          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 border border-amber-200 rounded-full">
            Pending
          </span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed max-w-md">
          Your identity documents are being reviewed by our team. This typically takes 1–3 business days.
        </p>
      </div>
    </div>
  </motion.div>
);

// ─── Unverified ───────────────────────────────────────────────────────────────
const UnverifiedState = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
    className="bg-white border border-gray-200 rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  >
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-[#02198B]/[0.08] flex items-center justify-center shrink-0 mt-0.5">
        <ShieldAlert className="w-4 h-4 text-[#02198B]" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-900">Identity Not Verified</h3>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed max-w-md">
          Verified artisans earn more trust and get more bookings. Complete your
          identity verification to stand out in the marketplace.
        </p>
      </div>
    </div>
    <Link
      href="/artisan/dashboard/settings?tab=kyc"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#02198B] hover:bg-[#011571]
        text-white text-sm font-medium transition-colors shrink-0 shadow-sm cursor-pointer"
    >
      Get Verified
      <ArrowUpRight className="w-4 h-4" />
    </Link>
  </motion.div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const VerificationBadge = () => {
  const { getMyProfile } = useArtisans();
  const { data: profile, isLoading } = getMyProfile();

  if (isLoading) return null;

  const artisan   = profile?.data;
  const status    = artisan?.verificationStatus ?? "unverified";
  const firstName = artisan?.firstName;

  if (status === "verified") return <VerifiedState firstName={firstName} />;
  if (status === "pending")  return <PendingState />;
  return <UnverifiedState />;
};

export default VerificationBadge;
