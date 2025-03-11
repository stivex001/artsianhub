import { CategoryCard } from "@/components/shared/CategoryCard";
import { Headings } from "@/components/shared/Headings";
import { Category } from "@/types/category";
import Design from "@/components/assets/images/beauty.png"

type Props = {};


const fashionData: Category[] = [
  {
    id: 1,
    desc: "Painters & Illustrators – Custom artwork, portraits, and murals.",
    image: Design,
  },
  {
    id: 2,
    desc: "Sculptors – Clay, metal, stone, and mixed-media sculptures.",
    image: Design,
  },
  {
    id: 3,
    desc: "Makeup Artists & Beauty Therapists – Bridal, event makeup, and skincare treatments.",
    image: Design,
  },
  {
    id: 4,
    desc: "Perfume Makers – Handmade and bespoke fragrances.",
    image: Design,
  },
];

export const Beauty = (props: Props) => {
  return (
    <div className="pb-14 px-5 lg:px-16 flex flex-col gap-14">
      <Headings title="Beauty & Personal Care Artisans" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-16">
        {fashionData?.map((item) => (
          <CategoryCard key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
};
