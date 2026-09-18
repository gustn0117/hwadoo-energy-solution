import { AddressSearch } from "@/components/AddressSearch";
import { Brands } from "@/components/Brands";
import { ContactBanner } from "@/components/ContactBanner";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { FireSafety } from "@/components/FireSafety";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { WhyHwadoo } from "@/components/WhyHwadoo";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <Services />
        <AddressSearch />
        <Brands />
        <FireSafety />
        <WhyHwadoo />
        <CtaBand />
        <Faq />
        <ContactBanner />
      </main>
      <Footer />
      <FloatingDock />
    </>
  );
}
