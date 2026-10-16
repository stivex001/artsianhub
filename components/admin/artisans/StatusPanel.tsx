"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ShieldOff, ChevronDown, Loader2 } from "lucide-react";
import { useAdminArtisans, ArtisanAccountStatus } from "@/apis/crud/admin";

const STATUS_OPTIONS: { value: ArtisanAccountStatus; label: string; color: string }[] = [
  { value: "active",    label: "Activate", color: "text-emerald-700" },
  { value: "suspended", label: "Suspend",  color: "text-amber-700"   },
  { value: "banned",    label: "Ban",      color: "text-red-700"     },
];

interface StatusPanelProps {
  artisanId: string;
  current: ArtisanAccountStatus;
  onSuccess: () => void;
}

const StatusPanel = ({ artisanId, current, onSuccess }: StatusPanelProps) => {
  const [open, setOpen] = useState(false);
  const [chosen, setChosen] = useState<ArtisanAccountStatus>(current);
  const [reason, setReason] = useState("");
  const { updateArtisanStatus } = useAdminArtisans();
  const { mutateAsync, isPending } = updateArtisanStatus(artisanId);

  const handleClose = () => {
    setOpen(false);
    setChosen(current);
    setReason("");
  };

  const handleSubmit = async () => {
    if (chosen !== "active" && !reason.trim()) {
      toast.error("Please provide a reason for this action.");
      return;
    }
    try {
      await mutateAsync({ accountStatus: chosen, reason: reason.trim() || undefined });
      toast.success(`Artisan status updated to ${chosen}.`);
      handleClose();
      onSuccess();
    } catch {
      toast.error("Failed to update status. Try again.");
    }
  };

  return (
    <>
      {/* Transparent backdrop — closes panel on outside click */}
      {open && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleClose}
        />
      )}

      <div className="relative">
        <button
          onClick={() => setOpen((p) => !p)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200
            text-sm font-medium text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors shadow-sm"
        >
          <ShieldOff className="w-4 h-4 text-gray-500" />
          Change Status
          <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <div className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl border border-gray-100 shadow-xl z-50 p-4 flex flex-col gap-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Select new status</p>
            <div className="flex flex-col gap-1">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setChosen(opt.value)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors
                    ${chosen === opt.value ? "bg-gray-100" : "hover:bg-gray-50"} ${opt.color}`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      opt.value === "active"
                        ? "bg-emerald-500"
                        : opt.value === "suspended"
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  />
                  {opt.label}
                </button>
              ))}
            </div>

            {chosen !== "active" && (
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason (required for suspend / ban)…"
                rows={2}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 resize-none
                  focus:outline-none focus:ring-2 focus:ring-[#02198B]/20 focus:border-[#02198B]/40"
              />
            )}

            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full py-2 rounded-xl bg-[#02198B] text-white text-sm font-medium
                hover:bg-[#011571] disabled:opacity-60 transition-colors flex items-center justify-center gap-2"
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Confirm
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default StatusPanel;
