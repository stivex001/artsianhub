import { StaticImageData } from "next/image";

export interface Category {
  id: number;
  desc: string;
  image: StaticImageData;
}
