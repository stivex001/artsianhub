"use client";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
};

export const ContactSupport = ({ className }: Props) => {
  return (
    <Link
      href="mailto:support@artisanshub.org"
      className={`text-sm text-paragraph flex items-center justify-center ${className}`}
    >
      Having a bit of trouble?{" "}
      <span className="text-primary ml-1 font-medium">Contact Support</span>
    </Link>
  );
};
