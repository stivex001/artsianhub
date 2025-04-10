import React from "react";

type Props = {
  title: string;
  className?: string;
  desc?: string;
};

export const Headings = ({ title, className }: Props) => {
  return (
    <h1
      className={`${className} text-secondary text-base lg:text-3xl font-[300]`}
    >
      {title}
    </h1>
  );
};

export const Descriptions = ({ title, desc, className }: Props) => {
  return (
    <div>
      <h1 className={`text-4xl font-bold ${className} `}>{title}</h1>
      {desc && <p className="text-xl text-grayish">{desc}</p>}
    </div>
  );
};
