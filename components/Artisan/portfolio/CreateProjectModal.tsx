"use client";
import { useCategories } from "@/apis/crud/categories";
import { useServices } from "@/apis/crud/services";
import { CustomButton } from "@/components/clickable/CustomButton";
import ControlledInput from "@/components/controlledInputs/ControlledInput";
import { ControlledSelect } from "@/components/controlledInputs/ControlledSelect";
import { FileUpload } from "@/components/controlledInputs/FileUploads";
import { BaseModal } from "@/components/shared/BaseModal";
import { Descriptions } from "@/components/shared/Headings";
import useDynamicForm from "@/hooks/useDynamicForm";
import { useFileUpload } from "@/hooks/useFileUpload";
import { Field } from "@/schemas/dynamicSchema";
import { X } from "lucide-react";
import React from "react";
import { toast } from "sonner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  edit?: boolean;
  item?: any;
  currentUser?: any;
};

const fields: Field[] = [
  {
    name: "title",
    type: "text",
    errorMessage: "Professional Title is required",
    isRequired: true,
  },

  {
    name: "location",
    type: "text",
    errorMessage: "location is required",
    isRequired: true,
  },
  {
    name: "serviceType",
    type: "text",
    errorMessage: "serviceType is required",
  },
  {
    name: "date",
    type: "date",
    errorMessage: "date is required",
  },
  {
    name: "description",
    type: "text",
    errorMessage: "description is required",
  },
  {
    name: "serviceType",
    type: "multiselect",
    errorMessage: "serviceType is required",
  },
];

export const CreateProjectModal = ({
  isOpen,
  onClose,
  edit,
  item,
  currentUser,
}: Props) => {
  const { files, setFiles } = useFileUpload(4);
  const { control, handleSubmit, formState, reset } = useDynamicForm(
    fields,

    {
      title: item?.title || "",
      location: item?.location || "",
      serviceType: item?.serviceType?.map((cat: any) => cat?._id) || [],
      date: item?.date || "",
      description: item?.description || "",
    }
  );

  const { getAllCategories } = useCategories();
  const { data: category } = getAllCategories();
  const { createServices, getMyServices } = useServices();

  const { mutate: createSer, isPending } = createServices;
  const { refetch } = getMyServices();

  const categoryOptions = Array.isArray(category)
    ? category?.map((cat) => ({
        id: cat?._id,
        value: cat?._id,
        label: cat?.name,
      }))
    : [];

  const { isValid } = formState;

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    const safeServiceCategory = Array.isArray(data?.serviceType)
      ? data.serviceType
      : typeof data?.serviceType === "string"
      ? data.serviceType.split(",")
      : [];

    if (!files?.length) {
      toast.error("Please upload at least one image");
      return;
    }
    formData.append("title", data?.title);
    formData.append("description", data?.description);
    formData.append("location", data?.location);
    formData.append("date", data?.date);

    formData.append("serviceType", JSON.stringify(safeServiceCategory));

    files?.forEach((file: File) => {
      formData.append("photos", file);
    });

    try {
      await createSer(formData, {
        onSuccess: (response: any) => {
          toast.success(response?.message || "Project created successfully");
          refetch();
          onClose();
          reset();
          setFiles([]);
        },
        onError: (error: any) => {
          console.error("Errorcreatingprofile:", error);
          toast.error(error?.message);
        },
      });
    } catch (error) {}
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="p-8 bg-white !rounded-2xl overflow-y-auto no-scrollbar !max-h-[90vh] border-none shadow-none !max-w-[900px] flex flex-col gap-8"
    >
      <div className="flex items-center justify-between">
        <Descriptions
          title={edit ? "Edit Project" : "Add a New Project"}
          desc="Share your work. Add images, a short description, and the type of service you completed."
        />
        <button onClick={onClose} className="">
          <X />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex gap-8">
          <section className="flex-1">
            <FileUpload files={files} onFilesChange={setFiles} maxFiles={4} />
          </section>
          <section className="flex-1 space-y-5">
            <ControlledInput
              name="title"
              control={control}
              placeholder="Enter project title"
              type="text"
              label="Project Title"
              variant="primary"
              rules={{ required: true }}
            />
            <ControlledInput
              name="location"
              control={control}
              placeholder="Enter job location"
              type="text"
              label="Job location"
              variant="primary"
              rules={{ required: true }}
            />
            <ControlledSelect
              name="serviceType"
              label="Service Category"
              options={categoryOptions}
              control={control}
              variant="primary"
              placeholder="Select Service Category"
              rules={{ required: false }}
              multi
            />
            <ControlledInput
              name="date"
              control={control}
              placeholder="Enter date of project"
              type="date"
              label="Date of Project"
              variant="primary"
              rules={{ required: true }}
            />
            <ControlledInput
              name="description"
              control={control}
              placeholder="What did you do in this project?"
              type="text"
              label="Description"
              variant="primary"
              rules={{ required: true }}
              isTextArea
            />
          </section>
        </div>
        <div className="flex items-center gap-5 justify-end">
          <CustomButton
            type="button"
            label="Cancel"
            onClick={onClose}
            className="w-fit rounded-xl"
            variant="transparent"
          />
          <CustomButton
            type="submit"
            // disabled={!isValid}
            isLoading={isPending}
            label={edit ? "Save Changes" : "Upload project"}
            className="w-fit rounded-xl"
            variant="primary"
          />
        </div>
      </form>
    </BaseModal>
  );
};
