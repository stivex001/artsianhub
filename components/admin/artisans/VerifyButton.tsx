"use client";

import React from "react";
import { toast } from "sonner";
import { BadgeCheck, Loader2 } from "lucide-react";
import { useAdminArtisans } from "@/apis/crud/admin";

interface VerifyButtonProps {
  artisanId: string;
  isVerified: boolean;
  onSuccess: () => void;
}

/**
 * Toggle button to verify or revoke verification for an artisan.
 */
const VerifyButton = ({ artisanId, isVerified, onSuccess }: VerifyButtonProps) => {
  const { verifyArtisan } = useAdminArtisans();
  const { mutateAsync, isPending } = verifyArtisan(artisanId);

  const handle = async () => {
    try {
      await mutateAsync({ status: isVerified ? "unverified" : "verified" });
      toast.success(
        isVerified ? "Artisan marked as unverified." : "Artisan verified successfully."
      );
      onSuccess();
    } catch {
      toast.error("Failed to update verification. Try again.");
    }
  };

  return (
    <button
      onClick={handle}
      disabled={isPending}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm disabled:opacity-60
        ${
          isVerified
            ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <BadgeCheck className="w-4 h-4" />
      )}
      {isVerified ? "Revoke Verify" : "Verify Artisan"}
    </button>
  );
};

export default VerifyButton;
