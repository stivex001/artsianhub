"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  variant?: "primary" | "danger";
  loading?: boolean;
  /** Disables the confirm button independently of loading — use for required form fields */
  confirmDisabled?: boolean;
  onConfirm: () => void;
  onClose: () => void;
  /** Optional content rendered between the description and the action buttons */
  children?: React.ReactNode;
}

const ConfirmModal = ({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  variant = "primary",
  loading = false,
  confirmDisabled = false,
  onConfirm,
  onClose,
  children,
}: ConfirmModalProps) => {
  const confirmBg =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-[#02198B] hover:bg-[#011571]";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Accent strip */}
              <div
                className={`h-1 w-full ${
                  variant === "danger"
                    ? "bg-gradient-to-r from-red-500 to-rose-400"
                    : "bg-gradient-to-r from-[#02198B] to-[#1e3a8a]"
                }`}
              />

              <div className="px-6 py-5 flex flex-col gap-4">
                <div>
                  <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{description}</p>
                </div>

                {children}

                <div className="flex items-center justify-end gap-2.5">
                  <button
                    onClick={onClose}
                    disabled={loading}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-gray-600 bg-gray-100
                      hover:bg-gray-200 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={onConfirm}
                    disabled={loading || confirmDisabled}
                    className={`px-4 py-2 rounded-xl text-sm font-medium text-white transition-colors
                      disabled:opacity-60 flex items-center gap-2 ${confirmBg}`}
                  >
                    {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    {confirmLabel}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
