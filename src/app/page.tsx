import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/ui/trust-strip";
import { CategoryBrowser } from "@/components/home/category-browser";
import { FeaturedListings } from "@/components/home/featured-listings";
import { ImageCta } from "@/components/home/image-cta";
import { FamcoApproved } from "@/components/home/famco-approved";
import { ApprovedProcess } from "@/components/home/approved-process";
import { WhyChoose } from "@/components/home/why-choose";
import { BuyersSellers } from "@/components/home/buyers-sellers";
import { StatsBar } from "@/components/home/stats-bar";
import { CtaBanner } from "@/components/home/cta-banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryBrowser />
      <FeaturedListings />
      <ImageCta />
      <FamcoApproved />
      <ApprovedProcess />
      <WhyChoose />
      <BuyersSellers />
      <StatsBar />
      <CtaBanner />
    </>
  );
}
