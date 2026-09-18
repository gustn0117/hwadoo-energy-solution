"use client";

import { Chat } from "@/components/Icons";
import { COMPANY, TEL_HREF } from "@/lib/content";

/** 우측 하단 플로팅(상담문의 · 전화상담 · TOP) + 하단 중앙 상담 바 */
export function FloatingDock() {
  const [a, b] = COMPANY.tel.split("-");

  return (
    <>
      <aside className="dock" aria-label="빠른 상담">
        <a className="dock__talk" href="#consult">
          <Chat />
          상담문의
        </a>

        <a className="dock__call" href={TEL_HREF}>
          <span className="dock__callIcon">
            <img src="/images/call-icon.png" alt="" width={89} height={104} />
          </span>
          <b>전화상담</b>
          <small>
            평일 오전 9시
            <br />
            ~오후 6시
          </small>
          <strong className="num">
            {a}
            <br />-<br />
            {b}
          </strong>
        </a>

        <button className="dock__top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          TOP
        </button>
      </aside>

      <div className="toast">
        <img src="/images/diagnosis-icon.png" alt="" width={190} height={190} />
        <p>전기차 충전기 고민, 전문가와 상담해보세요</p>
        <a className="btn btn--orange" href="#consult">
          무료 상담 문의
        </a>
      </div>
    </>
  );
}
