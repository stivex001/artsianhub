import { CategoryCard } from "@/components/shared/CategoryCard";
import { Headings } from "@/components/shared/Headings";
import { Category } from "@/types/category";
import Design from "@/components/assets/images/interior.png"

type Props = {};


const fashionData: Category[] = [
  {
    id: 1,
    desc: "Carpenters & Woodworkers – Custom furniture, cabinetry, and woodcraft.",
    image: Design,
  },
  {
    id: 2,
    desc: "Blacksmiths & Metalworkers – Hand-forged tools, gates, and sculptures.",
    image: Design,
  },
  {
    id: 3,
    desc: "Potters & Ceramic Artists – Handmade pottery, tableware, and sculptures.",
    image: Design,
  },
  {
    id: 4,
    desc: "Glassblowers & Stained Glass Artists – Decorative and functional glass art.",
    image: Design,
  },
];

export const Interior = (props: Props) => {
  return (
    <div className="pb-14 px-5 lg:px-16 flex flex-col gap-14">
      <Headings title="Home & Interior Artisans" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {fashionData?.map((item) => (
          <CategoryCard key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
};
