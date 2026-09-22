"use client";

import { useEffect, useRef, useState } from "react";
import { Hatch } from "@/components/Hatch";
import { ArrowRight, Check, Chevron } from "@/components/Icons";
import { BRANDS } from "@/lib/content";

const N = BRANDS.length;
// 원본 목록 앞뒤로 복제본을 붙여 끝에서 처음으로 끊김 없이 넘어간다
const LOOP = Array.from({ length: N * 3 }, (_, k) => ({ brand: BRANDS[k % N], clone: k < N || k >= N * 2 }));
/** 복제 구간의 위치를 같은 카드의 원본(가운데 세트) 위치로 */
const toMiddle = (i: number) => ((((i - N) % N) + N) % N) + N;

export function Brands() {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(N); // 가운데(원본) 세트의 첫 카드
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0);
  const [drag, setDrag] = useState(0);
  const pointer = useRef<{ x: number; moved: boolean } | null>(null);
  const dragged = useRef(false);
  const busy = useRef(false);
  const indexRef = useRef(N);
  indexRef.current = index;

  // 카드 한 장 폭 + 간격
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => {
      const card = el.children[0] as HTMLElement | undefined;
      if (card) setStep(card.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // 순간이동 직후 한 프레임 뒤에 전환 효과를 되살린다
  useEffect(() => {
    if (animate) return;
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => setAnimate(true));
    });
    return () => cancelAnimationFrame(id);
  }, [animate]);

  // 전환이 끝났을 때 복제 구간이면 같은 카드의 원본 위치로 전환 없이 옮긴다
  const settle = () => {
    busy.current = false;
    const i = indexRef.current;
    if (i < N || i >= N * 2) {
      setAnimate(false);
      setIndex(toMiddle(i));
    }
  };

  const move = (d: number) => {
    if (busy.current || d === 0) return;
    const next = indexRef.current + d;
    // 모션 줄이기 설정이면 전환 없이 바로 원본 위치로
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAnimate(false);
      setIndex(toMiddle(next));
      return;
    }
    busy.current = true;
    setAnimate(true);
    setIndex(next);
    window.setTimeout(() => busy.current && settle(), 900); // transitionend 누락 대비
  };

  return (
    <section className="sec brands" id="compare">
      <div className="shell">
        <div className="sec-head brands__head" data-reveal>
          <h2 className="sec-title">
            어떤 브랜드가
            <br />
            <em>우리 단지에 맞을까요?</em>
          </h2>
          <div className="brands__ctrl">
            <a className="pill" href="/#compare">
              전체보기
            </a>
            <button className="round round--dark" onClick={() => move(-1)} aria-label="이전 브랜드">
              <Chevron dir="left" />
            </button>
            <button className="round" onClick={() => move(1)} aria-label="다음 브랜드">
              <Chevron />
            </button>
          </div>
        </div>

        <div
          className="brands__viewport"
          data-reveal
          onPointerDown={(e) => {
            if (e.pointerType === "mouse" && e.button !== 0) return;
            pointer.current = { x: e.clientX, moved: false };
          }}
          onPointerMove={(e) => {
            const p = pointer.current;
            if (!p) return;
            const dx = e.clientX - p.x;
            if (!p.moved && Math.abs(dx) > 6) {
              p.moved = true;
              e.currentTarget.setPointerCapture(e.pointerId);
            }
            if (p.moved) {
              setAnimate(false);
              setDrag(dx);
            }
          }}
          onPointerUp={() => {
            const p = pointer.current;
            pointer.current = null;
            if (!p?.moved) return;
            dragged.current = true;
            window.setTimeout(() => (dragged.current = false), 0);
            const cards = step ? Math.max(1, Math.round(Math.abs(drag) / step)) : 1;
            setAnimate(true);
            setDrag(0);
            if (Math.abs(drag) > 50) move(drag < 0 ? cards : -cards);
          }}
          onPointerCancel={() => {
            pointer.current = null;
            setAnimate(true);
            setDrag(0);
          }}
          onClickCapture={(e) => {
            // 끌어서 넘긴 경우 카드 링크가 눌리지 않게
            if (dragged.current) e.preventDefault();
          }}
        >
          <ul
            className="brands__track"
            ref={track}
            data-animate={animate}
            style={{ transform: `translate3d(${-index * step + drag}px, 0, 0)` }}
            onTransitionEnd={(e) => e.target === e.currentTarget && settle()}
          >
            {LOOP.map(({ brand: b, clone }, k) => (
              <li key={k} className="brand" aria-hidden={clone || undefined}>
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
                <a className="brand__btn" href="/#consult" tabIndex={clone ? -1 : undefined} draggable={false}>
                  비교하기
                  <ArrowRight />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="compareBanner" data-reveal>
          <img src="/images/customer-support-icon.png" alt="" width={320} height={320} loading="lazy" />
          <p>
            <b>여러 업체에 일일이 문의하지 마세요!</b>
            <span>화두에서 한 번에 비교하고 상담까지</span>
          </p>
          <a className="btn btn--orange" href="/#consult">
            충전사업자 비교
            <ArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
}
