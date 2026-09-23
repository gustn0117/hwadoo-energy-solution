import type { Metadata } from "next";
import Link from "next/link";
import { CheckList, PageCta, PageSection } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { FIRE_PRODUCTS, FIRE_RULES } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "화재안전 — 화두에너지솔루션",
  description:
    "충전구역 화재 대응 소화기, 질식소화포, 상방향 주수장치, 열화상카메라, 충전소 격벽까지 아파트 충전 인프라의 화재 안전 설비를 안내합니다.",
};

export default function FirePage() {
  return (
    <SubPage
      eyebrow="화재안전"
      title={
        <>
          충전 인프라 구축에서 <em>안전까지 함께</em>
        </>
      }
      desc="충전기를 놓는 것으로 끝나지 않습니다. 화재를 늦추고 번지지 않게 하는 설비를 함께 구축합니다."
    >
      <PageSection
        title="충전구역 화재대응 용품"
        desc="단지 구조와 충전 구획 수에 맞춰 필요한 설비를 골라 구성합니다."
      >
        <ul className="pg-grid" style={{ "--cols": 3 } as React.CSSProperties} data-reveal-group>
          {FIRE_PRODUCTS.map((p) => (
            <li key={p.slug} className="pg-card">
              <img className="pg-card__icon" src={p.image} alt="" loading="lazy" style={{ width: "100%", aspectRatio: "3 / 2", objectFit: "cover", borderRadius: 16 }} />
              <h3>{p.name}</h3>
              <p>{p.summary}</p>
              <Link className="btn btn--white" href={`/fire/${p.slug}`} style={{ alignSelf: "flex-start", height: 46, padding: "0 20px", border: "1px solid var(--line)", fontSize: 15 }}>
                자세히 보기
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <PageSection
        tone="soft"
        title="충전구역을 정할 때 지켜야 하는 기준"
        desc="국토교통부·LH 공동주택 전기자동차 화재대응 매뉴얼 기준입니다."
      >
        <CheckList items={FIRE_RULES} cols={2} />
      </PageSection>

      <PageSection>
        <PageCta
          title="우리 단지에는 어떤 설비가 필요할까요?"
          desc="충전 구획 수와 주차장 구조를 확인해 필요한 설비를 제안해드립니다."
          label="화재안전 상담"
        />
      </PageSection>
    </SubPage>
  );
}
