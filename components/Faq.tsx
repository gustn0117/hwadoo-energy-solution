"use client";

import { useState } from "react";
import { Plus } from "@/components/Icons";

type Item = { q: string; answer: string };

/** 답변 텍스트 — "- "로 시작하는 줄은 글머리표 목록, 나머지는 문단 */
function Answer({ text }: { text: string }) {
  const blocks: ({ type: "p"; text: string } | { type: "ul"; items: string[] })[] = [];
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("- ")) {
      const last = blocks.at(-1);
      if (last?.type === "ul") last.items.push(line.slice(2));
      else blocks.push({ type: "ul", items: [line.slice(2)] });
    } else {
      blocks.push({ type: "p", text: line });
    }
  }
  return blocks.map((b, i) =>
    b.type === "p" ? (
      <p key={i}>{b.text}</p>
    ) : (
      <ul key={i}>
        {b.items.map((it, j) => (
          <li key={j}>{it}</li>
        ))}
      </ul>
    ),
  );
}

export function Faq({
  items,
  defaultOpen = null,
  title = true,
  moreHref,
}: {
  items: Item[];
  defaultOpen?: number | null;
  title?: boolean;
  moreHref?: string;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <section className="sec faq" id="faq">
      <div className="shell">
        {title ? (
          <div className="sec-head faq__head" data-reveal>
            <h2 className="sec-title">
              <small className="sec-eyebrow">FAQ</small>
              자주 묻는 질문
            </h2>
            {moreHref ? (
              <a className="pill" href={moreHref}>
                전체보기
              </a>
            ) : null}
          </div>
        ) : null}

        <ul className="faq__list" data-reveal-group>
          {items.map((f, i) => {
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
                    {/* 열리면 오른쪽으로 45° 돌아 × 가 된다 */}
                    <Plus className="faq__icon" />
                  </button>
                </h3>
                {/* 0fr → 1fr 로 높이를 자연스럽게 펼친다 */}
                <div className="faq__panel" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`} inert={!isOpen}>
                  <div className="faq__a">
                    <Answer text={f.answer} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
