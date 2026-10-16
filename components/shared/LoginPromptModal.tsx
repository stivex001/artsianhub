"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Hammer, ArrowRight, UserPlus } from "lucide-react";
import Link from "next/link";

export type SelectedArtisan = {
  name: string;
  category?: string;
  title?: string;
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedArtisan?: SelectedArtisan | null;
  /** Optional URL to redirect back to after auth (e.g. current artisan profile) */
  redirectUrl?: string;
  /** @deprecated Use selectedArtisan instead */
  selectedCategory?: { title?: string };
};

const buildArtisanDisplayName = (artisan: SelectedArtisan): string => {
  return artisan.name;
};

/* ---------- animation variants ---------- */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.28, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.22, ease: "easeIn" as const } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.93, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 340, damping: 28, mass: 0.9 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 16,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 30 },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 380, damping: 22, delay: 0.08 },
  },
};

/* ---------- decorative dots ---------- */
const Dots = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.07] pointer-events-none"
    aria-hidden="true"
  >
    <defs>
      <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.5" fill="#F0C422" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

/* ---------- component ---------- */
export const LoginPromptModal = ({
  isOpen,
  onOpenChange,
  selectedArtisan,
  redirectUrl,
  selectedCategory,
}: Props) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const artisanDisplayName = selectedArtisan
    ? buildArtisanDisplayName(selectedArtisan)
    : null;

  const loginHref = redirectUrl
    ? `/auth/login?redirect=${encodeURIComponent(redirectUrl)}`
    : "/auth/login";
  const signupHref = redirectUrl
    ? `/auth/signup?role=client&redirect=${encodeURIComponent(redirectUrl)}`
    : "/auth/signup?role=client";

  const closeModal = () => onOpenChange(false);

  const modal = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* card */}
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 pointer-events-none"
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              key="card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-[420px] overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(2,25,139,0.22)] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── navy hero section ── */}
              <div className="relative bg-primary overflow-hidden px-8 pt-10 pb-9">
                <Dots />

                {/* top-right diagonal accent */}
                <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-[#F0C422]/10 blur-2xl" />
                <div className="absolute bottom-0 -left-6 w-24 h-24 rounded-full bg-white/5" />

                {/* close button */}
                <button
                  onClick={closeModal}
                  aria-label="Close"
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all duration-150"
                >
                  <X size={15} strokeWidth={2.5} />
                </button>

                <motion.div variants={stagger} initial="hidden" animate="visible">
                  {/* icon badge */}
                  <motion.div variants={iconVariants} className="mb-5">
                    <div className="relative inline-flex">
                      <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-[0_4px_20px_rgba(240,196,34,0.4)]">
                        <Hammer size={26} className="text-primary" strokeWidth={2.2} />
                      </div>
                      {/* small sparkle dot */}
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-accent border-2 border-primary" />
                    </div>
                  </motion.div>

                  {/* title */}
                  <motion.h2
                    variants={fadeUp}
                    className="text-white text-[1.45rem] font-bold leading-snug tracking-[-0.01em] max-w-[280px]"
                  >
                    {artisanDisplayName
                      ? <>Sign in to contact <span className="text-accent">{artisanDisplayName}</span></>
                      : "Sign in to contact this artisan"}
                  </motion.h2>

                  {/* sub-label */}
                  <motion.p variants={fadeUp} className="mt-2 text-white/60 text-[0.85rem] leading-relaxed">
                    {selectedCategory?.title && !selectedArtisan
                      ? <>Interested in <strong className="text-white/80">{selectedCategory.title}</strong>? Sign in first.</>
                      : "You need an account to message artisans on the platform."}
                  </motion.p>
                </motion.div>
              </div>

              {/* ── white action section ── */}
              <div className="bg-white px-8 pt-7 pb-8">
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-3"
                >
                  <motion.p
                    variants={fadeUp}
                    className="text-[0.82rem] text-textcolor leading-relaxed -mt-1 mb-1"
                  >
                    We&apos;ll bring you right back here after sign-in. It only takes a minute.
                  </motion.p>

                  {/* primary: sign in */}
                  <motion.div variants={fadeUp}>
                    <Link
                      href={loginHref}
                      className="group flex items-center justify-between w-full px-5 py-3.5 bg-primary text-white text-[0.9rem] font-semibold rounded-xl hover:bg-darkBlue active:scale-[0.98] transition-all duration-150 shadow-[0_4px_20px_rgba(2,25,139,0.25)] hover:shadow-[0_6px_28px_rgba(2,25,139,0.35)]"
                    >
                      <span>Sign In</span>
                      <ArrowRight
                        size={17}
                        className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-150"
                      />
                    </Link>
                  </motion.div>

                  {/* secondary: create account */}
                  <motion.div variants={fadeUp}>
                    <Link
                      href={signupHref}
                      className="group flex items-center justify-between w-full px-5 py-3.5 bg-accountBg text-primary text-[0.9rem] font-semibold rounded-xl hover:bg-[#dce8fb] active:scale-[0.98] transition-all duration-150"
                    >
                      <span>Create an account</span>
                      <UserPlus
                        size={17}
                        className="opacity-60 group-hover:opacity-100 transition-opacity duration-150"
                      />
                    </Link>
                  </motion.div>

                  {/* footer note */}
                  <motion.p
                    variants={fadeUp}
                    className="text-center text-[0.75rem] text-textgray mt-1 leading-relaxed"
                  >
                    By continuing you agree to our{" "}
                    <span className="underline underline-offset-2 cursor-pointer hover:text-primary transition-colors">
                      Terms of Service
                    </span>{" "}
                    &amp;{" "}
                    <span className="underline underline-offset-2 cursor-pointer hover:text-primary transition-colors">
                      Privacy Policy
                    </span>
                    .
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
};
