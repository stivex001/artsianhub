import React from "react";

type Props = {};

export const TrustedBy = (props: Props) => {
  return (
    <div className="flex flex-col md:flex-row gap-8 opacity-60">
      <span className="text-gray-400 text-sm mt-1 ">Trusted by:</span>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="w-24 h-8 bg-gray-600 rounded opacity-50"></div>
        <div className="w-24 h-8 bg-gray-600 rounded opacity-50"></div>
        <div className="w-24 h-8 bg-gray-600 rounded opacity-50"></div>
        <div className="w-24 h-8 bg-gray-600 rounded opacity-50"></div>
      </div>
    </div>
  );
};
