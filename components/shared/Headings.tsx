import React from "react";

type Props = {
  title: string;
  className?: string;
};

export const Headings = ({ title, className }: Props) => {
  return <h1 className={`${className} text-secondary text-base lg:text-3xl font-[300px] font-[family-name:var(--font-josefin-sans)]`}>{title}</h1>;
};
