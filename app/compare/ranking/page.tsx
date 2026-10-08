import type { Metadata } from "next";
import { CompareShell } from "@/components/compare/CompareShell";
import { RankingBoard } from "@/components/compare/RankingBoard";
import { getRankings, shortDate } from "@/lib/data";
import { PreviewNotice } from "@/components/PreviewNotice";
import { SAMPLE_RANKINGS } from "@/lib/sample";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "충전사업자 순위",
  description: "급속·완속 충전기 운영 대수와 충전 요금을 기준으로 충전사업자 순위를 한눈에 확인하세요.",
};

export default async function RankingPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const preview = (await searchParams).preview === "1";
  const { fast, slow, asOf } = preview
    ? { fast: SAMPLE_RANKINGS.filter((r) => r.kind === "fast"), slow: SAMPLE_RANKINGS.filter((r) => r.kind === "slow"), asOf: "2026-08-20" }
    : await getRankings();

  return (
    <CompareShell current="/compare/ranking">
      {preview ? <PreviewNotice /> : null}
      <RankingBoard fast={fast} slow={slow} asOf={shortDate(asOf)} />
    </CompareShell>
  );
}
