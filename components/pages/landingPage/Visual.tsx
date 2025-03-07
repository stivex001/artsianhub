import { CategoryCard } from "@/components/shared/CategoryCard";
import { Headings } from "@/components/shared/Headings";
import { Category } from "@/types/category";
import Design from "@/components/assets/images/painter.png"

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
    desc: "Calligraphers & Lettering Artists – Custom signage, wedding invites, and typography art",
    image: Design,
  },
  {
    id: 4,
    desc: "Photographers & Videographers – Portraits, event coverage, and commercial media.",
    image: Design,
  },
];

export const Visual = (props: Props) => {
  return (
    <div className="pb-14 px-5 lg:px-16 flex flex-col gap-14">
      <Headings title="Visual & Performing Arts Artisans" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {fashionData?.map((item) => (
          <CategoryCard key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
};
