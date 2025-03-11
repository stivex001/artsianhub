import { CategoryCard } from "@/components/shared/CategoryCard";
import { Headings } from "@/components/shared/Headings";
import { Category } from "@/types/category";
import Design from "@/components/assets/images/baker.png"

type Props = {};


const fashionData: Category[] = [
  {
    id: 1,
    desc: "Chefs & Caterers – Private dining, event catering, and meal prep services.",
    image: Design,
  },
  {
    id: 2,
    desc: "Bakers & Pastry Chefs – Handmade cakes, pastries, and artisanal bread.",
    image: Design,
  },
  {
    id: 3,
    desc: "Chocolatiers – Craft chocolate makers and confectioners.",
    image: Design,
  },
  {
    id: 4,
    desc: "Butchers & Fishmongers – Specialist meat and seafood preparation.",
    image: Design,
  },
];

export const Food = (props: Props) => {
  return (
    <div className="pb-14 px-5 lg:px-16 flex flex-col gap-14">
      <Headings title="Food & Culinary Artisans" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-16">
        {fashionData?.map((item) => (
          <CategoryCard key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
};
