"use client";

import { useEffect, useRef, useState } from "react";
import { Hatch } from "@/components/Hatch";
import { ArrowRight, Check, Chevron } from "@/components/Icons";
import { BRANDS } from "@/lib/content";

export function Brands() {
  const track = useRef<HTMLUListElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const sync = () => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 1,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1,
    });
  };

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  // 카드 한 장(폭 + 간격)씩 넘긴다
  const move = (dir: 1 | -1) => {
    const el = track.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" });
  };

  return (
    <section className="brands" id="compare">
      <div className="shell">
        <div className="brands__head">
          <h2 className="brands__title">
            어떤 브랜드가
            <br />
            <em>우리 단지에 맞을까요?</em>
          </h2>
          <div className="brands__ctrl">
            <a className="pill" href="#compare">
              전체보기
            </a>
            <button className="round round--dark" onClick={() => move(-1)} disabled={edge.start} aria-label="이전 브랜드">
              <Chevron dir="left" />
            </button>
            <button className="round" onClick={() => move(1)} disabled={edge.end} aria-label="다음 브랜드">
              <Chevron />
            </button>
          </div>
        </div>

        <div className="brands__viewport" data-end={edge.end}>
          <ul className="brands__track" ref={track} onScroll={sync}>
            {BRANDS.map((b) => (
              <li key={b.name} className="brand">
                <div className="brand__logo">
                  <Hatch src={b.logo} label={`${b.name} 로고`} />
                </div>
                <b className="brand__name">{b.name}</b>
                <ul className="brand__features">
                  {b.features.map((f) => (
                    <li key={f}>
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <a className="brand__btn" href="#consult">
                  비교하기
                  <ArrowRight />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="compareBanner">
          <img src="/images/customer-support-icon.png" alt="" width={320} height={320} loading="lazy" />
          <p>
            <b>여러 업체에 일일이 문의하지 마세요!</b>
            <span>화두에서 한 번에 비교하고 상담까지</span>
          </p>
          <a className="btn btn--orange" href="#consult">
            충전사업자 비교
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
