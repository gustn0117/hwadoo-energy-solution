import type { Metadata } from "next";
import { CardGrid, Card, CheckList, MediaRow, Note, PageCta, PageSection, Prose } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { BRANDS } from "@/lib/content";
import { COMPARE, PARTNER_COMMONS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "제휴 충전사업자 — 화두에너지솔루션",
  description:
    "화두에너지솔루션이 제휴한 전기차 충전사업자를 업체별 카드로 소개합니다. 운영 수량과 A/S 체계, 보상 범위를 함께 확인하세요.",
};

/** 비교표에서 특정 항목의 업체별 값을 꺼낸다 (없으면 빈 배열) */
function valsOf(key: string): readonly string[] {
  return COMPARE.rows.find((r) => r.key === key)?.vals ?? [];
}

/** 브랜드 이름으로 비교표 열 번호를 찾는다 (표에 없는 준비중 업체는 -1) */
function colOf(name: string): number {
  return COMPARE.heads.findIndex((h) => h === name);
}

export default function ComparePartnersPage() {
  const traits = valsOf("업계 특징");
  const care = valsOf("A/S 유지관리");
  const cover = valsOf("손해보험 보상범위");
  const terms = valsOf("계약기간 / 무상 유지보수");

  return (
    <SubPage
      eyebrow="비교하기"
      title={
        <>
          제휴 <em>충전사업자</em>
        </>
      }
      desc="화두가 직접 조건을 확인하고 제휴한 충전사업자입니다."
    >
      {/* 제휴 기준 */}
      <PageSection
        eyebrow="제휴 기준"
        title={
          <>
            아무 사업자나 <em>연결하지 않습니다</em>
          </>
        }
      >
        <Prose>
          <p>
            화두에너지솔루션은 특정 충전사업자의 대리점이 아닙니다. 계약 조건과 보상 범위, 장애 대응 체계를 직접 확인한
            사업자만 제휴하고, 단지 조건에 맞는 곳을 골라 제안합니다.
          </p>
          <p>
            아래 업체 카드는 제휴 사업자의 대표 특징을 정리한 것입니다. 항목별 수치 비교는{" "}
            <strong>한눈에 비교</strong> 페이지의 비교표에서 확인하실 수 있습니다.
          </p>
        </Prose>
      </PageSection>

      {/* 업체별 카드 */}
      <PageSection
        tone="soft"
        eyebrow="제휴 업체"
        title={
          <>
            업체별 <em>특징 한눈에</em>
          </>
        }
        desc="로고가 없는 칸은 제휴 절차를 진행 중인 사업자입니다."
      >
        <CardGrid cols={3}>
          {BRANDS.map((b) => {
            const i = colOf(b.name);
            return (
              <Card
                key={b.name}
                icon={b.logo ?? undefined}
                tag={i >= 0 ? `환경부 등록 ${COMPARE.volumes[i].toLocaleString()}기` : "제휴 준비중"}
                title={b.name}
              >
                {i >= 0 && traits[i] ? traits[i] : b.features.join(" · ")}
              </Card>
            );
          })}
        </CardGrid>
        <Note>
          기준 시점 {COMPARE.asOf} · 운영 수량은 <strong>환경부 등록 기준</strong>입니다. 제휴 사업자 구성은 단지
          지역과 사업자 정책에 따라 달라질 수 있습니다.
        </Note>
      </PageSection>

      {/* 주요 사업자 상세 */}
      <PageSection
        eyebrow="주요 사업자"
        title={
          <>
            계약 전에 <em>꼭 보는 항목</em>
          </>
        }
        desc="A/S 체계와 보상 범위, 계약기간은 사업자마다 다릅니다."
      >
        {COMPARE.heads.map((name, i) => (
          <MediaRow
            key={name}
            image={COMPARE.images[i]}
            alt={`${name} 완속충전기 설치 이미지`}
            title={name}
            flip={i % 2 === 1}
          >
            {[
              traits[i],
              care[i] ? `A/S 유지관리 ${care[i]}` : "",
              cover[i] ? `보상 범위 ${cover[i]}` : "",
              terms[i] ? `계약기간 / 무상 유지보수 ${terms[i]}` : "",
            ]
              .filter(Boolean)
              .join(" · ")}
          </MediaRow>
        ))}
      </PageSection>

      {/* 제휴사 공통 조건 */}
      <PageSection
        tone="off"
        eyebrow="공통 조건"
        title={
          <>
            어느 사업자를 고르셔도 <em>보장되는 것</em>
          </>
        }
      >
        <CheckList items={PARTNER_COMMONS} cols={2} />
        <Note>
          계약기간 종료 후 설비 소유와 철거 비용은 사업자별로 다릅니다. 계약서 작성 전에 해당 조항을 화두가 함께
          확인해 드립니다.
        </Note>
        <PageCta
          title="제휴 사업자 중 어디가 맞을지 모르시겠다면"
          desc="단지 조건을 알려주시면 제휴 사업자 가운데 유리한 곳을 추려 제안드립니다."
          label="제휴사 추천 받기"
        />
      </PageSection>
    </SubPage>
  );
}
