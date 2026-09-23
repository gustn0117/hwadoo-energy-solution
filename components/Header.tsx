"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "@/components/Icons";
import { COMPANY, MENU, NAV, TEL_HREF } from "@/lib/content";

/** 전체메뉴 좌측 고객센터 패널 — PC 메가메뉴와 모바일 햄버거에서 함께 쓴다 */
function MenuAside({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="hd__aside">
      <div className="hd__center">
        <p className="hd__centerTitle">{COMPANY.name} 고객센터</p>
        <a className="hd__centerTel num" href={TEL_HREF}>
          <Phone size={22} />
          {COMPANY.tel}
        </a>
        <p className="hd__centerSub">
          아파트 전기차 충전기
          <br />
          설치 상담
        </p>
      </div>
      <a className="hd__asideCta" href="/#consult" onClick={onNavigate}>
        전기차 충전기 설치 상담
        <ArrowRight size={22} />
      </a>
    </div>
  );
}

function MenuGroups({ onNavigate }: { onNavigate: () => void }) {
  return (
    <>
      {MENU.map((group) => (
        <section className="hd__group" key={group.label}>
          <a className="hd__groupTitle" href={group.href} onClick={onNavigate}>
            {group.label}
          </a>
          <ul className="hd__groupList">
            {group.items.map((item) => (
              <li key={`${group.label}-${item.label}`}>
                <a href={item.href} onClick={onNavigate}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false); // 모바일 햄버거
  const [mega, setMega] = useState(false); // PC 전체메뉴
  const close = () => {
    setOpen(false);
    setMega(false);
  };

  // 포커스가 헤더 밖에 있어도 Esc로 닫히게
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header
      className="hd"
      data-open={open}
      data-mega={mega}
      onMouseLeave={() => setMega(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(false);
      }}
    >
      <div className="shell hd__bar">
        <div className="hd__logo">
          <img src="/images/logo-img.png" alt={COMPANY.name} width={500} height={181} />
        </div>

        <nav
          className="hd__nav"
          id="hd-nav"
          aria-label="주요 메뉴"
          onMouseEnter={() => setMega(true)}
          onFocus={() => setMega(true)}
        >
          {NAV.map((m) => (
            <a key={m.label} href={m.href} onClick={close} aria-haspopup="true" aria-expanded={mega}>
              {m.label}
            </a>
          ))}

          {/* 모바일 햄버거 안의 전체메뉴 — PC에서는 숨긴다 */}
          <div className="hd__mobileMenu">
            <MenuGroups onNavigate={close} />
            <MenuAside onNavigate={close} />
          </div>
        </nav>

        <a className="btn btn--orange hd__cta" href="/#consult">
          1:1 설치 상담
        </a>

        <button
          className="hd__burger"
          aria-expanded={open}
          aria-controls="hd-nav"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* PC 전체메뉴 — 어느 상위 메뉴에 올려도 전체가 함께 열린다 */}
      <div className="hd__mega" aria-label="전체 메뉴" aria-hidden={!mega} inert={!mega} onMouseEnter={() => setMega(true)}>
        <div className="hd__megaInner">
          <div className="shell hd__megaGrid">
            <MenuAside onNavigate={close} />
            <MenuGroups onNavigate={close} />
          </div>
        </div>
      </div>

      {/* 전체메뉴가 열리면 본문을 어둡게 */}
      <button className="hd__dim" tabIndex={-1} aria-hidden="true" onClick={close} onMouseEnter={() => setMega(false)} />
    </header>
  );
}
