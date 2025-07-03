import { CategoryCard } from "@/components/shared/CategoryCard";
import { Headings } from "@/components/shared/Headings";
import { Category } from "@/types/category";
import Design from "@/components/assets/images/designer.png";
import { FeaturedCard } from "@/components/shared/FeaturedCard";

type Props = {};

const fashionData: Category[] = [
  {
    id: 1,
    desc: "Tailors & Dressmakers – Custom clothing,alterations, and bespoke fashion.",
    image: Design,
  },
  {
    id: 2,
    desc: "Shoemakers & Leatherworkers – Handmade shoes, bags, and accessories.",
    image: Design,
  },
  {
    id: 3,
    desc: "Weavers & Textile Designers – Handwoven fabrics, scarves, and upholstery.",
    image: Design,
  },
  {
    id: 4,
    desc: "Embroidery Artists – Custom embroidery for clothing and decor.",
    image: Design,
  },
];

export const Fashion = (props: Props) => {
  return (
    <section className="py-20 px-4">
      {/* <Headings title="Fashion & Textile Artisans" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 lg:gap-16">
        {fashionData?.map((item) => (
          <CategoryCard key={item?.id} item={item} />
        ))}
      </div> */}

      <FeaturedCard />
    </section>
  );
};
