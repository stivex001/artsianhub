import React from "react";

type checkBoxProp = {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  checked: boolean;
  text?: string;
};

const InputCustomBox = ({ onChange, checked, text }: checkBoxProp) => {
  return (
    <label className=" text-gray-500 text-sm flex items-center">
      <input
        onChange={onChange}
        checked={checked}
        className="mr-2 custom-checkbox leading-tight "
        type="checkbox"
      />
      <p>{text}</p>
    </label>
  );
};

export default InputCustomBox;