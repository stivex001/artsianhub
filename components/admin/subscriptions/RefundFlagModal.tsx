"use client";

import React, { useState } from "react";
import { X, AlertTriangle, RotateCcw } from "lucide-react";
import { Subscription, useAdminSubscriptions } from "@/apis/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  subscription: Subscription;
  onClose: () => void;
}

const RefundFlagModal = ({ subscription, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { flagRefund } = useAdminSubscriptions();
  const mutation = flagRefund(subscription.artisanId);

  const [flag, setFlag] = useState(true);
  const [note, setNote] = useState("");

  const handleConfirm = async () => {
    try {
      await mutation.mutateAsync({ refundFlag: flag, note: note.trim() || undefined });
      toast.success(flag ? "Refund flag set" : "Refund flag removed");
      queryClient.invalidateQueries({ queryKey: ["admin_subscriptions"] });
      onClose();
    } catch {
      toast.error("Failed to update refund flag");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">Refund Flag</h2>
              <p className="text-xs text-gray-500 mt-0.5">{subscription.userId.email}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Action toggle */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-700">Action</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setFlag(true)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  flag
                    ? "bg-red-50 border-red-300 text-red-700"
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-600"
                }`}
              >
                <AlertTriangle className="w-4 h-4 shrink-0" />
                Flag for Refund
              </button>
              <button
                type="button"
                onClick={() => setFlag(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium transition-all ${
                  !flag
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:border-green-200 hover:text-green-600"
                }`}
              >
                <RotateCcw className="w-4 h-4 shrink-0" />
                Remove Flag
              </button>
            </div>
          </div>

          {/* Warning text */}
          <div
            className={`rounded-xl px-4 py-3 text-sm ${
              flag
                ? "bg-orange-50 text-orange-700 border border-orange-100"
                : "bg-green-50 text-green-700 border border-green-100"
            }`}
          >
            {flag
              ? "This will mark the subscription for a refund. The artisan will be notified and the subscription may be paused pending review."
              : "This will remove the refund flag from the subscription and restore its normal state."}
          </div>

          {/* Note */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">
              Note <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="e.g. Client requested full refund. Processing."
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={mutation.isPending}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white disabled:opacity-50 transition-colors ${
                flag
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {mutation.isPending
                ? "Saving…"
                : flag
                ? "Confirm Flag"
                : "Remove Flag"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundFlagModal;
