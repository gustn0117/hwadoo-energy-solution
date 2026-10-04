"use client";

import "@/app/styles/pages.css"; // 목록(.pg-list) 스타일
import { useMemo, useState } from "react";
import Link from "next/link";
import { BoardBar } from "@/components/support/BoardBar";
import { BOARD_INTRO, BoardIntro } from "@/components/support/BoardIntro";
import type { Promotion } from "@/lib/supabase";

const PAGE = 6;
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
            <ul className="pg-list" data-reveal-group>
              {visible.map((p) => (
                <li key={p.id}>
                  <Link href={`/promotion/${p.id}`}>
                    {p.image_url ? (
                      <img className="pg-list__thumb" src={p.image_url} alt="" loading="lazy" />
                    ) : (
                      <span className="pg-list__thumb pg-list__thumb--empty">이미지 준비중</span>
                    )}
                    <div className="pg-list__body">
                      <span className="pg-list__tag" data-state={p.state}>
                        {p.cpo ? `${p.cpo} · ` : ""}
                        {STATE_LABEL[p.state]}
                      </span>
                      <h2>{p.title}</h2>
                      {p.summary ? <p>{p.summary}</p> : null}
                    </div>
                    <time>{period(p.starts_on, p.ends_on)}</time>
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
