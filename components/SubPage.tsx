import { ConsultModal } from "@/components/ConsultModal";
import { ContactBanner } from "@/components/ContactBanner";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";

/** 서브 페이지 공통 틀 — 헤더, 페이지 제목 띠, 본문, 대표전화 배너, 푸터 */
export function SubPage({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <section className="subHero is-dark">
          <div className="shell sec-head" data-reveal>
            <p className="sec-eyebrow">{eyebrow}</p>
            <h1 className="sec-title">{title}</h1>
            {desc ? <p className="sec-desc">{desc}</p> : null}
          </div>
        </section>
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
