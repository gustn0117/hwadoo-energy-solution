import type { Metadata } from "next";
import { FaqBoard } from "@/components/support/FaqBoard";
import { SupportShell } from "@/components/support/SupportShell";
import { getFaqs } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "자주 묻는 질문",
  description: "아파트 전기차 충전기 의무설치, 설치 위치, 입대의 의결 등 자주 묻는 질문을 정리했습니다.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <SupportShell current="/faq" desc="충전기 설치 전에 가장 많이 물어보시는 내용을 모았습니다">
      <FaqBoard items={faqs} />
    </SupportShell>
  );
}
