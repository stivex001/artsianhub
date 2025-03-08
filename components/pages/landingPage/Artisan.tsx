import { Headings } from "@/components/shared/Headings";
import image3 from "@/components/assets/images/port.png";
import Image, { StaticImageData } from "next/image";
import { CustomButton } from "@/components/clickable/CustomButton";

type Props = {};

interface PopularService {
  id: number | string;
  image: StaticImageData;
}

const serviceData: PopularService[] = [
  { id: 1, image: image3 },
  { id: 2, image: image3 },
  { id: 3, image: image3 },
  { id: 4, image: image3 },
  { id: 5, image: image3 },
  { id: 6, image: image3 },
];

export const Artisan = (props: Props) => {
  return (
    <div className="py-14 flex flex-col gap-10 ">
      <Headings title="Join Our Artisans" className="text-center text-5xl" />
      <div className="w-9/12 mx-auto flex flex-col gap-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-20">
          {serviceData.map((item) => (
            <div key={item.id} className="h-[350px]">
              <Image
                className="w-full object-cover rounded-[10px]"
                src={item.image}
                alt="Service"
                width={300}
                height={350}
              />
            </div>
          ))}
        </div>
        <div className="self-end">
          <CustomButton className="rounded-[10px] h-[52px]">Join as an Artisan</CustomButton>
        </div>
      </div>
    </div>
  );
};
