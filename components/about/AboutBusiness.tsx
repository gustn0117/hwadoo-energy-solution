"use client";

import { useEffect, useRef, useState } from "react";
import { Chevron } from "@/components/Icons";
import { Hatch } from "@/components/Hatch";
import { ABOUT_BUSINESS } from "@/lib/about-data";

const CARDS = ABOUT_BUSINESS.cards;
const N = CARDS.length;

/** 원본 목록 앞뒤로 복제본을 붙여 끝에서 처음으로 끊김 없이 넘어간다 */
const LOOP = Array.from({ length: N * 3 }, (_, k) => ({ card: CARDS[k % N], key: k }));

/** 복제 구간의 위치를 같은 카드의 원본(가운데 세트) 위치로 */
const toMiddle = (i: number) => ((((i - N) % N) + N) % N) + N;

/**
 * 사업영역 슬라이드 (시안 1021).
 * 가운데 칸만 또렷하고 양옆은 흐리다. 마지막 다음은 첫 칸이 이어서 나온다.
 */
export function AboutBusiness() {
  const [index, setIndex] = useState(N); // 가운데(원본) 세트의 첫 카드
  const [animate, setAnimate] = useState(true);
  const busy = useRef(false);
  const indexRef = useRef(N);
  indexRef.current = index;

  // 순간이동 직후 한 프레임 뒤에 전환 효과를 되살린다
  useEffect(() => {
    if (animate) return;
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => setAnimate(true));
    });
    return () => cancelAnimationFrame(id);
  }, [animate]);

  /** 전환이 끝나면 복제 구간에서 같은 카드의 원본 자리로 전환 없이 옮긴다 */
  const settle = () => {
    busy.current = false;
    const i = indexRef.current;
    if (i < N || i >= N * 2) {
      setAnimate(false);
      setIndex(toMiddle(i));
    }
  };

  const move = (d: -1 | 1) => {
    if (busy.current) return;
    const next = indexRef.current + d;
    // 모션 줄이기 설정이면 전환 없이 바로 원본 자리로
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

  // 화면에 보이는 번호 (1 ~ N)
  const shown = ((((index - N) % N) + N) % N) + 1;

  return (
    <section className="abBiz">
      <div className="shell">
        <div className="abBiz__head" data-reveal>
          <h2 className="sec-title sec-title--md">
            {ABOUT_BUSINESS.title[0]}
            <br />
            <em>{ABOUT_BUSINESS.title[1]}</em>
          </h2>
          <span className="abBiz__badge">{ABOUT_BUSINESS.badge}</span>
        </div>
      </div>

      <div className="abBiz__viewport">
        <ul
          className="abBiz__track"
          data-animate={animate ? "true" : "false"}
          style={{ "--i": index } as React.CSSProperties}
          onTransitionEnd={settle}
        >
          {LOOP.map(({ card, key }, i) => (
            <li className="abBiz__card" data-on={i === index || undefined} key={key} aria-hidden={i !== index}>
              <span className="abBiz__photo">
                <Hatch label={card.title} src={card.photo} />
              </span>
              <div className="abBiz__text">
                <span className="abBiz__icon">
                  <Hatch label={card.title} src={card.icon} />
                </span>
                <span className="abBiz__tag">{card.tag}</span>
                <h3>{card.title}</h3>
                <p>
                  {card.desc.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="abBiz__nav">
        <button className="round" onClick={() => move(-1)} aria-label="이전 사업영역">
          <Chevron dir="left" size={20} />
        </button>
        <p className="abBiz__count">
          <b>{String(shown).padStart(2, "0")}</b> / {String(N).padStart(2, "0")}
        </p>
        <button className="round round--purple" onClick={() => move(1)} aria-label="다음 사업영역">
          <Chevron size={20} />
        </button>
      </div>
    </section>
  );
}
