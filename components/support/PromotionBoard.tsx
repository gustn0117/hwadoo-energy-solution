"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BoardBar } from "@/components/support/BoardBar";
import { BOARD_INTRO, BoardIntro } from "@/components/support/BoardIntro";
import type { Promotion } from "@/lib/supabase";

const PAGE = 4;
const STATE_LABEL = { ongoing: "진행중", upcoming: "예정", ended: "종료" } as const;
type State = keyof typeof STATE_LABEL;

/** 기간 표기 — 2026.09.01 ~ 09.30 (같은 해면 뒤쪽은 월·일만) */
function period(starts: string | null, ends: string | null) {
  if (!starts && !ends) return "상시 진행";
  const f = (d: string) => d.replaceAll("-", ".");
  if (!starts) return `~ ${f(ends!)}`;
  if (!ends) return `${f(starts)} ~`;
  const sameYear = starts.slice(0, 4) === ends.slice(0, 4);
  return `${f(starts)} ~ ${sameYear ? f(ends).slice(5) : f(ends)}`;
}

export function PromotionBoard({ items }: { items: (Promotion & { state: State })[] }) {
  const [cpo, setCpo] = useState("");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const cpos = useMemo(() => [...new Set(items.map((i) => i.cpo).filter(Boolean))] as string[], [items]);

  const filtered = useMemo(() => {
    const q = query.trim();
    return items.filter(
      (i) =>
        (!cpo || i.cpo === cpo) &&
        (!q || `${i.title} ${i.summary ?? ""} ${i.cpo ?? ""}`.toLowerCase().includes(q.toLowerCase())),
    );
  }, [items, cpo, query]);

  const visible = filtered.slice(0, shown);

  return (
    <section className="board">
      <div className="shell">
        <BoardIntro {...BOARD_INTRO.promotion} />

        <BoardBar
          total={filtered.length}
          query={query}
          onQuery={(v) => {
            setQuery(v);
            setShown(PAGE);
          }}
          filters={
            cpos.length
              ? [
                  {
                    label: "충전사업자 선택",
                    value: cpo,
                    options: cpos,
                    onChange: (v) => {
                      setCpo(v);
                      setShown(PAGE);
                    },
                  },
                ]
              : undefined
          }
        />

        {filtered.length === 0 ? (
          <p className="board__empty">등록된 프로모션이 없습니다.</p>
        ) : (
          <>
            <ul className="board__grid" style={{ "--cols": 2 } as React.CSSProperties}>
              {visible.map((p) => (
                <li key={p.id}>
                  <Link className="bcard" href={`/promotion/${p.id}`} data-state={p.state}>
                    <div className="bcard__thumb" data-ended="종료된 이벤트입니다.">
                      {p.image_url ? <img src={p.image_url} alt="" loading="lazy" /> : <span>이미지 준비중</span>}
                    </div>
                    <div className="bcard__body">
                      <div className="bcard__top">
                        <span className="bcard__cpo">{p.cpo ?? "전체"}</span>
                        <span className="bcard__badge" data-state={p.state}>
                          {STATE_LABEL[p.state]}
                        </span>
                      </div>
                      <h2 className="bcard__title">{p.title}</h2>
                      <p className="bcard__meta">{period(p.starts_on, p.ends_on)}</p>
                    </div>
                  </Link>
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
