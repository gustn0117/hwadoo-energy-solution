import type { Metadata } from "next";
import { PromotionBoard } from "@/components/support/PromotionBoard";
import { SupportShell } from "@/components/support/SupportShell";
import { getPromotions, promotionState } from "@/lib/data";
import { PreviewNotice } from "@/components/PreviewNotice";
import { SAMPLE_PROMOTIONS } from "@/lib/sample";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "프로모션",
  description: "아파트 전기차 충전기 설치 상담 고객을 위한 진행 중인 혜택을 확인하세요.",
};

export default async function PromotionListPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  // ?preview=1 — 등록된 글이 없어도 화면을 확인할 수 있게 샘플로 그린다
  const preview = (await searchParams).preview === "1";
  const promotions = preview ? SAMPLE_PROMOTIONS : await getPromotions();
  const items = promotions.map((p) => ({ ...p, state: promotionState(p) }));

  return (
    <SupportShell current="/promotion" desc="화두에서 인기있는, 나에게 맞는 충전사업자를 비교하세요">
      {preview ? <PreviewNotice /> : null}
      <PromotionBoard items={items} />
    </SupportShell>
  );
}
