import { Artisan } from "@/components/pages/landingPage/Artisan";
import { Arts } from "@/components/pages/landingPage/Arts";
import { Beauty } from "@/components/pages/landingPage/Beauty";
import { Crafts } from "@/components/pages/landingPage/Crafts";
import { Digital } from "@/components/pages/landingPage/Digital";
import { Explore } from "@/components/pages/landingPage/Explore";
import { Fashion } from "@/components/pages/landingPage/Fashion";
import { Food } from "@/components/pages/landingPage/Food";
import { Hero } from "@/components/pages/landingPage/Hero";
import { Interior } from "@/components/pages/landingPage/Interior";
import { PopularService } from "@/components/pages/landingPage/PopularService";
import { Skilled } from "@/components/pages/landingPage/Skilled";
import { Visual } from "@/components/pages/landingPage/Visual";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Arts />
      <PopularService />
      <Fashion />
      <Food />
      <Interior />
      <Beauty />
      <Visual />
      <Digital />
      <Crafts />
      <Skilled />
      <Artisan />
      <Explore />
    </div>
  );
}
