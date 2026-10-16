"use client";

import "@/app/styles/compare.css";
import { useEffect, useRef, useState } from "react";
import { Chevron } from "@/components/Icons";
import { Hatch } from "@/components/Hatch";
import {
  COMPARE_BRANDS,
  COMPARE_GROUPS,
  type CompareBrand,
  type CompareCell,
} from "@/lib/compare-data";

/** 브랜드 줄을 뺀 비교 항목 — 모바일에서 이 이름들이 탭이 된다 (시안 1015) */
const ITEMS = COMPARE_GROUPS.flatMap((g) => g.rows.filter((r) => !("brand" in r.cells[0])));

/** 칸 하나 — 로고 줄 · 큰 글씨 + 설명 · 글머리표 목록 세 가지 */
function Cell({ cell, brand }: { cell: CompareCell; brand: CompareBrand }) {
  if ("brand" in cell) {
    return (
      <div className="cmp__brand">
        <span className="cmp__chip" style={{ background: brand.color }}>
          {brand.name}
        </span>
        <span className="cmp__logo">
          {brand.logo ? <img src={brand.logo} alt={brand.name} loading="lazy" /> : <Hatch label="로고 준비중" />}
        </span>
        <span className="cmp__photo">
          {brand.photo ? <img src={brand.photo} alt={`${brand.name} 충전기`} loading="lazy" /> : <Hatch label="사진 준비중" />}
        </span>
      </div>
    );
  }

  if ("list" in cell) {
    return (
      <ul className="cmp__list">
        {cell.list.map((c) => (
          <li key={c.b}>
            <b>{c.b}</b>
            <span>{c.t}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="cmp__value">
      <b data-accent={cell.accent || undefined}>{cell.text}</b>
      {cell.sub ? <span>{cell.sub}</span> : null}
    </div>
  );
}

/**
 * 충전사업자 비교표 (시안 1014).
 * PC — 왼쪽에 항목 이름이 고정되고 사업자 열이 좌우로 넘어간다.
 * 모바일 — 항목 분류가 탭이 되고, 사업자가 카드로 넘어간다.
 */
export function CompareBoard() {
  const [item, setItem] = useState(0);
  const [page, setPage] = useState(0);
  const scroll = useRef<HTMLDivElement>(null);
  const cards = useRef<HTMLDivElement>(null);

  const total = COMPARE_BRANDS.length;

  /** PC — 한 열씩 좌우로 */
  const slide = (dir: -1 | 1) => {
    const box = scroll.current;
    if (!box) return;
    // 머리글은 화면에서 숨겨 두었으므로 실제로 보이는 칸의 폭을 쓴다
    const col = box.querySelector<HTMLElement>("tbody td");
    const gap = parseFloat(getComputedStyle(box.querySelector("table")!).borderSpacing) || 0;
    box.scrollBy({ left: ((col?.offsetWidth ?? 210) + gap) * dir, behavior: "smooth" });
  };

  /** 모바일 — 카드 한 장씩 */
  const move = (dir: -1 | 1) => {
    const box = cards.current;
    if (!box) return;
    const next = Math.min(total - 1, Math.max(0, page + dir));
    setPage(next);
    const card = box.children[next] as HTMLElement | undefined;
    if (card) box.scrollTo({ left: card.offsetLeft - box.offsetLeft, behavior: "smooth" });
  };

  // 손가락으로 넘겼을 때 점 표시를 맞춘다
  useEffect(() => {
    const box = cards.current;
    if (!box) return;
    const onScroll = () => {
      const w = (box.children[0] as HTMLElement | undefined)?.offsetWidth ?? 1;
      setPage(Math.round(box.scrollLeft / (w + 14)));
    };
    box.addEventListener("scroll", onScroll, { passive: true });
    return () => box.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="cmp">
      <div className="shell">
        <div className="sec-head sec-head--center" data-reveal>
          <h2 className="sec-title">
            복잡한 비교, <em>화두가 더 간편하게!</em>
          </h2>
          <p className="sec-desc">
            여러 충전사업자를 일일이 알아볼 필요 없이, 우리 아파트에 맞는 조건을 한눈에 비교해 보세요.
          </p>
        </div>

        {/* 모바일 — 비교 항목 탭 */}
        <nav className="cmp__tabs" aria-label="비교 항목">
          {ITEMS.map((r, i) => (
            <button
              key={r.key}
              aria-selected={i === item}
              onClick={(e) => {
                setItem(i);
                // 고른 탭이 화면 밖이면 보이게 민다
                e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
              }}
            >
              {r.key}
            </button>
          ))}
        </nav>

        <div className="cmp__bar">
          <p className="cmp__count">
            총 <b className="num">{total}</b> 개 충전사업자
          </p>
          <div className="cmp__nav">
            <button className="round round--dark" onClick={() => { slide(-1); move(-1); }} aria-label="이전 충전사업자">
              <Chevron dir="left" size={22} />
            </button>
            <button className="round" onClick={() => { slide(1); move(1); }} aria-label="다음 충전사업자">
              <Chevron size={22} />
            </button>
          </div>
        </div>

        {/* PC — 항목 이름이 왼쪽에 고정된 비교표 */}
        <div className="cmp__viewport">
          <div className="cmp__scroll" ref={scroll}>
          <table className="cmp__table">
            <thead className="sr-only">
              <tr>
                <th scope="col">항목</th>
                {COMPARE_BRANDS.map((b) => (
                  <th key={b.name} scope="col">
                    {b.name}
                  </th>
                ))}
              </tr>
            </thead>
            {COMPARE_GROUPS.map((g) => (
              <tbody key={g.label}>
                <tr className="cmp__groupRow">
                  {/* 칸은 표 전체 폭이라 가로로 밀면 글자가 따라 나간다 — 글자만 왼쪽에 붙여 둔다 */}
                  <th scope="rowgroup" colSpan={total + 1}>
                    <span>{g.label}</span>
                  </th>
                </tr>
                {g.rows.map((r) => (
                  <tr key={r.key}>
                    <th scope="row">{r.key}</th>
                    {r.cells.map((c, i) => (
                      <td key={COMPARE_BRANDS[i].name}>
                        <Cell cell={c} brand={COMPARE_BRANDS[i]} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
            </table>
          </div>
        </div>

        {/* 모바일 — 사업자 카드가 좌우로 넘어간다.
            항목을 모두 그려 두고 고른 것만 보여준다 (정적 파일에서도 탭이 돌아가도록) */}
        <div className="cmp__cards" ref={cards}>
          {COMPARE_BRANDS.map((b, i) => (
            <article className="cmp__card" key={b.name}>
              <div className="cmp__cardHead">
                <span className="cmp__chip" style={{ background: b.color }}>
                  {b.name}
                </span>
                <span className="cmp__logo">
                  {b.logo ? <img src={b.logo} alt={b.name} loading="lazy" /> : <Hatch label="로고 준비중" />}
                </span>
              </div>
              {ITEMS.map((r, ri) => (
                <div className="cmp__cardRow" data-item={ri} hidden={ri !== item} key={r.key}>
                  <p className="cmp__cardLabel">{r.key}</p>
                  <Cell cell={r.cells[i]} brand={b} />
                </div>
              ))}
            </article>
          ))}
        </div>

        <div className="cmp__dots" aria-hidden="true">
          {COMPARE_BRANDS.map((b, i) => (
            <span key={b.name} data-on={i === page || undefined} />
          ))}
        </div>
      </div>
    </section>
  );
}
