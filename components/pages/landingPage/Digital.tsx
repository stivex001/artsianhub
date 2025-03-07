import { CategoryCard } from "@/components/shared/CategoryCard";
import { Headings } from "@/components/shared/Headings";
import { Category } from "@/types/category";
import Design from "@/components/assets/images/bro.png"

type Props = {};


const fashionData: Category[] = [
  {
    id: 1,
    desc: "Graphic Designers & Illustrators – Branding, logos, and digital art.",
    image: Design,
  },
  {
    id: 2,
    desc: "Web Designers & Developers – Custom websites and eCommerce stores.",
    image: Design,
  },
  {
    id: 3,
    desc: "UI/UX Designers – User experience and app interface design",
    image: Design,
  },
  {
    id: 4,
    desc: "Content Creators & Social Media Managers – Digital marketing, branding, and online engagement",
    image: Design,
  },
];

export const Digital = (props: Props) => {
  return (
    <div className="pb-14 px-5 lg:px-16 flex flex-col gap-14">
      <Headings title="Digital & Creative Artisans" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
        {fashionData?.map((item) => (
          <CategoryCard key={item?.id} item={item} />
        ))}
      </div>
    </div>
  );
};
