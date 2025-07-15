import React, { useState } from "react";
import { useArtisanProfileStore } from "@/store/artisanProfileStore";
import { CustomButton } from "@/components/clickable/CustomButton";
import { BackIcon } from "@/components/assets/icons/NavIcons";

type Props = {};

export const LocationPriceStage = (props: Props) => {
  const [travelDistance, setTravelDistance] = useState(100);
  const [price, setPrice] = useState("");

  const {
    setCurrentStep,
    serviceDetails,
    markStepCompleted,
    updateServiceDetails,
  } = useArtisanProfileStore();

  const handleSubmit = () => {
    const formData = {
      travelDistance,
      price,
    };
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleGoBack = () => {
    setCurrentStep(2);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Travel Distance */}
      <div className="flex flex-col gap-3">
        <label className="text-lg font-semibold text-gray-900">
          Travel Distance
        </label>
        <p className="text-gray-600">How far are you willing to go for work?</p>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="200"
              value={travelDistance}
              onChange={(e) => setTravelDistance(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${
                  (travelDistance / 200) * 100
                }%, #e5e7eb ${(travelDistance / 200) * 100}%, #e5e7eb 100%)`,
              }}
            />
          </div>
          <span className="text-lg font-semibold text-gray-900 min-w-[60px]">
            {travelDistance}m
          </span>
        </div>
      </div>

      {/* Starting Price */}
      <div className="flex flex-col gap-2">
        <label className="text-lg font-semibold text-gray-900">
          Starting Price
        </label>
        <div className="relative">
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter your price"
            className="w-full p-4 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
            /hr
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-5">
        <CustomButton
          type="button"
          className="w-fit rounded-[10px]"
          variant="transparent"
          icon={BackIcon}
          label="Back"
          onClick={handleGoBack}
        />

        <CustomButton
          type="submit"
          // disabled={!isValid}
          className="w-fit rounded-[10px]"
          variant="primary"
          label="Submit Profile"
        />
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};
