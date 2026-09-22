import { AddressSearch } from "@/components/AddressSearch";
import { ConsultModal } from "@/components/ConsultModal";
import { Brands } from "@/components/Brands";
import { ContactBanner } from "@/components/ContactBanner";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { FireSafety } from "@/components/FireSafety";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Services } from "@/components/Services";
import { Stats } from "@/components/Stats";
import { WhyHwadoo } from "@/components/WhyHwadoo";
import { getFaqs } from "@/lib/data";

// FAQ는 관리자에서 바뀌므로 요청마다 읽는다 (DB 키는 서버 런타임 환경변수)
export const dynamic = "force-dynamic";

export default async function Page() {
  const faqs = await getFaqs(4);

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
        {/* 시안 기준 두 번째 문항이 펼쳐진 상태로 시작 */}
        <Faq items={faqs} defaultOpen={faqs.length > 1 ? 1 : 0} moreHref="/faq" />
        <ContactBanner />
      </main>
      <Footer />
      <FloatingDock />
      <ConsultModal />
      <ScrollReveal />
    </>
  );
}
