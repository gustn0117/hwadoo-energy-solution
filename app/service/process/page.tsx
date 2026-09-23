import type { Metadata } from "next";
import { MediaRow, Note, PageCta, PageSection, Prose, SpecList, Steps } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { INSTALL_DOCS, INSTALL_STEPS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "설치절차 — 화두에너지솔루션",
  description:
    "상담 신청부터 현장 실사, 계약, 환경부 접수·승인, 설치 시공, 개통까지 아파트 전기차 충전기 설치 8단계 절차를 안내합니다.",
};

export default function ProcessPage() {
  return (
    <SubPage
      eyebrow="설치절차"
      title={
        <>
          상담부터 개통까지 <em>8단계</em>
        </>
      }
      desc="지금 어느 단계에 있고 다음에 무엇을 하면 되는지 한눈에 확인하세요."
    >
      {/* 절차 개요 */}
      <PageSection eyebrow="PROCESS" title="절차를 미리 알면 일정이 보입니다" desc="관리사무소가 직접 할 일은 많지 않습니다.">
        <Prose>
          <p>
            충전기 설치는 단지가 결정하는 단계와 행정 승인을 기다리는 단계가 번갈아 나옵니다. 그래서 전체 기간을 줄이려면
            <strong> 서류 준비와 회의 일정</strong>을 먼저 잡아두는 것이 중요합니다.
          </p>
          <p>
            아래 8단계 중 단지에서 직접 하시는 일은 상담 신청, 현장 실사 입회, 계약 체결 정도입니다. 나머지 행정 절차와
            공사는 화두가 진행하고 진행 상황을 단계별로 공유해드립니다.
          </p>
        </Prose>
      </PageSection>

      {/* 8단계 */}
      <PageSection tone="soft" eyebrow="STEP" title="설치 절차 8단계" desc="각 단계가 끝날 때마다 담당자가 결과를 알려드립니다.">
        <Steps items={INSTALL_STEPS} cols={4} />
        <Note>
          단계별 소요 기간은 단지 여건과 환경부 승인 일정에 따라 달라집니다. 상담 시 단지 상황에 맞춘 예상 일정표를
          함께 드립니다.
        </Note>
      </PageSection>

      {/* 실사 단계 보충 */}
      <PageSection eyebrow="SURVEY" title="현장 실사와 실사 보고서" desc="3~4단계에서 설치 가능 여부가 확정됩니다.">
        <MediaRow image="/images/install-process-01.jpg" alt="아파트 주차장 현장 실사" title="실사에서 확인하는 것">
          총 주차면수 대비 의무 설치 수량, 기설 충전기 현황, 수전 설비의 여유 용량, 소방 이격거리를 확인합니다. 이
          결과를 실사보고서로 정리해 설치 가능 수량과 공사 범위를 문서로 드립니다.
        </MediaRow>
        <MediaRow image="/images/install-process-03.jpg" alt="충전기 설치 시공" title="계약 이후의 행정 절차" flip>
          계약이 끝나면 행위신고에 필요한 입주자대표회의 회의록 준비부터 환경부 접수·승인까지 화두가 대행합니다. 승인이
          떨어지면 곧바로 설치 시공 일정을 잡습니다.
        </MediaRow>
      </PageSection>

      {/* 준비 서류와 비용 */}
      <PageSection
        tone="soft"
        eyebrow="DOCUMENTS"
        title="준비 서류와 비용"
        desc="상담 전에 확인해두시면 절차가 빨라집니다."
      >
        <SpecList rows={INSTALL_DOCS} cols={1} />
        <Note>
          주소와 연락처만 남겨주시면 서류 준비 전에 설치 가능 여부부터 확인해 알려드립니다.
        </Note>
      </PageSection>

      <PageSection tone="off">
        <PageCta />
      </PageSection>
    </SubPage>
  );
}
