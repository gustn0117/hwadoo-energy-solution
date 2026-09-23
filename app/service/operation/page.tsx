import type { Metadata } from "next";
import { Card, CardGrid, CheckList, MediaRow, Note, PageCta, PageSection, Prose } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { OPERATION_CHECKS, OPERATION_SERVICES } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "운영·유지관리 — 화두에너지솔루션",
  description:
    "365일 고장 접수, 정기 점검, 원격 모니터링, 민원 대응, 사용 리포트까지 개통 이후의 충전기 관리 체계를 안내합니다.",
};

export default function OperationPage() {
  return (
    <SubPage
      eyebrow="운영·유지관리"
      title={
        <>
          개통 이후가 <em>진짜 시작입니다</em>
        </>
      }
      desc="가동률을 지키는 것은 장비가 아니라 고장 접수와 점검, 민원 대응의 속도입니다."
    >
      {/* 운영 개요 */}
      <PageSection eyebrow="OPERATION" title="설치보다 관리가 어렵습니다" desc="고장난 충전기 한 대가 민원을 만듭니다.">
        <Prose>
          <p>
            충전기는 설치한 날이 가장 잘 도는 날입니다. 시간이 지나면 커플러 파손, 통신 끊김, 결제 오류 같은 문제가
            생기는데, <strong>접수 창구가 흩어져 있으면</strong> 관리사무소가 대신 민원을 받고 입주민은 충전기를 쓰지 않게
            됩니다.
          </p>
          <p>
            화두는 개통과 동시에 접수 창구를 한 곳으로 정리하고, 점검 결과와 사용 현황을 관리사무소에 문서로 남깁니다.
            담당자는 설치 때와 동일한 사람이 이어서 맡습니다.
          </p>
        </Prose>
        <MediaRow image="/images/generated/dashboard.webp" alt="충전기 관제 시스템 화면" title="상태는 원격으로 먼저 봅니다">
          충전기 상태와 가동률, 이상 발생은 관제 시스템에서 상시 확인합니다. 현장에서 신고가 들어오기 전에 원격으로
          확인하고, 리모트 리셋으로 해결되는 장애는 방문 없이 조치합니다.
        </MediaRow>
      </PageSection>

      {/* 운영 서비스 6종 */}
      <PageSection tone="soft" eyebrow="SERVICE" title="운영 서비스" desc="계약 기간 동안 아래 항목이 함께 제공됩니다.">
        <CardGrid cols={3}>
          {OPERATION_SERVICES.map((s, i) => (
            <Card key={s.title} num={i + 1} title={s.title}>
              {s.desc}
            </Card>
          ))}
        </CardGrid>
        <Note>
          점검 주기와 무상 유지보수 기간은 선택한 충전사업자의 계약 조건에 따라 달라집니다. 비교하기 메뉴에서 사업자별
          조건을 같은 기준으로 확인하실 수 있습니다.
        </Note>
      </PageSection>

      {/* 관리사무소와 함께 정하는 기준 */}
      <PageSection
        eyebrow="CHECKPOINT"
        title="관리사무소와 함께 정해두는 것"
        desc="개통 전에 정해두면 민원이 쌓이지 않습니다."
      >
        <CheckList items={OPERATION_CHECKS} cols={2} />
        <Note>
          이용률이 높아져 대기가 생기면 추가 설치 가능 수량과 전력 여유를 다시 진단해드립니다. 증설 검토도 운영 범위에
          포함됩니다.
        </Note>
      </PageSection>

      <PageSection tone="off">
        <PageCta />
      </PageSection>
    </SubPage>
  );
}
