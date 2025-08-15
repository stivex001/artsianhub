"use client";
import { useContactUs } from "@/api/crud/contact";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import ControlledInput from "../controlledInputs/ControlledInput";
import { CustomButton } from "../clickable/CustomButton";
import { Controller } from "react-hook-form";

type Props = {};

const fields: Field[] = [
  { name: "name", type: "text", errorMessage: "Name is required", isRequired: true },
  { name: "email", type: "email", errorMessage: "Email is required", isRequired: true },
  { name: "phone", type: "text", errorMessage: "Phone Number is required", isRequired: true },
  { name: "message", type: "text", errorMessage: "Message is required", isRequired: true },
  { name: "mode", type: "string", errorMessage: "Preferred mode is required" },
];

export const RightContent = (props: Props) => {
  const router = useRouter();
  const { control, handleSubmit, formState } = useDynamicForm(fields, {
    mode: "email", 
  });

  const {errors} = formState
  console.log(errors, "err_");
  
  const { createContactUs } = useContactUs();
  const { isPending, mutateAsync } = createContactUs;

  const onSubmit = async (data: any) => {
    try {
      await mutateAsync(data, {
        onSuccess: (response: any) => {
          toast.success(response?.message);
          router.push("/");
        },
        onError: (error: any) => {
          toast.error(error?.message);
        },
      });
    } catch (error) {
      console.log("An error occurred: ", error);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-cardShadow p-12">
      <h2 className="text-2xl font-bold text-paragrah mb-6">Send us a Message</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <ControlledInput
          name="name"
          control={control}
          placeholder="Your full name"
          type="text"
          label="Name"
          variant="primary"
          rules={{ required: true }}
        />
        <ControlledInput
          name="email"
          control={control}
          placeholder="your.email@example.com"
          type="text"
          label="Email"
          variant="primary"
          rules={{ required: true }}
        />
        <ControlledInput
          name="phone"
          control={control}
          placeholder="+44 123 456 7890"
          type="text"
          label="Mobile"
          variant="primary"
        />
        <ControlledInput
          name="message"
          control={control}
          placeholder="Tell us how we can help you..."
          type="textarea"
          label="Message"
          variant="primary"
          rules={{ required: true }}
          isTextArea={true}
          rows={5}
          cols={40}
        />

        {/* Radio group controlled by RHF */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Preferred mode of Communication
          </label>
          <Controller
            name="mode"
            control={control}
            render={({ field }) => (
              <div className="flex space-x-6">
                {["email", "mobile"].map((option) => (
                  <label key={option} className="flex items-center">
                    <input
                      type="radio"
                      value={option}
                      checked={field.value === option}
                      onChange={() => field.onChange(option)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            )}
          />
        </div>

        <CustomButton
          type="submit"
          label="Submit"
          className="w-full rounded-[6px] h-12"
          isLoading={isPending}
        />
      </form>
    </div>
  );
};
