import { Arts } from "@/components/pages/landingPage/Arts";
import { Hero } from "@/components/pages/landingPage/Hero";
import { PopularService } from "@/components/pages/landingPage/PopularService";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Arts />
      <PopularService />
      {/* <span className="font-[family-name:var(--font-josefin-sans)] font-bold text-red-500">welcome</span> */}
    </div>
  );
}
