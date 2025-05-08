import { Category, useCategories } from "@/api/crud/categories";
import { CustomButton } from "@/components/clickable/CustomButton";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";

const DeleteCategoryModal = ({
  setDeleteCategory,
  selectedCategory,
}: {
  setDeleteCategory: any;
  selectedCategory: any;
}) => {
  const { getAllCategories, deleteCategory } = useCategories();
  const { refetch } = getAllCategories();

  const { mutate: deleteCat, isPending } = deleteCategory(
    `${selectedCategory?._id}`
  );

  const onSubmit = async () => {
    if (!selectedCategory) {
      toast.error("Invalid category selected");
      return;
    }

    await deleteCat(
      { id: selectedCategory },
      {
        onSuccess: (response: any) => {
          console.log(response, "res");
          toast.success(response?.message);
          refetch();
          setDeleteCategory(false);
        },
        onError: (error: any) => {
          toast.error(error?.message);
        },
      }
    );
  };

  return (
    <div className="">
      <AlertCircle className="text-red-700 mx-auto " />
      <p className="text-grey text-sm text-center my-2">
        Delete Category Permanently!
      </p>
      <div className="flex gap-3 justify-between w-1/2 mx-auto items-center mt-4">
        <CustomButton
          onClick={() => setDeleteCategory(false)}
          className="bg-fadedWhite border border-borderColor rounded-[8px] hover:text-white text-black sm:w-[40%]"
        >
          Cancel
        </CustomButton>
        <CustomButton
          label="Delete"
          onClick={onSubmit}
          className="bg-red-700"
          isLoading={isPending}
        />
      </div>
    </div>
  );
};

export default DeleteCategoryModal;
