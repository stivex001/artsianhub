"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { X, Loader2, Eye, EyeOff } from "lucide-react";
import { useAdminManagement, AdminRole, CreateAdminBody } from "@/api/crud/admin";

interface CreateAdminModalProps {
  onClose: () => void;
  onCreated: () => void;
}

const ROLES: { value: AdminRole; label: string; description: string }[] = [
  { value: "ADMIN",       label: "Admin",       description: "Can manage artisans, clients, bookings and content" },
  { value: "SUPER_ADMIN", label: "Super Admin", description: "Full access including managing other admins"         },
];

const CreateAdminModal = ({ onClose, onCreated }: CreateAdminModalProps) => {
  const [form, setForm] = useState<CreateAdminBody>({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
    roleLabel: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CreateAdminBody, string>>>({});

  const { createAdmin } = useAdminManagement();
  const { mutateAsync, isPending } = createAdmin();

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim())     e.name     = "Name is required";
    if (!form.email.trim())    e.email    = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    if (!form.password.trim()) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters";
    return e;
  };

  const handleChange = (field: keyof CreateAdminBody, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    try {
      await mutateAsync({
        ...form,
        roleLabel: form.roleLabel?.trim() || undefined,
      });
      toast.success("Admin created successfully.");
      onCreated();
      onClose();
    } catch {
      toast.error("Failed to create admin. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col overflow-hidden">
        {/* Top strip */}
        <div className="h-1 w-full bg-gradient-to-r from-[#02198B] via-[#1e3a8a] to-[#F0C422]" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
          <div>
            <h2 className="text-base font-bold text-gray-900">Create Admin</h2>
            <p className="text-xs text-gray-400 mt-0.5">New admin account for the platform</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4 overflow-y-auto">
          {/* Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="e.g. Support Agent"
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-gray-50 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition
                ${errors.name ? "border-red-300 bg-red-50" : "border-gray-200"}`}
            />
            {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="admin@artisanshub.com"
              className={`w-full text-sm px-3.5 py-2.5 rounded-xl border bg-gray-50 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition
                ${errors.email ? "border-red-300 bg-red-50" : "border-gray-200"}`}
            />
            {errors.email && <p className="text-[11px] text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Min. 8 characters"
                className={`w-full text-sm px-3.5 py-2.5 pr-10 rounded-xl border bg-gray-50 placeholder-gray-400
                  focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition
                  ${errors.password ? "border-red-300 bg-red-50" : "border-gray-200"}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-red-500">{errors.password}</p>}
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">Role <span className="text-red-500">*</span></label>
            <div className="flex flex-col gap-2">
              {ROLES.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => handleChange("role", r.value)}
                  className={`flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition
                    ${form.role === r.value
                      ? "border-[#02198B] bg-[#02198B]/[0.04]"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300"}`}
                >
                  <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center
                    ${form.role === r.value ? "border-[#02198B]" : "border-gray-300"}`}>
                    {form.role === r.value && (
                      <div className="w-2 h-2 rounded-full bg-[#02198B]" />
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${form.role === r.value ? "text-[#02198B]" : "text-gray-700"}`}>
                      {r.label}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{r.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Role Label (optional) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-600">
              Role Label <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <input
              type="text"
              value={form.roleLabel}
              onChange={(e) => handleChange("roleLabel", e.target.value)}
              placeholder="e.g. Moderator, Senior Moderator"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 placeholder-gray-400
                focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40 transition"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-50 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#02198B] text-white text-sm font-medium
              hover:bg-[#011571] disabled:opacity-60 transition-colors shadow-sm"
          >
            {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            Create Admin
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateAdminModal;
