import React from "react";

type Props = {
  className?: string;
  title: string;
  count: string;
};

export const Details = ({ className, title, count }: Props) => {
  return (
    <div
      className={`${className} text-white py-2 px-4 rounded-[5px] flex flex-col gap-3`}
    >
      <h1 className="font-semibold text-base text-center"> {title}</h1>
      <h1 className="font-semibold text-base text-center pb-3"> {count}</h1>
    </div>
  );
};
