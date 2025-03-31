"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

const SheetModalCloseContext = createContext<
  | {
      closeModal: () => void;
      openModal: () => void;
      isOpen: boolean;
    }
  | undefined
>(undefined);

export const ModalCloseProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <SheetModalCloseContext.Provider value={{ closeModal, openModal, isOpen }}>
      {children}
    </SheetModalCloseContext.Provider>
  );
};

export const useModalClose = () => {
  const context = useContext(SheetModalCloseContext);
  if (!context) {
    throw new Error(
      "useModalClose musts be used within a ModalCloseProvider"
    );
  }
  return context;
};
