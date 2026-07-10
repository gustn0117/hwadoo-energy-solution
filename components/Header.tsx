"use client";

import { useRef, useState } from "react";
import { COMPANY, MENU } from "@/lib/content";
import { LogoMark } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = (i: number | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
    setActive(i);
  };

  // 포인터가 헤더를 완전히 벗어날 때만 닫는다
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setActive(null);
    }, 120);
  };

  return (
    <header
      className="hd"
      data-open={open}
      onPointerLeave={scheduleClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          setActive(null);
        }
      }}
    >
      <div className="shell hd__bar">
        {/* 로고는 링크 없이 노출 — 기획서 화면설명 2 */}
        <div className="hd__logo">
          <LogoMark className="hd__mark" />
          <div className="hd__wordmark">
            <b>화두에너지솔루션</b>
            <span>{COMPANY.nameEn}</span>
          </div>
        </div>

        <nav className="hd__nav" aria-label="주요 메뉴">
          {MENU.map((m, i) => (
            <button
              key={m.title}
              className="hd__navBtn"
              data-active={active === i}
              aria-expanded={open}
              onPointerEnter={() => show(i)}
              onFocus={() => show(i)}
              onClick={() => (open && active === i ? setOpen(false) : show(i))}
            >
              {m.title}
            </button>
          ))}
        </nav>

        <a className="hd__tel" href={`tel:${COMPANY.tel}`}>
          <small>CONSULTING</small>
          <b>{COMPANY.tel}</b>
        </a>

        <a className="btn btn--volt hd__cta" href="#상담신청">
          간편 상담신청
        </a>

        <button
          className="hd__burger"
          aria-expanded={open}
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => {
            setOpen((v) => !v);
            setActive(null);
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M3 7h18" />
                <path d="M3 12h18" />
                <path d="M3 17h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* 어떤 메뉴에 마우스를 올려도 서브메뉴 전체가 보인다 */}
      <div className="mega" aria-hidden={!open}>
        <div className="mega__clip">
          <div className="shell mega__grid">
            {MENU.map((m, i) => (
              <div key={m.title} className="mega__col" data-active={active === i}>
                <p className="mega__colTitle">{m.title}</p>
                {m.items.map((it) => (
                  <a
                    key={it.label}
                    className="mega__link"
                    href="#"
                    tabIndex={open ? 0 : -1}
                    onPointerEnter={() => show(i)}
                  >
                    {it.label}
                    {"badge" in it && it.badge ? (
                      <span className="mega__badge">{it.badge}</span>
                    ) : null}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
