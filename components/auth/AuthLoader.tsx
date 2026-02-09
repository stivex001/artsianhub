"use client";

import React from "react";

type AuthSpinnerProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export const AuthSpinner = ({
  size = "md",
  className = "",
}: AuthSpinnerProps) => {
  const sizeClasses = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-[3px]",
    lg: "h-12 w-12 border-4",
  };

  return (
    <div
      className={`animate-spin rounded-full border-primary border-t-transparent ${sizeClasses[size]} ${className}`}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

type AuthLoadingScreenProps = {
  message?: string;
};

export const AuthLoadingScreen = ({
  message = "Loading...",
}: AuthLoadingScreenProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo/spinner container */}
        <div className="relative">
          {/* Outer ring */}
          <div className="h-16 w-16 rounded-full border-4 border-gray-100" />
          {/* Spinning ring */}
          <div className="absolute inset-0 h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        {/* Loading text */}
        <p className="text-sm font-medium text-gray-600 animate-pulse">
          {message}
        </p>
      </div>
    </div>
  );
};

type InlineAuthLoaderProps = {
  height?: string;
};

export const InlineAuthLoader = ({
  height = "h-10",
}: InlineAuthLoaderProps) => {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <AuthSpinner size="sm" />
    </div>
  );
};
