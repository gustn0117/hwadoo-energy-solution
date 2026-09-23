import type { Metadata } from "next";
import {
  CardGrid,
  Card,
  CheckList,
  CompareTable,
  Note,
  PageCta,
  PageSection,
  Prose,
  Steps,
} from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { COMPARE, COMPARE_CRITERIA, COMPARE_FLOW } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "한눈에 비교 — 화두에너지솔루션",
  description:
    "주요 전기차 충전사업자의 충전요금, 계약기간, 무상 유지보수, 보상 범위, 점검 주기를 같은 기준으로 정리한 비교표입니다.",
};

/** 비교표에서 특정 항목의 업체별 값을 꺼낸다 (없으면 빈 배열) */
function valsOf(key: string): readonly string[] {
  return COMPARE.rows.find((r) => r.key === key)?.vals ?? [];
}

export default function ComparePage() {
  const fees = valsOf("충전 기본요금");
  const terms = valsOf("계약기간 / 무상 유지보수");

  return (
    <SubPage
      eyebrow="비교하기"
      title={
        <>
          충전사업자, <em>한눈에 비교</em>
        </>
      }
      desc="같은 기준으로 정리했습니다. 단지에 맞는 조건을 한 표에서 확인하세요."
    >
      {/* 왜 비교가 필요한지 */}
      <PageSection
        eyebrow="비교가 필요한 이유"
        title={
          <>
            같은 단지라도 <em>사업자에 따라 조건이 다릅니다</em>
          </>
        }
      >
        <Prose>
          <p>
            충전사업자마다 계약기간과 무상 유지보수 범위, 사고 보상 한도, 점검 주기가 다릅니다. 한 곳의 제안서만 보면
            우리 단지에 유리한 조건인지 판단하기 어렵습니다.
          </p>
          <p>
            화두에너지솔루션은 제휴 사업자의 조건을 <strong>같은 항목·같은 단위</strong>로 맞춰 정리합니다. 아래 표는
            단지 설명회에서 가장 많이 묻는 항목만 추린 요약본입니다.
          </p>
        </Prose>
      </PageSection>

      {/* 핵심 비교표 */}
      <PageSection
        tone="soft"
        eyebrow="비교표"
        title={
          <>
            주요 충전사업자 <em>조건 비교</em>
          </>
        }
        desc="보라색으로 표시된 열은 화두 제휴 기준 추천 사업자입니다."
      >
        <CompareTable heads={COMPARE.heads} rows={COMPARE.rows} pick={COMPARE.pick} />
        <Note>
          기준 시점 {COMPARE.asOf} · 운영 수량과 사업자 현황은 <strong>환경부 등록 기준</strong>입니다. 요금과 계약
          조건은 사업자 정책 변경에 따라 달라질 수 있으며, 실제 계약 전 제안서로 다시 확인해 드립니다.
        </Note>
      </PageSection>

      {/* 표에서 가장 먼저 보는 두 항목 요약 */}
      <PageSection
        eyebrow="한 줄 요약"
        title={
          <>
            먼저 보게 되는 <em>두 가지</em>
          </>
        }
        desc="충전 기본요금과 계약기간은 입주민 설명회에서 가장 많이 나오는 질문입니다."
      >
        <CardGrid cols={4}>
          {COMPARE.heads.map((name, i) => (
            <Card key={name} tag={fees[i]} title={name}>
              {terms[i] ? `계약기간 / 무상 유지보수 ${terms[i]}` : "계약 조건은 상담 시 안내해 드립니다."}
            </Card>
          ))}
        </CardGrid>
        <Note>
          기준 시점 {COMPARE.asOf} · 표시된 요금은 충전 기본요금이며, 회원 할인과 결제수단에 따라 실제 부담액은 달라질
          수 있습니다.
        </Note>
      </PageSection>

      {/* 비교 기준 */}
      <PageSection
        tone="off"
        eyebrow="비교 기준"
        title={
          <>
            화두는 <em>이 네 가지</em>를 봅니다
          </>
        }
      >
        <CheckList items={COMPARE_CRITERIA} cols={2} />
      </PageSection>

      {/* 비교 상담 절차 */}
      <PageSection
        eyebrow="진행 순서"
        title={
          <>
            비교 상담은 <em>이렇게 진행됩니다</em>
          </>
        }
      >
        <Steps items={COMPARE_FLOW} cols={4} />
        <PageCta
          title="우리 단지 조건으로 비교표를 받아보시겠어요?"
          desc="주차면수와 전력 용량만 알려주시면 단지에 맞춘 비교표를 정리해 보내드립니다."
          label="비교표 받기"
        />
      </PageSection>
    </SubPage>
  );
}
