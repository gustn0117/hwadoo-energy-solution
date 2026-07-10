import { COMPANY, MENU } from "@/lib/content";

export function Footer() {
  return (
    <footer className="ft">
      <div className="shell">
        <div className="ft__top">
          <div className="ft__brand">
            <b>{COMPANY.name}</b>
            <span>{COMPANY.nameEn}</span>
            <p>
              대표번호 {COMPANY.tel}
              <br />
              평일 09:00 – 18:00 (점심 12:00 – 13:00)
              <br />
              주말 및 공휴일 휴무
            </p>
          </div>

          <div className="ft__nav">
            {MENU.slice(0, 3).map((m) => (
              <div key={m.title}>
                <p className="ft__navTitle">{m.title}</p>
                {m.items.map((it) => (
                  <a key={it.label} href="#">
                    {it.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="ft__bottom">
          <p>© 2026 HWADOO ENERGY SOLUTION. ALL RIGHTS RESERVED.</p>
          <p>개인정보처리방침 · 이용약관</p>
        </div>
      </div>
    </footer>
  );
}
