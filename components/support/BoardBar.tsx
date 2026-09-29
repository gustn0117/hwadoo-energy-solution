"use client";

import { Search } from "@/components/Icons";

/** 목록 상단 줄 — 총 건수 · 필터 · 검색 */
export function BoardBar({
  total,
  filters,
  query,
  onQuery,
}: {
  total: number;
  filters?: { label: string; value: string; options: string[]; onChange: (v: string) => void }[];
  query: string;
  onQuery: (v: string) => void;
}) {
  return (
    <div className="board__bar">
      <p className="board__count">
        총 <b>{total}</b>건
      </p>

      {filters?.length ? (
        <div className="board__filters">
          {filters.map((f) => (
            <label key={f.label}>
              <span className="sr-only">{f.label}</span>
              <select value={f.value} onChange={(e) => f.onChange(e.target.value)}>
                <option value="">{f.label}</option>
                {f.options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>
          ))}
        </div>
      ) : null}

      <form className="board__search" role="search" onSubmit={(e) => e.preventDefault()}>
        <label className="sr-only" htmlFor="board-q">
          검색어
        </label>
        <input
          id="board-q"
          type="search"
          value={query}
          placeholder="검색어를 입력해주세요."
          onChange={(e) => onQuery(e.target.value)}
        />
        <button type="submit" aria-label="검색">
          <Search size={22} />
        </button>
      </form>
    </div>
  );
}
