import type { Metadata } from "next";
import { PromotionBoard } from "@/components/support/PromotionBoard";
import { SupportShell } from "@/components/support/SupportShell";
import { getPromotions, promotionState } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "프로모션 — 화두에너지솔루션",
  description: "아파트 전기차 충전기 설치 상담 고객을 위한 진행 중인 혜택을 확인하세요.",
};

export default async function PromotionListPage() {
  const promotions = await getPromotions();
  const items = promotions.map((p) => ({ ...p, state: promotionState(p) }));

  return (
    <SupportShell current="/promotion" desc="화두에서 인기있는, 나에게 맞는 충전사업자를 비교하세요">
      <PromotionBoard items={items} />
    </SupportShell>
  );
}
