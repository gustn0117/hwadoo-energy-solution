import type { Metadata } from "next";
import { Card, CardGrid, CheckList, Note, PageCta, PageSection, Prose } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { BRANDS } from "@/lib/content";
import { COMPARE_CRITERIA } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "주요 파트너 — 화두에너지솔루션",
  description: "화두에너지솔루션이 제휴한 충전사업자와, 단지에 맞는 사업자를 고를 때 보는 비교 기준을 소개합니다.",
};

export default function PartnersPage() {
  return (
    <SubPage
      eyebrow="화두에너지솔루션"
      title={
        <>
          주요 <em>파트너</em>
        </>
      }
      desc="6개 제휴 충전사업자의 조건을 같은 표에 놓고 비교해 제안합니다."
    >
      <PageSection eyebrow="PARTNERS" title="제휴 충전사업자">
        <Prose>
          <p>
            화두는 특정 충전사업자의 대리점이 아닙니다. 환경부 보조사업자 기준으로 제휴한 사업자들의 계약 조건과 보상
            범위, 유지보수 주기를 같은 기준으로 비교해 단지에 유리한 쪽을 제안합니다.
          </p>
        </Prose>
        <CardGrid cols={3}>
          {BRANDS.map((b) => (
            // 로고가 아직 없는 사업자는 이름만 표시된다
            <Card key={b.name} icon={b.logo ?? undefined} title={b.name}>
              {b.features.join(" · ")}
            </Card>
          ))}
        </CardGrid>
        <Note>로고와 소개 문구는 사업자 확정 순서에 따라 계속 업데이트됩니다.</Note>
      </PageSection>

      <PageSection tone="soft" title="사업자를 고를 때 보는 기준" desc="같은 항목을 같은 방식으로 확인해 비교표로 정리합니다.">
        <CheckList items={COMPARE_CRITERIA} cols={1} />
        <PageCta />
      </PageSection>
    </SubPage>
  );
}
