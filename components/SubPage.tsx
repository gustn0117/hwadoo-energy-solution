import { ConsultModal } from "@/components/ConsultModal";
import { ContactBanner } from "@/components/ContactBanner";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SupHero } from "@/components/support/SupHero";

/**
 * 서브 페이지 공통 틀 — 헤더, 페이지 제목 띠, 본문, 대표전화 배너, 푸터.
 * 제목 띠는 고객지원·충전사업자 비교와 같은 것을 쓴다 (시안 1006).
 */
export function SubPage({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <SupHero eyebrow={eyebrow} title={title} desc={desc} />
        {children}
        <ContactBanner />
      </main>
      <Footer />
      <FloatingDock />
      <ConsultModal />
      <ScrollReveal />
    </>
  );
}
