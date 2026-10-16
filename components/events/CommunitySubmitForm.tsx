"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSubmitCommunityEvent } from "@/apis/crud/events";
import { useAuthStore } from "@/store/authStore";
import { CustomButton } from "@/components/clickable/CustomButton";

const today = () => new Date().toISOString().slice(0, 10);

const schema = z.object({
  title: z.string().trim().min(3, "Give your event a title"),
  description: z.string().trim().min(20, "Please describe your event (at least 20 characters)"),
  date: z.string().min(1, "Choose a date").refine((d) => d >= today(), "Date can't be in the past"),
  venue: z.string().trim().min(3, "Where is it happening?"),
});
type Values = z.infer<typeof schema>;

export const CommunitySubmitForm = () => {
  const { currentUser, accessToken, isHydrated } = useAuthStore();
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSubmitCommunityEvent();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  if (!isHydrated) return null;

  if (!accessToken || !currentUser?.isArtisan) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center">
        <p className="text-gray-700">Only logged-in artisans can submit community events.</p>
        <Link
          href={`/auth/login?redirect=${encodeURIComponent("/events/community/submit/")}`}
          className="mt-4 inline-flex rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white"
        >
          {accessToken ? "Switch account" : "Log in"}
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-2xl bg-green-50 p-6 text-green-900">
        <p className="font-semibold">Thanks! Your event has been sent for review.</p>
        <p className="mt-1 text-sm">It will appear on the community page once an admin approves it.</p>
        <button
          type="button"
          className="mt-4 text-sm font-semibold underline"
          onClick={() => {
            reset();
            setSubmitted(false);
          }}
        >
          Submit another
        </button>
      </div>
    );
  }

  const field = "w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none";
  const err = (m?: string) => m && <p className="mt-1 text-xs text-red-600">{m}</p>;

  return (
    <form
      className="space-y-4 rounded-2xl border bg-white p-6"
      onSubmit={handleSubmit((values) =>
        mutate(values, {
          onSuccess: () => setSubmitted(true),
          onError: (e) => toast.error(e?.message || "Something went wrong"),
        }),
      )}
    >
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">Event title</label>
        <input id="title" {...register("title")} className={field} />
        {err(errors.title?.message)}
      </div>
      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">Description</label>
        <textarea id="description" rows={4} {...register("description")} className={field} />
        {err(errors.description?.message)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="date" className="mb-1 block text-sm font-medium">Date</label>
          <input id="date" type="date" min={today()} {...register("date")} className={field} />
          {err(errors.date?.message)}
        </div>
        <div>
          <label htmlFor="venue" className="mb-1 block text-sm font-medium">Venue</label>
          <input id="venue" {...register("venue")} className={field} />
          {err(errors.venue?.message)}
        </div>
      </div>
      <CustomButton type="submit" label="Submit for review" isLoading={isPending} />
    </form>
  );
};
