"use client";

import { useState } from "react";
import { COMPANY, MENU } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const close = () => {
    setOpen(false);
    setMegaOpen(false);
  };

  return (
    <header
      className="hd"
      data-open={open}
      data-mega={megaOpen}
      onMouseLeave={() => setMegaOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMegaOpen(false);
      }}
      onKeyDown={(e) => e.key === "Escape" && close()}
    >
      <div className="shell hd__bar">
        <div className="hd__logo">
          <img src="/images/logo-img.png" alt={COMPANY.name} width={500} height={181} />
        </div>

        <nav
          className="hd__nav"
          id="hd-nav"
          aria-label="주요 메뉴"
          onMouseEnter={() => setMegaOpen(true)}
          onFocus={() => setMegaOpen(true)}
        >
          {MENU.map((m) => (
            <a key={m.label} href={m.href} onClick={close} aria-haspopup="true" aria-expanded={megaOpen}>
              {m.label}
            </a>
          ))}

          <div className="hd__mobileMenu" aria-label="전체 메뉴">
            {MENU.map((group) => (
              <section className="hd__mobileGroup" key={group.label}>
                <a className="hd__mobileTitle" href={group.href} onClick={close}>
                  {group.label}
                </a>
                <ul>
                  {group.items.map((item) => (
                    <li key={`${group.label}-${item.label}`}>
                      <a href={item.href} onClick={close}>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <a className="btn btn--orange hd__navCta" href="/#consult" onClick={close}>
            1:1 설치 상담
          </a>
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

      <div
        className="hd__mega"
        aria-label="전체 메뉴"
        aria-hidden={!megaOpen}
        inert={!megaOpen}
        onMouseEnter={() => setMegaOpen(true)}
      >
        <div className="shell hd__megaGrid">
          {MENU.map((group) => (
            <section className="hd__megaGroup" key={group.label}>
              <a className="hd__megaTitle" href={group.href} onClick={close}>
                {group.label}
              </a>
              <ul className="hd__megaList">
                {group.items.map((item) => (
                  <li key={`${group.label}-${item.label}`}>
                    <a href={item.href} onClick={close}>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </header>
  );
}
