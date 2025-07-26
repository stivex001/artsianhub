"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const BaseModal = ({
  isOpen,
  onClose,
  children,
  className = "",
  title,
}: BaseModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className={`p-0 bg-transparent border-none shadow-none ${className}`}
      >
        {title && (
          <DialogTitle className="flex items-center justify-between ">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-[#F9F9FB] rounded-[32px] transition-colors"
            >
              <X className="h-5 w-5 text-paragrah" />
            </button>
          </DialogTitle>
        )}
        {children}
      </DialogContent>
    </Dialog>
  );
};
