import React from "react";

type Props = {
  artisan: any;
};

export const AboutArtisan = ({ artisan }: Props) => {
  return (
    <div className="">
   
      <div className="mb-6">
        <h2 className="text-xl font-bold text-paragrah mb-2">
          About This Artisan
        </h2>
        <div className="prose prose-gray max-w-none">
          {artisan?.about
            ?.split("\n\n")
            .map((paragraph: any, index: number) => (
              <p key={index} className=" text-body text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
        </div>
      </div>


      <div>
        <h2 className="text-xl font-bold text-paragrah mb-3">
          Services Offered
        </h2>
        <div className="flex flex-wrap gap-2">
          {artisan?.services.map((service: any, index: number) => (
            <span
              key={index}
              className="px-3 py-2 bg-[#1129A00D] text-body rounded-[20px] text-xs font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
