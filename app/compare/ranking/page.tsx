import type { Metadata } from "next";
import { CompareShell } from "@/components/compare/CompareShell";
import { RankingBoard } from "@/components/compare/RankingBoard";
import { getRankings, shortDate } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "충전사업자 순위 — 화두에너지솔루션",
  description: "급속·완속 충전기 운영 대수와 충전 요금을 기준으로 충전사업자 순위를 한눈에 확인하세요.",
};

export default async function RankingPage() {
  const { fast, slow, asOf } = await getRankings();

  return (
    <CompareShell current="/compare/ranking">
      <RankingBoard fast={fast} slow={slow} asOf={shortDate(asOf)} />
    </CompareShell>
  );
}
