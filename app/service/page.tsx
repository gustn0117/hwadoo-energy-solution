import type { Metadata } from "next";
import { CheckList, MediaRow, Note, PageCta, PageSection, Prose } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { SERVICE_OVERVIEW } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "설치·운영 — 화두에너지솔루션",
  description:
    "제품안내, 설치·시공, 운영·유지관리, 설치절차까지 화두에너지솔루션이 맡는 아파트 충전 인프라 구축 전 과정을 안내합니다.",
};

export default function ServicePage() {
  return (
    <SubPage
      eyebrow="설치·운영"
      title={
        <>
          상담부터 개통 이후까지 <em>한 곳에서</em>
        </>
      }
      desc="장비 선정, 공사, 행정, 개통 이후 관리까지 담당자 한 명이 이어서 진행합니다."
    >
      {/* 설치·운영 전체 흐름 소개 */}
      <PageSection
        eyebrow="OVERVIEW"
        title="설치·운영은 네 가지로 나뉩니다"
        desc="어떤 장비를, 어떻게 설치하고, 개통 뒤에는 어떻게 관리하는지를 단계별로 정리했습니다."
      >
        <Prose>
          <p>
            아파트 충전기 사업은 장비를 고르는 일에서 끝나지 않습니다. 단지의 전력 용량과 주차 여건을 확인하고, 행위신고와
            환경부 접수 같은 행정 절차를 거쳐야 비로소 공사가 시작됩니다. 개통 이후에는 고장 접수와 정기 점검, 입주민 민원
            대응이 계속 이어집니다.
          </p>
          <p>
            화두에너지솔루션은 이 과정을 <strong>제품안내 · 설치·시공 · 운영·유지관리 · 설치절차</strong> 네 가지로 나눠
            안내합니다. 각 항목에서 단지가 준비할 것과 화두가 대신 처리할 것을 구분해 확인하실 수 있습니다.
          </p>
        </Prose>
        <MediaRow image="/images/generated/service.webp" alt="아파트 지하주차장 전기차 충전구역" title="단지 상황부터 확인합니다">
          같은 장비라도 단지마다 설치 가능한 위치와 수량이 다릅니다. 진단 결과를 실사보고서로 먼저 드리고, 그 위에서 장비와
          공사 범위를 정합니다.
        </MediaRow>
      </PageSection>

      {/* 하위 4개 페이지 안내 — 각 섹션 제목 아래 버튼으로 이동 */}
      {SERVICE_OVERVIEW.map((s, i) => (
        <PageSection
          key={s.href}
          tone={i % 2 === 0 ? "soft" : "white"}
          eyebrow={`0${i + 1}`}
          title={s.title}
          desc={s.desc}
        >
          <CheckList items={s.points} cols={1} />
          <a className="btn btn--orange" href={s.href}>
            {s.title} 자세히 보기
          </a>
        </PageSection>
      ))}

      <PageSection tone="off">
        <Note>
          위 네 가지는 별도 계약이 아니라 하나의 진행 과정입니다. 어느 단계에서 문의하셔도 이전 단계부터 다시 확인해
          드립니다.
        </Note>
        <PageCta />
      </PageSection>
    </SubPage>
  );
}
