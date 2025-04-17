// components/ActionModal.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "./Spinner";

type ActionModalProps = {
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
  onCompleted?: () => void;
  isLoading?: boolean;
  showCompleted?: boolean;
};

const ActionModal: React.FC<ActionModalProps> = ({
  onAccept,
  onDecline,
  onClose,
  onCompleted,
  isLoading,
  showCompleted,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className=" absolute z-50 top-8 right-0 mt-2 rounded-xl shadow-lg"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className="relative">
              {/* Accept bubble */}
              <div className="bg-[#003E7F] text-white px-6 py-2 rounded-[20px] text-center relative">
                <button onClick={onAccept} className="font-semibold">
                  Accept
                </button>
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="white" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>

              {/* Decline bubble */}
              <div className="bg-white px-6 py-2 space-y-3 rounded-[20px] font-semibold text-start mt-2 relative">
                <button onClick={onDecline} className="text-red-600">
                  Decline
                </button>
                {showCompleted && (
                  <button onClick={onCompleted} className=" text-black">
                    Completed
                  </button>
                )}
                <div className="absolute top-[-6px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white" />
              </div>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ActionModal;
