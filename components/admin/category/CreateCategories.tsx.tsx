"use client";
import { useCategories } from "@/api/crud/categories";
import { CustomButton } from "@/components/clickable/CustomButton";
import { ControlledFileUpload } from "@/components/controlledInputs/ControlledFileUpload";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

type Props = {};
type UploadedImage = File & { preview: string };

const fields: Field[] = [
  {
    name: "name",
    type: "text",
    errorMessage: "Service Category is required",
    isRequired: true,
  },

  {
    name: "categoryImages",
    type: "file",
    errorMessage: "Category Image is required",
    isRequired: true,
  },
];

const CreateCategories = (props: Props) => {
  const router = useRouter();
  const { getAllCategories, createCategory } = useCategories();
  const { refetch } = getAllCategories();
  const { control, handleSubmit } = useDynamicForm(fields, {});

  const { mutate: createCat, isPending } = createCategory;

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    const files = data?.categoryImages;
    if (!files?.length) {
      toast.error("Please upload at least one image");
      return;
    }

    formData.append("name", data?.name);

    files?.forEach((file: File) => {
      formData.append("categoryImages", file);
    });

    try {
      await createCat(formData, {
        onSuccess: (response: any) => {
          console.log(response, "resp");
          toast.success(response?.message);
          refetch();
          router.push("/admin/dashboard/manage-categories?tab=categories");
        },
        onError: (error: any) => {
          console.error("Errorcreatingprofile:", error);
          toast.error(error?.message);
        },
      });
    } catch (error) {}
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-between min-h-[50vh]"
      >
        <div className="flex flex-col gap-10">
          <div className="w-1/2">
            <ControlledInput
              name="name"
              control={control}
              placeholder="Enter Category Name"
              type="text"
              label="Category Name "
              variant="secondary"
              rules={{ required: true }}
              labelClassName="!text-primary"
            />
          </div>
          <div className="w-1/2">
            <ControlledFileUpload
              name="categoryImages"
              control={control}
              label="Upload Category Images"
              labelClassName="!text-primary"
              // rules={{ required: true }}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <CustomButton
            type="submit"
            label="Save"
            className="bg-secondary text-white w-[100px]"
            isLoading={isPending}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCategories;
