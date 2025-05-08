"use client";
import { useUser } from "@/api/crud/user";
import { CustomButton } from "@/components/clickable/CustomButton";
import CustomBox from "@/components/controlledInputs/CustomBox";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useKYCStore } from "@/store/kycStore";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const fields: Field[] = [
  {
    name: "termsAccepted",
    type: "checkbox",
    errorMessage: "You must agree to the terms before proceeding",
    isRequired: true,
  },
];

const TermsAndCondition = () => {
  const router = useRouter();
  const { kycFormData }: { kycFormData: { languagesSpoken?: string | string[]; [key: string]: any } } = useKYCStore();
  const { getCurrentArtisanUser, createArtisanProfile } = useUser();
  const { refetch } = getCurrentArtisanUser();
  const { control, handleSubmit } = useDynamicForm(fields, {});
  const { mutate: createProfile, isPending } = createArtisanProfile;

  console.log(kycFormData, "completeedKyc");

  const onSubmit = () => {
    const formData = new FormData();

    // Format arrays properly
    const formattedLanguagesSpoken =
      typeof kycFormData.languagesSpoken === "string"
        ? String(kycFormData.languagesSpoken)
            .split(",")
            .map((lang: string) => lang.trim())
        : Array.isArray(kycFormData.languagesSpoken)
        ? kycFormData.languagesSpoken
        : [];

    const formattedWorkAvailability = {
      days:
        typeof kycFormData?.workAvailability?.days === "string"
          ? kycFormData.workAvailability?.days
              .split(",")
              .map((d: string) => d.trim())
          : Array.isArray(kycFormData?.workAvailability?.days)
          ? kycFormData.workAvailability.days
          : [],
      availableHours:
        kycFormData?.workAvailability?.availableHours || "09:00 AM-17:00",
    };

    formData.append(
      "languagesSpoken",
      JSON.stringify(formattedLanguagesSpoken)
    );
    formData.append(
      "workAvailability",
      JSON.stringify(formattedWorkAvailability)
    );
    formData.append(
      "serviceArea",
      JSON.stringify(
        kycFormData?.serviceArea || {
          type: "Point",
          coordinates: [-0.1278, 51.5074],
        }
      )
    );

    formData.append("serviceCategory", kycFormData?.serviceCategory || "");
    formData.append("professionalTitle", kycFormData?.professionalTitle || "");
    formData.append("servicePricing", String(kycFormData?.servicePricing || 0));
    formData.append("skillDescription", kycFormData?.skillDescription || "");
    formData.append(
      "yearsOfExperience",
      String(kycFormData?.yearsOfExperience || 0)
    );


    const professionalIDFile = Array.isArray(kycFormData?.professionalCertification)
      ? kycFormData?.professionalCertification[0]
      : kycFormData?.professionalCertification;

    if (professionalIDFile instanceof File) {
      formData.append("professionalCertification", professionalIDFile);
    }


    const govIDFile = Array.isArray(kycFormData?.governmentIssuedID)
      ? kycFormData.governmentIssuedID[0]
      : kycFormData.governmentIssuedID;

    if (govIDFile instanceof File) {
      formData.append("governmentIssuedID", govIDFile);
    }

    const proofOfAddressFile = Array.isArray(kycFormData?.proofOfAddress)
      ? kycFormData.proofOfAddress[0]
      : kycFormData.proofOfAddress;

    if (proofOfAddressFile instanceof File) {
      formData.append("proofOfAddress", proofOfAddressFile);
    }

    const portfolioFiles = kycFormData?.portfolio;
    if (Array.isArray(kycFormData?.portfolio)) {
      portfolioFiles?.forEach((file: any) => {
        formData.append("portfolio", file);
      });
    }

    formData.append("termsAccepted", "true");
    formData.append("specialization", "Artisan");

    createProfile(formData, {
      onSuccess: (response: any) => {
        toast.success(response?.message || "Profile created successfully");
        refetch();
        router.push("/artisan/dashboard");
      },
      onError: (error: any) => {
        toast.error(error?.message || "Something went wrong");
        console.error("Create Profile Error:", error);
      },
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl font-semibold text-primary text-center mb-5">
          Terms and Conditions
        </h1>

        <div className="w-10/12 mx-auto">
          <p className="text-base font-light mb-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit...
          </p>
          <CustomBox
            name="termsAccepted"
            control={control}
            label="Agreed with Terms"
          />
        </div>

        <div className="mt-8 flex items-center justify-center">
          <CustomButton
            type="submit"
            label="Submit"
            className="bg-secondary text-white w-[100px]"
            isLoading={isPending}
            variant="primary"
          />
        </div>
      </form>
    </div>
  );
};

export default TermsAndCondition;
