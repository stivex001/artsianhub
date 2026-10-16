"use client";

import { toast } from "sonner";
import { useCreateBooking } from "@/apis/crud/events";
import { CustomButton } from "@/components/clickable/CustomButton";
import type { CreateBookingInput } from "@/types/events";

/** Starts a native Stripe booking and redirects to Checkout when one is returned. */
export const BookButton = ({
  eventId,
  input,
  label,
  disabled,
  variant = "primary",
  className,
}: {
  eventId: string;
  input: CreateBookingInput;
  label: string;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  className?: string;
}) => {
  const { mutate, isPending } = useCreateBooking(eventId);

  return (
    <CustomButton
      label={label}
      variant={variant}
      isLoading={isPending}
      disabled={disabled || isPending}
      className={className}
      onClick={() =>
        mutate(input, {
          onSuccess: (res) => {
            if (res.checkoutUrl) {
              window.location.href = res.checkoutUrl;
            } else if (res.status === "confirmed") {
              toast.success("You're booked in. Find it under My Events.");
            } else {
              toast.info("Stripe checkout isn't connected yet (mock mode).");
            }
          },
          onError: (e) => toast.error(e?.message || "Couldn't start your booking"),
        })
      }
    />
  );
};
