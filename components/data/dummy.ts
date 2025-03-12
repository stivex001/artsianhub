import image1 from "@/components/assets/images/buy.png";
import image2 from "@/components/assets/images/bar.png";
import image3 from "@/components/assets/images/makup.png";
import image4 from "@/components/assets/images/mascara.png";
import image5 from "@/components/assets/images/iMac.png";
import image6 from "@/components/assets/images/Drawing.png";
import image7 from "@/components/assets/images/Hammer.png";
import image8 from "@/components/assets/images/cart.png";
import { StaticImageData } from "next/image";

export interface ServiceData {
  title: string;
  icon: StaticImageData;
  subNav: {
    name: string;
    desc: string;
    url: string;
  }[];
}

export interface ProductData {
  id: number;
  title: string;
  url: string;
}

export const services: ServiceData[] = [
  {
    title: "Fashion & Textile Artisans",
    icon: image1,
    subNav: [
      {
        name: "Tailors & Dressmakers -",
        desc: "Custom clothing, alterations, and bespoke fashion.",
        url: "/services",
      },
      {
        name: "Shoemakers & Leatherworkers -",
        desc: "Handmade shoes, bags, and accessories.",
        url: "/services",
      },
      {
        name: "Weavers & Textile Designers -",
        desc: "Handwoven fabrics, scarves, and upholstery.",
        url: "/services",
      },
      {
        name: "Embroidery Artists -",
        desc: "Custom embroidery for clothing and decor.",
        url: "/services",
      },
    ],
  },
  {
    title: "Food & Culinary Artisans",
    icon: image2,
    subNav: [
      {
        name: "Bakers & Pastry Chefs",
        desc: "Handmade baked goods and pastries.",
        url: "/services",
      },
      {
        name: "Specialty Food Makers",
        desc: "Custom sauces, spices, and preserves.",
        url: "/services",
      },
    ],
  },
  {
    title: "Home & Interior Artisans",
    icon: image3,
    subNav: [
      {
        name: "Bakers & Pastry Chefs",
        desc: "Handmade baked goods and pastries.",
        url: "/services",
      },
      {
        name: "Specialty Food Makers",
        desc: "Custom sauces, spices, and preserves.",
        url: "/services",
      },
    ],
  },
  {
    title: "Beauty & Personal Care Artisans",
    icon: image4,
    subNav: [
      {
        name: "Bakers & Pastry Chefs",
        desc: "Handmade baked goods and pastries.",
        url: "/services",
      },
      {
        name: "Specialty Food Makers",
        desc: "Custom sauces, spices, and preserves.",
        url: "/services",
      },
    ],
  },
  {
    title: "Visual & Performing Arts Artisans",
    icon: image5,
    subNav: [
      {
        name: "Bakers & Pastry Chefs",
        desc: "Handmade baked goods and pastries.",
        url: "/services",
      },
      {
        name: "Specialty Food Makers",
        desc: "Custom sauces, spices, and preserves.",
        url: "/services",
      },
    ],
  },
  {
    title: "Digital & Creative Artisans",
    icon: image6,
    subNav: [
      {
        name: "Bakers & Pastry Chefs",
        desc: "Handmade baked goods and pastries.",
        url: "/services",
      },
      {
        name: "Specialty Food Makers",
        desc: "Custom sauces, spices, and preserves.",
        url: "/services",
      },
    ],
  },
  {
    title: "Craft & Handmade Goods Artisans",
    icon: image7,
    subNav: [
      {
        name: "Bakers & Pastry Chefs",
        desc: "Handmade baked goods and pastries.",
        url: "/services",
      },
      {
        name: "Specialty Food Makers",
        desc: "Custom sauces, spices, and preserves.",
        url: "/services",
      },
    ],
  },
  {
    title: "Skilled Trades & Repair Artisans",
    icon: image8,
    subNav: [
      {
        name: "Bakers & Pastry Chefs",
        desc: "Handmade baked goods and pastries.",
        url: "/services",
      },
      {
        name: "Specialty Food Makers",
        desc: "Custom sauces, spices, and preserves.",
        url: "/services",
      },
    ],
  },
];

export const Product: ProductData[] = [
  {
    id: 1,
    title: "Accessories",
    url: "#",
  },
  {
    id: 2,
    title: "Furniture",
    url: "#",
  },
  {
    id: 3,
    title: "Computer gadget",
    url: "#",
  },
  {
    id: 4,
    title: "Games",
    url: "#",
  },
  {
    id: 5,
    title: "Shoes",
    url: "#",
  },
  {
    id: 6,
    title: "More...",
    url: "#",
  },
];

export const category = [
  {
    id: 1,
    label: "Plumber",
    value: "plumber",
  },
  {
    id: 2,
    label: "Carpenter",
    value: "carpenter",
  },
  {
    id: 3,
    label: "Barber",
    value: "barber",
  },
  {
    id: 4,
    label: "Electrician",
    value: "electrician",
  },
  {
    id: 5,
    label: "Painter",
    value: "painter",
  },
];
