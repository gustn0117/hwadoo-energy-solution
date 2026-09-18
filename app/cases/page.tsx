import type { Metadata } from "next";
import { SubPage } from "@/components/SubPage";
import { getCases } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "설치사례 — 화두에너지솔루션",
  description: "화두에너지솔루션이 전국 아파트에 구축한 전기차 충전기 설치 현장을 확인하세요.",
};

export default async function CasesPage() {
  const cases = await getCases();

  return (
    <SubPage
      eyebrow="설치사례"
      title={
        <>
          실제 구축현장으로 <em>확인하세요</em>
        </>
      }
      desc="전국 아파트 단지에 화두에너지솔루션이 설치한 충전 인프라입니다."
    >
      <section className="cases">
        <div className="shell">
          {cases.length === 0 ? (
            <p className="cases__empty">설치사례를 준비하고 있습니다.</p>
          ) : (
            <ul className="cases__grid">
              {cases.map((c) => (
                <li key={c.id} className="caseCard">
                  <div className="caseCard__img">
                    {c.image_url ? (
                      <img src={c.image_url} alt={`${c.title} 충전기 설치 현장`} loading="lazy" />
                    ) : (
                      <span aria-hidden="true">사진 준비중</span>
                    )}
                    {c.charger_count ? <em className="caseCard__qty num">{c.charger_count.toLocaleString()}기</em> : null}
                  </div>
                  <div className="caseCard__body">
                    {c.cpo ? <span className="caseCard__cpo">{c.cpo}</span> : null}
                    <h2>{c.title}</h2>
                    <p className="caseCard__meta">{[c.region, c.installed_on].filter(Boolean).join(" · ")}</p>
                    {c.description ? <p className="caseCard__desc">{c.description}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </SubPage>
  );
}
