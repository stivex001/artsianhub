"use client";

import React, { useState } from "react";
import { KeyRound, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAdminAuth } from "@/apis/crud/adminAuth";
import { toast } from "sonner";

const ChangePasswordPage = () => {
  const { changePassword } = useAdminAuth();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const errs: typeof errors = {};
    if (!oldPassword) errs.oldPassword = "Current password is required";
    if (!newPassword) errs.newPassword = "New password is required";
    else if (newPassword.length < 8) errs.newPassword = "Minimum 8 characters";
    if (newPassword !== confirmPassword) errs.confirmPassword = "Passwords do not match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await changePassword.mutateAsync(
        { oldPassword, newPassword },
        {
          onSuccess: () => {
            toast.success("Password updated successfully");
            setDone(true);
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          },
          onError: (error: any) => {
            const msg = error?.data?.message ?? error?.data?.error ?? "Failed to update password";
            toast.error(msg);
          },
        }
      );
    } catch {
      // handled in onError
    }
  };

  return (
    <section className="flex flex-col gap-6 max-w-lg">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-primary" />
          Change Password
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          Update your admin account password
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        {done ? (
          <div className="flex flex-col items-center gap-4 py-6 text-center">
            <div className="w-14 h-14 rounded-full bg-green-50 border border-green-200 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">Password updated</p>
              <p className="text-sm text-gray-500 mt-1">Your password has been changed successfully.</p>
            </div>
            <button
              onClick={() => setDone(false)}
              className="text-sm text-primary font-medium hover:underline"
            >
              Change again
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
            {/* Current password */}
            <PasswordField
              id="old-password"
              label="Current Password"
              value={oldPassword}
              onChange={(v) => { setOldPassword(v); setErrors((p) => ({ ...p, oldPassword: undefined })); }}
              show={showOld}
              onToggle={() => setShowOld((p) => !p)}
              error={errors.oldPassword}
              autoComplete="current-password"
              placeholder="Your current password"
            />

            {/* New password */}
            <PasswordField
              id="new-password"
              label="New Password"
              value={newPassword}
              onChange={(v) => { setNewPassword(v); setErrors((p) => ({ ...p, newPassword: undefined })); }}
              show={showNew}
              onToggle={() => setShowNew((p) => !p)}
              error={errors.newPassword}
              autoComplete="new-password"
              placeholder="Minimum 8 characters"
            />

            {/* Confirm new password */}
            <PasswordField
              id="confirm-password"
              label="Confirm New Password"
              value={confirmPassword}
              onChange={(v) => { setConfirmPassword(v); setErrors((p) => ({ ...p, confirmPassword: undefined })); }}
              show={showConfirm}
              onToggle={() => setShowConfirm((p) => !p)}
              error={errors.confirmPassword}
              autoComplete="new-password"
              placeholder="Re-enter new password"
            />

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                disabled={changePassword.isPending}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Lock className="w-4 h-4" />
                {changePassword.isPending ? "Updating…" : "Update Password"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

// ── Password field sub-component ─────────────────────────────────────────────
interface PasswordFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}

const PasswordField = ({ id, label, value, onChange, show, onToggle, error, autoComplete, placeholder }: PasswordFieldProps) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
        <Lock className="w-4 h-4" />
      </span>
      <input
        id={id}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`w-full h-11 pl-10 pr-11 rounded-xl border text-sm text-gray-900 bg-gray-50 transition-all
          focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white
          ${error ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}`}
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
    </div>
    {error && (
      <p className="flex items-center gap-1.5 text-xs text-red-500">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        {error}
      </p>
    )}
  </div>
);

export default ChangePasswordPage;
