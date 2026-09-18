import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { SubPage } from "@/components/SubPage";
import { getFaqs } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "자주 묻는 질문 — 화두에너지솔루션",
  description: "아파트 전기차 충전기 의무설치, 설치 위치, 입대의 의결 등 자주 묻는 질문을 정리했습니다.",
};

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <SubPage
      eyebrow="고객지원"
      title={
        <>
          자주 묻는 <em>질문</em>
        </>
      }
      desc="충전기 설치 전에 가장 많이 물어보시는 내용을 모았습니다."
    >
      <div className="faqPage">
        <Faq items={faqs} defaultOpen={0} title={false} />
      </div>
    </SubPage>
  );
}
