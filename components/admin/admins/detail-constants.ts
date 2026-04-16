import { AdminStatus } from "@/apis/crud/admin";

export const ACTIVITY_PAGE_SIZE = 8;

export const STATUS_OPTIONS: {
  value: AdminStatus;
  label: string;
  description: string;
  cls: string;
}[] = [
  {
    value: "active",
    label: "Active",
    description: "Admin can log in and perform actions",
    cls: "border-emerald-300 bg-emerald-50/50",
  },
  {
    value: "suspended",
    label: "Suspended",
    description: "Temporarily blocked pending review",
    cls: "border-amber-300 bg-amber-50/50",
  },
  {
    value: "removed",
    label: "Removed",
    description: "Account permanently removed from the platform",
    cls: "border-red-200 bg-red-50/50",
  },
];
