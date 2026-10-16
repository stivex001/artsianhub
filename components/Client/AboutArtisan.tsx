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
          {artisan?.skillDescription
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
        {artisan?.subCategories?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {artisan?.subCategories?.map((service: any) => (
              <span
                key={service?._id}
                className="px-3 py-2 bg-[#1129A00D] text-body rounded-[20px] text-xs font-medium"
              >
                {service?.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
