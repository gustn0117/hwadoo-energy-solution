import { Cases } from "@/components/Cases";
import { Compare } from "@/components/Compare";
import { CpoTabs } from "@/components/CpoTabs";
import { Dock } from "@/components/Dock";
import { Evos } from "@/components/Evos";
import { FireSafety } from "@/components/FireSafety";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProcessGauge } from "@/components/ProcessGauge";

/**
 * 메인 페이지는 별도로 두지 않고 CPO 상담신청 페이지를 메인으로 삼는다.
 * — 기획서 화면 001 화면설명 3
 */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProcessGauge />
        <CpoTabs />
        <Compare />
        <Cases />
        <FireSafety />
        <Evos />
      </main>
      <Footer />
      <Dock />
    </>
  );
}
