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

type Props = {};

const fields: Field[] = [
  {
    name: "termsAccepted",
    type: "checkbox",
    errorMessage: "You must agree to the terms before proceeding",
    isRequired: true,
  },
];

const TermsAndCondidtion = (props: Props) => {
  const router = useRouter();
  const { kycFormData } = useKYCStore();
  const { getCurrentArtisanUser } = useUser();
  const { refetch } = getCurrentArtisanUser();

  const { control, handleSubmit } = useDynamicForm(fields, {
    availableHours: kycFormData?.availableHours || "9:00 AM-5:00 PM",
    days: kycFormData?.days || "",
    languagesSpoken: kycFormData?.languagesSpoken || [],
  });

  const { createArtisanProfile } = useUser();
  const { mutate: createProfile, isPending } = createArtisanProfile;

  const onSubmit = (data: any) => {
    const formData = new FormData();

    const formattedLanguagesSpoken = Array.isArray(kycFormData?.languagesSpoken)
    ? kycFormData?.languagesSpoken?.map((lang: string) => lang.trim())
    : [];
  


      const formattedWorkAvailability = {
        days: Array.isArray(kycFormData?.days)
          ? kycFormData.days
          : kycFormData?.days && typeof kycFormData.days === "string"
          ? (kycFormData?.days as string)?.split(",").map((d: any) => d.trim())
          : [],
      
        availableHours: kycFormData?.availableHours || "9:00 AM-5:00 PM",
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
      JSON.stringify({
        type: "Point",
        coordinates: [-0.1278, 51.5074], // You may need to update dynamically
      })
    );

    formData.append("serviceCategory", kycFormData?.serviceCategory || "");
    formData.append("professionalTitle", kycFormData?.professionalTitle);
    formData.append("servicePricing", kycFormData?.servicePricing?.toString());
    formData.append("skillDescription", kycFormData?.skillDescription);
    formData.append(
      "yearsOfExperience",
      kycFormData?.yearsOfExperience?.toString()
    );
    formData.append(
      "professionalCertifications",
      JSON.stringify(kycFormData?.professionalCertifications || [])
    );
    formData.append("governmentIssuedID", kycFormData?.governmentIssuedID);
    formData.append("portfolio", kycFormData?.portfolio);
    formData.append("proofOfAddress", kycFormData?.proofOfAddress);
    formData.append("termsAccepted", "true");

    try {
      createProfile(formData, {
        onSuccess: (response: any) => {
          console.log(response);
          toast.success(response?.message);
          refetch();
          router.push("/artisan/dashboard");
        },
        onError: (error: any) => {
          console.error("Errorcreatingprofile:", error);
          toast.error(error?.message);
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl font-semibold text-primary text-center mb-5">
          Term and Condition
        </h1>
        <div className="w-10/12 mx-auto ">
          <p className="text-base font-light mb-3 ">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
            reiciendis atque earum molestiae natus qui dolores eveniet ut, iure,
            voluptate quod porro laboriosam fugiat eos, deserunt saepe facilis
            quis ad inventore. Dicta fugiat vero corporis obcaecati iure cumque
            quae repellat. Dolorem expedita, incidunt dolor recusandae, ex
            minima excepturi culpa accusantium a ipsum eius tempore, adipisci
            ratione voluptate ad hic. Dolor laudantium nihil blanditiis aliquid
            quidem odio, iure, magni modi minus corporis vitae, eius vel
            veritatis. Alias doloribus repellendus dicta ab atque numquam
            veritatis, earum fuga perferendis sed sapiente id veniam eaque
            libero iste harum distinctio accusamus in tenetur temporibus
            deleniti?
          </p>
          <CustomBox
            name="termsAccepted"
            control={control}
            label="Agreed with Term"
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

export default TermsAndCondidtion;
