"use client";

import { useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, Loader2 } from "lucide-react";
import { useAdminArtisans } from "@/apis/crud/admin";
import ConfirmModal from "@/components/admin/shared/ConfirmModal";

interface VerifyButtonProps {
  artisanId: string;
  isVerified: boolean;
  onSuccess: () => void;
}

const VerifyButton = ({ artisanId, isVerified, onSuccess }: VerifyButtonProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { verifyArtisan } = useAdminArtisans();
  const { mutateAsync, isPending } = verifyArtisan(artisanId);

  const handleConfirm = async () => {
    try {
      await mutateAsync({ status: isVerified ? "unverified" : "verified" });
      toast.success(
        isVerified ? "Artisan verification revoked." : "Artisan verified successfully."
      );
      setShowConfirm(false);
      onSuccess();
    } catch {
      toast.error("Failed to update verification. Try again.");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm
          ${
            isVerified
              ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
      >
        <BadgeCheck className="w-4 h-4" />
        {isVerified ? "Revoke Verify" : "Verify Artisan"}
      </button>

      <ConfirmModal
        open={showConfirm}
        title={isVerified ? "Revoke Verification" : "Verify Artisan"}
        description={
          isVerified
            ? "This will remove the verified badge from this artisan's profile. Are you sure?"
            : "This will mark the artisan as verified and display a verified badge on their profile. Continue?"
        }
        confirmLabel={isVerified ? "Revoke" : "Verify"}
        variant={isVerified ? "danger" : "primary"}
        loading={isPending}
        onConfirm={handleConfirm}
        onClose={() => setShowConfirm(false)}
      />
    </>
  );
};

export default VerifyButton;
