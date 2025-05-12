import { Artisan } from "@/components/pages/landingPage/Artisan";
import { Arts } from "@/components/pages/landingPage/Arts";
import CategorySection from "@/components/pages/landingPage/CategorySection";
import { Explore } from "@/components/pages/landingPage/Explore";
import { Hero } from "@/components/pages/landingPage/Hero";
import { PopularService } from "@/components/pages/landingPage/PopularService";

export default function Home() {
  return (
    <div className="">
      <Hero />
      <Arts />
      <PopularService />
      <CategorySection />
      <Artisan />
      <Explore />
    </div>
  );
}
