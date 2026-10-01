"use client";

import { useMemo, useState } from "react";
import { BoardBar } from "@/components/support/BoardBar";
import type { Case } from "@/lib/supabase";

const PAGE = 6;

export function CaseBoard({ items }: { items: Case[] }) {
  const [facility, setFacility] = useState("");
  const [cpo, setCpo] = useState("");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const facilities = useMemo(
    () => [...new Set(items.map((i) => i.facility_type).filter(Boolean))] as string[],
    [items],
  );
  const cpos = useMemo(() => [...new Set(items.map((i) => i.cpo).filter(Boolean))] as string[], [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (!facility || i.facility_type === facility) &&
        (!cpo || i.cpo === cpo) &&
        (!q || `${i.title} ${i.region ?? ""} ${i.cpo ?? ""}`.toLowerCase().includes(q)),
    );
  }, [items, facility, cpo, query]);

  const visible = filtered.slice(0, shown);
  const reset = () => setShown(PAGE);

  const filters = [
    facilities.length
      ? { label: "시설유형 선택", value: facility, options: facilities, onChange: (v: string) => { setFacility(v); reset(); } }
      : null,
    cpos.length
      ? { label: "충전사업자 선택", value: cpo, options: cpos, onChange: (v: string) => { setCpo(v); reset(); } }
      : null,
  ].filter(Boolean) as { label: string; value: string; options: string[]; onChange: (v: string) => void }[];

  return (
    <section className="board board--cases">
      <div className="shell">
        <div className="board__intro" data-reveal>
          <img src="/images/installation-diagnosis.png" alt="" width={306} height={286} />
          <div>
            <h2>
              <em>아파트부터 대형 시설까지,</em> 현장에서 검증된 화두 충전 인프라
            </h2>
            <p>아파트는 물론 상업시설과 관공서까지, 화두의 설치 경험은 계속되고 있습니다.</p>
          </div>
        </div>

        <BoardBar
          total={filtered.length}
          query={query}
          onQuery={(v) => {
            setQuery(v);
            reset();
          }}
          filters={filters.length ? filters : undefined}
        />

        {filtered.length === 0 ? (
          <p className="board__empty">등록된 설치사례가 없습니다.</p>
        ) : (
          <>
            <ul className="board__grid" style={{ "--cols": 3 } as React.CSSProperties}>
              {visible.map((c) => (
                <li key={c.id}>
                  <article className="bcard">
                    <div className="bcard__thumb" style={{ "--ratio": "4 / 3" } as React.CSSProperties}>
                      {c.image_url ? (
                        <img src={c.image_url} alt={`${c.title} 충전기 설치 현장`} loading="lazy" />
                      ) : (
                        <span>사진 준비중</span>
                      )}
                    </div>
                    <div className="bcard__body">
                      <h2 className="bcard__title">{c.title}</h2>
                      <div className="bcard__foot">
                        {c.charger_count ? <span className="bcard__qty">{c.charger_count.toLocaleString()}기</span> : <span />}
                        <span className="bcard__meta" style={{ marginTop: 0 }}>
                          {c.installed_on ?? c.region ?? ""}
                        </span>
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            {shown < filtered.length ? (
              <div className="board__more">
                <button onClick={() => setShown((n) => n + PAGE)}>더 보기</button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
