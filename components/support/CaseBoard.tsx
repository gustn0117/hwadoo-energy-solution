"use client";

import "@/app/styles/pages.css"; // 목록(.pg-list) 스타일
import { useMemo, useState } from "react";
import { BoardBar } from "@/components/support/BoardBar";
import { BOARD_INTRO, BoardIntro } from "@/components/support/BoardIntro";
import type { Case } from "@/lib/supabase";

const PAGE = 8;

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
        <BoardIntro {...BOARD_INTRO.cases} />

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
            <ul className="pg-list pg-list--plain" data-reveal-group>
              {visible.map((c) => (
                <li key={c.id}>
                  {/* 설치사례는 상세 페이지가 없어 링크를 걸지 않는다 */}
                  <div className="pg-list__row">
                    {c.image_url ? (
                      <img className="pg-list__thumb" src={c.image_url} alt={`${c.title} 충전기 설치 현장`} loading="lazy" />
                    ) : (
                      <span className="pg-list__thumb pg-list__thumb--empty">사진 준비중</span>
                    )}
                    <div className="pg-list__body">
                      {c.facility_type || c.cpo ? (
                        <span className="pg-list__tag">
                          {[c.facility_type, c.cpo].filter(Boolean).join(" · ")}
                        </span>
                      ) : null}
                      <h2>{c.title}</h2>
                      {c.region ? <p>{c.region}</p> : null}
                    </div>
                    <span className="pg-list__meta">
                      {c.charger_count ? <b className="num">{c.charger_count.toLocaleString()}기</b> : null}
                      {c.installed_on ? <time>{c.installed_on.replaceAll("-", ".").slice(0, 7)}</time> : null}
                    </span>
                  </div>
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
