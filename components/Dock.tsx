"use client";

/** 우측 플로팅 — 카카오톡 상담, 충전기 설치 계산기 */
export function Dock() {
  return (
    <div className="dock">
      <a className="dock__btn dock__btn--talk" href="#" aria-label="카카오톡 상담 열기">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 3C6.9 3 2.8 6.3 2.8 10.3c0 2.6 1.7 4.8 4.3 6.1l-1 3.7c-.1.3.2.5.5.4l4.4-2.9c.3 0 .7.1 1 .1 5.1 0 9.2-3.3 9.2-7.4S17.1 3 12 3z" />
        </svg>
        카톡상담
      </a>

      <button className="dock__btn dock__btn--calc" aria-label="충전기 설치 계산기 열기">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <rect x="4" y="3" width="16" height="18" rx="2.5" />
          <path d="M8 7h8" />
          <path d="M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01" />
        </svg>
        충전기
        <br />
        설치 계산기
      </button>

      <a className="dock__btn dock__btn--top" href="#상담신청" aria-label="맨 위로">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 15 6-6 6 6" />
        </svg>
        TOP
      </a>
    </div>
  );
}
