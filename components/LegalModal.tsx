"use client";

import { useRef, useState } from "react";
import { Close } from "@/components/Icons";
import { PRIVACY, TERMS } from "@/lib/legal";

type Kind = "terms" | "privacy";

/**
 * 이용약관 · 개인정보처리방침 팝업 (시안 1001).
 * 푸터 링크를 눌러서 연다 — 별도 페이지로 이동하지 않는다.
 * 두 문서를 모두 그려 두고 보이는 쪽만 바꾼다 (정적 퍼블리싱에서도 그대로 동작).
 */
export function LegalModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [kind, setKind] = useState<Kind>("terms");

  const open = (k: Kind) => {
    setKind(k);
    dialog.current?.showModal();
  };

  return (
    <>
      <nav className="ft__links" aria-label="약관">
        <button type="button" data-legal="terms" onClick={() => open("terms")}>
          이용약관
        </button>
        <button type="button" data-legal="privacy" onClick={() => open("privacy")}>
          개인정보처리방침
        </button>
      </nav>

      <dialog
        ref={dialog}
        className="lmodal"
        data-kind={kind}
        aria-labelledby="lmodal-title"
        onClick={(e) => {
          if (e.target === dialog.current) dialog.current.close();
        }}
      >
        <div className="lmodal__box">
          <div className="lmodal__head">
            <div>
              <h2 id="lmodal-title">
                <span data-doc="terms">이용약관</span>
                <span data-doc="privacy">개인정보처리방침</span>
              </h2>
              <p>
                <span data-doc="terms">시행일 {TERMS.effectiveOn}</span>
                <span data-doc="privacy">시행일 {PRIVACY.effectiveOn}</span>
              </p>
            </div>
            <button className="lmodal__close" onClick={() => dialog.current?.close()} aria-label="닫기">
              <Close size={24} />
            </button>
          </div>

          <div className="lmodal__body">
            <div data-doc="terms">
              {TERMS.articles.map((a) => (
                <section key={a.title}>
                  <h3>{a.title}</h3>
                  {a.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </section>
              ))}
            </div>

            <div data-doc="privacy">
              <dl className="lmodal__spec">
                {PRIVACY.collected.map((c) => (
                  <div key={c.key}>
                    <dt>{c.key}</dt>
                    <dd>{c.val}</dd>
                  </div>
                ))}
              </dl>
              {PRIVACY.articles.map((a) => (
                <section key={a.title}>
                  <h3>{a.title}</h3>
                  {a.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
