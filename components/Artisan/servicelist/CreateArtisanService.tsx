"use client";
import { useCategories } from "@/api/crud/categories";
import { useServices } from "@/api/crud/services";
import { useUser } from "@/api/crud/user";
import { CustomButton } from "@/components/clickable/CustomButton";
import { ControlledFileUpload } from "@/components/controlledInputs/ControlledFileUpload";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import useDynamicForm from "@/hooks/useDynamicForm";
import { Field } from "@/schemas/dynamicSchema";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const fields: Field[] = [
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
    isRequired: true,
  },
  {
    name: "serviceImages",
    type: "file",
    errorMessage: "Category Image is required",
    isRequired: true,
  },
];

const CreateArtisanService = () => {
  const router = useRouter();
  const { getCurrentArtisanUser } = useUser();
  const { data: currentUser } = getCurrentArtisanUser();
  const { getAllCategories } = useCategories();
  const { createServices, getArtisanServices, getAllServices } = useServices();

  const { control, handleSubmit } = useDynamicForm(fields, {});

  const { refetch } = getAllServices();
  const { refetch: refetchService } = getArtisanServices(
    `${currentUser?.user?._id}`
  );
  const { mutate: createSer, isPending } = createServices;

  const { data: category } = getAllCategories();

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
    formData.append("description", data?.description);

    files?.forEach((file: File) => {
      formData.append("serviceImages", file);
    });

    try {
      await createSer(formData, {
        onSuccess: (response: any) => {
          console.log(response, "resp");
          toast.success("Service Created Successfully");
          refetchService;
          refetch();
          router.push("/artisan/dashboard/portfolio?tab=services");
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
              variant="tertiary"
            />
          </div>
          <div className="w-1/2">
            <ControlledInput
              name="description"
              control={control}
              placeholder="Enter Category Description"
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

export default CreateArtisanService;
