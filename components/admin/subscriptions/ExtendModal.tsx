"use client";

import React, { useState } from "react";
import { X, CalendarPlus } from "lucide-react";
import { Subscription, useAdminSubscriptions } from "@/apis/crud/admin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  subscription: Subscription;
  onClose: () => void;
}

const PRESET_DAYS = [7, 14, 30, 60, 90];

const ExtendModal = ({ subscription, onClose }: Props) => {
  const queryClient = useQueryClient();
  const { extendSubscription } = useAdminSubscriptions();
  const mutation = extendSubscription(subscription.artisanId);

  const [days, setDays] = useState(30);
  const [note, setNote] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (days < 1) return;
    try {
      await mutation.mutateAsync({ days, note: note.trim() || undefined });
      toast.success(`Subscription extended by ${days} day${days !== 1 ? "s" : ""}`);
      queryClient.invalidateQueries({ queryKey: ["admin_subscriptions"] });
      onClose();
    } catch {
      toast.error("Failed to extend subscription");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div>
            <h2 className="font-semibold text-gray-900">Extend Subscription</h2>
            <p className="text-xs text-gray-500 mt-0.5">{subscription.userId.email}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          {/* Preset quick-select */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-gray-700">Quick select</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_DAYS.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDays(d)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all border ${
                    days === d
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-gray-50 text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {d} days
                </button>
              ))}
            </div>
          </div>

          {/* Custom days */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700">
              Custom days
            </label>
            <input
              type="number"
              min={1}
              max={365}
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
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
              placeholder="e.g. Complimentary extension for beta testers."
              className="px-3 py-2.5 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>

          <div className="flex gap-3 justify-end pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={mutation.isPending || days < 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-white bg-primary hover:bg-primary/90 disabled:opacity-50 transition-colors"
            >
              <CalendarPlus className="w-4 h-4" />
              {mutation.isPending ? "Extending…" : `Extend ${days}d`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExtendModal;
