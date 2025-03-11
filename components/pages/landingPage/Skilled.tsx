import { CategoryCard } from "@/components/shared/CategoryCard";
import { Headings } from "@/components/shared/Headings";
import { Category } from "@/types/category";
import Design from "@/components/assets/images/people.png"

type Props = {};


const fashionData: Category[] = [
  {
    id: 1,
    desc: "Plumbers & Electricians – Home maintenance and repair specialists.",
    image: Design,
  },
  {
    id: 2,
    desc: "Mechanics & Bicycle Repair Technicians – Car and bike servicing experts.",
    image: Design,
  },
  {
    id: 3,
    desc: "Watchmakers & Clock Restorers – Timepiece repair and restoration.",
    image: Design,
  },
  {
    id: 4,
    desc: "Handymen & General Repair Specialists – Home improvement and DIY professionals",
    image: Design,
  },
];

export const Skilled = (props: Props) => {
  return (
    <div className="pb-14 px-5 lg:px-16 flex flex-col gap-14">
      <Headings title="Skilled Trades & Repair Artisans" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-16">
        {fashionData?.map((item) => (
          <CategoryCard key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
};
