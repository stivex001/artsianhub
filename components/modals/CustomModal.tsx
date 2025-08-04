import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ReusableModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export const CustomModal = ({
  isOpen,
  onClose,
  icon,
  title,
  description,
  children,
  actions,
}: ReusableModalProps) => {
  const Icon = icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="lg:max-w-md text-center bg-white rounded-[20px]">
        <DialogTitle>
          <VisuallyHidden>Modal</VisuallyHidden>
        </DialogTitle>
        {icon && <div className="mx-auto mb-5">{Icon}</div>}

        <div className="space-y-5">{children}</div>
      </DialogContent>
    </Dialog>
  );
};
