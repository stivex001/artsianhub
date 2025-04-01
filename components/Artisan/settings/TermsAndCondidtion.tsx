"use client";
import { useUser } from "@/api/crud/user";
import { CustomButton } from "@/components/clickable/CustomButton";
import { CustomCheckbox } from "@/components/controlledInputs/CustomCheckBox";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useKYCStore } from "@/store/kycStore";
import React from "react";
import { toast } from "sonner";

type Props = {};

const fields: Field[] = [
  {
    name: "termsAccepted",
    type: "checkbox",
    errorMessage: "You have to Agree to Terms",
    // isRequired: true,
  },
];

const TermsAndCondidtion = (props: Props) => {
  const { currentStep, kycFormData, setkycFormData, nextStep, prevStep } =
    useKYCStore();

  const { control, handleSubmit, setValue, formState } = useDynamicForm(
    fields,
    {
      availableHours: kycFormData?.availableHours || "9:00 AM-5:00 PM",
      days: kycFormData?.days || "",
      languagesSpoken: kycFormData?.languagesSpoken || [],
    }
  );

  const { createArtisanProfile } = useUser();
  const { mutate: createProfile, isPending } = createArtisanProfile;

  const onSubmit = (data: any) => {
    console.log(data, "data__");
    const formattedData = {
      ...data,
      workAvailability: {
        days: data.days || [],
        availableHours: data.availableHours || "",
      },
      serviceArea: { type: "Point", coordinates: [-0.1278, 51.5074] },
    };

    const formData = new FormData();

    formData.append(
      "workAvailability",
      JSON.stringify({
        days: Array.isArray(data.days)
          ? data.days
          : data.days?.split(",")?.map((d: any) => d.trim()),
        availableHours: data.availableHours || "",
      })
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

    try {
      createProfile(formData, {
        onSuccess: (response: any) => {
          console.log(response);
          toast.success(response);
        },
        onError: (error: any) => {
          console.error("Errorcreatingprofile:", error);
          toast.error(error?.message);
        },
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    setkycFormData({
      ...kycFormData,
      ...formattedData,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-4xl font-semibold text-primary text-center mb-5">
          Term and Condition
        </h1>
        <p className="text-base font-light mb-3 max-w-2xl mx-auto ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
          reiciendis atque earum molestiae natus qui dolores eveniet ut, iure,
          voluptate quod porro laboriosam fugiat eos, deserunt saepe facilis
          quis ad inventore. Dicta fugiat vero corporis obcaecati iure cumque
          quae repellat. Dolorem expedita, incidunt dolor recusandae, ex minima
          excepturi culpa accusantium a ipsum eius tempore, adipisci ratione
          voluptate ad hic. Dolor laudantium nihil blanditiis aliquid quidem
          odio, iure, magni modi minus corporis vitae, eius vel veritatis. Alias
          doloribus repellendus dicta ab atque numquam veritatis, earum fuga
          perferendis sed sapiente id veniam eaque libero iste harum distinctio
          accusamus in tenetur temporibus deleniti?
        </p>
        {/* <CustomCheckbox
          name="termsAccepted"
          control={control}
          label="Agreed with Term"
        /> */}
        <div className="mt-8 flex items-center justify-center">
          <CustomButton
            type="submit"
            label="Submit"
            className="bg-secondary text-white w-[100px]"
          />
        </div>
      </form>
    </div>
  );
};

export default TermsAndCondidtion;
