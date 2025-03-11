import { Headings } from "@/components/shared/Headings";
import React from "react";

type Props = {};

const explore = [
  {
    id: 1,
    desc: "Fashion & Textile Artisans<br/><br/>Tailors & Dressmakers – Custom clothing, alterations, and bespoke fashion.<br/><br/>Shoemakers & Leatherworkers – Handmade shoes, bags, and accessories.<br/><br/>Weavers & Textile Designers – Handwoven fabrics, scarves, and upholstery.<br/><br/>Embroidery Artists – Custom embroidery for clothing and decor.",
  },
  {
    id: 2,
    desc: "Home & Interior Artisans<br/><br/> Carpenters & Woodworkers – Custom furniture, cabinetry, and woodcraft.<br/><br/> Blacksmiths & Metalworkers – Hand-forged tools, gates, and sculptures.<br/><br/> Potters & Ceramic Artists – Handmade pottery, tableware, and sculptures.<br/><br/> Glassblowers & Stained Glass Artists – Decorative and functional glass art.<br/><br/>Upholsterers – Custom furniture restoration and fabric work.",
  },
  {
    id: 3,
    desc: "Food & Culinary Artisans <br/><br/>Chefs & Caterers – Private dining, event catering, and meal prep services. <br/><br/>Bakers & Pastry Chefs – Handmade cakes, pastries, and artisanal bread. <br/><br/>Chocolatiers – Craft chocolate makers and confectioners. <br/><br/>Butchers & Fishmongers – Specialist meat and seafood preparation. <br/><br/>Cheesemakers – Traditional and modern dairy artisans.",
  },
  {
    id: 4,
    desc: "Beauty & Personal Care Artisans<br/><br/>Hairdressers & Barbers – Custom hair styling and grooming.<br/><br/>Makeup Artists & Beauty Therapists – Bridal, event makeup, and skincare treatments.<br/><br/>Perfume Makers – Handmade and bespoke fragrances.<br/><br/>Soap & Skincare Artisans – Natural and organic beauty products.",
  },
  {
    id: 5,
    desc: "Visual & Performing Arts Artisans<br/><br/>Painters & Illustrators – Custom artwork, portraits, and murals.<br/><br/>Sculptors – Clay, metal, stone, and mixed-media sculptures.<br/><br/>Calligraphers & Lettering Artists – Custom signage, wedding invites, and typography art.<br/><br/>Photographers & Videographers – Portraits, event coverage, and commercial media.<br/><br/>Tattoo Artists – Custom ink designs and body art.",
  },
  {
    id: 6,
    desc: "Digital & Creative Artisans<br/><br/>Graphic Designers & Illustrators – Branding, logos, and digital art.<br/><br/>Web Designers & Developers – Custom websites and eCommerce stores.<br/><br/>UI/UX Designers – User experience and app interface design.<br/><br/>Content Creators & Social Media Managers – Digital marketing, branding, and online engagement.",
  },
  {
    id: 7,
    desc: "Craft & Handmade Goods Artisans<br/><br/>Jewellers & Silversmiths – Handcrafted jewellery and accessories.<br/><br/>Candle Makers – Scented, soy, beeswax, and decorative candles.<br/><br/>Toy Makers – Handmade wooden and fabric toys.<br/><br/>Bookbinders & Stationery Artists – Custom notebooks, planners, and paper goods.",
  },
  {
    id: 8,
    desc: "Skilled Trades & Repair Artisans<br/><br/>Plumbers & Electricians – Home maintenance and repair specialists.<br/><br/>Mechanics & Bicycle Repair Technicians – Car and bike servicing experts.<br/><br/>Watchmakers & Clock Restorers – Timepiece repair and restoration.<br/><br/>Handymen & General Repair Specialists – Home improvement and DIY professionals.",
  },
];

export const Explore = (props: Props) => {
  return (
    <section className="bg-lightgray px-5 lg:px-16 py-14 flex flex-col gap-8 ">
      <Headings title="Explore more..." className=" text-3xl" />
      <div className="grid grid-cols-2 justify-between gap-y-9 gap-x-4 lg:gap-x-[165px]">
        {explore?.map((ex) => (
          <div key={ex.id}>
            <p
              className="text-[7px] lg:text-sm font-[300px] font-[family-name:var(--font-josefin-sans)] text-primary"
              dangerouslySetInnerHTML={{ __html: ex.desc }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
