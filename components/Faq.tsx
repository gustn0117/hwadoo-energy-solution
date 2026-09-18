"use client";

import { useState } from "react";
import { Close, Plus } from "@/components/Icons";

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
    <section className="faq" id="faq">
      <div className="shell">
        {title ? (
          <div className="faq__head">
            <h2 className="faq__title">
              <small>FAQ</small>
              자주 묻는 질문
            </h2>
            {moreHref ? (
              <a className="pill" href={moreHref}>
                전체보기
              </a>
            ) : null}
          </div>
        ) : null}

        <ul className="faq__list">
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
                    {isOpen ? <Close /> : <Plus />}
                  </button>
                </h3>
                <div className="faq__a" id={`faq-a${i}`} role="region" aria-labelledby={`faq-q${i}`} hidden={!isOpen}>
                  <Answer text={f.answer} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
