"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Shield,
  ShieldOff,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import { UserStatus } from "@/apis/crud/admin";
import ConfirmModal from "@/components/admin/shared/ConfirmModal";

// ─────────────────────────────────────────────────────────────────────────────
// Action config — drives both the button row and the confirmation modal
// ─────────────────────────────────────────────────────────────────────────────
const ACTION_CONFIG: Record<
  UserStatus,
  {
    label: string;
    Icon: React.ElementType;
    activeBtnCls: string;
    currentCls: string;
    modalTitle: string;
    modalDesc: string;
    variant: "primary" | "danger";
    requiresReason: boolean;
  }
> = {
  active: {
    label: "Activate Account",
    Icon: CheckCircle2,
    activeBtnCls:
      "bg-green-600 hover:bg-green-700 text-white",
    currentCls:
      "bg-green-50 text-green-700 border border-green-200 cursor-default",
    modalTitle: "Activate Account",
    modalDesc:
      "This will restore full access to this client's account. Are you sure?",
    variant: "primary",
    requiresReason: false,
  },
  suspended: {
    label: "Suspend Account",
    Icon: AlertTriangle,
    activeBtnCls:
      "bg-orange-500 hover:bg-orange-600 text-white",
    currentCls:
      "bg-orange-50 text-orange-700 border border-orange-200 cursor-default",
    modalTitle: "Suspend Account",
    modalDesc:
      "The client will be temporarily restricted. Please provide a reason.",
    variant: "danger",
    requiresReason: true,
  },
  banned: {
    label: "Ban Account",
    Icon: ShieldOff,
    activeBtnCls:
      "bg-red-600 hover:bg-red-700 text-white",
    currentCls:
      "bg-red-50 text-red-700 border border-red-200 cursor-default",
    modalTitle: "Ban Account",
    modalDesc:
      "The client will be permanently blocked from the platform. Please provide a reason.",
    variant: "danger",
    requiresReason: true,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Props
// ─────────────────────────────────────────────────────────────────────────────
interface ClientModerationPanelProps {
  currentStatus: UserStatus;
  isPending: boolean;
  onStatusChange: (status: UserStatus, reason?: string) => Promise<void>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
const ClientModerationPanel = ({
  currentStatus,
  isPending,
  onStatusChange,
}: ClientModerationPanelProps) => {
  const [pendingAction, setPendingAction] = useState<UserStatus | null>(null);
  const [reason, setReason] = useState("");

  const handleClose = () => {
    setPendingAction(null);
    setReason("");
  };

  const handleConfirm = async () => {
    if (!pendingAction) return;
    const cfg = ACTION_CONFIG[pendingAction];

    if (cfg.requiresReason && !reason.trim()) {
      toast.error("Please provide a reason before proceeding.");
      return;
    }

    try {
      await onStatusChange(pendingAction, reason.trim() || undefined);
      toast.success(`Client account ${pendingAction === "active" ? "activated" : pendingAction === "suspended" ? "suspended" : "banned"} successfully.`);
      handleClose();
    } catch {
      toast.error("Failed to update client status. Please try again.");
    }
  };

  const activeConfig = pendingAction ? ACTION_CONFIG[pendingAction] : null;

  return (
    <>
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-900 text-sm mb-4 flex items-center gap-2">
          <Shield className="w-4 h-4 text-gray-400" />
          Moderation
        </h3>

        <div className="flex flex-col gap-2">
          {(Object.entries(ACTION_CONFIG) as [UserStatus, typeof ACTION_CONFIG[UserStatus]][]).map(
            ([status, cfg]) => {
              const isCurrent = status === currentStatus;
              const { Icon } = cfg;

              return (
                <button
                  key={status}
                  onClick={() => !isCurrent && setPendingAction(status)}
                  disabled={isPending || isCurrent}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors
                    ${isCurrent ? cfg.currentCls : `${cfg.activeBtnCls} disabled:opacity-60`}`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0" />
                    {cfg.label}
                  </span>
                  {isCurrent && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70 bg-white/50 px-2 py-0.5 rounded-full">
                      Current
                    </span>
                  )}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Confirmation modal */}
      <ConfirmModal
        open={pendingAction !== null}
        title={activeConfig?.modalTitle ?? ""}
        description={activeConfig?.modalDesc ?? ""}
        confirmLabel={activeConfig?.label}
        variant={activeConfig?.variant ?? "primary"}
        loading={isPending}
        confirmDisabled={
          !!(activeConfig?.requiresReason && !reason.trim())
        }
        onConfirm={handleConfirm}
        onClose={handleClose}
      >
        {activeConfig?.requiresReason && (
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500">
              Reason <span className="text-red-400">*</span>
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe the reason for this action…"
              rows={3}
              autoFocus
              className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm text-gray-800
                placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#02198B]/20
                focus:border-[#02198B]/40 transition-all"
            />
          </div>
        )}
      </ConfirmModal>
    </>
  );
};

export default ClientModerationPanel;
