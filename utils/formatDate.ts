import { format } from "date-fns";

export function formatDate(dateInput: string | Date): string {
  const date = new Date(dateInput);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/** Returns "01 Jan 2024" — en-GB short date. Returns "—" for missing/invalid input. */
export function formatDateGB(d?: string | null): string {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Returns "01 Jan 2024 · 1:00 PM" — used for timestamps on bookings and notes. */
export function formatDateTime(d?: string | null): string {
  if (!d) return "—";
  return format(new Date(d), "dd MMM yyyy · h:mm a");
}
