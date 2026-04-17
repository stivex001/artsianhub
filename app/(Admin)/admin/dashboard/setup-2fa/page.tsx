"use client";

import React, { useState } from "react";
import { ShieldCheck, Smartphone, Copy, CheckCircle2, AlertCircle } from "lucide-react";
import { useAdminAuth } from "@/apis/crud/adminAuth";
import { toast } from "sonner";
import Image from "next/image";

const Setup2FAPage = () => {
  const { setup2FA } = useAdminAuth();

  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSetup = async () => {
    try {
      await setup2FA.mutateAsync(undefined, {
        onSuccess: (res) => {
          setQrCodeUrl(res.qrCodeUrl);
          setSecret(res.secret);
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
              <strong>Microsoft Authenticator</strong>. If you can't scan the code, enter the
              secret key manually.
            </p>
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-2">
            {[
              "Install an authenticator app on your phone",
              "Click 'Generate QR Code' below",
              "Scan the QR code or enter the secret key manually",
              "Use the 6-digit code from the app to verify future logins",
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

        {/* QR code section */}
        {qrCodeUrl && secret ? (
          <div className="flex flex-col items-center gap-5">
            {/* QR code image */}
            <div className="p-3 bg-white border-2 border-gray-200 rounded-2xl shadow-sm">
              <Image
                src={qrCodeUrl}
                alt="2FA QR Code"
                width={200}
                height={200}
                className="rounded-lg"
                unoptimized // data URLs don't go through Next.js image optimization
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

            {/* Regenerate */}
            <button
              onClick={handleSetup}
              disabled={setup2FA.isPending}
              className="text-xs text-gray-500 hover:text-primary transition-colors underline-offset-2 hover:underline disabled:opacity-50"
            >
              {setup2FA.isPending ? "Generating…" : "Generate a new code"}
            </button>
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
