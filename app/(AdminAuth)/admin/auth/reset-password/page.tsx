"use client";

import React, { useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import {
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  Shield,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAdminAuth } from "@/apis/crud/adminAuth";
import logo from "@/components/assets/images/newA.png";

// ── Animation variants ────────────────────────────────────────────────────────
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
};

// ── OTP Input ─────────────────────────────────────────────────────────────────
const OtpInput = ({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) => {
  const slots = 6;
  const digits = value.padEnd(slots, "").split("").slice(0, slots);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleKey = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const next = digits.map((d, i) => (i === index ? "" : d)).join("").replace(/\s/g, "");
      onChange(next);
      if (index > 0) inputRefs.current[index - 1]?.focus();
    }
  };

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) return;
    const char = raw[raw.length - 1];
    const next = digits.map((d, i) => (i === index ? char : d)).join("").replace(/\s/g, "");
    onChange(next);
    if (index < slots - 1) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, slots);
    onChange(paste);
    const focusIdx = Math.min(paste.length, slots - 1);
    inputRefs.current[focusIdx]?.focus();
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest">
        One-Time Password
      </label>
      <div className="flex gap-2" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d.trim()}
            onChange={(e) => handleChange(i, e)}
            onKeyDown={(e) => handleKey(i, e)}
            className={`flex-1 h-12 text-center text-lg font-bold text-white bg-white/[0.04] border rounded-xl transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-[#02198B]/60 focus:border-[#02198B]
              ${d.trim() ? "border-[#02198B]/40 text-[#F0C422]" : "border-white/[0.08]"}
              ${error ? "border-red-500/60" : ""}`}
          />
        ))}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
};

// ── Inner page (needs useSearchParams, wrapped in Suspense below) ─────────────
function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") ?? "";

  const { resetPassword } = useAdminAuth();

  const [email, setEmail] = useState(emailParam);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    otp?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "Email is required";
    if (otp.replace(/\s/g, "").length < 6) errs.otp = "Enter the full 6-digit OTP";
    if (!newPassword) errs.newPassword = "Password is required";
    else if (newPassword.length < 8) errs.newPassword = "Minimum 8 characters";
    if (newPassword !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await resetPassword.mutateAsync(
        { email: email.trim(), otp: otp.replace(/\s/g, ""), newPassword },
        {
          onSuccess: (res) => {
            toast.success(res.message ?? "Password reset successfully.");
            setDone(true);
          },
          onError: (error: any) => {
            const msg = error?.data?.message ?? error?.data?.error ?? "Reset failed. Check your OTP.";
            toast.error(msg);
          },
        }
      );
    } catch {
      // handled in onError
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-[#070B18] px-5 py-10">
      {/* Logo */}
      <div className="absolute top-6 left-6">
        <Image src={logo} alt="ArtisansHub" width={100} height={46} className="object-contain" />
      </div>

      <motion.div
        className="w-full max-w-[420px]"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div
          className="rounded-2xl p-8 sm:p-10 border"
          style={{
            background: "linear-gradient(145deg, rgba(17,24,39,0.95) 0%, rgba(11,15,30,0.98) 100%)",
            borderColor: "rgba(255,255,255,0.07)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Header */}
          <motion.div variants={item} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #02198B 0%, #1E40AF 100%)" }}
              >
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="text-[10px] font-bold text-[#F0C422] uppercase tracking-[0.2em]">
                Reset
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Reset Password
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Enter the OTP from your email and choose a new password.
            </p>
          </motion.div>

          {done ? (
            // ── Success state ──
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-4 text-center py-2"
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-base">Password updated</p>
                <p className="text-[#6B7280] text-sm mt-1">
                  Your admin password has been reset successfully.
                </p>
              </div>
              <Link
                href="/admin/auth/login"
                className="w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 mt-2 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #02198B 0%, #1E40AF 100%)",
                  boxShadow: "0 8px 24px rgba(2,25,139,0.35)",
                }}
              >
                Back to Sign In
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            // ── Form ──
            <form onSubmit={handleSubmit} noValidate>
              <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-5">
                {/* Email (pre-filled but editable) */}
                <motion.div variants={item} className="flex flex-col gap-1.5">
                  <label htmlFor="r-email" className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest">
                    Email
                  </label>
                  <input
                    id="r-email"
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                    placeholder="admin@artisanshub.org"
                    autoComplete="email"
                    className={`h-12 px-4 bg-white/[0.04] border rounded-xl text-[#F9FAFB] placeholder:text-[#374151] text-sm
                      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#02198B]/60 focus:border-[#02198B]
                      ${errors.email ? "border-red-500/60" : "border-white/[0.08] hover:border-white/[0.14]"}`}
                  />
                  {errors.email && (
                    <p className="flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.email}
                    </p>
                  )}
                </motion.div>

                {/* OTP */}
                <motion.div variants={item}>
                  <OtpInput
                    value={otp}
                    onChange={(v) => { setOtp(v); setErrors((p) => ({ ...p, otp: undefined })); }}
                    error={errors.otp}
                  />
                </motion.div>

                {/* New password */}
                <motion.div variants={item} className="flex flex-col gap-1.5">
                  <label htmlFor="new-pass" className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest">
                    New Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563] pointer-events-none">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      id="new-pass"
                      type={showNew ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => { setNewPassword(e.target.value); setErrors((p) => ({ ...p, newPassword: undefined })); }}
                      placeholder="Minimum 8 characters"
                      autoComplete="new-password"
                      className={`w-full h-12 pl-11 pr-11 bg-white/[0.04] border rounded-xl text-[#F9FAFB] placeholder:text-[#374151] text-sm
                        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#02198B]/60 focus:border-[#02198B]
                        ${errors.newPassword ? "border-red-500/60" : "border-white/[0.08] hover:border-white/[0.14]"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNew((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#4B5563] hover:text-[#9CA3AF] transition-colors"
                      aria-label={showNew ? "Hide" : "Show"}
                    >
                      {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.newPassword}
                    </p>
                  )}
                </motion.div>

                {/* Confirm password */}
                <motion.div variants={item} className="flex flex-col gap-1.5">
                  <label htmlFor="confirm-pass" className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563] pointer-events-none">
                      <Lock className="w-4 h-4" />
                    </span>
                    <input
                      id="confirm-pass"
                      type={showConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: undefined })); }}
                      placeholder="Re-enter password"
                      autoComplete="new-password"
                      className={`w-full h-12 pl-11 pr-11 bg-white/[0.04] border rounded-xl text-[#F9FAFB] placeholder:text-[#374151] text-sm
                        transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#02198B]/60 focus:border-[#02198B]
                        ${errors.confirmPassword ? "border-red-500/60" : "border-white/[0.08] hover:border-white/[0.14]"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#4B5563] hover:text-[#9CA3AF] transition-colors"
                      aria-label={showConfirm ? "Hide" : "Show"}
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </motion.div>

                {/* Submit */}
                <motion.div variants={item}>
                  <button
                    type="submit"
                    disabled={resetPassword.isPending}
                    className="group w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: resetPassword.isPending
                        ? "rgba(2,25,139,0.6)"
                        : "linear-gradient(135deg, #02198B 0%, #1E40AF 100%)",
                      boxShadow: resetPassword.isPending ? "none" : "0 8px 24px rgba(2,25,139,0.4)",
                    }}
                  >
                    {resetPassword.isPending ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Resetting…
                      </>
                    ) : (
                      <>
                        Reset Password
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.div>
              </motion.div>
            </form>
          )}
        </div>

        {/* Back link */}
        <motion.div variants={item} className="text-center mt-5">
          <Link
            href="/admin/auth/forgot-password"
            className="inline-flex items-center gap-1.5 text-xs text-[#4B5563] hover:text-[#9CA3AF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Resend OTP
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}

// ── Export with Suspense (required for useSearchParams in Next.js App Router) ─
export default function AdminResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordContent />
    </Suspense>
  );
}
