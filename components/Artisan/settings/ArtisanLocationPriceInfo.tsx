"use client";

import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import React from "react";
import ControlledRangeSelector from "@/components/controlledInputs/ControlledRangeSelector";
import { useArtisans } from "@/apis/crud/artisans";
import { toast } from "sonner";
import { MapPin, PoundSterling, Navigation } from "lucide-react";

type Props = {};

const fields: Field[] = [
  { name: "primaryLocation", type: "text" },
  { name: "workDistanceKm", type: "text" },
  { name: "pricePerHour", type: "number" },
];

export const ArtisanLocationPriceInfo = (props: Props) => {
  const { updateArtisanProfile, getMyProfile } = useArtisans();
  const { data: profile, refetch } = getMyProfile();
  const personalInfo = profile?.data;

  const { control, handleSubmit } = useDynamicForm(fields, {
    primaryLocation: personalInfo?.primaryLocation,
    workDistanceKm: personalInfo?.workDistanceKm,
    pricePerHour: personalInfo?.pricePerHour,
  });

  const { mutate: updatePersonalInfo, isPending } = updateArtisanProfile;

  const handleEditProfileInfo = async (data: any) => {
    const formData = new FormData();
    try {
      formData.append("primaryLocation", data.primaryLocation);
      formData.append("workDistanceKm", data.workDistanceKm);
      formData.append("pricePerHour", data.pricePerHour);

      updatePersonalInfo(formData, {
        onSuccess: (response: any) => {
          toast.success(response?.message || "Profile Updated Successfully");
          refetch();
        },
        onError: (error: any) => {
          toast.error(error?.message || "Something went wrong");
          console.error("Update Profile Error:", error);
        },
      });
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Unexpected Error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleEditProfileInfo)}
      className="flex flex-col gap-8"
    >
      {/* ── Location section ─────────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-3.5 rounded-full bg-[#02198B]" />
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Where You Work
          </p>
        </div>

        <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-[#02198B]/[0.03] border border-[#02198B]/[0.06]">
          <MapPin className="w-4 h-4 text-[#02198B] shrink-0 mt-0.5" />
          <p className="text-xs text-gray-500 leading-relaxed">
            Set your base location and travel radius so clients nearby can
            discover and book you.
          </p>
        </div>

        <ControlledInput
          name="primaryLocation"
          control={control}
          placeholder="e.g. Shoreditch, London"
          type="text"
          label="Primary Location"
          variant="primary"
        />

        {/* Travel distance */}
        <div className="p-4 rounded-xl bg-gray-50/80 border border-gray-100">
          <div className="flex items-center gap-2 mb-3">
            <Navigation className="w-3.5 h-3.5 text-[#02198B]" />
            <p className="text-xs font-semibold text-gray-600">
              Travel Distance
            </p>
          </div>
          <ControlledRangeSelector
            name="workDistanceKm"
            label=""
            desc="How far are you willing to travel for a job?"
            control={control}
            type="range"
            minLength={0}
            maxLength={200}
          />
        </div>
      </div>

      {/* ── Pricing section ──────────────────────────────────────── */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2">
          <div className="w-0.5 h-3.5 rounded-full bg-[#02198B]" />
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            Your Rate
          </p>
        </div>

        <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl bg-[#F0C422]/[0.06] border border-[#F0C422]/[0.2]">
          <PoundSterling className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Set a competitive starting rate. You can always negotiate per-job
            with clients.
          </p>
        </div>

        <div className="max-w-xs">
          <ControlledInput
            name="pricePerHour"
            control={control}
            placeholder="0.00"
            type="number"
            label="Starting Price (£/hr)"
            variant="primary"
            ShowHr
          />
        </div>
      </div>

      {/* ── Save footer ──────────────────────────────────────────── */}
      <div className="flex items-center justify-between pt-5 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Clients see your location and rate on your profile
        </p>
        <CustomButton
          type="submit"
          label="Save Changes"
          className="rounded-xl"
          variant="primary"
          isLoading={isPending}
        />
      </div>
    </form>
  );
};
