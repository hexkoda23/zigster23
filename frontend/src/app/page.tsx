import Hero from "@/components/home/Hero";
import RegistryTypeCards from "@/components/home/RegistryTypeCards";
import HowItWorks from "@/components/home/HowItWorks";
import StoreMarquee from "@/components/home/StoreMarquee";
import WhyZigister from "@/components/home/WhyZigister";
import LiveGiftFeed from "@/components/home/LiveGiftFeed";
import InspirationBoards from "@/components/home/InspirationBoards";
import CashGiftFunds from "@/components/home/CashGiftFunds";
import DownloadApp from "@/components/home/DownloadApp";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <StoreMarquee />
      <RegistryTypeCards />
      <HowItWorks />
      <WhyZigister />
      <LiveGiftFeed />
      <InspirationBoards />
      <CashGiftFunds />
      <DownloadApp />
      <Testimonials />
      <FAQ />
    </div>
  );
}
