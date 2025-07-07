import React from "react";

type AuthDescProps = {
  title: string;
  desc: string;
};

export const AuthTitle = ({ title, desc }: AuthDescProps) => {
  return (
    <div className="text-center lg:text-left">
      <h1 className="font-bold lg:font-[900] text-2xl lg:text-4xl text-paragrah">{title}</h1>
      <p className="text-body text-sm">{desc}</p>
    </div>
  );
};
