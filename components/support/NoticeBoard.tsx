"use client";

import "@/app/styles/pages.css"; // 목록(.pg-list) 스타일
import Link from "next/link";
import { useMemo, useState } from "react";
import { BoardBar } from "@/components/support/BoardBar";
import { BOARD_INTRO, BoardIntro } from "@/components/support/BoardIntro";
import type { Notice } from "@/lib/supabase";

const PAGE = 10;

/** 공지·소식 목록 — 게시판과 같은 검색 · 분류 · 더보기 구성 (시안 1001) */
export function NoticeBoard({ items }: { items: Notice[] }) {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const categories = useMemo(() => [...new Set(items.map((i) => i.category).filter(Boolean))], [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(
      (i) =>
        (!category || i.category === category) &&
        (!q || `${i.title} ${i.body}`.toLowerCase().includes(q)),
    );
  }, [items, category, query]);

  const visible = filtered.slice(0, shown);
  const reset = () => setShown(PAGE);

  return (
    <section className="board board--notice">
      <div className="shell">
        <BoardIntro {...BOARD_INTRO.notice} />

        <BoardBar
          total={filtered.length}
          query={query}
          onQuery={(v) => {
            setQuery(v);
            reset();
          }}
          filters={
            categories.length
              ? [
                  {
                    label: "분류 선택",
                    value: category,
                    options: categories,
                    onChange: (v: string) => {
                      setCategory(v);
                      reset();
                    },
                  },
                ]
              : undefined
          }
        />

        {filtered.length === 0 ? (
          <p className="board__empty">등록된 글이 없습니다.</p>
        ) : (
          <>
            <ul className="pg-list" data-reveal-group>
              {visible.map((n) => (
                <li key={n.id}>
                  <Link href={`/notice/${n.id}`}>
                    <div className="pg-list__body">
                      <span className="pg-list__tag">{n.is_pinned ? "중요" : n.category}</span>
                      <h2>{n.title}</h2>
                      <p>{n.body}</p>
                    </div>
                    <time dateTime={n.published_on}>{n.published_on.replaceAll("-", ".")}</time>
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
