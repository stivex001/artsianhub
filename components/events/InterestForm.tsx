"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useEventInterest } from "@/apis/crud/events";
import { CustomButton } from "@/components/clickable/CustomButton";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Enter a valid email"),
  phone: z.string().trim().optional(),
});
type Values = z.infer<typeof schema>;

export const InterestForm = ({ eventId, title }: { eventId: string; title: string }) => {
  const [done, setDone] = useState(false);
  const { mutate, isPending } = useEventInterest(eventId);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  if (done) {
    return (
      <p className="rounded-xl bg-green-50 p-4 text-sm text-green-800">
        Thanks! We&apos;ll email you as soon as booking opens for {title}.
      </p>
    );
  }

  const field =
    "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none";

  return (
    <form
      className="space-y-3"
      onSubmit={handleSubmit((values) =>
        mutate(values, {
          onSuccess: () => setDone(true),
          onError: (e) => toast.error(e?.message || "Something went wrong"),
        }),
      )}
    >
      <div>
        <input {...register("name")} placeholder="Full name" className={field} autoComplete="name" />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>
      <div>
        <input {...register("email")} type="email" placeholder="Email" className={field} autoComplete="email" />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
      </div>
      <input {...register("phone")} placeholder="Phone (optional)" className={field} autoComplete="tel" />
      <CustomButton type="submit" label="Register your interest" isLoading={isPending} className="w-full" />
    </form>
  );
};
