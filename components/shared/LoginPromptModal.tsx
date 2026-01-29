"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Link from "next/link";

export type SelectedArtisan = {
  name: string;
  category?: string;
  title?: string;
};

type Props = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedArtisan?: SelectedArtisan | null;
  /** Optional URL to redirect back to after auth (e.g. current artisan profile) */
  redirectUrl?: string;
  /** @deprecated Use selectedArtisan instead */
  selectedCategory?: { title?: string };
};

const buildArtisanDisplayName = (artisan: SelectedArtisan): string => {
  const title = artisan.title ?? artisan.category;
  if (title) return `${artisan.name}`;
  return artisan.name;
};

export const LoginPromptModal = ({
  isOpen,
  onOpenChange,
  selectedArtisan,
  redirectUrl,
  selectedCategory,
}: Props) => {
  const artisanDisplayName = selectedArtisan
    ? buildArtisanDisplayName(selectedArtisan)
    : null;
  const title = artisanDisplayName
    ? `Sign in to contact ${artisanDisplayName}`
    : "Sign in to contact this artisan";

  const loginHref = redirectUrl
    ? `/auth/login?redirect=${encodeURIComponent(redirectUrl)}`
    : "/auth/login";
  const signupHref = redirectUrl
    ? `/auth/signup?role=client&redirect=${encodeURIComponent(redirectUrl)}`
    : "/auth/signup?role=client";

  const signupButtonText = artisanDisplayName
    ? `Create an account to contact ${artisanDisplayName}`
    : "Create an account to contact this artisan";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className=" bg-white rounded-[20px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-base pt-2 text-center">
            {selectedCategory?.title && !selectedArtisan && (
              <span className="block mb-3 text-gray-700">
                You&apos;re interested in <strong>{selectedCategory.title}</strong>
              </span>
            )}
            You need to sign in to message this artisan. We&apos;ll bring you
            right back here after you sign in.
            <span className="mt-2 block text-gray-600">
              It only takes a minute. You&apos;ll come right back here.
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 pt-4">
          <Button asChild className="w-full" size="lg">
            <Link href={loginHref}>Sign In</Link>
          </Button>
        </div>
        <Link href={signupHref} className="text-md text-gray-500 text-center pt-2">
          New here? Create an account to message this artisan.
        </Link>
      </DialogContent>
    </Dialog>
  );
};
