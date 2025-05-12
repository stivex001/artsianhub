"use client";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import Image from "next/image";
import React from "react";
import { ArtisanDetails, useArtisans } from "@/api/crud/artisans";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

type Props = {
  selectedArtisan: ArtisanDetails;
};

const fields: Field[] = [
  {
    name: "clientName",
    type: "text",
    errorMessage: "Name is required",
    isRequired: true,
  },
  {
    name: "clientEmail",
    type: "email",
    errorMessage: "Email is required",
    isRequired: true,
  },
  {
    name: "clientPhoneNumber",
    type: "text",
    errorMessage: "Phone Number is required",
    isRequired: true,
  },
  {
    name: "description",
    type: "text",
    errorMessage: "Message is required",
    isRequired: true,
  },
  {
    name: "date",
    type: "date",
    errorMessage: "Message is required",
    isRequired: true,
  },
];

const Booking = ({ selectedArtisan }: Props) => {
  if (!selectedArtisan) return null;

  const { currentUser } = useAuthStore();

  const router = useRouter();
  const { control, handleSubmit } = useDynamicForm(fields, {
    clientName: `${currentUser?.firstName} ${currentUser?.lastName}`,
    clientEmail: currentUser?.email,
    clientPhoneNumber: currentUser?.phoneNumber,
  });

  const { bookAppointment } = useArtisans();

  const { isPending, mutateAsync } = bookAppointment(
    `${selectedArtisan?.user?._id}`
  );

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      artisanId: selectedArtisan?.user?._id,
      price: selectedArtisan?.servicePricing,
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
    <section className="bg-white pt-20 pb-7 flex flex-col lg:flex-row justify-between">
      <div className="flex-1 flex flex-col gap-6 px-3 lg:px-32">
        <h1 className="text-3xl text-center lg:text-start lg:text-5xl font-semibold">
          Book An Appointment
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#E5EFF9] py-10 px-5 lg:px-14 rounded-[10px]"
        >
          <div className="flex flex-col gap-6">
            <div className=" flex flex-col lg:flex-row gap-10">
              <div className="w-full">
                <ControlledInput
                  name="clientName"
                  control={control}
                  placeholder=""
                  type="text"
                  label="Your Name"
                  variant="normal"
                  rules={{ required: true }}
                />
              </div>
              {/* <div className="w-full">
                <ControlledInput
                  name="lastname"
                  control={control}
                  placeholder=""
                  type="text"
                  label="Last Name"
                  variant="normal"
                  rules={{ required: true }}
                />
              </div> */}
            </div>
            <ControlledInput
              name="clientEmail"
              control={control}
              placeholder=""
              type="email"
              label="Email"
              variant="normal"
              rules={{ required: true }}
            />
            <div className="w-full flex flex-col lg:flex-row gap-10">
              <div className="w-full">
                <ControlledInput
                  name="clientPhoneNumber"
                  control={control}
                  placeholder=""
                  type="text"
                  label="Phone Number"
                  variant="normal"
                  rules={{ required: true }}
                />
              </div>
              <div className="w-full">
                <ControlledInput
                  name="date"
                  control={control}
                  placeholder=""
                  type="date"
                  label="Appointment Date"
                  variant="normal"
                  rules={{ required: true }}
                />
              </div>
            </div>
            <ControlledInput
              name="description"
              control={control}
              placeholder="Brief Description..."
              type="textarea"
              label="Brief Description"
              variant="normal"
              rules={{ required: true }}
              isTextArea
              rows={7}
            />
            <div className="my-9 flex items-center justify-end">
              <CustomButton
                type="submit"
                label="Book Appointment"
                className=" rounded-[10px] !h-14"
                isLoading={isPending}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="hidden lg:block flex-1">
        <div className="relative w-full h-full ml-24">
          <Image
            src={selectedArtisan?.portfolio?.[0]?.media?.url}
            alt="img"
            layout="fill"
            objectFit="cover"
            className="rounded-[100px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Booking;
