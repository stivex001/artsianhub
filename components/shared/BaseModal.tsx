"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
  footer?: React.ReactNode;
}

export const BaseModal = ({
  isOpen,
  onClose,
  children,
  className = "",
  title,
  footer,
}: BaseModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className={`p-0 bg-transparent border-none shadow-none ${className}`}
      >
        {title ? (
          <DialogTitle className="sticky top-0 z-10 px-5 pt-5 bg-white flex items-center justify-between ">
            <p className="text-xl font-semibold text-gray-900">{title}</p>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center bg-[#F9F9FB] rounded-[32px] transition-colors"
            >
              <X className="h-5 w-5 text-paragrah" />
            </button>
          </DialogTitle>
        ) : (
          <DialogTitle>
            <VisuallyHidden>Modal</VisuallyHidden>
          </DialogTitle>
        )}
        <div className="">{children}</div>
        {footer && (
          <div className="sticky bottom-0 z-10 bg-white p-4">{footer}</div>
        )}
      </DialogContent>
    </Dialog>
  );
};
