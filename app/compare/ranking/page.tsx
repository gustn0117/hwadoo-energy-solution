import type { Metadata } from "next";
import { CardGrid, Card, CheckList, Note, PageCta, PageSection, Prose, SpecList } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { COMPARE, COMPARE_CRITERIA, RANK_CAVEATS } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "충전사업자 순위 — 화두에너지솔루션",
  description:
    "환경부 등록 운영 수량을 기준으로 정리한 전기차 충전사업자 순위입니다. 운영 대수와 운영 연차를 같은 기준으로 확인하세요.",
};

/** 비교표에서 특정 항목의 업체별 값을 꺼낸다 (없으면 빈 배열) */
function valsOf(key: string): readonly string[] {
  return COMPARE.rows.find((r) => r.key === key)?.vals ?? [];
}

export default function CompareRankingPage() {
  const founded = valsOf("운영사 설립연도");
  const traits = valsOf("업계 특징");

  // 환경부 등록 운영 수량이 많은 순으로 정렬 — 1위 수량을 100%로 두고 막대 길이를 잡는다
  const ranked = COMPARE.heads
    .map((name, i) => ({ name, volume: COMPARE.volumes[i], years: COMPARE.years[i], i }))
    .sort((a, b) => b.volume - a.volume);
  const top = ranked[0]?.volume ?? 1;
  const total = COMPARE.volumes.reduce((sum, v) => sum + v, 0);

  return (
    <SubPage
      eyebrow="비교하기"
      title={
        <>
          충전사업자 <em>순위</em>
        </>
      }
      desc={`환경부 등록 운영 수량 기준 (${COMPARE.asOf})`}
    >
      {/* 순위 기준 설명 */}
      <PageSection
        eyebrow="집계 기준"
        title={
          <>
            <em>환경부 등록 운영 수량</em>으로 줄을 세웠습니다
          </>
        }
      >
        <Prose>
          <p>
            아래 순위는 각 충전사업자가 <strong>환경부에 등록해 운영 중인 충전기 수량(기 단위)</strong>을 기준으로
            정렬한 것입니다. 광고 문구나 브랜드 인지도가 아니라, 공개된 등록 수량이라는 하나의 숫자만 사용했습니다.
          </p>
          <p>
            운영 수량은 사업자의 규모와 운영 경험을 보여주는 지표입니다. 다만 수량이 많다고 우리 단지에 가장 유리한
            계약 조건을 준다는 뜻은 아니므로, 아래 순위는 후보를 좁히는 출발점으로 봐주세요.
          </p>
        </Prose>
      </PageSection>

      {/* 순위 카드 — 운영 수량 큰 숫자 + 인라인 막대 */}
      <PageSection
        tone="soft"
        eyebrow="운영 수량 순위"
        title={
          <>
            사업자별 <em>운영 충전기 수</em>
          </>
        }
        desc="막대 길이는 1위 사업자의 운영 수량을 기준으로 한 상대 비율입니다."
      >
        <CardGrid cols={4}>
          {ranked.map((r, rank) => (
            <Card key={r.name} num={rank + 1} title={r.name}>
              <span
                className="num"
                style={{ display: "block", fontSize: "clamp(28px, 2.6vw, 42px)", fontWeight: 800, lineHeight: 1.1 }}
              >
                {r.volume.toLocaleString()}
                <span style={{ marginLeft: 4, fontSize: "0.42em", fontWeight: 700 }}>기</span>
              </span>
              <span
                style={{
                  display: "block",
                  height: 8,
                  marginTop: 12,
                  borderRadius: 999,
                  background: "var(--line)",
                  overflow: "hidden",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: `${Math.round((r.volume / top) * 100)}%`,
                    height: "100%",
                    borderRadius: 999,
                    background: rank === 0 ? "var(--purple)" : "var(--navy)",
                  }}
                />
              </span>
              <span style={{ display: "block", marginTop: 12, fontSize: 15, lineHeight: 1.6 }}>
                비교 대상 4개사 합계의 {Math.round((r.volume / total) * 100)}% · 운영 {r.years}년차
              </span>
            </Card>
          ))}
        </CardGrid>
        <Note>
          기준 시점 {COMPARE.asOf} · <strong>환경부 등록 기준</strong> 운영 수량(기)입니다. 비율은 위 4개 사업자
          합계를 기준으로 계산한 값이며, 국내 전체 충전사업자를 포함한 점유율이 아닙니다.
        </Note>
      </PageSection>

      {/* 운영 연차 */}
      <PageSection
        eyebrow="운영 연차"
        title={
          <>
            얼마나 <em>오래 운영</em>했는지
          </>
        }
        desc="설립 시점과 운영 연차는 장애 대응 체계가 자리 잡았는지 가늠하는 참고 지표입니다."
      >
        <SpecList
          rows={COMPARE.heads.map((name, i) => ({
            key: name,
            val: `운영 ${COMPARE.years[i]}년차${founded[i] ? ` · 설립 ${founded[i]}` : ""}`,
          }))}
          cols={2}
        />
      </PageSection>

      {/* 사업자별 특징 */}
      <PageSection
        tone="off"
        eyebrow="사업자별 특징"
        title={
          <>
            수량 뒤에 있는 <em>운영 방식</em>
          </>
        }
      >
        <CardGrid cols={4}>
          {COMPARE.heads.map((name, i) => (
            <Card key={name} icon={COMPARE.logos[i]} title={name} flat>
              {traits[i] ?? "상세 조건은 상담 시 안내해 드립니다."}
            </Card>
          ))}
        </CardGrid>
      </PageSection>

      {/* 순위를 볼 때 주의할 점 */}
      <PageSection
        eyebrow="주의할 점"
        title={
          <>
            순위만으로 <em>고르지 마세요</em>
          </>
        }
      >
        <CheckList items={RANK_CAVEATS} cols={2} />
        <Note>
          실제 계약에서는 아래 네 가지를 함께 확인합니다 — {COMPARE_CRITERIA.map((c) => c.b).join(" · ")}. 항목별
          비교는 <strong>한눈에 비교</strong> 페이지에서 표로 보실 수 있습니다.
        </Note>
        <PageCta
          title="우리 단지에는 어느 사업자가 맞을까요?"
          desc="운영 수량과 계약 조건을 단지 상황에 맞춰 다시 정리해 드립니다."
          label="사업자 추천 상담"
        />
      </PageSection>
    </SubPage>
  );
}
