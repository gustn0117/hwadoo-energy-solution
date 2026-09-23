import type { Metadata } from "next";
import { Card, CardGrid, Note, PageCta, PageSection, Prose, Steps } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { BUSINESS_AREAS, BUSINESS_FLOW } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "사업영역 — 화두에너지솔루션",
  description:
    "충전 인프라 진단·설계, 충전사업자 비교·중개, 설치 시공과 행정 대행, 운영·유지관리, 화재 안전 설비까지 화두에너지솔루션의 사업영역입니다.",
};

export default function BusinessPage() {
  return (
    <SubPage
      eyebrow="화두에너지솔루션"
      title={
        <>
          진단부터 관리까지 <em>사업영역</em>
        </>
      }
      desc="충전기 한 대를 놓기까지 필요한 일을 나눠 맡기지 않고 한 곳에서 처리합니다."
    >
      <PageSection eyebrow="BUSINESS" title="화두가 맡는 일">
        <Prose>
          <p>
            단지마다 주차 여건과 전력 용량, 입주민 구성이 다릅니다. 화두는 진단과 사업자 비교, 행정과 시공, 개통 이후
            관리까지 여섯 개 영역을 이어서 지원합니다.
          </p>
        </Prose>
        <CardGrid cols={3}>
          {BUSINESS_AREAS.map((a) => (
            <Card key={a.title} icon={a.icon} title={a.title}>
              {a.desc}
            </Card>
          ))}
        </CardGrid>
      </PageSection>

      <PageSection tone="soft" title="한 프로젝트에서 이어지는 순서" desc="각 영역은 따로 움직이지 않고 하나의 절차로 연결됩니다.">
        <Steps items={BUSINESS_FLOW} cols={4} />
        <Note>단지 상황과 환경부 승인 일정에 따라 단계별 소요 기간은 달라질 수 있습니다.</Note>
        <PageCta />
      </PageSection>
    </SubPage>
  );
}
