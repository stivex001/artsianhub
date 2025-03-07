import { CategoryCard } from "@/components/shared/CategoryCard";
import { Headings } from "@/components/shared/Headings";
import { Category } from "@/types/category";
import Design from "@/components/assets/images/crafs.png"

type Props = {};


const fashionData: Category[] = [
  {
    id: 1,
    desc: "Jewellers & Silversmiths – Handcrafted jewellery and accessories",
    image: Design,
  },
  {
    id: 2,
    desc: "Candle Makers – Scented, soy, beeswax, and decorative candles.",
    image: Design,
  },
  {
    id: 3,
    desc: "Toy Makers – Handmade wooden and fabric toys.",
    image: Design,
  },
  {
    id: 4,
    desc: "Bookbinders & Stationery Artists – Custom notebooks, planners, and paper goods.",
    image: Design,
  },
];

export const Crafts = (props: Props) => {
  return (
    <div className="pb-14 px-5 lg:px-16 flex flex-col gap-14">
      <Headings title="Craft & Handmade Goods Artisans" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {fashionData?.map((item) => (
          <CategoryCard key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
};
