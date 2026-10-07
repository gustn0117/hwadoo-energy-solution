import type { Metadata } from "next";
import "@/app/styles/consult.css";
import { ConsultGuide } from "@/components/consult/ConsultGuide";
import { ConsultWizard } from "@/components/consult/ConsultWizard";
import { InstallSteps } from "@/components/consult/InstallSteps";
import { ConsultModal } from "@/components/ConsultModal";
import { FloatingDock } from "@/components/FloatingDock";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SupHero } from "@/components/support/SupHero";

export const metadata: Metadata = {
  title: "설치 상담",
  description:
    "주소만 입력하면 단지의 충전기 설치 현황과 추가 설치 가능 여부를 확인하고, 그대로 설치 상담을 신청할 수 있습니다.",
};

export default async function ConsultPage({
  searchParams,
}: {
  searchParams: Promise<{ address?: string; step?: string; found?: string }>;
}) {
  const { address, step, found } = await searchParams;
  const initialStep = step === "2" || step === "3" ? Number(step) : undefined;

  return (
    <>
      <Header />
      <main>
        <SupHero title="설치 상담" desc="주소만 입력하면 설치 가능 여부를 확인할 수 있습니다" />
        <div className="shell cguide__wrap">
          <ConsultGuide />
        </div>
        <ConsultWizard initialAddress={address ?? ""} initialStep={initialStep} initialFound={found === "1"} />
        <InstallSteps />
      </main>
      <Footer />
      <FloatingDock />
      <ConsultModal />
      <ScrollReveal />
    </>
  );
}
