"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import { Mail, ArrowLeft, ArrowRight, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAdminAuth } from "@/apis/crud/adminAuth";
import logo from "@/components/assets/images/newA.png";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut" } },
};

export default function AdminForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [sent, setSent] = useState(false);

  const validate = () => {
    if (!email.trim()) { setEmailError("Email is required"); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setEmailError("Enter a valid email address"); return false; }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await forgotPassword.mutateAsync(
        { email: email.trim() },
        {
          onSuccess: (res) => {
            toast.success(res.message ?? "Reset OTP sent to your email.");
            setSent(true);
          },
          onError: (error: any) => {
            const msg = error?.data?.message ?? error?.data?.error ?? "Failed to send reset email.";
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
      {/* Logo top-left */}
      <div className="absolute top-6 left-6">
        <Image src={logo} alt="ArtisansHub" width={100} height={46} className="object-contain" />
      </div>

      <motion.div
        className="w-full max-w-[400px]"
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
                Recovery
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Forgot Password
            </h2>
            <p className="text-sm text-[#6B7280] mt-1 leading-relaxed">
              Enter your admin email and we'll send a one-time reset code.
            </p>
          </motion.div>

          {sent ? (
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
                <p className="text-white font-semibold text-base">Check your inbox</p>
                <p className="text-[#6B7280] text-sm mt-1 leading-relaxed">
                  A 6-digit OTP has been sent to{" "}
                  <span className="text-[#9CA3AF] font-medium">{email}</span>.
                  Use it on the reset password page.
                </p>
              </div>
              <Link
                href={`/admin/auth/reset-password?email=${encodeURIComponent(email)}`}
                className="w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 mt-2 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #02198B 0%, #1E40AF 100%)",
                  boxShadow: "0 8px 24px rgba(2,25,139,0.35)",
                }}
              >
                Continue to Reset
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ) : (
            // ── Form ──
            <form onSubmit={handleSubmit} noValidate>
              <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-5">
                <motion.div variants={item} className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest">
                    Admin Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563] pointer-events-none">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
                      placeholder="admin@artisanshub.org"
                      autoComplete="email"
                      className={`w-full h-12 pl-11 pr-4 bg-white/[0.04] border rounded-xl text-[#F9FAFB] placeholder:text-[#374151] text-sm transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-[#02198B]/60 focus:border-[#02198B]
                        ${emailError ? "border-red-500/60 bg-red-500/5" : "border-white/[0.08] hover:border-white/[0.14]"}`}
                    />
                  </div>
                  {emailError && (
                    <p className="flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {emailError}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={item}>
                  <button
                    type="submit"
                    disabled={forgotPassword.isPending}
                    className="group w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: forgotPassword.isPending
                        ? "rgba(2,25,139,0.6)"
                        : "linear-gradient(135deg, #02198B 0%, #1E40AF 100%)",
                      boxShadow: forgotPassword.isPending ? "none" : "0 8px 24px rgba(2,25,139,0.4)",
                    }}
                  >
                    {forgotPassword.isPending ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Sending OTP…
                      </>
                    ) : (
                      <>
                        Send Reset Code
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.div>
              </motion.div>
            </form>
          )}
        </div>

        {/* Back to login */}
        <motion.div variants={item} className="text-center mt-5">
          <Link
            href="/admin/auth/login"
            className="inline-flex items-center gap-1.5 text-xs text-[#4B5563] hover:text-[#9CA3AF] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Admin Login
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
