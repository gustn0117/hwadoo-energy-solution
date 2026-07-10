"use client";

import { useEffect, useRef, useState } from "react";
import { PROCESS } from "@/lib/content";

/**
 * 시그니처 — 설치 절차를 충전 게이지로 읽는다.
 * 화면에 들어오면 세그먼트가 왼쪽부터 순차적으로 충전된다.
 */
export function ProcessGauge() {
  const ref = useRef<HTMLElement>(null);
  const [charged, setCharged] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCharged(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="gauge" ref={ref} data-charged={charged}>
      <div className="shell">
        <div className="gauge__head">
          <div>
            <p className="eyebrow eyebrow--kr eyebrow--onDark">설치 절차</p>
            <h2 className="gauge__title">
              상담 신청 한 번으로 개통까지, 8단계 전 과정을 대행합니다
            </h2>
          </div>
          <p className="gauge__readout">
            평균 소요 <b>8–12주</b> · 실사 및 견적 무료
          </p>
        </div>

        <ol className="gauge__track">
          {PROCESS.map((name, i) => (
            <li className="seg" key={name} data-first={i === 0}>
              <div className="seg__bar">
                <div
                  className="seg__fill"
                  style={{
                    transitionDelay: `${i * 110}ms`,
                    backgroundPosition: `${(i / (PROCESS.length - 1)) * 100}% 0`,
                  }}
                />
              </div>
              <span className="seg__no">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="seg__name">{name}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
