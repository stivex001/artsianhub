"use client"
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
    isOpen:boolean
    onOpenChange: (open: boolean) => void;
    selectedCategory?: any;
};

export const LoginPromptModal = ({isOpen, onOpenChange, selectedCategory}: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-[20px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Ready to find your perfect artisan?
          </DialogTitle>
          <DialogDescription className="text-base pt-2 text-center">
            {selectedCategory && (
              <span className="block mb-3 text-gray-700">
                You're interested in <strong>{selectedCategory.title}</strong>
              </span>
            )}
            Sign in or create an account to browse artisans, view portfolios,
            and start your next project.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button asChild className="w-full" size="lg">
            <Link href="/auth/login">Sign In</Link>
          </Button>
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link href="/auth/signup?role=client">Create Account</Link>
          </Button>
        </div>
        <p className="text-sm text-gray-500 text-center pt-2">
          Join thousands of clients finding talented artisans
        </p>
      </DialogContent>
    </Dialog>
  );
};
