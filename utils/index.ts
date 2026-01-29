import { endOfDay, startOfDay } from "date-fns";

export { formatCurrency } from "./formatCurrency";

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
