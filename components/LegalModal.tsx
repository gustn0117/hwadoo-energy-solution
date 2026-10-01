"use client";

import { useRef, useState } from "react";
import { Close } from "@/components/Icons";
import { PRIVACY, TERMS } from "@/lib/legal";

type Kind = "terms" | "privacy";

const DOC = {
  terms: { title: "이용약관", data: TERMS },
  privacy: { title: "개인정보처리방침", data: PRIVACY },
} as const;

/**
 * 이용약관 · 개인정보처리방침 팝업 (시안 1001).
 * 푸터 링크를 눌러서 연다 — 별도 페이지로 이동하지 않는다.
 */
export function LegalModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<Kind>("terms");

  const open = (k: Kind) => {
    setKind(k);
    dialog.current?.showModal();
  };

  const doc = DOC[kind];
  const collected = kind === "privacy" ? PRIVACY.collected : null;

  return (
    <>
      <nav className="ft__links" aria-label="약관">
        <button type="button" onClick={() => open("terms")}>
          이용약관
        </button>
        <button type="button" onClick={() => open("privacy")}>
          개인정보처리방침
        </button>
      </nav>

      <dialog
        ref={dialog}
        className="lmodal"
        aria-labelledby="lmodal-title"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="lmodal__box">
          <div className="lmodal__head">
            <div>
              <h2 id="lmodal-title">{doc.title}</h2>
              <p>시행일 {doc.data.effectiveOn}</p>
            </div>
            <button className="lmodal__close" onClick={() => dialog.current?.close()} aria-label="닫기">
              <Close size={24} />
            </button>
          </div>

          <div className="lmodal__body">
            {collected ? (
              <dl className="lmodal__spec">
                {collected.map((c) => (
                  <div key={c.key}>
                    <dt>{c.key}</dt>
                    <dd>{c.val}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {doc.data.articles.map((a) => (
              <section key={a.title}>
                <h3>{a.title}</h3>
                {a.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        </div>
      </dialog>
    </>
  );
}
