"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Trophy, PlayCircle, X, ArrowRight, Loader2 } from "lucide-react";
import { useAppointments } from "@/api/crud/appointments";
import { useNotification } from "@/api/crud/notification";
import { toast } from "sonner";

type AcceptModalProps = {
  isOpen: boolean;
  onClose: () => void;
  id?: any;
  refetch: () => void;
  status: string;
};

/* ---------- status config ---------- */
const statusConfig = {
  Accepted: {
    icon: CheckCircle2,
    iconBg: "#00D261",
    iconGlow: "rgba(0,210,97,0.3)",
    accent: "#00D261",
    accentLight: "#e6f9ee",
    accentHover: "#00b855",
    title: "Accept This Appointment?",
    body: "Confirm that you're available for this job at the requested date, time, and location. The customer will be notified once you accept.",
    confirmLabel: "Accept Job",
  },
  Completed: {
    icon: Trophy,
    iconBg: "#F0C422",
    iconGlow: "rgba(240,196,34,0.3)",
    accent: "#02198B",
    accentLight: "#e7eefa",
    accentHover: "#071D8A",
    title: "Mark Job as Completed?",
    body: "Confirm that you have successfully completed this job. The client will be notified and can leave a review.",
    confirmLabel: "Complete Job",
  },
  default: {
    icon: PlayCircle,
    iconBg: "#516CF4",
    iconGlow: "rgba(81,108,244,0.3)",
    accent: "#02198B",
    accentLight: "#e7eefa",
    accentHover: "#071D8A",
    title: "Ready to Start This Job?",
    body: "Let the client know you're starting the job. Your status will update to In Progress once you confirm.",
    confirmLabel: "Start Job",
  },
} as const;

/* ---------- animation variants ---------- */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" as const } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 360, damping: 28, mass: 0.85 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 14,
    transition: { duration: 0.18, ease: "easeIn" as const },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 420, damping: 32 },
  },
};

const iconPop = {
  hidden: { opacity: 0, scale: 0.4, rotate: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring" as const, stiffness: 400, damping: 20, delay: 0.06 },
  },
};

/* ---------- component ---------- */
export const AcceptJobModal = ({
  isOpen,
  onClose,
  id,
  refetch,
  status = "Accepted",
}: AcceptModalProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const { updateBookingResponse } = useAppointments();
  const { getAllNotifications } = useNotification();
  const { refetch: notifyRefetch } = getAllNotifications();
  const { isPending: updatePending, mutate: updateRes } =
    updateBookingResponse<{ status: string }>(`${id}`);

  const cfg = statusConfig[status as keyof typeof statusConfig] ?? statusConfig.default;
  const Icon = cfg.icon;

  const handleBookingResponse = async () => {
    if (!id) {
      toast.error("Invalid Service selected");
      return;
    }
    try {
      updateRes(
        { status },
        {
          onSuccess: (response: any) => {
            toast.success(response?.message);
            refetch();
            notifyRefetch();
            onClose();
          },
          onError: (error: any) => {
            toast.error(error?.message || "Something went wrong");
          },
        }
      );
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update appointment");
    }
  };

  const modal = (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* centering shell */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 pointer-events-none">
            <motion.div
              key="card"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-[400px] overflow-hidden rounded-2xl bg-white shadow-[0_20px_70px_rgba(2,25,139,0.18)] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ── top accent strip ── */}
              <div
                className="h-1.5 w-full"
                style={{ background: cfg.iconBg }}
              />

              {/* ── content area ── */}
              <div className="px-7 pt-8 pb-7">
                <motion.div variants={stagger} initial="hidden" animate="visible">

                  {/* icon */}
                  <motion.div variants={iconPop} className="mb-5 flex justify-center">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `${cfg.iconBg}18`,
                        boxShadow: `0 4px 24px ${cfg.iconGlow}`,
                      }}
                    >
                      <Icon
                        size={30}
                        strokeWidth={1.8}
                        style={{ color: cfg.iconBg }}
                      />
                    </div>
                  </motion.div>

                  {/* title */}
                  <motion.h2
                    variants={fadeUp}
                    className="text-[1.2rem] font-bold text-textdeep text-center leading-snug mb-2"
                  >
                    {cfg.title}
                  </motion.h2>

                  {/* body */}
                  <motion.p
                    variants={fadeUp}
                    className="text-[0.84rem] text-textcolor text-center leading-relaxed mb-7"
                  >
                    {cfg.body}
                  </motion.p>

                  {/* actions */}
                  <motion.div variants={fadeUp} className="flex gap-3">
                    {/* cancel */}
                    <button
                      onClick={onClose}
                      disabled={updatePending}
                      className="flex-1 py-3 px-4 rounded-xl border border-bordergrey text-[0.88rem] font-semibold text-body hover:bg-milky active:scale-[0.98] transition-all duration-150 disabled:opacity-40"
                    >
                      Cancel
                    </button>

                    {/* confirm */}
                    <button
                      onClick={handleBookingResponse}
                      disabled={updatePending}
                      className="flex-1 py-3 px-4 rounded-xl text-[0.88rem] font-semibold text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150 disabled:opacity-70"
                      style={{
                        background: cfg.accent,
                        boxShadow: `0 4px 20px ${cfg.iconGlow}`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = cfg.accentHover;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = cfg.accent;
                      }}
                    >
                      {updatePending ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <>
                          <span>{cfg.confirmLabel}</span>
                          <ArrowRight size={15} className="opacity-80" />
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.div>
              </div>

              {/* close button */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-milky hover:bg-bordergrey/60 text-textgray hover:text-body transition-all duration-150"
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
};
