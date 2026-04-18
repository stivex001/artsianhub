"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Crown } from "lucide-react";
import { useAdminArtisans } from "@/apis/crud/admin";
import ConfirmModal from "@/components/admin/shared/ConfirmModal";

interface FeaturedButtonProps {
  artisanId: string;
  featured: boolean;
  onSuccess: () => void;
}

const FeaturedButton = ({ artisanId, featured, onSuccess }: FeaturedButtonProps) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { toggleFeatured } = useAdminArtisans();
  const { mutateAsync, isPending } = toggleFeatured(artisanId);

  const handleConfirm = async () => {
    try {
      await mutateAsync({ featured: !featured });
      toast.success(featured ? "Removed from featured." : "Artisan featured on homepage.");
      setShowConfirm(false);
      onSuccess();
    } catch (error: any) {
      toast.error(error?.data?.error ?? "Failed to update featured status.");
    }
  };

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm
          ${
            featured
              ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
          }`}
      >
        <Crown className="w-4 h-4" />
        {featured ? "Unfeature" : "Feature"}
      </button>

      <ConfirmModal
        open={showConfirm}
        title={featured ? "Remove from Featured" : "Feature on Homepage"}
        description={
          featured
            ? "This artisan will no longer appear in the featured section of the homepage."
            : "This artisan will be highlighted in the featured section of the homepage."
        }
        confirmLabel={featured ? "Unfeature" : "Feature"}
        variant={featured ? "danger" : "primary"}
        loading={isPending}
        onConfirm={handleConfirm}
        onClose={() => setShowConfirm(false)}
      />
    </>
  );
};

export default FeaturedButton;
