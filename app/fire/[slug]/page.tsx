import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckList, Note, PageCta, PageSection } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { FIRE_PRODUCTS } from "@/lib/site-content";

export function generateStaticParams() {
  return FIRE_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = FIRE_PRODUCTS.find((p) => p.slug === slug);
  return {
    title: `${item?.name ?? "화재안전"} — 화두에너지솔루션`,
    description: item?.summary,
  };
}

export default async function FireProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = FIRE_PRODUCTS.find((p) => p.slug === slug);
  if (!item) notFound();

  const others = FIRE_PRODUCTS.filter((p) => p.slug !== slug);

  return (
    <SubPage eyebrow="화재안전" title={item.name} desc={item.summary}>
      <PageSection>
        <div className="pg-media" data-reveal-group>
          <figure>
            <img src={item.image} alt={`${item.name} 이미지`} loading="lazy" />
          </figure>
          <div>
            <h3>{item.name}은 이런 설비입니다</h3>
            <p>{item.desc}</p>
          </div>
        </div>
      </PageSection>

      <PageSection tone="soft" title="주요 특징">
        <CheckList items={item.features} cols={1} />
        <Note>설치 수량과 위치는 충전 구획 수, 주차장 구조, 소방 시설 배치에 따라 현장에서 정합니다.</Note>
      </PageSection>

      <PageSection title="함께 구축하면 좋은 설비">
        <ul className="pg-grid" style={{ "--cols": 4 } as React.CSSProperties} data-reveal-group>
          {others.map((p) => (
            <li key={p.slug} className="pg-card pg-card--flat">
              <h3>{p.name}</h3>
              <p>{p.summary}</p>
              <Link className="btn btn--white" href={`/fire/${p.slug}`} style={{ alignSelf: "flex-start", height: 42, padding: "0 18px", border: "1px solid var(--line)", fontSize: 14 }}>
                보기
              </Link>
            </li>
          ))}
        </ul>
        <PageCta title={`${item.name} 도입을 검토 중이신가요?`} desc="단지 상황을 확인해 필요한 수량과 설치 위치를 제안해드립니다." label="설치 상담" />
      </PageSection>
    </SubPage>
  );
}
