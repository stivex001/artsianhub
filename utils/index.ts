import { endOfDay, startOfDay } from "date-fns";

export { formatCurrency } from "./formatCurrency";
export { formatDateGB, formatDateTime } from "./formatDate";
export { renderHtml, RenderHtml } from "./renderHtml";

/** Extracts a readable error message from an unknown API error object. */
export function extractApiError(err: unknown, fallback: string): string {
  const e = err as any;
  return e?.data?.message ?? e?.data?.error ?? e?.message ?? fallback;
}

export enum PageTypes {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
  ARTISAN = "ARTISAN",
}

export enum ApprovalStatus {
  VERIFIED = "verified",
  PENDING = "pending",
  REJECTED = "rejected",
  APPROVED = "approved",
}

export enum UserRole {
  ARTISAN = "isArtisan",
  ADMIN = "isAdmin",
  CLIENT = "isClient",
}

export enum activeStatus {
  ACTIVE = "active",
  INACTIVE = "inActive",
}

export function localDateToUtcStartOfDayIso(date: Date): string | null {
  if (!date) return null;
  return startOfDay(date).toISOString();
}

export function localDateToUtcEndOfDayIso(date: Date): string | null {
  if (!date) return null;
  return endOfDay(date).toISOString();
}
