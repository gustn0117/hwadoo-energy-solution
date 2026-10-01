"use client";

import { useMemo, useState } from "react";
import { Faq } from "@/components/Faq";
import { BoardBar } from "@/components/support/BoardBar";

const PAGE = 8;

/** FAQ 목록 — 게시판과 같은 검색 · 총 건수 · 더보기 구성 (시안 1001) */
export function FaqBoard({ items }: { items: { q: string; answer: string }[] }) {
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.q} ${i.answer}`.toLowerCase().includes(q));
  }, [items, query]);

  const visible = filtered.slice(0, shown);

  return (
    <section className="board board--faq">
      <div className="shell">
        <BoardBar
          total={filtered.length}
          query={query}
          onQuery={(v) => {
            setQuery(v);
            setShown(PAGE);
          }}
        />

        {filtered.length === 0 ? (
          <p className="board__empty">검색 결과가 없습니다.</p>
        ) : (
          <>
            <Faq key={query} items={visible} defaultOpen={0} bare />
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
