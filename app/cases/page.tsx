import type { Metadata } from "next";
import { CaseBoard } from "@/components/support/CaseBoard";
import { SupportShell } from "@/components/support/SupportShell";
import { getCases } from "@/lib/data";
import { PreviewNotice } from "@/components/PreviewNotice";
import { SAMPLE_CASES } from "@/lib/sample";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "설치사례",
  description: "화두에너지솔루션이 전국 아파트와 상업시설에 구축한 전기차 충전 인프라 사례입니다.",
};

export default async function CasesPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const preview = (await searchParams).preview === "1";
  const cases = preview ? SAMPLE_CASES : await getCases();

  return (
    <SupportShell current="/cases" desc="화두에서 인기있는, 나에게 맞는 충전사업자를 비교하세요">
      {preview ? <PreviewNotice /> : null}
      <CaseBoard items={cases} />
    </SupportShell>
  );
}
