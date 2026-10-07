import "@/app/styles/board.css";
import { ConsultModal } from "@/components/ConsultModal";
import { ContactBanner } from "@/components/ContactBanner";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SupHero } from "@/components/support/SupHero";

/** 고객지원 탭 — 시안(0929) 기준 4개 */
const TABS = [
  { label: "프로모션", href: "/promotion" },
  { label: "FAQ", href: "/faq" },
  { label: "공지·소식", href: "/notice" },
  { label: "설치사례", href: "/cases" },
] as const;

/** 고객지원 공통 틀 — 연한 상단 띠 + 탭 */
export function SupportShell({
  current,
  desc,
  children,
}: {
  current: (typeof TABS)[number]["href"];
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main>
        <SupHero title="고객지원" desc={desc} />

        <nav className="supTabs" aria-label="고객지원 메뉴">
          <div className="shell">
            <div className="supTabs__list">
              {TABS.map((t) => (
                <a key={t.href} href={t.href} aria-current={t.href === current ? "page" : undefined}>
                  {t.label}
                </a>
              ))}
            </div>
          </div>
        </nav>

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
