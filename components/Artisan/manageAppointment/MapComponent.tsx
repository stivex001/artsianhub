"use client";

import React from "react";
import { InteractiveMap } from "@/components/shared/InteractiveMap";

interface Props {
  address?: string | null;
  height?: string;
  zoom?: number;
}

export const MapComponent = ({ address, height = "h-48", zoom }: Props) => {
  return <InteractiveMap address={address} height={height} zoom={zoom} />;
};
