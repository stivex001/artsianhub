import React from "react";

type Props = {};

const benefits = [
  { title: "Professionalism", description: "" },
  { title: "Budget-friendly prices", description: "" },
  { title: "Dependable service", description: "" },
];

export const Benefits = (props: Props) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      {benefits.map((benefit, index) => (
        <div
          key={index}
          className="bg-[#5691D1] text-white h-[170px] rounded-br-[40px] flex items-center justify-center"
        >
          <h3 className="text-2xl font-semibold">{benefit.title}</h3>
          {benefit.description && <p className="mt-2">{benefit.description}</p>}
        </div>
      ))}
    </div>
  );
};
