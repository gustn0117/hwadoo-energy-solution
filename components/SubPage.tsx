import { ContactBanner } from "@/components/ContactBanner";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

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
        <section className="subHero">
          <div className="shell">
            <p className="subHero__eyebrow">{eyebrow}</p>
            <h1 className="subHero__title">{title}</h1>
            {desc ? <p className="subHero__desc">{desc}</p> : null}
          </div>
        </section>
        {children}
        <ContactBanner />
      </main>
      <Footer />
      <FloatingDock />
    </>
  );
}
