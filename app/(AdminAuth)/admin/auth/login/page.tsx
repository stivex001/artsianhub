"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";
import { Eye, EyeOff, Shield, Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAdminAuth } from "@/apis/crud/adminAuth";
import { useAuthStore } from "@/store/authStore";
import { AuthUser } from "@/components/api/type";
import logo from "@/components/assets/images/newA.png";

// ── Animated dot-grid background ─────────────────────────────────────────────
const DotGrid = () => (
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.15]"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="#F0C422" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dots)" />
  </svg>
);

// ── Stagger variants ──────────────────────────────────────────────────────────
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

// ── Input component ───────────────────────────────────────────────────────────
interface InputProps {
  id: string;
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  icon: React.ReactNode;
  error?: string;
  autoComplete?: string;
  rightSlot?: React.ReactNode;
}

const DarkInput = ({ id, label, type, value, onChange, placeholder, icon, error, autoComplete, rightSlot }: InputProps) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4B5563] pointer-events-none">
        {icon}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full h-12 pl-11 pr-${rightSlot ? "12" : "4"} bg-white/[0.04] border rounded-xl text-[#F9FAFB] placeholder:text-[#374151] text-sm transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-[#02198B]/60 focus:border-[#02198B]
          ${error ? "border-red-500/60 bg-red-500/5" : "border-white/[0.08] hover:border-white/[0.14]"}`}
      />
      {rightSlot && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</span>
      )}
    </div>
    {error && (
      <p className="flex items-center gap-1.5 text-xs text-red-400">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        {error}
      </p>
    )}
  </div>
);

// ── Page ──────────────────────────────────────────────────────────────────────
export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const { setAccessToken, setCurrentUser, accessToken, currentUser } = useAuthStore();
  const { login } = useAdminAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Already logged in guard — send any authenticated admin straight to the dashboard
  useEffect(() => {
    const isAdmin = currentUser?.isAdmin === true ||
      currentUser?.role === "ADMIN" ||
      currentUser?.role === "SUPER_ADMIN";
    if (accessToken && isAdmin) {
      router.replace(redirect ?? "/admin/dashboard");
    }
  }, [accessToken, currentUser, redirect, router]);

  const validate = () => {
    const errs: typeof errors = {};
    if (!email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errs.email = "Enter a valid email address";
    if (!password.trim()) errs.password = "Password is required";
    else if (password.length < 6) errs.password = "Password must be at least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login.mutateAsync(
        { email: email.trim(), password },
        {
          onSuccess: (response) => {
            const { token, admin } = response;
            if (!token || !admin) {
              toast.error("Invalid response from server.");
              return;
            }

            // Map admin object → AuthUser shape
            // Normalise role to uppercase so SUPER_ADMIN checks are always consistent
            const [firstName, ...rest] = (admin.name ?? "Admin").split(" ");
            const normalizedRole = (admin.role ?? "ADMIN").toUpperCase();
            setAccessToken(token);
            setCurrentUser({
              _id: admin.id,
              userId: admin.id,
              firstName,
              lastName: rest.join(" "),
              email: admin.email,
              role: normalizedRole,
              isAdmin: true,
              isArtisan: false,
              isClient: false,
              isVerified: true,
              isActive: true,
            } as AuthUser);

            toast.success("Welcome back, Admin!");
            router.replace(redirect ?? "/admin/dashboard");
          },
          onError: (error: any) => {
            const msg = error?.data?.message ?? error?.data?.error ?? "Login failed. Check your credentials.";
            toast.error(msg);
          },
        }
      );
    } catch {
      // handled in onError
    }
  };

  return (
    <div className="min-h-dvh flex bg-[#070B18] overflow-hidden">
      {/* ── Left brand panel (desktop only) ─────────────────────────── */}
      <div className="hidden lg:flex relative w-[42%] flex-col justify-between p-10 overflow-hidden bg-[#060A16]">
        {/* Dot grid texture */}
        <DotGrid />

        {/* Radial glow from brand color */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(2,25,139,0.55) 0%, transparent 70%)",
          }}
        />

        {/* Top diagonal accent bar */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background: "linear-gradient(90deg, #02198B 0%, #F0C422 100%)",
          }}
        />

        {/* Logo */}
        <div className="relative z-10">
          <Image src={logo} alt="ArtisansHub" width={120} height={56} className="object-contain" />
        </div>

        {/* Center copy */}
        <motion.div
          className="relative z-10 flex flex-col gap-6"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#02198B] flex items-center justify-center shadow-lg shadow-[#02198B]/30">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs font-bold text-[#F0C422] uppercase tracking-[0.2em]">
              Admin Portal
            </span>
          </div>

          <h1 className="text-4xl font-black text-white leading-[1.15] tracking-tight">
            Command
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: "linear-gradient(135deg, #02198B 0%, #4F7FFF 60%, #F0C422 100%)" }}
            >
              Center
            </span>
          </h1>

          <p className="text-[#6B7280] text-sm leading-relaxed max-w-xs">
            Restricted access for platform administrators. All activity is
            monitored and logged.
          </p>

          {/* Trust badges */}
          <div className="flex flex-col gap-2 mt-2">
            {[
              { icon: Shield, text: "End-to-end encrypted session" },
              { icon: Lock, text: "Role-based access control" },
              { icon: AlertCircle, text: "Activity audit logging enabled" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-md bg-[#F0C422]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-3 h-3 text-[#F0C422]" />
                </div>
                <span className="text-xs text-[#4B5563]">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom tagline */}
        <div className="relative z-10">
          <p className="text-[10px] text-[#374151] uppercase tracking-widest">
            ArtisansHub &copy; {new Date().getFullYear()} — Platform Admin
          </p>
        </div>
      </div>

      {/* ── Right form panel ─────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center px-5 py-10 lg:px-12">
        {/* Top bar — mobile only */}
        <div className="absolute top-6 left-5 lg:hidden">
          <Image src={logo} alt="ArtisansHub" width={96} height={44} className="object-contain" />
        </div>

        <motion.div
          className="w-full max-w-[420px]"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Card */}
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
                  Restricted
                </span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Admin Sign In
              </h2>
              <p className="text-sm text-[#6B7280] mt-1">
                Authorised personnel only
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate>
              <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col gap-5">
                <motion.div variants={item}>
                  <DarkInput
                    id="email"
                    label="Email address"
                    type="email"
                    value={email}
                    onChange={(v) => { setEmail(v); setErrors((p) => ({ ...p, email: undefined })); }}
                    placeholder="admin@artisanshub.org"
                    icon={<Mail className="w-4 h-4" />}
                    error={errors.email}
                    autoComplete="email"
                  />
                </motion.div>

                <motion.div variants={item}>
                  <DarkInput
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(v) => { setPassword(v); setErrors((p) => ({ ...p, password: undefined })); }}
                    placeholder="••••••••••••"
                    icon={<Lock className="w-4 h-4" />}
                    error={errors.password}
                    autoComplete="current-password"
                    rightSlot={
                      <button
                        type="button"
                        onClick={() => setShowPassword((p) => !p)}
                        className="p-1 text-[#4B5563] hover:text-[#9CA3AF] transition-colors"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                </motion.div>

                {/* Forgot password */}
                <motion.div variants={item} className="flex justify-end -mt-1">
                  <Link
                    href="/admin/auth/forgot-password"
                    className="text-xs text-[#4F7FFF] hover:text-[#7BA7FF] transition-colors font-medium"
                  >
                    Forgot password?
                  </Link>
                </motion.div>

                {/* Submit */}
                <motion.div variants={item}>
                  <button
                    type="submit"
                    disabled={login.isPending}
                    className="group w-full h-12 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: login.isPending
                        ? "rgba(2,25,139,0.6)"
                        : "linear-gradient(135deg, #02198B 0%, #1E40AF 100%)",
                      boxShadow: login.isPending ? "none" : "0 8px 24px rgba(2,25,139,0.4)",
                    }}
                  >
                    {login.isPending ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        Authenticating…
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.div>
              </motion.div>
            </form>
          </div>

          {/* Bottom notice */}
          <motion.p
            variants={item}
            className="text-center text-[11px] text-[#374151] mt-5 leading-relaxed"
          >
            This system is for authorised administrators only.
            <br />
            Unauthorised access attempts are logged and prosecuted.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
