import { Hero } from "@/components/home/hero";
import { CategoryBrowser } from "@/components/home/category-browser";
import { FeaturedListings } from "@/components/home/featured-listings";
import { ImageCta } from "@/components/home/image-cta";
import { ApprovedProcess } from "@/components/home/approved-process";
import { WhyChoose } from "@/components/home/why-choose";
import { BuyersSellers } from "@/components/home/buyers-sellers";
import { StatsBar } from "@/components/home/stats-bar";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryBrowser />
      <FeaturedListings />
      <ImageCta />
      <ApprovedProcess />
      <WhyChoose />
      <BuyersSellers />
      <StatsBar />
      <CtaBanner />
    </>
  );
}
