import React from "react";

type Props = {
  data: any;
};

export const renderData = ({ data }: Props) => {
  if (data === null || data === undefined)
    return <p className="text-black text-sm">N/A</p>;

  if (typeof data === "string" || typeof data === "number") {
    return <p className="text-red-500">{data}</p>;
  }

  if (React.isValidElement(data)) {
    return data;
  }

  // Handle arrays (e.g., multiple items)
  if (Array.isArray(data)) {
    return (
      <div className="flex flex-col gap-1">
        {data.map((item, index) => (
          <React.Fragment key={index}>
            {renderData({ data: item })}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return <p className="text-gray-400">Invalid Data</p>;
};
