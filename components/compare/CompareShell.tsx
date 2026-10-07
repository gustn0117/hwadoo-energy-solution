import "@/app/styles/board.css";
import { ConsultModal } from "@/components/ConsultModal";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SupHero } from "@/components/support/SupHero";

const TABS = [
  { label: "충전사업자 순위", href: "/compare/ranking" },
  { label: "한 눈에 비교", href: "/compare" },
] as const;

/** 충전사업자 비교 공통 틀 — 연한 상단 띠 + 탭 2개 (시안 1006) */
export function CompareShell({
  current,
  children,
}: {
  current: (typeof TABS)[number]["href"];
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <SupHero title="충전사업자 비교" desc="다양한 충전사업자를 한눈에 비교하고 간편하게 선택하세요." />

        <nav className="supTabs" aria-label="충전사업자 비교 메뉴">
          <div className="shell">
            <div className="supTabs__list supTabs__list--center">
              {TABS.map((t) => (
                <a key={t.href} href={t.href} aria-current={t.href === current ? "page" : undefined}>
                  {t.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {children}
      </main>
      <Footer />
      <FloatingDock />
      <ConsultModal />
      <ScrollReveal />
    </>
  );
}
