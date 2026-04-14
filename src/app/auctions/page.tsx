import { AuctionsHero } from "@/components/auctions/hero";
import { AuctionsHowItWorks } from "@/components/auctions/how-it-works";
import { LiveAuctions } from "@/components/auctions/live-auctions";
import { PastResults } from "@/components/auctions/past-results";
import { AuctionsCta } from "@/components/auctions/auctions-cta";

export const metadata = {
  title: "Live Auctions | FAMCO Used Equipment",
  description:
    "Bid on inspected, certified used construction equipment, trucks, and industrial machinery. Live and timed auctions every week.",
};

export default function AuctionsPage() {
  return (
    <>
      <AuctionsHero />
      <AuctionsHowItWorks />
      <LiveAuctions />
      <PastResults />
      <AuctionsCta />
    </>
  );
}
