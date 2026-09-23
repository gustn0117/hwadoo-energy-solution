import type { Metadata } from "next";
import { CheckList, MediaRow, PageCta, PageSection } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { ABOUT_VALUES, WHY_REASONS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "선택하는 이유 — 화두에너지솔루션",
  description:
    "특정 사업자의 대리점이 아닌 비교 제안, 설치 가능 여부 사전 진단, 행정 절차 대행, 개통 이후 관리까지 화두에너지솔루션을 선택하는 이유입니다.",
};

export default function WhyPage() {
  return (
    <SubPage
      eyebrow="화두에너지솔루션"
      title={
        <>
          화두를 <em>선택하는 이유</em>
        </>
      }
      desc="단지가 직접 비교하고 고를 수 있도록, 화두는 중간에서 기준을 만듭니다."
    >
      <PageSection eyebrow="WHY HWADOO" title="네 가지 차이">
        {WHY_REASONS.map((r, i) => (
          <MediaRow key={r.title} image={r.image} alt={r.title} title={r.title} flip={i % 2 === 1}>
            {r.desc}
          </MediaRow>
        ))}
      </PageSection>

      <PageSection tone="soft" title="정리하면" desc="상담부터 개통 이후까지 화두가 지키는 기준입니다.">
        <CheckList items={ABOUT_VALUES.map((v) => ({ b: v.title, t: ` — ${v.desc}` }))} cols={1} />
        <PageCta />
      </PageSection>
    </SubPage>
  );
}
