import { Hero } from "@/components/Hero/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts/FeaturedProducts";
import { CategoryGrid } from "@/components/CategoryGrid/CategoryGrid";
import { ComingSoonPreview } from "@/components/ComingSoon/ComingSoonPreview";
import { AboutSection } from "@/components/AboutSection/AboutSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryGrid />
      <ComingSoonPreview />
      <AboutSection />
    </>
  );
}
