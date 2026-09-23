import type { Metadata } from "next";
import { CheckList, MediaRow, Note, PageCta, PageSection, Prose, SpecList, Steps } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { INSTALL_DOCS, INSTALL_NOTICES, INSTALL_WORKS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "설치·시공 — 화두에너지솔루션",
  description:
    "현장 실사부터 전기 공사, 충전기 설치, 검수·개통까지의 공사 범위와 단지에서 준비할 서류, 소요 기간을 안내합니다.",
};

export default function InstallPage() {
  return (
    <SubPage
      eyebrow="설치·시공"
      title={
        <>
          어디까지 공사하고 <em>무엇을 준비하나</em>
        </>
      }
      desc="공사 범위와 준비 서류, 공사 중 주차장 운영 기준을 미리 정리해드립니다."
    >
      {/* 시공 개요 */}
      <PageSection eyebrow="INSTALL" title="공사는 실사에서 시작합니다" desc="같은 수량이라도 단지마다 공사 범위가 다릅니다.">
        <Prose>
          <p>
            충전기 설치의 실제 비용과 기간을 가르는 것은 장비가 아니라 <strong>전기 공사 범위</strong>입니다. 수전 설비에서
            충전 구역까지의 거리, 기존 분전반의 여유 용량, 배관을 지날 수 있는 경로에 따라 공사 규모가 달라집니다.
          </p>
          <p>
            그래서 화두는 계약 전에 현장 실사를 먼저 진행하고, 설치 가능 위치와 수량, 예상 공사 범위를 실사보고서로
            정리해 드립니다. 관리사무소는 이 문서를 근거로 입주자대표회의에 안건을 올리실 수 있습니다.
          </p>
        </Prose>
        <MediaRow
          image="/images/install-process-02.jpg"
          alt="지하주차장 전기 공사 현장"
          title="전용 회선으로 포설합니다"
        >
          기존 주차장 조명이나 공용 회로에 물리지 않고, 수전 설비에서 충전 구역까지 전용 회선을 새로 깔고 전용 분전반과
          차단기를 구성합니다. 충전 부하가 단지 공용 전기에 영향을 주지 않도록 하기 위해서입니다.
        </MediaRow>
      </PageSection>

      {/* 공사 범위 6단계 */}
      <PageSection tone="soft" eyebrow="SCOPE" title="공사 범위" desc="실사부터 인수인계까지 화두가 직접 관리합니다.">
        <Steps items={INSTALL_WORKS} cols={3} />
        <Note>
          충전구역 바닥 도색과 안내 표지, 차량 스토퍼까지 시공 범위에 포함됩니다. 별도 비용을 따로 청구하지 않습니다.
        </Note>
      </PageSection>

      {/* 공사 중 단지 운영 */}
      <PageSection eyebrow="NOTICE" title="공사 중 주차장 운영" desc="입주민 불편을 줄이는 것이 공사 속도보다 중요합니다.">
        <CheckList items={INSTALL_NOTICES} cols={2} />
        <MediaRow image="/images/install-process-04.jpg" alt="정비를 마친 충전구역" title="공사 후 원상 복구" flip>
          공사가 끝나면 배관 경로와 통행 동선을 정리하고, 충전구역 표지와 사용 안내문을 붙인 상태로 관리사무소에
          인계합니다.
        </MediaRow>
      </PageSection>

      {/* 준비 서류와 일정 */}
      <PageSection
        tone="soft"
        eyebrow="DOCUMENTS"
        title="준비 서류와 일정"
        desc="단지에서 준비할 서류와 화두가 작성하는 서류를 나눴습니다."
      >
        <SpecList rows={INSTALL_DOCS} cols={1} />
        <Note>
          행위신고와 환경부 접수·승인은 화두가 대행합니다. 관리사무소는 회의록과 도면만 준비해주시면 됩니다.
        </Note>
      </PageSection>

      <PageSection tone="off">
        <PageCta />
      </PageSection>
    </SubPage>
  );
}
