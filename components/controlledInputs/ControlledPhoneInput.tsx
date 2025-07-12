"use client";

import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Label } from "../ui/label";
import { Control, useController } from "react-hook-form";

type ControlledInputProps = {
  name: string;
  label: string;
  control?: Control<any>;
  labelClassName?: string;
  rules?: { required: boolean; pattern?: RegExp; maxLength?: number };
};

export const ControlledPhoneInput = ({
  name,
  label,
  control,
  labelClassName,
  rules,
}: ControlledInputProps) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error, invalid },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className="flex flex-col gap-1">
      <Label
        htmlFor={name}
        className={`text-sm font-medium text-paragrah capitalize ${labelClassName} `}
      >
        {label}
      </Label>

      <PhoneInput
        country={"ng"}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        inputClass="!w-full !bg-white !border-[#E4E5EA] !outline-none !py-3 !h-14 !rounded-[10px] !text-gray-700"
        buttonClass="!rounded-tl-[10px] !rounded-bl-[10px] !bg-white"
        containerClass="!w-full"
        dropdownClass="!z-[9999]"
        enableSearch
        inputStyle={{}}
        containerStyle={{}}
      />
      {error && (
        <p className="mt-1 text-xs text-red-500 capitalize">{error.message}</p>
      )}
    </div>
  );
};
