import type { Metadata } from "next";
import Link from "next/link";
import { PageSection } from "@/components/page/Blocks";
import { SubPage } from "@/components/SubPage";
import { getPromotions, promotionState } from "@/lib/data";

export const dynamic = "force-dynamic";

const STATE_LABEL = { ongoing: "진행중", upcoming: "예정", ended: "종료" } as const;

export const metadata: Metadata = {
  title: "프로모션 — 화두에너지솔루션",
  description: "아파트 전기차 충전기 설치 상담 고객을 위한 진행 중인 혜택을 확인하세요.",
};

export default async function PromotionListPage() {
  const promotions = await getPromotions();

  return (
    <SubPage eyebrow="고객지원" title={<>진행 중인 <em>프로모션</em></>} desc="설치 상담 고객을 위한 혜택을 모았습니다.">
      <PageSection>
        {promotions.length === 0 ? (
          <p className="pg-empty">진행 중인 프로모션이 없습니다.</p>
        ) : (
          <ul className="pg-list" data-reveal-group>
            {promotions.map((p) => {
              const state = promotionState(p);
              return (
                <li key={p.id}>
                  <Link href={`/promotion/${p.id}`}>
                    {p.image_url ? <img className="pg-list__thumb" src={p.image_url} alt="" loading="lazy" /> : null}
                    <div className="pg-list__body">
                      <span className="pg-list__tag" data-state={state}>
                        {STATE_LABEL[state]}
                      </span>
                      <h3>{p.title}</h3>
                      <p>{p.summary ?? p.body}</p>
                    </div>
                    <time>{[p.starts_on, p.ends_on].filter(Boolean).join(" ~ ").replaceAll("-", ".")}</time>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </PageSection>
    </SubPage>
  );
}
