"use client";

import { useContactUs } from "@/api/crud/contact";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { AuthLayout } from "@/components/pages/auth/AuthLayout";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const fields: Field[] = [
  {
    name: "name",
    type: "text",
    errorMessage: "Name is required",
    isRequired: true,
  },
  {
    name: "email",
    type: "email",
    errorMessage: "Email is required",
    isRequired: true,
  },
  {
    name: "phone",
    type: "text",
    errorMessage: "Phone Number is required",
    isRequired: true,
  },
  {
    name: "message",
    type: "text",
    errorMessage: "Message is required",
    isRequired: true,
  },
];

const ContactUs = () => {
  const router = useRouter();
  const { control, handleSubmit } = useDynamicForm(fields, {});

  const { createContactUs } = useContactUs();

  const { isPending, mutateAsync } = createContactUs;

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      mode: "email",
    };

    try {
      await mutateAsync(payload, {
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
    <div className="">
      <h1 className="text-3xl lg:text-8xl text-primary font-semibold flex items-center justify-center py-8 mt-24">
        Contact Us
      </h1>
      <AuthLayout
        className="!-mt-7"
        title="Get in Touch"
        desc="We welcome your questions and look forward  to providing a swift response."
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-10/12 lg:w-8/12 mx-auto pt-16"
        >
          <div className="flex flex-col  gap-3 mb-14">
            <h1 className="font-semibold text-primary text-2xl text-center ">
              Send us a Message
            </h1>
          </div>
          <div className="flex flex-col gap-8">
            <ControlledInput
              name="name"
              control={control}
              placeholder="Enter Email"
              type="text"
              label="Name"
              variant="primary"
              rules={{ required: true }}
              className="shadow-dropShadow bg-white border-none"
              labelClassName="text-[#D8D8D9] font-semibold"
              art
            />
            <ControlledInput
              name="email"
              control={control}
              placeholder=""
              type="email"
              label="Email"
              variant="primary"
              rules={{ required: true }}
              className="shadow-dropShadow bg-white border-none"
              labelClassName="text-[#D8D8D9] font-semibold"
              art
            />
            <div className="">
              <ControlledInput
                name="phone"
                control={control}
                placeholder=""
                type="text"
                label="Mobile"
                variant="primary"
                rules={{ required: true }}
                className="shadow-dropShadow bg-white border-none"
                labelClassName="text-[#D8D8D9] font-semibold"
                art
              />
            </div>
            <ControlledInput
              name="message"
              control={control}
              placeholder=""
              type="textarea"
              label="Message"
              variant="primary"
              rules={{ required: true }}
              className="shadow-dropShadow bg-white border-none"
              labelClassName="text-[#D8D8D9] font-semibold"
              art
              isTextArea={true}
              rows={5}
              cols={40}
            />
          </div>
          <div className="my-9">
            <CustomButton
              type="submit"
              label="Submit"
              className="w-full rounded-[10px] h-10 font-[300]"
              isLoading={isPending}
            />
          </div>
        </form>
      </AuthLayout>
    </div>
  );
};

export default ContactUs;
