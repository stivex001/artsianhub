"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { CustomButton } from "@/components/clickable/CustomButton";
import { Field } from "@/schemas/dynamicSchema";
import useDynamicForm from "@/hooks/useDynamicForm";
import pics from "@/components/assets/images/artisan.png";

const fields: Field[] = [
  { name: "name", type: "text", errorMessage: "Name is required", isRequired: true },
  { name: "email", type: "email", errorMessage: "Email is required", isRequired: true },
  { name: "phone", type: "text", errorMessage: "Phone Number is required", isRequired: true },
  { name: "message", type: "text", errorMessage: "Message is required", isRequired: true },
];

type Card = {
  imageFile: File | null;
  imagePreview: string;
  description: string;
};

const ArtisanPictures = () => {
  const { control, handleSubmit } = useDynamicForm(fields, {});
  const [cards, setCards] = useState<Card[]>([
    { imageFile: null, imagePreview: "", description: "" },
  ]);

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleAddCard = () => {
    setCards([
      ...cards,
      { imageFile: null, imagePreview: "", description: "" },
    ]);
  };

  const handleDeleteCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
    fileInputRefs.current.splice(index, 1); // keep refs in sync
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updated = [...cards];
    updated[index].description = value;
    setCards(updated);
  };

  const handleImageSelect = (index: number, file: File) => {
    const preview = URL.createObjectURL(file);
    const updated = [...cards];
    updated[index].imageFile = file;
    updated[index].imagePreview = preview;
    setCards(updated);
  };

  const triggerImagePicker = (index: number) => {
    fileInputRefs.current[index]?.click();
  };

  return (
    <form className="flex flex-col">
      <div className="flex flex-col w-full gap-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-[#D9D9D9] relative p-1.5 rounded-[10px] flex gap-3 w-full"
            >
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="flex-1 h-full overflow-hidden rounded-[10px] bg-white flex items-center justify-center">
                  {card.imagePreview ? (
                    <Image
                      src={card.imagePreview}
                      alt="uploaded"
                      width={110}
                      height={132}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src={pics}
                      alt="placeholder"
                      width={110}
                      height={132}
                      className="object-cover w-full h-full opacity-40"
                    />
                  )}
                </div>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleImageSelect(index, e.target.files[0]);
                    }
                  }}
                  className="hidden"
                  ref={(el) => {
                    fileInputRefs.current[index] = el;
                  }}
                />

                <CustomButton
                  label="Change Upload"
                  className="rounded-[10px] h-3 !text-[5px]"
                  type="button"
                  onClick={() => triggerImagePicker(index)}
                />
              </div>

              <div>
                <CustomButton
                  label="Delete"
                  className="absolute top-3 right-3 bg-[#AE2525] text-white rounded-[10px] h-6 !text-xs px-1.5"
                  onClick={() => handleDeleteCard(index)}
                  type="button"
                />
              </div>

              <div className="flex-1 relative mt-8">
                <textarea
                  placeholder="Description..."
                  value={card.description}
                  onChange={(e) =>
                    handleDescriptionChange(index, e.target.value)
                  }
                  className="w-full h-[150px] p-3 rounded-xl border border-black resize-none mt-6"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="text-blue-700 underline text-sm self-end"
          onClick={handleAddCard}
        >
          Add More...
        </button>
      </div>

      <CustomButton
        label="Submit"
        className="text-white text-sm px-4 py-1 rounded-md"
      />
    </form>
  );
};

export default ArtisanPictures;
