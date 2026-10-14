import type { Metadata } from "next";
import { CompareBoard } from "@/components/compare/CompareBoard";
import { CompareShell } from "@/components/compare/CompareShell";
import { RankingCta } from "@/components/compare/RankingCta";

export const metadata: Metadata = {
  title: "한 눈에 비교",
  description:
    "주요 전기차 충전사업자의 운영기간, 운영수량, 제조사, 카드 제휴, 요금·계약, 유지관리 조건을 같은 기준으로 정리한 비교표입니다.",
};

export default function ComparePage() {
  return (
    <CompareShell current="/compare">
      <CompareBoard />
      <RankingCta />
    </CompareShell>
  );
}
