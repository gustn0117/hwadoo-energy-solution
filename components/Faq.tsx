"use client";

import { useState } from "react";
import { Close, Plus } from "@/components/Icons";
import { FAQ } from "@/lib/content";

export function Faq() {
  // 시안 기준 두 번째 문항이 펼쳐진 상태로 시작
  const [open, setOpen] = useState<number | null>(1);

  return (
    <section className="faq" id="faq">
      <div className="shell">
        <div className="faq__head">
          <h2 className="faq__title">
            <small>FAQ</small>
            자주 묻는 질문
          </h2>
          <a className="pill" href="#faq">
            전체보기
          </a>
        </div>

        <ul className="faq__list">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="faq__item" data-open={isOpen}>
                <h3>
                  <button
                    id={`faq-q${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {f.q}
                    {isOpen ? <Close /> : <Plus />}
                  </button>
                </h3>
                <div className="faq__a" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`} hidden={!isOpen}>
                  {f.intro ? <p>{f.intro}</p> : null}
                  <ul>
                    {f.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
