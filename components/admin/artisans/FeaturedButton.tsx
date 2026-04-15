"use client";

import React from "react";
import { toast } from "sonner";
import { Crown, Loader2 } from "lucide-react";
import { useAdminArtisans } from "@/api/crud/admin";

interface FeaturedButtonProps {
  artisanId: string;
  featured: boolean;
  onSuccess: () => void;
}

/**
 * Toggle button to feature or unfeature an artisan on the homepage.
 */
const FeaturedButton = ({ artisanId, featured, onSuccess }: FeaturedButtonProps) => {
  const { toggleFeatured } = useAdminArtisans();
  const { mutateAsync, isPending } = toggleFeatured(artisanId);

  const handle = async () => {
    try {
      await mutateAsync({ featured: !featured }, {
        onSuccess: (res) => {
          console.log(res);
          toast.success(featured ? "Removed from featured." : "Artisan featured on homepage.");
          onSuccess();
        },
        onError: (error) => {
          console.log(error, "error");
          toast.error(error.data?.error);
        },
      });
    } catch {
      console.log("Failed to update featured status.");
    }
  };

  return (
    <button
      onClick={handle}
      disabled={isPending}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm disabled:opacity-60
        ${
          featured
            ? "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
        }`}
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Crown className="w-4 h-4" />}
      {featured ? "Unfeature" : "Feature"}
    </button>
  );
};

export default FeaturedButton;
