import type { Metadata } from "next";
import { PartnerBoard } from "@/components/partners/PartnerBoard";
import { SubPage } from "@/components/SubPage";

export const metadata: Metadata = {
  title: "제휴 충전사업자",
  description:
    "화두에너지솔루션이 제휴한 전기차 충전사업자를 사업자별로 소개합니다. 제품과 이용 방법, 요금과 할인 혜택, 책임보험과 A/S까지 한 곳에서 확인하세요.",
};

export default function ComparePartnersPage() {
  return (
    <SubPage
      eyebrow="HAWDOO ENERGY"
      title="제휴 충전사업자"
      desc="화두에서 인기있는, 나에게 맞는 충전사업자를 비교하세요"
    >
      <PartnerBoard />
    </SubPage>
  );
}
