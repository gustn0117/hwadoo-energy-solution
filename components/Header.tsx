"use client";

import { useState } from "react";
import { COMPANY, MENU } from "@/lib/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="hd" data-open={open} onKeyDown={(e) => e.key === "Escape" && close()}>
      <div className="shell hd__bar">
        <a className="hd__logo" href="/" onClick={close}>
          <img src="/images/logo-img.png" alt={COMPANY.name} width={500} height={181} />
        </a>

        <nav className="hd__nav" id="hd-nav" aria-label="주요 메뉴">
          {MENU.map((m) => (
            <a key={m.label} href={m.href} onClick={close}>
              {m.label}
            </a>
          ))}
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
    </header>
  );
}
