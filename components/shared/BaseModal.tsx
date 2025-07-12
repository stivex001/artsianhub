"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export const BaseModal = ({
  isOpen,
  onClose,
  children,
  className = "",
}: BaseModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        onClick={(e) => e.stopPropagation()}
        className={`p-0 bg-transparent border-none shadow-none ${className}`}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};
