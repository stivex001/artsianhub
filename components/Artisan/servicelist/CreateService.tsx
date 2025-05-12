"use client";
import { useCategories } from "@/api/crud/categories";
import { useServices } from "@/api/crud/services";
import { CustomButton } from "@/components/clickable/CustomButton";
import { ControlledFileUpload } from "@/components/controlledInputs/ControlledFileUpload";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
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
    name: "description",
    type: "text",
    errorMessage: "Service Description is required",
    isRequired: true,
  },
 {
    name: "categoryId",
    type: "text",
    errorMessage: "category is required",
  },
  {
    name: "serviceImages",
    type: "file",
    errorMessage: "Category Image is required",
    isRequired: true,
  },
];

const CreateServices = (props: Props) => {
  const router = useRouter();
  const { getAllCategories } = useCategories();
  const { createServices, getAllServices } = useServices();
  const { refetch: refetchService } = getAllServices();
  const { control, handleSubmit } = useDynamicForm(fields, {});

  const { data: category, isLoading,refetch } = getAllCategories();

  const { mutate: createSer, isPending } = createServices;

  const categoryOptions = Array.isArray(category)
    ? category.map((cat) => ({
        id: cat._id,
        value: cat._id,
        label: cat.name,
      }))
    : [];

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    const files = data?.serviceImages;
    if (!files?.length) {
      toast.error("Please upload at least one image");
      return;
    }

    formData.append("categoryId", data?.categoryId);
    formData.append("description", data?.name);

    files?.forEach((file: File) => {
      formData.append("serviceImages", file);
    });

    try {
      await createSer(formData, {
        onSuccess: (response: any) => {
          console.log(response, "resp");
          toast.success(response?.message);
          // refetch();
          refetchService;
          router.push("/admin/dashboard/portfolio?tab=servicelist");
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
            <ControlledSelect
              name="categoryId"
              label="Select Category"
              options={categoryOptions}
              control={control}
              variant="secondary"
            />
          </div>
          <div className="w-1/2">
            <ControlledInput
              name="description"
              control={control}
              placeholder="Enter Category Name"
              type="text"
              label="Category Description "
              variant="secondary"
              rules={{ required: true }}
              labelClassName="!text-primary"
              isTextArea
              rows={7}
            />
          </div>
          <div className="w-1/2">
            <ControlledFileUpload
              name="serviceImages"
              control={control}
              label="Upload Service Images"
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

export default CreateServices;
