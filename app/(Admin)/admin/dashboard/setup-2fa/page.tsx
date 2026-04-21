"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  Smartphone,
  Copy,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  RefreshCw,
  BadgeCheck,
} from "lucide-react";
import { useAdminAuth } from "@/apis/crud/adminAuth";
import { toast } from "sonner";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

type Stage = "idle" | "scan" | "enabled";

const Setup2FAPage = () => {
  const { setup2FA, enable2FA } = useAdminAuth();

  const [stage, setStage] = useState<Stage>("idle");
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [otpToken, setOtpToken] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);

  const handleSetup = async () => {
    setOtpToken("");
    setOtpError(null);
    try {
      await setup2FA.mutateAsync(undefined, {
        onSuccess: (res) => {
          setQrCodeUrl(res.qrCodeUrl);
          setSecret(res.secret);
          setStage("scan");
        },
        onError: (error: any) => {
          const msg = error?.data?.message ?? error?.data?.error ?? "Failed to generate 2FA setup";
          toast.error(msg);
        },
      });
    } catch {
      // handled in onError
    }
  };

  const handleCopy = async () => {
    if (!secret) return;
    await navigator.clipboard.writeText(secret);
    setCopied(true);
    toast.success("Secret copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnable = async () => {
    if (otpToken.length < 6) {
      setOtpError("Please enter the full 6-digit code from your authenticator app.");
      return;
    }
    setOtpError(null);
    try {
      await enable2FA.mutateAsync(
        { token: otpToken },
        {
          onSuccess: () => {
            setStage("enabled");
            toast.success("2FA has been enabled on your account!");
          },
          onError: (error: any) => {
            const msg = error?.data?.message ?? error?.data?.error ?? "Invalid 2FA token. Please try again.";
            setOtpError(msg);
          },
        }
      );
    } catch {
      // handled in onError
    }
  };

  // ── Success state ────────────────────────────────────────────────────────────
  if (stage === "enabled") {
    return (
      <section className="flex flex-col gap-6 max-w-lg">
        <div>
          <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Two-Factor Authentication
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Add an extra layer of security to your admin account
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col items-center gap-5 text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center">
            <BadgeCheck className="w-8 h-8 text-green-600" />
          </div>
          <div className="flex flex-col gap-1.5">
            <h2 className="text-lg font-bold text-gray-900">2FA is now active</h2>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Your account is protected. You will be asked for a 6-digit code from your
              authenticator app each time you log in.
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full text-left p-4 rounded-xl bg-green-50 border border-green-100">
            {[
              "Keep your authenticator app installed and accessible",
              "Save your secret key in a secure location as a backup",
              "Contact a Super Admin if you ever lose access to your app",
            ].map((tip, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <p className="text-xs text-green-800">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6 max-w-lg">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-primary" />
          Two-Factor Authentication
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Add an extra layer of security to your admin account
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6">
        {/* Instructions */}
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
            <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
            <p className="text-sm text-blue-700 leading-relaxed">
              Scan the QR code with an authenticator app like{" "}
              <strong>Google Authenticator</strong>, <strong>Authy</strong>, or{" "}
              <strong>Microsoft Authenticator</strong>. If you can&apos;t scan the code, enter the
              secret key manually.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-2">
            {[
              "Install an authenticator app on your phone",
              "Click 'Generate QR Code' below",
              "Scan the QR code or enter the secret key manually",
              "Enter the 6-digit code to confirm and activate 2FA",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* QR code + enable section */}
        {stage === "scan" && qrCodeUrl && secret ? (
          <div className="flex flex-col items-center gap-6">
            {/* QR code image */}
            <div className="p-3 bg-white border-2 border-gray-200 rounded-2xl shadow-sm">
              <Image
                src={qrCodeUrl}
                alt="2FA QR Code"
                width={200}
                height={200}
                className="rounded-lg"
                unoptimized
              />
            </div>

            {/* Secret key */}
            <div className="w-full flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                Manual Entry Key
              </label>
              <div className="flex items-center gap-2">
                <code className="flex-1 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-mono text-gray-800 tracking-wider break-all">
                  {secret}
                </code>
                <button
                  onClick={handleCopy}
                  className="p-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors shrink-0"
                  aria-label="Copy secret key"
                >
                  {copied ? (
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full border-t border-gray-100" />

            {/* Confirm & Enable */}
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-primary shrink-0" />
                <p className="text-sm font-semibold text-gray-800">
                  Confirm with your authenticator app
                </p>
              </div>
              <p className="text-xs text-gray-500 -mt-2">
                Open your authenticator app, scan the QR code above, then enter the 6-digit
                code it shows to activate 2FA.
              </p>

              {/* OTP Input */}
              <div className="flex flex-col items-center gap-3">
                <InputOTP
                  maxLength={6}
                  value={otpToken}
                  onChange={(val) => {
                    setOtpToken(val);
                    if (otpError) setOtpError(null);
                  }}
                >
                  <InputOTPGroup className="gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                {otpError && (
                  <p className="flex items-center gap-1.5 text-xs text-red-500">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {otpError}
                  </p>
                )}
              </div>

              <button
                onClick={handleEnable}
                disabled={enable2FA.isPending || otpToken.length < 6}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {enable2FA.isPending ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Verifying…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Enable 2FA
                  </>
                )}
              </button>

              <button
                onClick={handleSetup}
                disabled={setup2FA.isPending}
                className="flex items-center justify-center gap-1.5 text-xs text-gray-400 hover:text-primary transition-colors underline-offset-2 hover:underline disabled:opacity-50 mx-auto"
              >
                <RefreshCw className="w-3 h-3" />
                {setup2FA.isPending ? "Generating…" : "Generate a new code"}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-center">
              <Smartphone className="w-7 h-7 text-primary/60" />
            </div>
            <button
              onClick={handleSetup}
              disabled={setup2FA.isPending}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              {setup2FA.isPending ? "Generating…" : "Generate QR Code"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Setup2FAPage;
